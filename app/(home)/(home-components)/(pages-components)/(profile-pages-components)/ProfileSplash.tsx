import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Animated,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox';
import { BlurView } from 'expo-blur';
import { AntDesign } from '@expo/vector-icons';
import { bgColors } from '@/constants/Colors';

const { width, height } = Dimensions.get('window');
const pagesColors = bgColors.light;
const slides = [
  {
    id: '1',
    title: 'Welcome to Health App',
    description: 'Your personal health companion for a better lifestyle',
    subDescription: 'Daily tracking • Detailed reports • Health tips',
    image: require('@/assets/Logo/Mob-Logo-removebg-preview.png'),
  },
  {
    id: '2',
    title: 'Smart Notifications',
    description: 'Never miss your medications and appointments',
    subDescription: 'Reminders • Medications • Appointments',
    image: require('@/assets/Logo/Mob-Logo-removebg-preview.png'),
  },
  {
    id: '3',
    title: 'Pregnancy Journey',
    description: 'Track your pregnancy week by week with expert guidance',
    subDescription: 'Weekly updates • Development tracking • Nutrition tips',
    image: require('@/assets/Logo/Mob-Logo-removebg-preview.png'),
  },
];

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function ProfileSplash() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);
  const [showAgain, setShowAgain] = useState(false);

  const viewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any }) => {
    setCurrentIndex(viewableItems[0]?.index || 0);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleNavigation = async () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      if (showAgain) {
        await AsyncStorage.setItem('neverShowSplash', 'true');
      }
      await AsyncStorage.setItem('profileSplashShown', 'true');
      router.replace('/(home)/(home-components)/(pages-components)/(profile-pages-components)/components/MainProfile');
    }
  };

  const handleSkip = () => {
    AsyncStorage.setItem('profileSplashShown', 'true');
    router.replace('/(home)/(home-components)/(pages-components)/(profile-pages-components)/components/MainProfile');
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const imageScale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
    });

    const imageRotate = scrollX.interpolate({
      inputRange,
      outputRange: ['0deg', '0deg', '360deg'],
    });

    const titleTranslate = scrollX.interpolate({
      inputRange,
      outputRange: [width * 0.2, 0, -width * 0.2],
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.3, 1, 0.3],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.slide}>
        <View style={styles.contentSection}>
          <View style={styles.logoContainer}>
            <Animated.Image
              source={item.image}
              style={[styles.image, {
                transform: [{ scale: imageScale }],
                opacity,
              }]}
            />
          </View>
          <View style={styles.textContainer}>
            <Animated.Text style={[styles.title, { opacity }]}>
              {item.title}
            </Animated.Text>
            <Animated.Text style={[styles.description, { opacity }]}>
              {item.description}
            </Animated.Text>
            <Animated.Text style={[styles.subDescription, { opacity }]}>
              {item.subDescription}
            </Animated.Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      
      <View style={styles.headerSection}>
        <TouchableOpacity 
          style={styles.skipButton} 
          onPress={handleSkip}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <AnimatedFlatList
        data={slides}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item: any) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />

      <View style={styles.bottomSection}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index && styles.activeDot
              ]}
            />
          ))}
        </View>

        {currentIndex === slides.length - 1 && (
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={showAgain}
              onValueChange={setShowAgain}
              color={showAgain ? '#4361EE' : undefined}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxLabel}>
              Don't show this again
            </Text>
          </View>
        )}

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleNavigation}
        >
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
          <AntDesign 
            name="arrowright" 
            size={20} 
            color="#fff" 
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColors.light.background,
  },
  headerSection: {
    height: height * 0.12,
    paddingTop: StatusBar.currentHeight || 0,
    paddingHorizontal: width * 0.05,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  skipButton: {
    padding: 10,
  },
  contentSection: {
    height: height * 0.68,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.05,
  },
  logoContainer: {
    height: height * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.04,
  },
  image: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.08,
  },
  bottomSection: {
    height: height * 0.2,
    justifyContent: 'space-between',
    paddingBottom: height * 0.03,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DDD',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#623AA2',
    width: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 8,
    borderRadius: 4,
  },
  checkboxLabel: {
    color: '#444',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#623AA2',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 4,
  },
  skipText: {
    fontSize: 16,
    color: '#623AA2',
    fontWeight: '600',
  },
  slide: {
    width,
    height,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#623AA2',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 24,
  },
  subDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
}); 