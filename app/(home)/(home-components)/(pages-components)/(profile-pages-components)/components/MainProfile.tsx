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
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadProfileData = async (force = false) => {
    try {
      if (!force && isRefreshing) return;
      
      setIsLoading(true);
      setIsRefreshing(true);

      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('تنبيه', 'الرجاء تسجيل الدخول للوصول إلى الملف الشخصي',
          [
            { text: 'إلغاء', onPress: () => router.replace('/(home)/home'), style: 'cancel' },
            { text: 'تسجيل الدخول', onPress: () => router.replace('/(auth)/login') }
          ]
        );
        return;
      }

      const response = await profileService.getProfile();
      console.log('Profile Response:', response);

      if (response.success) {
        const { user, healthRecord } = response.data;
        
        // تحديث البيانات المحلية
        await AsyncStorage.setItem('userData', JSON.stringify(user));
        
        setFormData({
          fullName: user.fullName || '',
          age: user.age?.toString() || '',
          pregnancyWeek: user.pregnancyWeek?.toString() || '',
          phone: user.phone || '',
          bloodType: user.bloodType || '',
        });

        if (healthRecord) {
          setCurrentHealth({
            bloodPressure: healthRecord.bloodPressure || '',
            bloodSugar: healthRecord.bloodSugar || '',
            weight: healthRecord.weight || '',
            symptoms: healthRecord.symptoms || '',
          });
        }

        setSavedWeeks(user.savedWeeks || []);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      Alert.alert('خطأ', 'حدث خطأ أثناء تحميل البيانات');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    const initializeProfile = async () => {
      try {
        // التحقق من ProfileSplash أولاً
        const splashShown = await AsyncStorage.getItem('profileSplashShown');
        if (!splashShown) {
          router.replace('/(home)/(home-components)/(pages-components)/(profile-pages-components)/ProfileSplash');
          return;
        }

        // التحقق من التوكن وتحميل البيانات
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          router.replace('/(auth)/login');
          return;
        }

        // تحميل البيانات
        await loadProfileData();
      } catch (error) {
        console.error('Error initializing profile:', error);
      }
    };

    initializeProfile();
  }, []); // تشغيل مرة واحدة فقط عند تحميل المكون

  const handleUpdateProfile = async (newData: FormData) => {
    try {
      setIsLoading(true);
      const response = await profileService.updateProfile(newData);
      
      if (response.success) {
        const { user } = response.data;
        
        // تحديث كل البيانات
        setFormData({
          fullName: user.fullName || '',
          age: user.age?.toString() || '',
          pregnancyWeek: user.pregnancyWeek?.toString() || '',
          phone: user.phone || '',
          bloodType: user.bloodType || '',
        });
        
        // تحديث الأسابيع المحفوظة
        setSavedWeeks(user.savedWeeks || []);
        
        Alert.alert('نجاح', 'تم تحديث البيانات الشخصية بنجاح');
        
        // تحديث البيانات المخزنة محلياً
        await AsyncStorage.setItem('userData', JSON.stringify(user));
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

  const handleDeleteWeek = async (weekId: string) => {
    try {
      await profileService.deleteItem('week', weekId);
      await loadProfileData(true);
    } catch (error) {
      console.error('Error deleting week:', error);
    }
  };

  const handleSaveWeek = async (week: string) => {
    try {
      const response = await profileService.saveItem('week', {
        week,
        date: new Date().toISOString()
      });
      
      if (response.success) {
        const { user } = response.data;
        setSavedWeeks(user.savedWeeks || []);
      }
    } catch (error) {
      console.error('Error saving week:', error);
    }
  };

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
            onWeekChange={(week) => {
              setFormData(prev => ({
                ...prev,
                pregnancyWeek: week
              }));
            }}
            onSaveWeek={async (weekData) => {
              try {
                const response = await profileService.saveItem('week', weekData);
                if (response.success) {
                  // تحديث قائمة الأسابيع المحفوظة مباشرة
                  setSavedWeeks(response.data.user.savedWeeks || []);
                }
              } catch (error) {
                console.error('Error saving week:', error);
                throw error; // إعادة رمي الخطأ ليتم معالجته في PregnancySection
              }
            }}
          />
          
          <HealthSection 
            currentHealth={currentHealth}
            setCurrentHealth={handleUpdateHealth}
            expandedCards={expandedCards}
            setExpandedCards={setExpandedCards}
            expandedSections={expandedSections}
            setExpandedSections={setExpandedSections}
            savedWeeks={savedWeeks}
            onDeleteWeek={handleDeleteWeek}
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