import React, { useState } from 'react';
import { View, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { FontAwesome5, Ionicons, FontAwesome } from '@expo/vector-icons';
import { NewsList } from "../../../data/pregnancyweeks";

export default function Profile() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    age: '',
    pregnancyWeek: '',
    phone: '',
    email: '',
  });
  const [tempFormData, setTempFormData] = useState({...formData});
  const [emailError, setEmailError] = useState('');
  const [showUpdateMessage, setShowUpdateMessage] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const [expandedSections, setExpandedSections] = useState({
    diseases: false,
    weeks: false,
    babyNames: false,
  });
  const [expandedCards, setExpandedCards] = useState({
    healthPredictor: false,
    savedDiseases: false,
    savedItems: false,
  });
  const [selectedDiseases, setSelectedDiseases] = useState<string[]>([]);
  const [currentHealth, setCurrentHealth] = useState({
    bloodPressure: '',
    bloodSugar: '',
    weight: '',
    symptoms: '',
  });
  const [riskLevel, setRiskLevel] = useState('');
  const [savedDiseases, setSavedDiseases] = useState([
    {
      name: 'Gestational Diabetes',
      risk: 'High',
      symptoms: [
        'Increased thirst',
        'Frequent urination',
        'Fatigue'
      ],
      nextCheckup: '2024-04-15'
    },
    {
      name: 'Hypertension',
      risk: 'Moderate',
      symptoms: [
        'Headaches',
        'Vision problems',
        'Swelling'
      ],
      nextCheckup: '2024-04-10'
    }
  ]);

  const commonDiseases = [
    'Diabetes',
    'Heart Disease',
    'Hypertension',
    'Asthma',
    'Cancer',
    'Thyroid Disorders',
    'Mental Health Conditions',
  ];

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEdit = () => {
    setTempFormData({...formData});
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTempFormData({...formData});
    setIsEditing(false);
    setEmailError('');
  };

  const showMessage = () => {
    setShowUpdateMessage(true);
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowUpdateMessage(false);
    });
  };

  const handleSave = () => {
    if (tempFormData.email && !validateEmail(tempFormData.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setFormData({...tempFormData});
    setIsEditing(false);
    setEmailError('');
    showMessage();
  };

  const handlePregnancyWeekChange = (text: string) => {
    const week = Math.min(Math.max(parseInt(text) || 0, 0), 40);
    setTempFormData({ ...tempFormData, pregnancyWeek: week.toString() });
  };

  const getCurrentWeekInfo = () => {
    const weekNumber = parseInt(formData.pregnancyWeek) || 0;
    return NewsList.find(item => item.id === weekNumber);
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleCard = (card: keyof typeof expandedCards) => {
    setExpandedCards(prev => ({
      ...prev,
      [card]: !prev[card]
    }));
  };

  const toggleDisease = (disease: string) => {
    setSelectedDiseases(prev => 
      prev.includes(disease) 
        ? prev.filter(d => d !== disease)
        : [...prev, disease]
    );
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return '#4CAF50';
      case 'moderate': return '#FFA726';
      case 'high': return '#f44336';
      case 'severe': return '#B71C1C';
      default: return '#757575';
    }
  };

  const analyzeRisk = () => {
    // Add your risk analysis logic here
    // For now, just a placeholder that sets a random risk level
    const risks = ['Low', 'Moderate', 'High', 'Severe'];
    setRiskLevel(risks[Math.floor(Math.random() * risks.length)]);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with Back Button and Title */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.push('/(home)/home')}
        >
          <Ionicons name="arrow-back" size={24} color="#623AA2" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Profile</ThemedText>
      </View>

      {showUpdateMessage && (
        <Animated.View style={[styles.updateMessage, { opacity: fadeAnim }]}>
          <ThemedText style={styles.updateMessageText}>Profile has been updated</ThemedText>
        </Animated.View>
      )}

      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('@/assets/home_swiper/swiper_card3.jpeg')}
            style={styles.profileImage}
          />
        </View>

        <View style={styles.profileCard}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={isEditing ? tempFormData.fullName : formData.fullName}
              onChangeText={(text) => setTempFormData({...tempFormData, fullName: text})}
              editable={isEditing}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={isEditing ? tempFormData.address : formData.address}
              onChangeText={(text) => setTempFormData({...tempFormData, address: text})}
              editable={isEditing}
            />
            <TextInput
              style={styles.input}
              placeholder="Age"
              keyboardType="numeric"
              value={isEditing ? tempFormData.age : formData.age}
              onChangeText={(text) => setTempFormData({...tempFormData, age: text})}
              editable={isEditing}
            />
            <TextInput
              style={styles.input}
              placeholder="Pregnancy Week"
              keyboardType="numeric"
              value={isEditing ? tempFormData.pregnancyWeek : formData.pregnancyWeek}
              onChangeText={handlePregnancyWeekChange}
              maxLength={2}
              editable={isEditing}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={isEditing ? tempFormData.phone : formData.phone}
              onChangeText={(text) => setTempFormData({...tempFormData, phone: text})}
              editable={isEditing}
            />
            <TextInput
              style={[styles.input, emailError ? styles.inputError : null]}
              placeholder="Email"
              keyboardType="email-address"
              value={isEditing ? tempFormData.email : formData.email}
              onChangeText={(text) => setTempFormData({...tempFormData, email: text})}
              editable={isEditing}
            />
            {emailError ? <ThemedText style={styles.errorText}>{emailError}</ThemedText> : null}

            <View style={styles.buttonContainer}>
              {!isEditing ? (
                <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                  <ThemedText style={styles.buttonText}>Edit Profile</ThemedText>
                </TouchableOpacity>
              ) : (
                <>
                  <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <ThemedText style={styles.buttonText}>Save Changes</ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                    <ThemedText style={styles.buttonText}>Cancel</ThemedText>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </View>

        <View style={styles.trackerCard}>
          <ThemedText style={styles.cardTitle}>Pregnancy Tracker</ThemedText>
          <View style={styles.progressContainer}>
            <LinearGradient
              colors={['#E6E6FA', '#9370DB']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.progressBar,
                {
                  width: `${(parseInt(formData.pregnancyWeek) || 0) * 2.5}%`,
                  borderRadius: 10,
                }
              ]}
            />
          </View>
          <ThemedText style={styles.weekText}>
            Week {formData.pregnancyWeek || 0}/40
          </ThemedText>

          {/* Week Development Section */}
          {formData.pregnancyWeek && getCurrentWeekInfo() && (
            <View style={styles.developmentCard}>
              <ThemedText style={styles.developmentTitle}>
                Week {formData.pregnancyWeek}'s Development
              </ThemedText>
              <View style={styles.measurementsContainer}>
                <View style={styles.measurementItem}>
                  <View style={styles.measurementHeader}>
                    <FontAwesome5 name="ruler-horizontal" size={24} color="#9370DB" />
                    <ThemedText style={styles.measurementLabel}>Size</ThemedText>
                  </View>
                  <ThemedText style={styles.measurementValue}>
                    {getCurrentWeekInfo()?.author.split(' ').pop()?.toUpperCase() || 'N/A'}
                  </ThemedText>
                </View>
                <View style={styles.divider} />
                <View style={styles.measurementItem}>
                  <View style={styles.measurementHeader}>
                    <Ionicons name="scale-outline" size={24} color="#9370DB" />
                    <ThemedText style={styles.measurementLabel}>Weight</ThemedText>
                  </View>
                  <ThemedText style={styles.measurementValue}>
                    {getCurrentWeekInfo()?.weight || 'N/A'}
                  </ThemedText>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Health Predictor Card */}
        <View style={styles.infoCard}>
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
              <View style={styles.assessmentSection}>
                <ThemedText style={styles.sectionTitle}>Health Risk Assessment</ThemedText>
                
                <View style={styles.familyHistorySection}>
                  <ThemedText style={styles.subsectionTitle}>Family Medical History</ThemedText>
                  <View style={styles.diseasesList}>
                    {commonDiseases.map((disease) => (
                      <TouchableOpacity
                        key={disease}
                        style={[
                          styles.diseaseCheckbox,
                          selectedDiseases.includes(disease) && styles.diseaseCheckboxSelected
                        ]}
                        onPress={() => toggleDisease(disease)}
                      >
                        <ThemedText style={[
                          styles.diseaseCheckboxText,
                          selectedDiseases.includes(disease) && styles.diseaseCheckboxTextSelected
                        ]}>
                          {disease}
                        </ThemedText>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <View style={styles.selectedDiseasesContainer}>
                    {selectedDiseases.map((disease) => (
                      <View key={disease} style={styles.selectedDiseaseTag}>
                        <ThemedText style={styles.selectedDiseaseText}>{disease}</ThemedText>
                        <TouchableOpacity onPress={() => toggleDisease(disease)}>
                          <FontAwesome name="times" size={12} color="#fff" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>

                  <View style={styles.currentHealthSection}>
                    <ThemedText style={styles.subsectionTitle}>Current Health Condition</ThemedText>
                    <View style={styles.healthInputs}>
                      <TextInput
                        style={styles.healthInput}
                        placeholder="Blood Pressure (e.g., 120/80)"
                        value={currentHealth.bloodPressure}
                        onChangeText={(text) => setCurrentHealth(prev => ({...prev, bloodPressure: text}))}
                      />
                      <TextInput
                        style={styles.healthInput}
                        placeholder="Blood Sugar Level (mg/dL)"
                        value={currentHealth.bloodSugar}
                        onChangeText={(text) => setCurrentHealth(prev => ({...prev, bloodSugar: text}))}
                        keyboardType="numeric"
                      />
                      <TextInput
                        style={styles.healthInput}
                        placeholder="Weight (kg)"
                        value={currentHealth.weight}
                        onChangeText={(text) => setCurrentHealth(prev => ({...prev, weight: text}))}
                        keyboardType="numeric"
                      />
                      <TextInput
                        style={[styles.healthInput, styles.symptomsInput]}
                        placeholder="Current Symptoms (if any)"
                        value={currentHealth.symptoms}
                        onChangeText={(text) => setCurrentHealth(prev => ({...prev, symptoms: text}))}
                        multiline
                      />
                    </View>

                    <TouchableOpacity style={styles.analyzeButton} onPress={analyzeRisk}>
                      <ThemedText style={styles.analyzeButtonText}>Analyze Risk</ThemedText>
                    </TouchableOpacity>

                    {riskLevel && (
                      <View style={[styles.riskIndicator, { backgroundColor: getRiskColor(riskLevel) }]}>
                        <ThemedText style={styles.riskText}>{riskLevel} Risk</ThemedText>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Saved Diseases Card */}
        <View style={styles.infoCard}>
          <TouchableOpacity 
            style={styles.cardHeader}
            onPress={() => toggleCard('savedDiseases')}
          >
            <ThemedText style={styles.cardTitle}>Saved Diseases</ThemedText>
            <FontAwesome 
              name={expandedCards.savedDiseases ? 'chevron-up' : 'chevron-down'} 
              size={16} 
              color="#495057" 
            />
          </TouchableOpacity>

          {expandedCards.savedDiseases && (
            <View style={styles.cardContent}>
              {savedDiseases.map((disease, index) => (
                <View key={index} style={styles.diseaseCard}>
                  <View style={styles.diseaseHeader}>
                    <ThemedText style={styles.diseaseName}>{disease.name}</ThemedText>
                    <View style={[styles.riskBadge, { backgroundColor: getRiskColor(disease.risk) }]}>
                      <ThemedText style={styles.riskBadgeText}>{disease.risk}</ThemedText>
                    </View>
                  </View>

                  <View style={styles.symptomsContainer}>
                    <ThemedText style={styles.symptomsTitle}>Symptoms to Watch:</ThemedText>
                    {disease.symptoms.map((symptom, idx) => (
                      <View key={idx} style={styles.symptomItem}>
                        <ThemedText style={styles.bulletPoint}>•</ThemedText>
                        <ThemedText style={styles.symptomText}>{symptom}</ThemedText>
                      </View>
                    ))}
                  </View>

                  <View style={styles.checkupContainer}>
                    <ThemedText style={styles.checkupText}>
                      Next Checkup: {disease.nextCheckup}
                    </ThemedText>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.infoCard}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    color: '#623AA2',
  },
  contentContainer: {
    padding: 16,
    marginTop: 10,
  },
  imageContainer: {
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
    marginBottom: -60, // Half the height of the image to create overlap
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    paddingTop: 80, // Add extra padding at top to account for overlapping image
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20,
  },
  inputContainer: {
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 18,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  editButton: {
    backgroundColor: '#9370DB',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#F78DA7',
    padding: 12,
    borderRadius: 8,
    flex: 0.48,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#0693E3',
    padding: 12,
    borderRadius: 8,
    flex: 0.48,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  trackerCard: {
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
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  progressContainer: {
    height: 20,
    backgroundColor: '#f0f0f0', // Light background for empty progress
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
  },
  progressBar: {
    height: '100%',
    borderRadius: 10,
  },
  weekText: {
    textAlign: 'center',
    marginTop: 10,
  },
  infoCard: {
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
  updateMessage: {
    position: 'absolute',
    top: 90,
    left: 20,
    backgroundColor: '#9370DB',
    padding: 10,
    borderRadius: 5,
    zIndex: 1000,
  },
  updateMessageText: {
    color: 'white',
    fontSize: 14,
  },
  developmentCard: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  developmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9370DB',
    marginBottom: 15,
    textAlign: 'center',
  },
  measurementsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  measurementItem: {
    flex: 1,
    alignItems: 'center',
  },
  measurementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  measurementLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
  },
  measurementValue: {
    fontSize: 14,
    color: '#6c757d',
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#dee2e6',
    marginHorizontal: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#495057',
  },
  sectionContent: {
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  emptyText: {
    color: '#6c757d',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  cardContent: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  assessmentSection: {
    marginBottom: 20,
  },
  familyHistorySection: {
    marginBottom: 20,
  },
  diseasesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 15,
  },
  diseaseCheckbox: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  diseaseCheckboxSelected: {
    backgroundColor: '#623AA2',
    borderColor: '#623AA2',
  },
  diseaseCheckboxText: {
    fontSize: 14,
    color: '#495057',
  },
  diseaseCheckboxTextSelected: {
    color: '#fff',
  },
  selectedDiseasesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  selectedDiseaseTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9370DB',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 15,
    gap: 6,
  },
  selectedDiseaseText: {
    color: '#fff',
    fontSize: 12,
  },
  currentHealthSection: {
    marginTop: 20,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 10,
  },
  healthInputs: {
    marginBottom: 20,
  },
  healthInput: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  symptomsInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  analyzeButton: {
    backgroundColor: '#623AA2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  analyzeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  riskIndicator: {
    marginTop: 15,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  riskText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  diseaseCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  diseaseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  diseaseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495057',
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  riskBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  symptomsContainer: {
    marginTop: 10,
  },
  symptomsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  symptomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  bulletPoint: {
    marginRight: 5,
    color: '#623AA2',
  },
  symptomText: {
    color: '#6c757d',
  },
  checkupContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#dee2e6',
  },
  checkupText: {
    color: '#623AA2',
    fontSize: 14,
  },
});
