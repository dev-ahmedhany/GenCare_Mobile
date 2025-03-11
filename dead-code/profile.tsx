// import React, { useState } from 'react';
// import { View, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native';
// import { ThemedText } from '@/components/ThemedText';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useRouter } from 'expo-router';
// import { FontAwesome5, Ionicons, FontAwesome, FontAwesome6 } from '@expo/vector-icons';
// import { NewsList } from "@/data/pregnancyweeks";
// import Modal from 'react-native-modal';
// import * as ImagePicker from 'expo-image-picker';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');

// export default function Profile() {
//   const router = useRouter();
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     fullName: '',
//     address: '',
//     age: '',
//     pregnancyWeek: '',
//     phone: '',
//     email: '',
//     bloodType: '',
//   });
//   const [tempFormData, setTempFormData] = useState({...formData});
//   const [emailError, setEmailError] = useState('');
//   const [showUpdateMessage, setShowUpdateMessage] = useState(false);
//   const fadeAnim = useState(new Animated.Value(0))[0];
//   const [expandedSections, setExpandedSections] = useState({
//     diseases: false,
//     weeks: false,
//     babyNames: false,
//   });
//   const [expandedCards, setExpandedCards] = useState({
//     healthPredictor: false,
//     savedDiseases: false,
//     savedItems: false,
//   });
//   const [selectedDiseases, setSelectedDiseases] = useState<string[]>([]);
//   const [currentHealth, setCurrentHealth] = useState({
//     bloodPressure: '',
//     bloodSugar: '',
//     weight: '',
//     symptoms: '',
//   });
//   const [riskLevel, setRiskLevel] = useState('');
//   const [savedDiseases, setSavedDiseases] = useState([
//     {
//       name: 'Gestational Diabetes',
//       risk: 'High',
//       symptoms: [
//         'Increased thirst',
//         'Frequent urination',
//         'Fatigue'
//       ],
//       nextCheckup: '2024-04-15'
//     },
//     {
//       name: 'Hypertension',
//       risk: 'Moderate',
//       symptoms: [
//         'Headaches',
//         'Vision problems',
//         'Swelling'
//       ],
//       nextCheckup: '2024-04-10'
//     }
//   ]);
//   const [isEditingHealth, setIsEditingHealth] = useState(false);
//   const [tempHealthData, setTempHealthData] = useState({
//     bloodPressure: '',
//     bloodSugar: '',
//     weight: '',
//     symptoms: '',
//   });
//   const [isImagePickerVisible, setImagePickerVisible] = useState(false);
//   const [profileImage, setProfileImage] = useState(
//     require('@/assets/profile_images/default.png')
//   );

//   const commonDiseases = [
//     'Diabetes',
//     'Heart Disease',
//     'Hypertension',
//     'Asthma',
//     'Cancer',
//     'Thyroid Disorders',
//     'Mental Health Conditions',
//   ];

//   const validateEmail = (email: string) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleEdit = () => {
//     setTempFormData({...formData});
//     setIsEditing(true);
//   };

//   const handleCancel = () => {
//     setTempFormData({...formData});
//     setIsEditing(false);
//     setEmailError('');
//   };

//   const showMessage = () => {
//     setShowUpdateMessage(true);
//     Animated.sequence([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 300,
//         useNativeDriver: true,
//       }),
//       Animated.delay(2000),
//       Animated.timing(fadeAnim, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: true,
//       }),
//     ]).start(() => {
//       setShowUpdateMessage(false);
//     });
//   };

//   const handleSave = () => {
//     if (tempFormData.email && !validateEmail(tempFormData.email)) {
//       setEmailError('Please enter a valid email address');
//       return;
//     }
//     setFormData({...tempFormData});
//     setIsEditing(false);
//     setEmailError('');
//     showMessage();
//   };

//   const handlePregnancyWeekChange = (text: string) => {
//     const week = Math.min(Math.max(parseInt(text) || 0, 0), 40);
//     setTempFormData({ ...tempFormData, pregnancyWeek: week.toString() });
//   };

//   const getCurrentWeekInfo = () => {
//     const weekNumber = parseInt(formData.pregnancyWeek) || 0;
//     return NewsList.find(item => item.id === weekNumber);
//   };

//   const toggleSection = (section: keyof typeof expandedSections) => {
//     setExpandedSections(prev => ({
//       ...prev,
//       [section]: !prev[section]
//     }));
//   };

//   const toggleCard = (card: keyof typeof expandedCards) => {
//     setExpandedCards(prev => ({
//       ...prev,
//       [card]: !prev[card]
//     }));
//   };

//   const toggleDisease = (disease: string) => {
//     setSelectedDiseases(prev => 
//       prev.includes(disease) 
//         ? prev.filter(d => d !== disease)
//         : [...prev, disease]
//     );
//   };

//   const getRiskColor = (risk: string) => {
//     switch (risk.toLowerCase()) {
//       case 'low': return '#4CAF50';
//       case 'moderate': return '#FFA726';
//       case 'high': return '#f44336';
//       case 'severe': return '#B71C1C';
//       default: return '#757575';
//     }
//   };

//   const analyzeRisk = () => {
//     // Add your risk analysis logic here
//     // For now, just a placeholder that sets a random risk level
//     const risks = ['Low', 'Moderate', 'High', 'Severe'];
//     setRiskLevel(risks[Math.floor(Math.random() * risks.length)]);
//   };

//   const handleEditHealth = () => {
//     setTempHealthData({...currentHealth});
//     setIsEditingHealth(true);
//   };

//   const handleCancelHealth = () => {
//     setTempHealthData({...currentHealth});
//     setIsEditingHealth(false);
//   };

//   const handleSaveHealth = () => {
//     setCurrentHealth({...tempHealthData});
//     setIsEditingHealth(false);
//     showMessage();
//   };

//   const toggleImagePicker = () => {
//     setImagePickerVisible(!isImagePickerVisible);
//   };

//   const handleSelectImage = (image: any) => {
//     setProfileImage(image);
//     setImagePickerVisible(false);
//   };

//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setProfileImage({ uri: result.assets[0].uri });
//       setImagePickerVisible(false);
//     }
//   };

//   const renderProfileField = (label: string, value: string) => {
//     if (isEditing) {
//       if (label === 'Pregnancy Week') {
//         return (
//           <TextInput
//             style={styles.input}
//             placeholder={label}
//             value={tempFormData.pregnancyWeek}
//             onChangeText={handlePregnancyWeekChange}
//             keyboardType="numeric"
//             maxLength={2}
//           />
//         );
//       }
//       return (
//         <TextInput
//           style={[styles.input, label === 'Email' && emailError ? styles.inputError : null]}
//           placeholder={label}
//           value={tempFormData[label.toLowerCase() as keyof typeof tempFormData]}
//           onChangeText={(text) => 
//             setTempFormData({...tempFormData, [label.toLowerCase()]: text})
//           }
//           keyboardType={label === 'Email' ? 'email-address' : 
//                        label === 'Age' || label === 'Phone' ? 'numeric' : 
//                        'default'}
//         />
//       );
//     }
    
//     const displayValue = label === 'Pregnancy Week' 
//       ? formData.pregnancyWeek 
//       : formData[label.toLowerCase() as keyof typeof formData];

//     return (
//       <View style={styles.infoField}>
//         <ThemedText style={styles.fieldLabel}>{label}</ThemedText>
//         <ThemedText style={[
//           styles.fieldValue,
//           !displayValue && styles.emptyFieldValue
//         ]}>
//           {displayValue || '—'}
//         </ThemedText>
//       </View>
//     );
//   };

//   const weekInfo = getCurrentWeekInfo();
//   const progress = (parseInt(formData.pregnancyWeek) || 0) / 40;

//   return (
//     <ScrollView style={styles.container}>
//       {/* Header with Back Button and Title */}
//       <View style={styles.header}>
//         <TouchableOpacity 
//           style={styles.backButton}
//           onPress={() => router.push('/(home)/home')}
//         >
//           <Ionicons name="arrow-back" size={24} color="#623AA2" />
//         </TouchableOpacity>
//         <ThemedText style={styles.headerTitle}>Profile</ThemedText>
//       </View>

//       {showUpdateMessage && (
//         <Animated.View style={[styles.updateMessage, { opacity: fadeAnim }]}>
//           <ThemedText style={styles.updateMessageText}>Profile has been updated</ThemedText>
//         </Animated.View>
//       )}

//       <View style={styles.contentContainer}>
//         <View style={styles.imageContainer}>
//           <Image
//             source={profileImage}
//             style={styles.profileImage}
//           />
//           {isEditing && (
//             <TouchableOpacity 
//               style={styles.editImageButton}
//               onPress={toggleImagePicker}
//             >
//               <FontAwesome6 name="edit" size={16} color="#ffffff" />
//             </TouchableOpacity>
//           )}
//         </View>

//         <View style={styles.profileCard}>
//           <View style={styles.inputContainer}>
//             {renderProfileField('Full Name', formData.fullName)}
//             {renderProfileField('Address', formData.address)}
//             {renderProfileField('Age', formData.age)}
//             {renderProfileField('Phone', formData.phone)}
//             {renderProfileField('Email', formData.email)}
//             {renderProfileField('Blood Type', formData.bloodType)}
//             {renderProfileField('Pregnancy Week', formData.pregnancyWeek)}
//             {emailError ? <ThemedText style={styles.errorText}>{emailError}</ThemedText> : null}

//             <View style={styles.buttonContainer}>
//               {!isEditing ? (
//                 <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
//                   <ThemedText style={styles.buttonText}>Edit Profile</ThemedText>
//                 </TouchableOpacity>
//               ) : (
//                 <>
//                   <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//                     <ThemedText style={styles.buttonText}>Save Changes</ThemedText>
//                   </TouchableOpacity>
//                   <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
//                     <ThemedText style={styles.buttonText}>Cancel</ThemedText>
//                   </TouchableOpacity>
//                 </>
//               )}
//             </View>
//           </View>
//         </View>

//         <View style={styles.trackerCard}>
//           <ThemedText style={styles.cardTitle}>Pregnancy Tracker</ThemedText>
//           <View style={styles.progressContainer}>
//             <LinearGradient
//               colors={['#9370DB', '#F78DA7']}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 0 }}
//               style={[styles.progressBar, { width: `${progress * 100}%` }]}
//             />
//           </View>
//           <ThemedText style={styles.weekText}>
//             Week {formData.pregnancyWeek || '0'} of 40
//           </ThemedText>

//           {weekInfo && (
//             <View style={styles.developmentCard}>
//               <ThemedText style={styles.developmentTitle}>
//                 Baby's Development - Week {weekInfo.id}
//               </ThemedText>
//               <View style={styles.measurementsContainer}>
//                 <View style={styles.measurementItem}>
//                   <View style={styles.measurementHeader}>
//                     <FontAwesome5 name="weight" size={16} color="#623AA2" />
//                     <ThemedText style={styles.measurementLabel}>Weight</ThemedText>
//                   </View>
//                   <ThemedText style={styles.measurementValue}>{weekInfo.author}</ThemedText>
//                 </View>
//                 <View style={styles.divider} />
//                 <View style={styles.measurementItem}>
//                   <View style={styles.measurementHeader}>
//                     <FontAwesome5 name="ruler-vertical" size={16} color="#623AA2" />
//                     <ThemedText style={styles.measurementLabel}>Length</ThemedText>
//                   </View>
//                   <ThemedText style={styles.measurementValue}>{weekInfo.title}</ThemedText>
//                 </View>
//               </View>
//             </View>
//           )}
//         </View>

//         {/* Health Predictor Card */}
//         <View style={styles.infoCard}>
//           <TouchableOpacity 
//             style={styles.cardHeader}
//             onPress={() => toggleCard('healthPredictor')}
//           >
//             <ThemedText style={styles.cardTitle}>Health Predictor</ThemedText>
//             <FontAwesome 
//               name={expandedCards.healthPredictor ? 'chevron-up' : 'chevron-down'} 
//               size={16} 
//               color="#495057" 
//             />
//           </TouchableOpacity>

//           {expandedCards.healthPredictor && (
//             <View style={styles.cardContent}>
//               <View style={styles.assessmentSection}>
//                 <ThemedText style={styles.sectionTitle}>Health Risk Assessment</ThemedText>
                
//                 <View style={styles.familyHistorySection}>
//                   <ThemedText style={styles.subsectionTitle}>Family Medical History</ThemedText>
//                   <View style={styles.diseasesList}>
//                     {commonDiseases.map((disease) => (
//                       <TouchableOpacity
//                         key={disease}
//                         style={[
//                           styles.diseaseCheckbox,
//                           selectedDiseases.includes(disease) && styles.diseaseCheckboxSelected
//                         ]}
//                         onPress={() => toggleDisease(disease)}
//                       >
//                         <ThemedText style={[
//                           styles.diseaseCheckboxText,
//                           selectedDiseases.includes(disease) && styles.diseaseCheckboxTextSelected
//                         ]}>
//                           {disease}
//                         </ThemedText>
//                       </TouchableOpacity>
//                     ))}
//                   </View>

//                   <View style={styles.selectedDiseasesContainer}>
//                     {selectedDiseases.map((disease) => (
//                       <View key={disease} style={styles.selectedDiseaseTag}>
//                         <ThemedText style={styles.selectedDiseaseText}>{disease}</ThemedText>
//                         <TouchableOpacity onPress={() => toggleDisease(disease)}>
//                           <FontAwesome name="times" size={12} color="#fff" />
//                         </TouchableOpacity>
//                       </View>
//                     ))}
//                   </View>

//                   <View style={styles.currentHealthSection}>
//                     <ThemedText style={styles.subsectionTitle}>Current Health Condition</ThemedText>
//                     <View style={styles.healthInputs}>
//                       <TextInput
//                         style={styles.healthInput}
//                         placeholder="Blood Pressure (e.g., 120/80)"
//                         value={isEditingHealth ? tempHealthData.bloodPressure : currentHealth.bloodPressure}
//                         onChangeText={(text) => isEditingHealth && setTempHealthData(prev => ({...prev, bloodPressure: text}))}
//                         editable={isEditingHealth}
//                       />
//                       <TextInput
//                         style={styles.healthInput}
//                         placeholder="Blood Sugar Level (mg/dL)"
//                         value={isEditingHealth ? tempHealthData.bloodSugar : currentHealth.bloodSugar}
//                         onChangeText={(text) => isEditingHealth && setTempHealthData(prev => ({...prev, bloodSugar: text}))}
//                         keyboardType="numeric"
//                         editable={isEditingHealth}
//                       />
//                       <TextInput
//                         style={styles.healthInput}
//                         placeholder="Weight (kg)"
//                         value={isEditingHealth ? tempHealthData.weight : currentHealth.weight}
//                         onChangeText={(text) => isEditingHealth && setTempHealthData(prev => ({...prev, weight: text}))}
//                         keyboardType="numeric"
//                         editable={isEditingHealth}
//                       />
//                       <TextInput
//                         style={[styles.healthInput, styles.symptomsInput]}
//                         placeholder="Current Symptoms (if any)"
//                         value={isEditingHealth ? tempHealthData.symptoms : currentHealth.symptoms}
//                         onChangeText={(text) => isEditingHealth && setTempHealthData(prev => ({...prev, symptoms: text}))}
//                         multiline
//                         editable={isEditingHealth}
//                       />
//                     </View>

//                     <View style={styles.healthButtonContainer}>
//                       {!isEditingHealth ? (
//                         <TouchableOpacity style={styles.healthEditButton} onPress={handleEditHealth}>
//                           <ThemedText style={styles.healthButtonText}>Edit Health Info</ThemedText>
//                         </TouchableOpacity>
//                       ) : (
//                         <>
//                           <TouchableOpacity style={styles.healthSaveButton} onPress={handleSaveHealth}>
//                             <ThemedText style={styles.healthButtonText}>Save Changes</ThemedText>
//                           </TouchableOpacity>
//                           <TouchableOpacity style={styles.healthCancelButton} onPress={handleCancelHealth}>
//                             <ThemedText style={styles.healthButtonText}>Cancel</ThemedText>
//                           </TouchableOpacity>
//                         </>
//                       )}
//                     </View>
//                   </View>
//                 </View>
//               </View>
//             </View>
//           )}
//         </View>

//         <View style={styles.infoCard}>
//           <ThemedText style={styles.cardTitle}>Saved Items</ThemedText>
          
//           {/* Diseases Section */}
//           <TouchableOpacity 
//             style={styles.sectionHeader} 
//             onPress={() => toggleSection('diseases')}
//           >
//             <ThemedText style={styles.sectionTitle}>Diseases</ThemedText>
//             <FontAwesome 
//               name={expandedSections.diseases ? 'chevron-up' : 'chevron-down'} 
//               size={16} 
//               color="#495057" 
//             />
//           </TouchableOpacity>
//           {expandedSections.diseases && (
//             <View style={styles.sectionContent}>
//               <ThemedText style={styles.emptyText}>No saved diseases</ThemedText>
//             </View>
//           )}

//           {/* Weeks Section */}
//           <TouchableOpacity 
//             style={styles.sectionHeader} 
//             onPress={() => toggleSection('weeks')}
//           >
//             <ThemedText style={styles.sectionTitle}>Weeks</ThemedText>
//             <FontAwesome 
//               name={expandedSections.weeks ? 'chevron-up' : 'chevron-down'} 
//               size={16} 
//               color="#495057" 
//             />
//           </TouchableOpacity>
//           {expandedSections.weeks && (
//             <View style={styles.sectionContent}>
//               <ThemedText style={styles.emptyText}>No saved weeks</ThemedText>
//             </View>
//           )}

//           {/* Baby Names Section */}
//           <TouchableOpacity 
//             style={styles.sectionHeader} 
//             onPress={() => toggleSection('babyNames')}
//           >
//             <ThemedText style={styles.sectionTitle}>Baby Names</ThemedText>
//             <FontAwesome 
//               name={expandedSections.babyNames ? 'chevron-up' : 'chevron-down'} 
//               size={16} 
//               color="#495057" 
//             />
//           </TouchableOpacity>
//           {expandedSections.babyNames && (
//             <View style={styles.sectionContent}>
//               <ThemedText style={styles.emptyText}>No saved baby names</ThemedText>
//             </View>
//           )}
//         </View>
//       </View>

//       <Modal
//         isVisible={isImagePickerVisible}
//         onBackdropPress={toggleImagePicker}
//         style={styles.modal}
//       >
//         <View style={styles.modalContent}>
//           <ThemedText style={styles.modalTitle}>Choose Profile Picture</ThemedText>
          
//           <View style={styles.imageGrid}>
//             <TouchableOpacity 
//               style={styles.imageOption}
//               onPress={() => handleSelectImage(require('@/assets/profile_images/swiper_card1.jpeg'))}
//             >
//               <Image 
//                 source={require('@/assets/profile_images/swiper_card1.jpeg')} 
//                 style={styles.optionImage}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity 
//               style={styles.imageOption}
//               onPress={() => handleSelectImage(require('@/assets/profile_images/swiper_card2.jpeg'))}
//             >
//               <Image 
//                 source={require('@/assets/profile_images/swiper_card2.jpeg')} 
//                 style={styles.optionImage}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity 
//               style={styles.imageOption}
//               onPress={() => handleSelectImage(require('@/assets/profile_images/swiper_card3.jpeg'))}
//             >
//               <Image 
//                 source={require('@/assets/profile_images/swiper_card3.jpeg')} 
//                 style={styles.optionImage}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity 
//               style={styles.imageOption}
//               onPress={() => handleSelectImage(require('@/assets/profile_images/Mob-Logo-removebg-preview.png'))}
//             >
//               <Image 
//                 source={require('@/assets/profile_images/Mob-Logo-removebg-preview.png')} 
//                 style={styles.optionImage}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity 
//               style={styles.imageOption}
//               onPress={() => handleSelectImage(require('@/assets/profile_images/Mob-Logo.png'))}
//             >
//               <Image 
//                 source={require('@/assets/profile_images/Mob-Logo.png')} 
//                 style={styles.optionImage}
//               />
//             </TouchableOpacity>
//           </View>

//           <TouchableOpacity 
//             style={styles.uploadButton}
//             onPress={pickImage}
//           >
//             <FontAwesome name="upload" size={20} color="#fff" />
//             <ThemedText style={styles.uploadButtonText}>Upload from Device</ThemedText>
//           </TouchableOpacity>

//           <TouchableOpacity 
//             style={styles.closeButton}
//             onPress={toggleImagePicker}
//           >
//             <ThemedText style={styles.closeButtonText}>Cancel</ThemedText>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingTop: 40,
//     paddingHorizontal: 16,
//     paddingBottom: 10,
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e9ecef',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 3,
//   },
//   backButton: {
//     padding: 8,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   headerTitle: {
//     fontSize: 30,
//     fontFamily: 'DMSerifText-Regular',
//     marginLeft: 16,
//     color: '#623AA2',
//   },
//   contentContainer: {
//     padding: SCREEN_WIDTH * 0.04,
//     marginTop: SCREEN_WIDTH * 0.02,
//   },
//   imageContainer: {
//     alignItems: 'center',
//     position: 'relative',
//     zIndex: 1,
//     marginBottom: -SCREEN_WIDTH * 0.15,
//   },
//   profileImage: {
//     width: SCREEN_WIDTH * 0.3,
//     height: SCREEN_WIDTH * 0.3,
//     borderRadius: SCREEN_WIDTH * 0.15,
//     borderWidth: 4,
//     borderColor: '#fff',
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   profileCard: {
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     padding: SCREEN_WIDTH * 0.05,
//     paddingTop: SCREEN_WIDTH * 0.2,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     marginBottom: SCREEN_WIDTH * 0.05,
//   },
//   inputContainer: {
//     gap: 12,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ced4da',
//     borderRadius: 18,
//     padding: SCREEN_WIDTH * 0.03,
//     fontSize: SCREEN_WIDTH * 0.04,
//     backgroundColor: '#fff',
//   },
//   inputError: {
//     borderColor: 'red',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 12,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: SCREEN_WIDTH * 0.03,
//     gap: SCREEN_WIDTH * 0.02,
//   },
//   editButton: {
//     backgroundColor: '#9370DB',
//     padding: SCREEN_WIDTH * 0.02,
//     borderRadius: 8,
//     flex: 0.7,
//     alignItems: 'center',
//     minHeight: SCREEN_WIDTH * 0.12,
//     justifyContent: 'center',
//   },
//   saveButton: {
//     backgroundColor: '#F78DA7',
//     padding: SCREEN_WIDTH * 0.03,
//     borderRadius: 8,
//     flex: 0.55,
//     alignItems: 'center',
//     minHeight: SCREEN_WIDTH * 0.1,
//     justifyContent: 'center',
//   },
//   cancelButton: {
//     backgroundColor: '#0693E3',
//     padding: SCREEN_WIDTH * 0.02,
//     borderRadius: 8,
//     flex: 0.35,
//     alignItems: 'center',
//     minHeight: SCREEN_WIDTH * 0.1,
//     justifyContent: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: SCREEN_WIDTH * 0.039,
//     fontWeight: 'bold',
//   },
//   trackerCard: {
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     padding: 20,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     marginBottom: 20,
//   },
//   cardTitle: {
//     fontSize: SCREEN_WIDTH * 0.045,
//     fontWeight: 'bold',
//     marginBottom: SCREEN_WIDTH * 0.03,
//     color: '#623AA2',
//   },
//   progressContainer: {
//     height: 20,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 10,
//     overflow: 'hidden',
//     width: '100%',
//   },
//   progressBar: {
//     height: '100%',
//     borderRadius: 10,
//   },
//   weekText: {
//     textAlign: 'center',
//     marginTop: 10,
//   },
//   infoCard: {
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     padding: 20,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     marginBottom: 20,
//   },
//   updateMessage: {
//     position: 'absolute',
//     top: 90,
//     left: 20,
//     backgroundColor: '#9370DB',
//     padding: 10,
//     borderRadius: 5,
//     zIndex: 1000,
//   },
//   updateMessageText: {
//     color: 'white',
//     fontSize: 14,
//   },
//   developmentCard: {
//     marginTop: 20,
//     padding: 15,
//     backgroundColor: '#f8f9fa',
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#e9ecef',
//   },
//   developmentTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#9370DB',
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   measurementsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   measurementItem: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   measurementHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//     gap: 8,
//   },
//   measurementLabel: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#495057',
//   },
//   measurementValue: {
//     fontSize: 14,
//     color: '#6c757d',
//   },
//   divider: {
//     width: 1,
//     height: '100%',
//     backgroundColor: '#dee2e6',
//     marginHorizontal: 15,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 4,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e9ecef',
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#495057',
//   },
//   sectionContent: {
//     paddingVertical: 12,
//     paddingHorizontal: 4,
//   },
//   emptyText: {
//     color: '#6c757d',
//     fontStyle: 'italic',
//     textAlign: 'center',
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 15,
//   },
//   cardContent: {
//     padding: 15,
//     borderTopWidth: 1,
//     borderTopColor: '#e9ecef',
//   },
//   assessmentSection: {
//     marginBottom: 20,
//   },
//   familyHistorySection: {
//     marginBottom: 20,
//   },
//   diseasesList: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 10,
//     marginBottom: 15,
//   },
//   diseaseCheckbox: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 20,
//     backgroundColor: '#f8f9fa',
//     borderWidth: 1,
//     borderColor: '#dee2e6',
//   },
//   diseaseCheckboxSelected: {
//     backgroundColor: '#623AA2',
//     borderColor: '#623AA2',
//   },
//   diseaseCheckboxText: {
//     fontSize: 14,
//     color: '#495057',
//   },
//   diseaseCheckboxTextSelected: {
//     color: '#fff',
//   },
//   selectedDiseasesContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//     marginBottom: 20,
//   },
//   selectedDiseaseTag: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#9370DB',
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     borderRadius: 15,
//     gap: 6,
//   },
//   selectedDiseaseText: {
//     color: '#fff',
//     fontSize: 12,
//   },
//   currentHealthSection: {
//     marginTop: 20,
//   },
//   subsectionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#495057',
//     marginBottom: 10,
//   },
//   healthInputs: {
//     marginBottom: 20,
//   },
//   healthInput: {
//     borderWidth: 1,
//     borderColor: '#dee2e6',
//     borderRadius: 8,
//     padding: SCREEN_WIDTH * 0.03,
//     marginBottom: SCREEN_WIDTH * 0.02,
//     backgroundColor: '#fff',
//     fontSize: SCREEN_WIDTH * 0.035,
//   },
//   symptomsInput: {
//     height: SCREEN_WIDTH * 0.2,
//     textAlignVertical: 'top',
//   },
//   fieldValue: {
//     fontSize: 16,
//     color: '#212529',
//     fontWeight: '500',
//   },
//   emptyFieldValue: {
//     color: '#adb5bd',
//     fontStyle: 'italic',
//   },
//   fieldLabel: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#495057',
//   },
//   infoField: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 8,
//   },
//   healthButtonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: SCREEN_WIDTH * 0.02,
//     gap: SCREEN_WIDTH * 0.02,
//   },
//   healthEditButton: {
//     backgroundColor: '#9370DB',
//     padding: SCREEN_WIDTH * 0.02,
//     borderRadius: 8,
//     flex: 0.7,
//     alignItems: 'center',
//     minHeight: SCREEN_WIDTH * 0.12,
//     justifyContent: 'center',
//   },
//   healthSaveButton: {
//     backgroundColor: '#F78DA7',
//     padding: SCREEN_WIDTH * 0.03,
//     borderRadius: 8,
//     flex: 0.55,
//     alignItems: 'center',
//     minHeight: SCREEN_WIDTH * 0.1,
//     justifyContent: 'center',
//   },
//   healthCancelButton: {
//     backgroundColor: '#0693E3',
//     padding: SCREEN_WIDTH * 0.02,
//     borderRadius: 8,
//     flex: 0.35,
//     alignItems: 'center',
//     minHeight: SCREEN_WIDTH * 0.1,
//     justifyContent: 'center',
//   },
//   healthButtonText: {
//     color: '#fff',
//     fontSize: SCREEN_WIDTH * 0.039,
//     fontWeight: 'bold',
//   },
//   editImageButton: {
//     position: 'absolute',
//     bottom: 0,
//     right: SCREEN_WIDTH * 0.32,
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#623AA2',
//     elevation: 6,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   modal: {
//     margin: 0,
//     justifyContent: 'flex-end',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//     maxHeight: SCREEN_WIDTH * 1.1,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#623AA2',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   imageGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   imageOption: {
//     width: SCREEN_WIDTH * 0.25,
//     height: SCREEN_WIDTH * 0.25,
//     marginBottom: 10,
//     borderRadius: SCREEN_WIDTH * 0.125,
//     overflow: 'hidden',
//     borderWidth: 2,
//     borderColor: '#e9ecef',
//   },
//   optionImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   uploadButton: {
//     backgroundColor: '#623AA2',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 10,
//     gap: 10,
//   },
//   uploadButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   closeButton: {
//     padding: 12,
//     borderRadius: 8,
//     backgroundColor: '#f8f9fa',
//   },
//   closeButtonText: {
//     color: '#495057',
//     fontSize: 16,
//     fontWeight: '500',
//     textAlign: 'center',
//   },
// });

