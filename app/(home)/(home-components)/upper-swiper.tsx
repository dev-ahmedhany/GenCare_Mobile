import { View, StyleSheet, Image, Animated, FlatList, Dimensions, useWindowDimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useEffect, useRef, useState } from 'react';

const slides = [
  {
    id: '1',
    image: require('@/assets/images/favicon.png'),
    title: 'Welcome to GenCare',
    subtitle: 'Your pregnancy journey starts here'
  },
  {
    id: '2',
    image: require('@/assets/images/favicon.png'),
    title: 'Track Your Progress',
    subtitle: 'Week by week pregnancy guide'
  },
  {
    id: '3',
    image: require('@/assets/images/favicon.png'),
    title: 'Expert Advice',
    subtitle: 'Get support from professionals'
  },
  {
    id: '4',
    image: require('@/assets/images/favicon.png'),
    title: 'Stay Healthy',
    subtitle: 'Tips for a healthy pregnancy'
  },
];

export default function UpperSwiper() {
  const flatListRef = useRef(null);
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animation للـ fade
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Timer للتحريك التلقائي
    const timer = setInterval(() => {
      if (currentIndex < slides.length - 1) {
        flatListRef.current?.scrollToIndex({
          index: currentIndex + 1,
          animated: true
        });
      } else {
        flatListRef.current?.scrollToIndex({
          index: 0,
          animated: true
        });
      }
    }, 3000); // كل 3 ثواني

    return () => clearInterval(timer);
  }, [currentIndex]);

  const renderItem = ({ item }) => (
    <View style={[styles.slide, { width }]}>
      <View style={styles.contentContainer}>
        <Image 
          source={item.image}
          style={styles.image}
          resizeMode="contain"
        />
        
        <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
          <ThemedText style={styles.title}>{item.title}</ThemedText>
          <ThemedText style={styles.subtitle}>{item.subtitle}</ThemedText>
        </Animated.View>
      </View>
    </View>
  );

  const renderDots = () => (
    <View style={styles.pagination}>
      {slides.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            { backgroundColor: index === currentIndex ? '#007AFF' : '#ccc' }
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(newIndex);
        }}
      />
      {renderDots()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 350,
    backgroundColor: '#fff',
    width: '100%',
  },
  slide: {
    padding: 20,
    height: '100%'
    },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
  },
  image: {
    width: 200,
    height: 200,
  },
  textContainer: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    paddingTop: 10,
    marginBottom: 12,
    color: '#000',
  },
  subtitle: {
    fontSize: 18,
    color: '#000',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
