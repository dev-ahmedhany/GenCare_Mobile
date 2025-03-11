import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Dimensions, Platform, Modal, ScrollView, Alert, Text, FlatList } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { HealthData, ExpandedCards, ExpandedSections, SavedDisease } from '../types/profile.types';
import MainButton from '@/constants/MainButton';
import { useRouter } from 'expo-router';
import { NewsList } from '@/data/pregnancyweeks';
import { diseases } from '@/data/diseases';
import { BabyName } from '@/data/babyNames';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
import { getHealthInfo, updateHealthInfo } from '../api/HealthInfo';

interface HealthSectionProps {
  currentHealth: HealthData;
  setCurrentHealth: (data: HealthData) => void;
  expandedCards: ExpandedCards;
  setExpandedCards: Dispatch<SetStateAction<ExpandedCards>>;
  expandedSections: ExpandedSections;
  setExpandedSections: Dispatch<SetStateAction<ExpandedSections>>;
  savedWeeks: Array<{ week: string; date: string }>;
  onDeleteWeek?: (week: string) => void;
  savedDiseases?: SavedDisease[];
  onDeleteDisease?: (id: string) => void;
  savedBabyNames: Array<{
    letter: string;
    names: BabyName[];
  }>;
  onUpdateBabyNames: (names: Array<{
    letter: string;
    names: BabyName[];
  }>) => void;
}

interface ValidationErrors {
  bloodPressure?: string;
  bloodSugar?: string;
  weight?: string;
  symptoms?: string;
}

export default function HealthSection({
  currentHealth,
  expandedCards,
  setExpandedCards,
  expandedSections,
  setExpandedSections,
  savedWeeks,
  onDeleteWeek,
  savedDiseases = [],
  onDeleteDisease,
  savedBabyNames,
  onUpdateBabyNames,
}: HealthSectionProps) {
  const [isEditingHealth, setIsEditingHealth] = useState(false);
  const [tempHealthData, setTempHealthData] = useState<HealthData>(currentHealth);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const commonDiseases = [
    'Diabetes',
    'Heart Disease',
    'Hypertension',
    'Asthma',
    'Cancer',
    'Thyroid Disorders',
    'Mental Health Conditions',
  ];

  useEffect(() => {
    const fetchHealthInfo = async () => {
      try {
        const healthInfo = await getHealthInfo();
        console.log('Fetched health info:', healthInfo);
        setTempHealthData({
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
      }
    };
    fetchHealthInfo();
  }, []);

  useEffect(() => {
    setTempHealthData(currentHealth);
  }, [currentHealth]);

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

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    // التحقق من ضغط الدم
    if (tempHealthData.bloodPressure) {
      const bpPattern = /^\d{2,3}\/\d{2,3}$/;
      if (!bpPattern.test(tempHealthData.bloodPressure)) {
        newErrors.bloodPressure = 'Invalid format. Use format: 120/80';
        isValid = false;
      }
    }

    // التحقق من مستوى السكر في الدم
    if (tempHealthData.bloodSugar) {
      const sugar = Number(tempHealthData.bloodSugar);
      if (isNaN(sugar) || sugar < 50 || sugar > 500) {
        newErrors.bloodSugar = 'Blood sugar must be between 50 and 500 mg/dL';
        isValid = false;
      }
    }

    // التحقق من الوزن
    if (tempHealthData.weight) {
      const weight = Number(tempHealthData.weight);
      if (isNaN(weight) || weight < 30 || weight > 200) {
        newErrors.weight = 'Weight must be between 30 and 200 kg';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

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
                placeholder={`Enter your ${label.toLowerCase()}`}
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

  const handleEditHealthInfo = () => {
    console.log('Current Health Data:', currentHealth);
    setTempHealthData(currentHealth);
    setIsEditingHealth(true);
  };

  const handleSaveHealthInfo = async () => {
    try {
        setIsLoading(true);
        console.log('Saving health info:', tempHealthData);
        const response = await updateHealthInfo({
            ...tempHealthData,
            symptoms: Array.isArray(tempHealthData.symptoms) 
                ? tempHealthData.symptoms.join(', ')
                : tempHealthData.symptoms,
        });
        console.log('Health info updated:', response);
        setIsEditingHealth(false);  
    } catch (error) {
        console.error('Error updating health info:', error);
    } finally {
        setIsLoading(false);
    }
  };
  
  return (
    <View style={[styles.container, { backgroundColor: 'rgba(255,255,255,0.8)' }]}>
      {/* Health Predictor Card */}
      <View style={styles.card}>
        <TouchableOpacity 
          style={styles.cardHeader}
          onPress={() => toggleCard('healthPredictor')}
        >
          <ThemedText style={styles.cardTitle}>Health Information</ThemedText>
          <FontAwesome 
            name={expandedCards.healthPredictor ? 'chevron-up' : 'chevron-down'} 
            size={16} 
            color="#623AA2" 
          />
        </TouchableOpacity>

        {expandedCards.healthPredictor && (
          <View style={styles.cardContent}>
            <View style={styles.healthInfo}>
              <View style={styles.infoField}>
                <ThemedText style={styles.fieldLabel}>Blood Pressure</ThemedText>
                <ThemedText style={styles.fieldValue}>
                  {tempHealthData.bloodPressure ? tempHealthData.bloodPressure.split('/').join('   /   ') : '—'}
                </ThemedText>
              </View>
              <View style={styles.infoField}>
                <ThemedText style={styles.fieldLabel}>Blood Sugar (mg/dL)</ThemedText>
                <ThemedText style={styles.fieldValue}>
                  {tempHealthData.bloodSugar || '—'}
                </ThemedText>
              </View>
              <View style={styles.infoField}>
                <ThemedText style={styles.fieldLabel}>Weight (kg)</ThemedText>
                <ThemedText style={styles.fieldValue}>
                  {tempHealthData.weight || '—'}
                </ThemedText>
              </View>
              <View style={styles.infoField}>
                <ThemedText style={styles.fieldLabel}>Symptoms</ThemedText>
                <View style={styles.symptomsList}>
                  {Array.isArray(tempHealthData.symptoms) ? (
                    tempHealthData.symptoms.map((symptom: string, index: number) => (
                      <ThemedText key={index} style={styles.fieldValue}>
                        {symptom || '—'}
                      </ThemedText>
                    ))
                  ) : (
                    <ThemedText style={styles.fieldValue}>—</ThemedText>
                  )}
                </View>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <MainButton
                title="Edit Health Info"
                onPress={handleEditHealthInfo}
                backgroundColor="#623AA2"
              />
            </View>
          </View>
        )}
      </View>

      {/* Edit Modal */}
      <Modal
        visible={isEditingHealth}
        transparent
        animationType="fade"
        onRequestClose={() => setIsEditingHealth(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <ThemedText style={styles.modalTitle}>Edit Health Information</ThemedText>
              <TouchableOpacity 
                onPress={() => {
                  setIsEditingHealth(false);
                  setTempHealthData(currentHealth);
                  setErrors({});
                }}
              >
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
                onPress={ handleSaveHealthInfo }
              />
              <MainButton 
                title="Cancel"
                onPress={() => {
                    setIsEditingHealth(false);
                    setTempHealthData(currentHealth);
                    setErrors({});
                }}
                backgroundColor="#9CA3AF"
              />
            </View>
          </View>
        </View>
      </Modal>

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
            {savedDiseases && savedDiseases.length > 0 ? (
              savedDiseases.map((disease) => (
                <View 
                  key={`disease-${disease._id}`} 
                  style={styles.savedItem}
                >
                  <View>
                    <ThemedText style={styles.diseaseName}>
                      {disease.name}
                    </ThemedText>
                    <ThemedText style={styles.dateText}>
                      {disease.date ? new Date(disease.date).toLocaleDateString() : 'No date'}
                    </ThemedText>
                  </View>
                  <View style={styles.itemActions}>
                    <TouchableOpacity
                      onPress={() => {
                        const diseaseInfo = diseases.find(d => d.name === disease.name);
                        if (diseaseInfo) {
                          router.push({
                            pathname: '/(home)/(home-components)/(pages-components)/(diseases-pages-components)/diseases-page-components',
                            params: { diseaseId: diseaseInfo.id }
                          });
                        }
                      }}
                      style={styles.actionButton}
                    >
                      <FontAwesome 
                        name="eye" 
                        size={20} 
                        color="#623AA2"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>(disease._id)}
                      style={styles.actionButton}
                    >
                      <FontAwesome 
                        name="trash-o" 
                        size={20} 
                        color="#FF4444"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <ThemedText style={styles.emptyText}>no saved diseases</ThemedText>
            )}
          </View>
        )}

        {/* Weeks Section */}
        <TouchableOpacity 
          style={styles.sectionHeader} 
          onPress={() => toggleSection('weeks')}
        >
          <ThemedText style={styles.sectionTitle}>Saved Weeks</ThemedText>
          <FontAwesome 
            name={expandedSections.weeks ? 'chevron-up' : 'chevron-down'} 
            size={16} 
            color="#495057" 
          />
        </TouchableOpacity>
        {expandedSections.weeks && (
          <View style={styles.sectionContent}>
            {savedWeeks && savedWeeks.length > 0 ? (
              savedWeeks.map((item, index) => {
                const weekInfo = NewsList.find(w => w.id.toString() === item.week);
                return (
                  <View key={index} style={styles.savedItem}>
                    <ThemedText>Week {item.week}</ThemedText>
                    <View style={styles.itemActions}>
                      <TouchableOpacity
                        onPress={() => router.push({
                          pathname: '/(home)/(home-components)/(pages-components)/pregnancyPage',
                          params: { news: JSON.stringify(weekInfo) }
                        })}
                        style={styles.actionButton}
                      >
                        <FontAwesome name="eye" size={20} color="#623AA2" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => ( 1 )}
                        style={styles.actionButton}
                      >
                        <FontAwesome name="trash-o" size={20} color="#FF4444" />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })
            ) : (
              <ThemedText style={styles.emptyText}>No saved weeks</ThemedText>
            )}
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
            {savedBabyNames.length > 0 ? (
              <View>
                {savedBabyNames.map((group) => (
                  <View key={group.letter} style={styles.letterGroup}>
                    <View style={styles.letterHeaderContainer}>
                      <Text style={styles.letterHeader}>{group.letter}</Text>
                      <View style={styles.letterActions}>
                        <TouchableOpacity
                          onPress={() => router.push({
                            pathname: '/(home)/(home-components)/(pages-components)/BabyNames',
                            params: { selectedLetter: group.letter }
                          })}
                          style={styles.actionButton}
                        >
                          <FontAwesome name="eye" size={20} color="#623AA2" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => ( 1 )}
                          style={styles.actionButton}
                        >
                          <FontAwesome name="trash-o" size={20} color="#FF4444" />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={styles.namesContainer}>
                      {group.names.map((name) => (
                        <View key={name.name} style={styles.nameItem}>
                          <View style={styles.nameContent}>
                            <Ionicons 
                              name={name.gender === 'M' ? 'male' : 'female'} 
                              size={16} 
                              color={name.gender === 'M' ? '#95cae4' : '#ffb9cc'} 
                            />
                            <Text style={[
                              styles.nameText,
                              { color: name.gender === 'M' ? '#95cae4' : '#ffb9cc' }
                            ]}>
                              {name.name}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <ThemedText style={styles.emptyText}>no saved names</ThemedText>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SCREEN_WIDTH * 0.04,
    backgroundColor: 'rgba(255,255,255,0.8)',
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
  healthInfo: {
    gap: 12,
  },
  infoField: {
    marginBottom: 15,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  editFieldContainer: {
    marginBottom: 20,
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: Platform.OS === 'ios' ? 12 : 8,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
    minHeight: 50,
  },
  symptomsInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: SCREEN_WIDTH * 0.9,
    maxHeight: SCREEN_HEIGHT * 0.85,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#623AA2',
  },
  modalScrollContent: {
    flexGrow: 0,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
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
  inputError: {
    borderColor: '#EF4444',
    borderWidth: 1.5,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  buttonContainer: {
    marginTop: 5,
    width: '100%',
    alignItems: 'center',
  },
  bloodPressureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  bpFieldContainer: {
    flex: 1,
  },
  bpLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  bpInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: Platform.OS === 'ios' ? 12 : 8,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
    minHeight: 50,
    textAlign: 'center',
  },
  bpSeparator: {
    fontSize: 24,
    color: '#6B7280',
    marginTop: 20,
  },
  savedItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  dateText: {
    color: '#6c757d',
    fontStyle: 'italic',
  },
  deleteButton: {
    padding: 5,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actionButton: {
    padding: 5,
  },
  debugText: {
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
    marginTop: 5,
  },
  diseaseName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  letterGroup: {
    marginBottom: 20,
  },
  letterHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  letterActions: {
    flexDirection: 'row',
    gap: 10,
  },
  letterHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#623AA2',
  },
  namesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  nameItem: {
    backgroundColor: 'rgba(98, 58, 162, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  nameContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  nameText: {
    fontSize: 14,
    fontWeight: '500',
  },
  listContainer: {
    paddingVertical: 10,
  },
  symptomsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});
