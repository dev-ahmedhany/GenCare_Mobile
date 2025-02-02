import React, { useState } from 'react';
import { ScrollView, StyleSheet, Animated, Dimensions } from 'react-native';
import { bgColors } from '@/constants/Colors';
import ProfileInfo from './components/ProfileInfo';
import PregnancySection from './components/PregnancySection';
import HealthSection from './components/HealthSection';
import { FormData, HealthData, ExpandedSections, ExpandedCards } from './types/profile.types';


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
    paddingTop: 70,
    flex: 1,
    backgroundColor: bgColors.light.background,
  },
});