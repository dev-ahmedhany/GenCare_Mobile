import React from 'react';
import { View, Modal, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import MainButton from '@/constants/MainButton';
import { HealthData } from '../../../types/profile.types';
import { ValidationErrors } from '../infoTypes';
import  styles  from '../HealthSectionStyles';

interface EditHealthModalProps {
  isEditingHealth: boolean;
  isLoading: boolean;
  tempHealthData: HealthData;
  errors: ValidationErrors;
  setTempHealthData: (data: HealthData | ((prev: HealthData) => HealthData)) => void;
  handleSaveHealthInfo: () => Promise<void>;
  closeModal: () => void;
}

export const EditHealthModal: React.FC<EditHealthModalProps> = ({
  isEditingHealth,
  isLoading,
  tempHealthData,
  errors,
  setTempHealthData,
  handleSaveHealthInfo,
  closeModal
}) => {
  const renderEditField = (label: string, value: string, field: keyof HealthData) => {
    return (
      <View style={styles.editFieldContainer}>
        <ThemedText style={styles.fieldLabel}>{label}</ThemedText>
        <TextInput
          style={[
            styles.editInput,
            errors[field] && styles.inputError,
          ]}
          value={value}
          onChangeText={(text) => setTempHealthData(prev => ({...prev, [field]: text}))}
          placeholder={`Enter ${label}`}
          placeholderTextColor="#9CA3AF"
          keyboardType={field === 'bloodSugar' || field === 'weight' ? 'numeric' : 'default'}
          multiline={field === 'symptoms'}
        />
        {errors[field] && (
          <ThemedText style={styles.errorText}>{errors[field]}</ThemedText>
        )}
      </View>
    );
  };

  return (
    <Modal
      visible={isEditingHealth}
      transparent
      animationType="fade"
      onRequestClose={closeModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <ThemedText style={styles.modalTitle}>Edit Health Information</ThemedText>
            <TouchableOpacity onPress={closeModal}>
              <Ionicons name="close" size={24} color="#623AA2" />
            </TouchableOpacity>
          </View>

          <ScrollView 
            style={styles.modalScrollContent}
            showsVerticalScrollIndicator={false}
          >
            {renderEditField('Blood Pressure', tempHealthData.bloodPressure, 'bloodPressure')}
            {renderEditField('Blood Sugar (mg/dL)', tempHealthData.bloodSugar, 'bloodSugar')}
            {renderEditField('Weight (kg)', tempHealthData.weight, 'weight')}
            {renderEditField('Symptoms', tempHealthData.symptoms, 'symptoms')}
          </ScrollView>

          <View style={styles.modalButtons}>
            <MainButton 
              title={isLoading ? "Saving..." : "Save"}
              backgroundColor="#623AA2"
              onPress={handleSaveHealthInfo}
            />
            <MainButton 
              title="Cancel"
              onPress={closeModal}
              backgroundColor="#9CA3AF"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditHealthModal; 