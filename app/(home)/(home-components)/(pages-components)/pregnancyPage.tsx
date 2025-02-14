import { SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, Animated, Dimensions, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { bgColors } from "@/constants/Colors";
import Navbar from '../(navbar)/navbar';
import { profileService } from "./(profile-pages-components)/services/api";
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const NAVBAR_HEIGHT = SCREEN_HEIGHT * 0.12;

const PregnancyPage = () => {
  const { news } = useLocalSearchParams();
  const weekData = JSON.parse(news as string);
  const scrollY = new Animated.Value(0);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    scrollY.setValue(offsetY);
  };

  const navbarOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const handleSaveWeek = async () => {
    try {
      setIsSaving(true);
      
      if (!weekData) {
        Alert.alert('خطأ', 'لم يتم العثور على معلومات الأسبوع');
        return;
      }

      // إذا كان الأسبوع محفوظ، نقوم بحذفه
      if (isSaved) {
        const response = await profileService.deleteItem('week', weekData.id.toString());
        if (response.success) {
          setIsSaved(false);
          Alert.alert('نجاح', 'تم إزالة الأسبوع من المحفوظات');
        } else {
          throw new Error(response.message || 'فشل حذف الأسبوع');
        }
      } else {
        // حفظ الأسبوع
        const weekDataToSave = {
          week: weekData.id.toString(),
          title: weekData.title,
          description: weekData.body1Title,
          date: new Date().toISOString()
        };

        const response = await profileService.saveItem('week', weekDataToSave);
        
        if (response.success) {
          setIsSaved(true);
          Alert.alert('نجاح', 'تم حفظ الأسبوع بنجاح');
        } else {
          throw new Error(response.message || 'فشل حفظ الأسبوع');
        }
      }
      
    } catch (error) {
      console.error('Error handling week:', error);
      Alert.alert('خطأ', 'حدث خطأ في العملية');
    } finally {
      setIsSaving(false);
    }
  };

  // إضافة useEffect للتحقق من حالة الحفظ عند تحميل الصفحة
  useEffect(() => {
    const checkIfSaved = async () => {
      try {
        const response = await profileService.getProfile();
        if (response.success) {
          const savedWeeks = response.data.user.savedWeeks || [];
          setIsSaved(savedWeeks.some((w: any) => w.week === weekData.id.toString()));
        }
      } catch (error) {
        console.error('Error checking saved status:', error);
      }
    };

    if (weekData) {
      checkIfSaved();
    }
  }, [weekData]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.navbarContainer, { opacity: navbarOpacity }]} />
      <Navbar 
        scrollY={scrollY}
        variant="simple"
        style={styles.navbar}
      />

      <ScrollView
      
        style={styles.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Title and Subtitle */}
        <View style={styles.saveButtonContainer}>
        <TouchableOpacity 
          style={[styles.saveButton, isSaved && styles.savedButton]} 
          onPress={handleSaveWeek}
          disabled={isSaving}
        >
          <MaterialIcons 
            name={isSaved ? "bookmark" : "bookmark-outline"} 
            size={24} 
            color={isSaved ? "#fff" : "#623AA2"} 
          />
          <Text style={[styles.saveButtonText, isSaved && styles.savedButtonText]}>
            {isSaving ? "جاري الحفظ..." : (isSaved ? 'Saved' : 'Save Week')}
          </Text>
        </TouchableOpacity>
      </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{weekData.title}</Text>
          <Text style={styles.subtitle}>{weekData.author}</Text>
        </View>

        {/* Main Image */}
        <View style={styles.imageContainer}>
          <Image
            source={weekData.image}
            style={styles.mainImage}
            resizeMode="contain"
          />
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          {/* Highlights Section */}
          <Text style={styles.sectionTitle}>{weekData.body1Title}</Text>

          {/* Body Sections with Icons */}
          <View style={styles.bodySection}>
            <Image source={weekData.image2} style={styles.icon} resizeMode="contain" />
            <View style={styles.textContainer}>
              <Text style={styles.bodyTitle}>{weekData.body2Title}</Text>
              <Text style={styles.bodyText}>{weekData.body2}</Text>
            </View>
          </View>

          <View style={styles.bodySection}>
            <Image source={weekData.image3} style={styles.icon} resizeMode="contain" />
            <View style={styles.textContainer}>
              <Text style={styles.bodyTitle}>{weekData.body3Title}</Text>
              <Text style={styles.bodyText}>{weekData.body3}</Text>
            </View>
          </View>

          {/* Additional Sections */}
          <View style={styles.bodySection}>
            <View style={styles.textContainer}>
              <Text style={styles.bodyTitle}>{weekData.body4Title1}</Text>
              <Text style={styles.bodyText}>{weekData.body4Body1}</Text>
            </View>
          </View>

          <View style={styles.bodySection}>
            <View style={styles.textContainer}>
              <Text style={styles.bodyTitle}>{weekData.body4Title2}</Text>
              <Text style={styles.bodyText}>{weekData.body4Body2}</Text>
            </View>
          </View>

          <View style={styles.bodySection}>
            <View style={styles.textContainer}>
              <Text style={styles.bodyTitle}>{weekData.body4Title3}</Text>
              <Text style={styles.bodyText}>{weekData.body4Body3}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColors.light.background,
  },
  navbarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: NAVBAR_HEIGHT,
    backgroundColor: 'white',
    zIndex: 1,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    height: NAVBAR_HEIGHT,
  },
  scrollView: {
    flex: 1,
    marginTop: NAVBAR_HEIGHT,
  },
  titleContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#623AA2',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 24,
    paddingHorizontal: 16,
  },
  mainImage: {
    width: 280,
    height: 280,
    marginVertical: 20,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4B0082',
    marginBottom: 20,
    marginTop: 10,
  },
  bodySection: {
    flexDirection: 'row',
    marginBottom: 28,
    alignItems: 'flex-start',
    paddingRight: 8,
  },
  icon: {
    width: 70,
    height: 70,
    marginRight: 16,
    alignSelf: 'center',
  },
  textContainer: {
    flex: 1,
  },
  bodyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4B0082',
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
  saveButtonContainer: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.08,
    right: 16,
    zIndex: 3,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(98, 58, 162, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#623AA2',
  },
  savedButton: {
    backgroundColor: '#623AA2',
    borderColor: '#623AA2',
  },
  saveButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#623AA2',
  },
  savedButtonText: {
    color: '#fff',
  },
});

export default PregnancyPage;
