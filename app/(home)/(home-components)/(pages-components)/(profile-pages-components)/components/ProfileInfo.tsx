import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions, Modal, Animated, ScrollView, Platform, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { FormData } from '../types/profile.types';
import MainButton from '@/constants/MainButton';
import PregnancyWeekPicker from './PregnancyWeekPicker';
import { Picker } from '@react-native-picker/picker';
import { profileService } from '../services/api';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ProfileInfoProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  avatar?: string;
}

interface ValidationErrors {
  fullName?: string;
  age?: string;
  phone?: string;
  bloodType?: string;
  pregnancyWeek?: string;
}

const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

// إضافة مصفوفة الصور الافتراضية (قم باستبدالها بمسارات الصور SVG الخاصة بك)
const avatarImages: { [key: string]: any } = {
  default: require('@/assets/profile_images/default.png'),
  avatar1: require('@/assets/profile_images/avatar1.jpeg'),
  avatar2: require('@/assets/profile_images/avatar2.jpeg'),
  avatar3: require('@/assets/profile_images/avatar3.jpeg'),
  avatar4: require('@/assets/profile_images/avatar4.jpeg'),
  avatar5: require('@/assets/profile_images/avatar5.jpeg'),
  avatar6: require('@/assets/profile_images/avatar6.jpg'),
  avatar7: require('@/assets/profile_images/avatar7.jpg'),
};

export default function ProfileInfo({ formData, setFormData, avatar }: ProfileInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempFormData, setTempFormData] = useState(formData);
  const [isImagePickerVisible, setImagePickerVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(
    require('@/assets/profile_images/default.png')
  );
  const [errors, setErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    if (avatar && avatarImages[avatar]) {
      setProfileImage(avatarImages[avatar]);
    }
  }, [avatar]);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    // التحقق من الاسم إذا تم إدخاله
    if (tempFormData.fullName.trim() && !/^[a-zA-Z\s]+$/.test(tempFormData.fullName)) {
      newErrors.fullName = 'Name should contain only letters';
      isValid = false;
    } else if (tempFormData.fullName.trim() && tempFormData.fullName.length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters';
      isValid = false;
    }

    // التحقق من العمر إذا تم إدخاله
    if (tempFormData.age) {
      const age = Number(tempFormData.age);
      if (isNaN(age) || age < 15 || age > 60) {
        newErrors.age = 'Age must be between 15 and 60';
        isValid = false;
      }
    }

    // التحقق من رقم الهاتف إذا تم إدخاله
    if (tempFormData.phone && !/^\d{11}$/.test(tempFormData.phone)) {
      newErrors.phone = 'Phone number must be exactly 11 digits';
      isValid = false;
    }

    // التحقق من فصيلة الدم إذا تم إدخالها
    if (tempFormData.bloodType && !BLOOD_TYPES.includes(tempFormData.bloodType)) {
      newErrors.bloodType = 'Please select a valid blood type';
      isValid = false;
    }

    // التحقق من أسبوع الحمل إذا تم إدخاله
    if (tempFormData.pregnancyWeek) {
      const week = Number(tempFormData.pregnancyWeek);
      if (isNaN(week) || week < 1 || week > 42) {
        newErrors.pregnancyWeek = 'Week must be between 1 and 42';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (validateForm()) {
      setFormData(tempFormData);
      setIsEditing(false);
      setErrors({});
    }
  };

  const renderProfileField = (label: string, value: string, icon: string) => (
    <View style={styles.fieldContainer}>
      <FontAwesome6 name={icon} size={20} color="#623AA2" style={styles.fieldIcon} />
      <View style={styles.fieldContent}>
        <ThemedText style={styles.fieldLabel}>{label}</ThemedText>
        <ThemedText style={[styles.fieldValue, !value && styles.emptyFieldValue]}>
          {label === 'Pregnancy Week' && value ? `Week ${value}` : value || '—'}
        </ThemedText>
      </View>
    </View>
  );

  const renderEditField = (label: string, value: string, field: keyof FormData) => {
    if (field === 'bloodType') {
      return (
        <View style={styles.editFieldContainer}>
          <ThemedText style={styles.editFieldLabel}>{label}</ThemedText>
          <View style={[styles.editInput, styles.pickerWrapper]}>
            <Picker
              selectedValue={tempFormData[field]}
              onValueChange={(text) => setTempFormData({...tempFormData, [field]: text})}
              style={styles.bloodTypePicker}
              dropdownIconColor="#623AA2"
              mode="dropdown"
            >
              <Picker.Item 
                label="Select Blood Type" 
                value="" 
                enabled={false}
              />
              {BLOOD_TYPES.map((type) => (
                <Picker.Item 
                  key={type} 
                  label={type} 
                  value={type}
                />
              ))}
            </Picker>
          </View>
          {errors[field] && (
            <ThemedText style={styles.errorText}>{errors[field]}</ThemedText>
          )}
        </View>
      );
    }

    return (
      <View style={styles.editFieldContainer}>
        <ThemedText style={styles.editFieldLabel}>{label}</ThemedText>
        <TextInput
          style={[
            styles.editInput,
            errors[field] ? styles.inputError : null
          ]}
          value={tempFormData[field]}
          onChangeText={(text) => {
            let newText = text;
            
            // التحقق من الإدخال حسب نوع الحقل
            if (field === 'age') {
              newText = text.replace(/[^0-9]/g, ''); // أرقام فقط
            } else if (field === 'phone') {
              newText = text.replace(/[^0-9]/g, '').slice(0, 11); // 11 رقم فقط
            } else if (field === 'fullName') {
              newText = text.replace(/[^a-zA-Z\s]/g, ''); // حروف ومسافات فقط
            }
            
            setTempFormData({...tempFormData, [field]: newText});
          }}
          placeholder={`Enter your ${label.toLowerCase()}`}
          placeholderTextColor="#9CA3AF"
          keyboardType={field === 'phone' || field === 'age' ? 'numeric' : 'default'}
          maxLength={field === 'phone' ? 11 : undefined}
        />
        {errors[field] && (
          <ThemedText style={styles.errorText}>{errors[field]}</ThemedText>
        )}
      </View>
    );
  };

  const handleAvatarSelect = async (avatarName: string) => {
    try {
      const response = await profileService.updateAvatar(avatarName);
      if (response.success) {
        setProfileImage(avatarImages[avatarName]);
        setImagePickerVisible(false);
      }
    } catch (error) {
      console.error('Error updating avatar:', error);
      Alert.alert('خطأ', 'حدث خطأ في تحديث الصورة');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.imageContainer}>
          <Image source={profileImage} style={styles.profileImage} />
          <TouchableOpacity 
            style={styles.editImageButton}
            onPress={() => setImagePickerVisible(true)}
          >
            <FontAwesome6 name="camera" size={16} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          {renderProfileField('Full Name', formData.fullName, 'user')}
          {renderProfileField('Age', formData.age, 'calendar')}
          {renderProfileField('Phone', formData.phone, 'phone')}
          {renderProfileField('Blood Type', formData.bloodType, 'droplet')}
          {renderProfileField('Pregnancy Week', formData.pregnancyWeek, 'baby')}

          <View style={styles.buttonContainer}>
            <MainButton 
              title="Edit Profile"
              onPress={() => setIsEditing(true)}
              backgroundColor="#623AA2"
            />
          </View>
        </View>
      </View>

      {/* Edit Modal */}
      <Modal
        visible={isEditing}
        transparent
        animationType="fade"
        onRequestClose={() => setIsEditing(false)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: 'rgba(255,255,255,0.8)' }]}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <ThemedText style={styles.modalTitle}>Edit Profile</ThemedText>
              <TouchableOpacity onPress={() => setIsEditing(false)}>
                <Ionicons name="close" size={24} color="#623AA2" />
              </TouchableOpacity>
            </View>

            <ScrollView 
              style={styles.modalScrollContent}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              {renderEditField('Full Name', tempFormData.fullName, 'fullName')}
              {renderEditField('Age', tempFormData.age, 'age')}
              {renderEditField('Phone', tempFormData.phone, 'phone')}
              {renderEditField('Blood Type', tempFormData.bloodType, 'bloodType')}

              <View style={styles.editFieldContainer}>
                <ThemedText style={styles.editFieldLabel}>Pregnancy Progress</ThemedText>
                <PregnancyWeekPicker
                  value={tempFormData.pregnancyWeek}
                  onChange={(week) => setTempFormData({...tempFormData, pregnancyWeek: week})}
                />
                {errors.pregnancyWeek && (
                  <ThemedText style={styles.errorText}>{errors.pregnancyWeek}</ThemedText>
                )}
              </View>
            </ScrollView>

            <View style={styles.modalButtons}>
              <MainButton 
                title="Save Changes"
                onPress={handleSave}
                backgroundColor="#623AA2"
              />
              <MainButton 
                title="Cancel"
                onPress={() => {
                  setTempFormData(formData);
                  setIsEditing(false);
                  setErrors({});
                }}
                backgroundColor="#9CA3AF"
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Image Picker Modal - يمكن إضافة تصميم مشابه */}
      <Modal
        visible={isImagePickerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setImagePickerVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <ThemedText style={styles.modalTitle}>اختر صورة</ThemedText>
              <TouchableOpacity onPress={() => setImagePickerVisible(false)}>
                <Ionicons name="close" size={24} color="#623AA2" />
              </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.avatarGrid}>
              {Object.entries(avatarImages).map(([name, image]) => (
                <TouchableOpacity
                  key={name}
                  style={styles.avatarItem}
                  onPress={() => handleAvatarSelect(name)}
                >
                  <Image source={image} style={styles.avatarImage} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SCREEN_WIDTH * 0.04,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  profileImage: {
    width: SCREEN_WIDTH * 0.25,
    height: SCREEN_WIDTH * 0.25,
    borderRadius: SCREEN_WIDTH * 0.125,
    borderWidth: 3,
    borderColor: '#623AA2',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: SCREEN_WIDTH * 0.33,
    backgroundColor: '#623AA2',
    padding: 8,
    borderRadius: 20,
    elevation: 3,
  },
  infoContainer: {
    gap: 15,
    paddingBottom: 10,
  },
  buttonContainer: {
    marginTop: 5,
    width: '100%',
    alignItems: 'center',
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  fieldIcon: {
    marginRight: 15,
  },
  fieldContent: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  fieldValue: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  emptyFieldValue: {
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: SCREEN_HEIGHT * 0.4,
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
    flexGrow: 1,
  },
  editFieldContainer: {
    marginBottom: 20,
    flexShrink: 0,
  },
  editFieldLabel: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8,
    fontWeight: '500',
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: Platform.OS === 'ios' ? 12 : 0,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
    minHeight: 50,
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
  pregnancyPickerContainer: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 15,
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
  pickerWrapper: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    height: 50,
  },
  bloodTypePicker: {
    ...Platform.select({
      ios: {
        width: '100%',
        height: 50,
      },
      android: {
        width: '100%',
        height: 50,
        color: '#1F2937',
      }
    }),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10
  },
  avatarItem: {
    width: SCREEN_WIDTH * 0.25,
    height: SCREEN_WIDTH * 0.25,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden'
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  }
});
