import React, { useState, Dispatch, SetStateAction } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { FontAwesome } from '@expo/vector-icons';
import { HealthData, ExpandedCards, ExpandedSections } from '../types/profile.types';
import MainButton from '@/constants/MainButton';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface HealthSectionProps {
  currentHealth: HealthData;
  setCurrentHealth: (data: HealthData) => void;
  expandedCards: ExpandedCards;
  setExpandedCards: Dispatch<SetStateAction<ExpandedCards>>;
  expandedSections: ExpandedSections;
  setExpandedSections: Dispatch<SetStateAction<ExpandedSections>>;
}

export default function HealthSection({
  currentHealth,
  setCurrentHealth,
  expandedCards,
  setExpandedCards,
  expandedSections,
  setExpandedSections,
}: HealthSectionProps) {
  const [isEditingHealth, setIsEditingHealth] = useState(false);
  const [tempHealthData, setTempHealthData] = useState(currentHealth);

  const commonDiseases = [
    'Diabetes',
    'Heart Disease',
    'Hypertension',
    'Asthma',
    'Cancer',
    'Thyroid Disorders',
    'Mental Health Conditions',
  ];

  const toggleCard = (card: keyof ExpandedCards) => {
    setExpandedCards((prev: ExpandedCards) => ({
      ...prev,
      [card]: !prev[card]
    }));
  };

  const toggleSection = (section: keyof ExpandedSections) => {
    setExpandedSections((prev: ExpandedSections) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleEditHealth = () => {
    setTempHealthData(currentHealth);
    setIsEditingHealth(true);
  };

  const handleSaveHealth = () => {
    setCurrentHealth(tempHealthData);
    setIsEditingHealth(false);
  };

  const handleCancelHealth = () => {
    setTempHealthData(currentHealth);
    setIsEditingHealth(false);
  };

  return (
    <View style={styles.container}>
      {/* Health Predictor Card */}
      <View style={styles.card}>
        <TouchableOpacity 
          style={styles.cardHeader}
          onPress={() => toggleCard('healthPredictor')}
        >
          <ThemedText style={styles.cardTitle}>Health Predictor</ThemedText>
          <FontAwesome 
            name={expandedCards.healthPredictor ? 'chevron-up' : 'chevron-down'} 
            size={16} 
            color="#495057" 
          />
        </TouchableOpacity>

        {expandedCards.healthPredictor && (
          <View style={styles.cardContent}>
            <View style={styles.healthInputs}>
              <TextInput
                style={styles.healthInput}
                placeholder="Blood Pressure (e.g., 120/80)"
                value={isEditingHealth ? tempHealthData.bloodPressure : currentHealth.bloodPressure}
                onChangeText={(text) => isEditingHealth && setTempHealthData(prev => ({...prev, bloodPressure: text}))}
                editable={isEditingHealth}
              />
              <TextInput
                style={styles.healthInput}
                placeholder="Blood Sugar Level (mg/dL)"
                value={isEditingHealth ? tempHealthData.bloodSugar : currentHealth.bloodSugar}
                onChangeText={(text) => isEditingHealth && setTempHealthData(prev => ({...prev, bloodSugar: text}))}
                keyboardType="numeric"
                editable={isEditingHealth}
              />
              <TextInput
                style={styles.healthInput}
                placeholder="Weight (kg)"
                value={isEditingHealth ? tempHealthData.weight : currentHealth.weight}
                onChangeText={(text) => isEditingHealth && setTempHealthData(prev => ({...prev, weight: text}))}
                keyboardType="numeric"
                editable={isEditingHealth}
              />
              <TextInput
                style={[styles.healthInput, styles.symptomsInput]}
                placeholder="Current Symptoms (if any)"
                value={isEditingHealth ? tempHealthData.symptoms : currentHealth.symptoms}
                onChangeText={(text) => isEditingHealth && setTempHealthData(prev => ({...prev, symptoms: text}))}
                multiline
                editable={isEditingHealth}
              />
            </View>

            <View style={styles.buttonContainer}>
              {!isEditingHealth ? (
                <MainButton
                  title="Edit Health Info"
                  onPress={handleEditHealth}
                  backgroundColor="#9370DB"
                />
              ) : (
                <>
                  <MainButton
                    title="Save Changes"
                    onPress={handleSaveHealth}
                    backgroundColor="#F78DA7"
                  />
                  <MainButton
                    title="Cancel"
                    onPress={handleCancelHealth}
                    backgroundColor="#0693E3"
                  />
                </>
              )}
            </View>
          </View>
        )}
      </View>

      {/* Saved Items Section */}
      <View style={styles.card}>
        <ThemedText style={styles.cardTitle}>Saved Items</ThemedText>
        
        {/* Diseases Section */}
        <TouchableOpacity 
          style={styles.sectionHeader} 
          onPress={() => toggleSection('diseases')}
        >
          <ThemedText style={styles.sectionTitle}>Diseases</ThemedText>
          <FontAwesome 
            name={expandedSections.diseases ? 'chevron-up' : 'chevron-down'} 
            size={16} 
            color="#495057" 
          />
        </TouchableOpacity>
        {expandedSections.diseases && (
          <View style={styles.sectionContent}>
            <ThemedText style={styles.emptyText}>No saved diseases</ThemedText>
          </View>
        )}

        {/* Weeks Section */}
        <TouchableOpacity 
          style={styles.sectionHeader} 
          onPress={() => toggleSection('weeks')}
        >
          <ThemedText style={styles.sectionTitle}>Weeks</ThemedText>
          <FontAwesome 
            name={expandedSections.weeks ? 'chevron-up' : 'chevron-down'} 
            size={16} 
            color="#495057" 
          />
        </TouchableOpacity>
        {expandedSections.weeks && (
          <View style={styles.sectionContent}>
            <ThemedText style={styles.emptyText}>No saved weeks</ThemedText>
          </View>
        )}

        {/* Baby Names Section */}
        <TouchableOpacity 
          style={styles.sectionHeader} 
          onPress={() => toggleSection('babyNames')}
        >
          <ThemedText style={styles.sectionTitle}>Baby Names</ThemedText>
          <FontAwesome 
            name={expandedSections.babyNames ? 'chevron-up' : 'chevron-down'} 
            size={16} 
            color="#495057" 
          />
        </TouchableOpacity>
        {expandedSections.babyNames && (
          <View style={styles.sectionContent}>
            <ThemedText style={styles.emptyText}>No saved baby names</ThemedText>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SCREEN_WIDTH * 0.04,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: SCREEN_WIDTH * 0.045,
    fontWeight: 'bold',
    color: '#623AA2',
  },
  cardContent: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    paddingTop: 15,
  },
  healthInputs: {
    gap: 12,
  },
  healthInput: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  symptomsInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 10,
  },
  editButton: {
    backgroundColor: '#9370DB',
    padding: 12,
    borderRadius: 8,
    flex: 0.7,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#F78DA7',
    padding: 12,
    borderRadius: 8,
    flex: 0.55,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#0693E3',
    padding: 12,
    borderRadius: 8,
    flex: 0.35,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#495057',
  },
  sectionContent: {
    padding: 12,
  },
  emptyText: {
    color: '#6c757d',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
