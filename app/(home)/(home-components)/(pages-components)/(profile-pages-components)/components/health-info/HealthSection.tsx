import React, { useState } from 'react';
import { View } from 'react-native';
import { HealthData } from '../../types/profile.types';
import  styles  from './HealthSectionStyles';
import { ValidationErrors, HealthSectionProps } from './infoTypes';
import { validateHealthForm } from './utils/validation';
import { HealthInfoCard } from './components/HealthInfoCard';
import { EditHealthModal } from './components/EditHealthModal';

function HealthSection({
  currentHealth,
  setCurrentHealth,
  expandedCards,
  setExpandedCards,
}: HealthSectionProps) {
  const [isEditingHealth, setIsEditingHealth] = useState(false);
  const [tempHealthData, setTempHealthData] = useState<HealthData>(currentHealth);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const toggleCard = (card: keyof typeof expandedCards) => {
    setExpandedCards(prev => ({
      ...prev,
      [card]: !prev[card as keyof typeof expandedCards]
    }));
  };

  const handleEditHealthInfo = () => {
    setTempHealthData(currentHealth);
    setIsEditingHealth(true);
  };

  const handleSaveHealthInfo = async () => {
    const { isValid, errors: validationErrors } = validateHealthForm(tempHealthData);
    setErrors(validationErrors);
    
    if (isValid) {
      setIsLoading(true);
      try {
        // تحديث البيانات محليًا فقط
        setCurrentHealth(tempHealthData);
        setIsEditingHealth(false);
      } catch (error) {
        console.error('Error updating health info:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const closeModal = () => {
    setIsEditingHealth(false);
    setErrors({});
  };

  return (
    <View style={styles.container}>
      <HealthInfoCard
        expandedCards={expandedCards}
        toggleCard={toggleCard}
        tempHealthData={tempHealthData}
        handleEditHealthInfo={handleEditHealthInfo}
      />

      <EditHealthModal
        isEditingHealth={isEditingHealth}
        isLoading={isLoading}
        tempHealthData={tempHealthData}
        errors={errors}
        setTempHealthData={setTempHealthData}
        handleSaveHealthInfo={handleSaveHealthInfo}
        closeModal={closeModal}
      />
    </View>
  );
}

export default HealthSection;
