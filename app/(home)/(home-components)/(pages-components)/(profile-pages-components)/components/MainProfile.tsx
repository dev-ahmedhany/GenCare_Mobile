import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, StyleSheet, Animated, Dimensions, View, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { bgColors } from '@/constants/Colors';
import ProfileInfo from './ProfileInfo';
import PregnancySection from './PregnancySection';
import HealthSection from './HealthSection';
import { FormData, HealthData, ExpandedSections, ExpandedCards } from '../types/profile.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import Navbar from '../../../(navbar)/navbar';



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

  const router = useRouter();

  const scrollY = new Animated.Value(0);

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

  return (
    <View style={styles.mainContainer}>
      <Navbar 
        scrollY={scrollY} 
        showProfile={false}
      />
      <ScrollView 
        style={styles.container}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
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
});