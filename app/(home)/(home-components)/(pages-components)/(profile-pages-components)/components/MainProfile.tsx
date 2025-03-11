import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Animated, Dimensions, View, NativeSyntheticEvent, NativeScrollEvent, ActivityIndicator, Alert } from 'react-native';
import { bgColors } from '@/constants/Colors';
import ProfileInfo from './ProfileInfo';
import PregnancySection from './PregnancySection';
import HealthSection from './HealthSection';
import { HealthData, ExpandedSections, ExpandedCards, ProfileFormData } from '../types/profile.types';
import Navbar from '../../../(navbar)/navbar';
import { BabyName } from '@/data/babyNames';
import { getHealthInfo } from '../api/HealthInfo';

interface HealthSectionProps {
  currentHealth: HealthData;
  setCurrentHealth: (newData: HealthData) => void;
  expandedCards: ExpandedCards;
  setExpandedCards: (newCards: ExpandedCards) => void;
  expandedSections: ExpandedSections;
  setExpandedSections: (newSections: ExpandedSections) => void;
  savedWeeks: Array<{ week: string; date: string }>;
  onDeleteWeek: (weekId: string) => void;
  savedDiseases: Array<string>;
  onDeleteDisease: (id: string) => void;
  savedBabyNames?: Array<{
    letter: string;
    names: BabyName[];
  }>;
  onUpdateBabyNames: (names: Array<{
    letter: string;
    names: BabyName[];
  }>) => void;
}

export default function MainProfile() {
  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: '',
    age: '',
    phone: '',
    bloodType: '',
    pregnancyWeek: '',
    avatar: 'default.png',
  });
  const [currentHealth, setCurrentHealth] = useState<HealthData>({
    bloodPressure: '',
    bloodSugar: '',
    weight: '',
    symptoms: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHealthInfo = async () => {
        try {
            const healthInfo = await getHealthInfo();
            console.log('Fetched health info:', healthInfo);
            setCurrentHealth({
                bloodPressure: Array.isArray(healthInfo.healthInfo.bloodPressure) 
                    ? healthInfo.healthInfo.bloodPressure.join('/')
                    : healthInfo.healthInfo.bloodPressure || '',
                bloodSugar: healthInfo.healthInfo.bloodSugar || '',
                weight: healthInfo.healthInfo.weight || '',
                symptoms: Array.isArray(healthInfo.healthInfo.symptoms) 
                    ? healthInfo.healthInfo.symptoms 
                    : healthInfo.healthInfo.symptoms ? [healthInfo.healthInfo.symptoms] : [],
            });
        } catch (error) {
            console.error('Error fetching health info:', error);
        } finally {
            setIsLoading(false);
        }
    };

    fetchHealthInfo();
  }, []);

  const scrollY = new Animated.Value(0);

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

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    scrollY.setValue(offsetY);
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
            setFormData={setFormData}
            avatar={formData.avatar}
          />
          
          <PregnancySection 
            pregnancyWeek={formData.pregnancyWeek}
            onWeekChange={(week) => {
              setFormData(prev => ({
                ...prev,
                pregnancyWeek: week
              }));
            }}
          />
          
          <HealthSection
            currentHealth={currentHealth} 
            setCurrentHealth={setCurrentHealth}
            expandedCards={expandedCards}
            setExpandedCards={setExpandedCards}
            expandedSections={expandedSections}
            setExpandedSections={setExpandedSections}
            savedWeeks={[]}
            onDeleteWeek={() => {}}
            savedDiseases={[]}
            onDeleteDisease={() => {}}
            savedBabyNames={[]}
            onUpdateBabyNames={() => {}}
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