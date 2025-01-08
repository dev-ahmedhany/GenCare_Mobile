import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import * as ImagePicker from 'expo-image-picker';

export default function AddDiseaseScreen() {
  const [formData, setFormData] = useState({
    diseaseName: '',
    diseaseImage: '',
    diseaseSummary: '',
    diseaseBody: '',
    expectedPeriod: '',
    detailsLink: '',
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData({ ...formData, diseaseImage: result.assets[0].uri });
    }
  };

  return (
    <>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <ThemedText style={styles.header}>Add Disease Information</ThemedText>
        </View>

        <View style={styles.formContainer}>
          {/* Disease Name */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Disease Name</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Enter disease name"
              value={formData.diseaseName}
              onChangeText={(text) => setFormData({ ...formData, diseaseName: text })}
            />
          </View>

          {/* Disease Image */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Disease Image</ThemedText>
            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
              <ThemedText style={styles.imageButtonText}>Choose Image</ThemedText>
            </TouchableOpacity>
            {formData.diseaseImage && (
              <Image source={{ uri: formData.diseaseImage }} style={styles.previewImage} />
            )}
          </View>

          {/* Disease Summary */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Disease Summary</ThemedText>
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              numberOfLines={4}
              placeholder="Enter disease summary"
              value={formData.diseaseSummary}
              onChangeText={(text) => setFormData({ ...formData, diseaseSummary: text })}
            />
          </View>

          {/* Disease Body */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Disease Details</ThemedText>
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              numberOfLines={6}
              placeholder="Enter disease description"
              value={formData.diseaseBody}
              onChangeText={(text) => setFormData({ ...formData, diseaseBody: text })}
            />
          </View>

          {/* Expected Period */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Expected Pregnancy Period</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Enter expected pregnancy period"
              value={formData.expectedPeriod}
              onChangeText={(text) => setFormData({ ...formData, expectedPeriod: text })}
            />
          </View>

          {/* Details Link */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Details Link</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Enter details link"
              value={formData.detailsLink}
              onChangeText={(text) => setFormData({ ...formData, detailsLink: text })}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton}>
            <ThemedText style={styles.submitButtonText}>Add Disease</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#89CFF0',
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
  },
  headerContainer: {
    padding: 24,
  },
  header: {
    paddingTop: 10,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1a1a1a',
    marginBottom: 20,
  },
  formContainer: {
    padding: 20,
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  imageButton: {
    backgroundColor: '#89CFF0',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  imageButtonText: {
    color: '#1a1a1a',
    fontSize: 16,
    fontWeight: '600',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: '#FFB6C1',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButtonText: {
    color: '#1a1a1a',
    fontSize: 18,
    fontWeight: 'bold',
  },
});