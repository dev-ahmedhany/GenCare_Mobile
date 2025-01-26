import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Animated, Dimensions } from 'react-native';
import { bgColors } from '@/constants/Colors';
import ProfileInfo from './ProfileInfo';
import PregnancySection from './PregnancySection';
import HealthSection from './HealthSection';
import { FormData, HealthData, ExpandedSections, ExpandedCards } from '../types/profile.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function MainProfile() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    address: '',
    age: '',
    pregnancyWeek: '',
    phone: '',
    email: '',
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

  const router = useRouter();

  useEffect(() => {
    const checkSplashScreen = async () => {
      try {
        const hasSeenSplash = await AsyncStorage.getItem('profileSplashShown');
        if (!hasSeenSplash) {
          router.replace('/(home)/(home-components)/(pages-components)/(profile-pages-components)/ProfileSplash');
        }
      } catch (error) {
        console.warn('Error checking splash state:', error);
      }
    };

    checkSplashScreen();
  }, [router]);

  return (
    <ScrollView style={styles.container}>
      <ProfileInfo 
        formData={formData}
        setFormData={setFormData}
      />
      
      <PregnancySection 
        pregnancyWeek={formData.pregnancyWeek}
      />
      
      <HealthSection 
        currentHealth={currentHealth}
        setCurrentHealth={setCurrentHealth}
        expandedCards={expandedCards}
        setExpandedCards={setExpandedCards}
        expandedSections={expandedSections}
        setExpandedSections={setExpandedSections}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColors.light.background,
  },
});