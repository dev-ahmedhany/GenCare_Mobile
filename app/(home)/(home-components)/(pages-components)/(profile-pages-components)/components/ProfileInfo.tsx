import React, { useState } from 'react';
import { View, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { FontAwesome6 } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import { FormData } from '../types/profile.types';
import MainButton from '@/constants/MainButton';


const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ProfileInfoProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export default function ProfileInfo({ formData, setFormData }: ProfileInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempFormData, setTempFormData] = useState(formData);
  const [emailError, setEmailError] = useState('');
  const [isImagePickerVisible, setImagePickerVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(
    require('@/assets/profile_images/default.png')
  );

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEdit = () => {
    setTempFormData(formData);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (tempFormData.email && !validateEmail(tempFormData.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setFormData(tempFormData);
    setIsEditing(false);
    setEmailError('');
  };

  const handleCancel = () => {
    setTempFormData(formData);
    setIsEditing(false);
    setEmailError('');
  };

  const handleSelectImage = (image: any) => {
    setProfileImage(image);
    setImagePickerVisible(false);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage({ uri: result.assets[0].uri });
      setImagePickerVisible(false);
    }
  };

  const renderProfileField = (label: string, value: string) => {
    if (isEditing) {
      return (
        <TextInput
          style={[styles.input, label === 'Email' && emailError ? styles.inputError : null]}
          placeholder={label}
          value={tempFormData[label.toLowerCase() as keyof FormData]}
          onChangeText={(text) => 
            setTempFormData({...tempFormData, [label.toLowerCase()]: text})
          }
          keyboardType={label === 'Email' ? 'email-address' : 
                       label === 'Age' || label === 'Phone' ? 'numeric' : 
                       'default'}
        />
      );
    }
    
    return (
      <View style={styles.infoField}>
        <ThemedText style={styles.fieldLabel}>{label}</ThemedText>
        <ThemedText style={[
          styles.fieldValue,
          !value && styles.emptyFieldValue
        ]}>
          {value || '—'}
        </ThemedText>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={profileImage}
          style={styles.profileImage}
        />
        {isEditing && (
          <TouchableOpacity 
            style={styles.editImageButton}
            onPress={() => setImagePickerVisible(true)}
          >
            <FontAwesome6 name="edit" size={16} color="#ffffff" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.profileCard}>
        <View style={styles.inputContainer}>
          {Object.entries(formData).map(([key, value]) => (
            <React.Fragment key={key}>
              {renderProfileField(key.charAt(0).toUpperCase() + key.slice(1), value)}
            </React.Fragment>
          ))}
          {emailError ? <ThemedText style={styles.errorText}>{emailError}</ThemedText> : null}

          <View style={styles.buttonContainer}>
            {!isEditing ? (
              <MainButton 
                title="Edit Profile"
                onPress={handleEdit}
                backgroundColor="#9370DB"
              />
            ) : (
              <>
                <MainButton 
                  title="Save Changes"
                  onPress={handleSave}
                  backgroundColor="#F78DA7"
                />
                <MainButton 
                  title="Cancel"
                  onPress={handleCancel}
                  backgroundColor="#0693E3"
                />
              </>
            )}
          </View>
        </View>
      </View>

      {/* Image Picker Modal */}
      <Modal
        isVisible={isImagePickerVisible}
        onBackdropPress={() => setImagePickerVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <ThemedText style={styles.modalTitle}>Choose Profile Picture</ThemedText>
          
          <View style={styles.imageGrid}>
            {/* Image Options */}
            <TouchableOpacity 
              style={styles.imageOption}
              onPress={() => handleSelectImage(require('@/assets/profile_images/swiper_card1.jpeg'))}
            >
              <Image 
                source={require('@/assets/profile_images/swiper_card1.jpeg')} 
                style={styles.optionImage}
              />
            </TouchableOpacity>
            {/* ... باقي الصور */}
          </View>

          <MainButton 
            title="Upload from Device"
            onPress={pickImage}
            backgroundColor="#623AA2"
          />

          <MainButton 
            title="Cancel"
            onPress={() => setImagePickerVisible(false)}
            backgroundColor="#f8f9fa"
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: SCREEN_WIDTH * 0.18,
    padding: SCREEN_WIDTH * 0.04,
  },
  imageContainer: {
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
    marginBottom: -SCREEN_WIDTH * 0.15,
  },
  profileImage: {
    width: SCREEN_WIDTH * 0.3,
    height: SCREEN_WIDTH * 0.3,
    borderRadius: SCREEN_WIDTH * 0.15,
    borderWidth: 4,
    borderColor: '#fff',
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#623AA2',
    textAlign: 'center',
    marginBottom: 20,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  imageOption: {
    width: SCREEN_WIDTH * 0.25,
    height: SCREEN_WIDTH * 0.25,
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  optionImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  input: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  inputError: {
    borderColor: '#dc3545',
  },
  infoField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
  },
  fieldValue: {
    fontSize: 16,
    color: '#212529',
  },
  emptyFieldValue: {
    color: '#adb5bd',
    fontStyle: 'italic',
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  inputContainer: {
    marginTop: SCREEN_WIDTH * 0.15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: SCREEN_WIDTH * 0.32,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#623AA2',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  errorText: {
    color: '#dc3545',
    fontSize: 12,
    marginTop: -5,
    marginBottom: 10,
  },
});
