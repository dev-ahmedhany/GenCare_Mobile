import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, StyleSheet, Animated, Dimensions, View, NativeSyntheticEvent, NativeScrollEvent, ActivityIndicator, Alert } from 'react-native';
import { bgColors } from '@/constants/Colors';
import ProfileInfo from './ProfileInfo';
import PregnancySection from './PregnancySection';
import HealthSection from './HealthSection';
import { FormData, HealthData, ExpandedSections, ExpandedCards } from '../types/profile.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import Navbar from '../../../(navbar)/navbar';
import { profileService } from '../services/api';



export default function MainProfile() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    age: '',
    pregnancyWeek: '',
    phone: '',
    bloodType: '',
  });

  const [currentHealth, setCurrentHealth] = useState<HealthData>({
    bloodPressure: '',
    bloodSugar: '',
    weight: '',
    symptoms: '',
  });

  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    diseases: false,
    weeks: false,
    babyNames: false,
  });

  const [expandedCards, setExpandedCards] = useState<ExpandedCards>({
    healthPredictor: false,
    savedDiseases: false,
    savedItems: false,
  });

  const [savedWeeks, setSavedWeeks] = useState<Array<{ week: string; date: string }>>([]);

  const router = useRouter();

  const scrollY = new Animated.Value(0);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      const userDataStr = await AsyncStorage.getItem('userData');

      if (!token || !userDataStr) {
        Alert.alert(
          'تنبيه',
          'الرجاء تسجيل الدخول للوصول إلى الملف الشخصي',
          [
            {
              text: 'إلغاء',
              onPress: () => router.replace('/(home)/home'),
              style: 'cancel'
            },
            {
              text: 'تسجيل الدخول',
              onPress: () => router.replace('/(auth)/login')
            }
          ]
        );
        return;
      }

      // جلب البيانات من السيرفر
      const response = await profileService.getProfile();
      console.log('Profile response:', response); // للتأكد من البيانات

      if (response.success) {
        const { user, healthRecord } = response.data;
        
        // تحديث البيانات الشخصية
        setFormData({
          fullName: user.fullName || '',
          age: user.age?.toString() || '',
          pregnancyWeek: user.pregnancyWeek?.toString() || '',
          phone: user.phone || '',
          bloodType: user.bloodType || '',
        });

        // تحديث البيانات الصحية
        if (healthRecord) {
          setCurrentHealth({
            bloodPressure: healthRecord.bloodPressure || '',
            bloodSugar: healthRecord.bloodSugar || '',
            weight: healthRecord.weight || '',
            symptoms: healthRecord.symptoms || '',
          });
        }

        // تحديث البيانات المحفوظة
        setSavedWeeks(user.savedWeeks || []);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      Alert.alert('خطأ', 'حدث خطأ أثناء تحميل البيانات');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (newData: FormData) => {
    try {
      setIsLoading(true);
      const response = await profileService.updateProfile(newData);
      
      if (response.success) {
        setFormData(newData);
        Alert.alert('نجاح', 'تم تحديث البيانات الشخصية بنجاح');
        
        // تحديث البيانات المخزنة محلياً
        const userDataStr = await AsyncStorage.getItem('userData');
        if (userDataStr) {
          const userData = JSON.parse(userDataStr);
          const updatedUserData = {
            ...userData,
            ...newData
          };
          await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
        }
      } else {
        throw new Error(response.message || 'فشل تحديث البيانات');
      }
    } catch (error) {
      console.error('Update profile error:', error);
      Alert.alert('خطأ', 'حدث خطأ أثناء تحديث البيانات');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateHealth = async (newData: HealthData) => {
    try {
      await profileService.updateHealth(newData);
      setCurrentHealth(newData);
      Alert.alert('نجاح', 'تم تحديث البيانات الصحية بنجاح');
    } catch (error) {
      Alert.alert('خطأ', 'حدث خطأ أثناء تحديث البيانات الصحية');
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    scrollY.setValue(offsetY);
  };

  useEffect(() => {
    const checkProfileSplash = async () => {
      try {
        const splashShown = await AsyncStorage.getItem('profileSplashShown');
        if (!splashShown) {
          router.replace('/(home)/(home-components)/(pages-components)/(profile-pages-components)/ProfileSplash');
        }
      } catch (error) {
        console.error('Error checking profile splash:', error);
      }
    };

    checkProfileSplash();
  }, []);

  // تحديث useEffect
  useEffect(() => {
    const initProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          router.replace('/(auth)/login');
          return;
        }
        await loadProfileData();
      } catch (error) {
        console.error('Error initializing profile:', error);
      }
    };

    initProfile();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Navbar scrollY={scrollY} showProfile={false} />
      {isLoading ? (
        <ActivityIndicator size="large" color="#623AA2" style={styles.loader} />
      ) : (
        <ScrollView 
          style={styles.container}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <ProfileInfo 
            formData={formData}
            setFormData={handleUpdateProfile}
          />
          
          <PregnancySection 
            pregnancyWeek={formData.pregnancyWeek}
          />
          
          <HealthSection 
            currentHealth={currentHealth}
            setCurrentHealth={handleUpdateHealth}
            expandedCards={expandedCards}
            setExpandedCards={setExpandedCards}
            expandedSections={expandedSections}
            setExpandedSections={setExpandedSections}
            savedWeeks={savedWeeks}
          />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: bgColors.light.background,
  },
  container: {
    marginTop: Dimensions.get('window').height * 0.15,
    flex: 1,
    backgroundColor: bgColors.light.background,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});