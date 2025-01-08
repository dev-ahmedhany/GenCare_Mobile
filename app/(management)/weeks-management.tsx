import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  Modal,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import * as ImagePicker from 'expo-image-picker';
import ColorPicker from 'react-native-wheel-color-picker';

export default function WeeksManagementScreen() {
  const [formData, setFormData] = useState({
    weekNumber: '',
    weekColor: '#9b59b6',
    weekImage: '',
    weekVideoLink: '',
    title1: '',
    essay1: '',
    title2: '',
    essay2: '',
  });
  
  const [showColorPicker, setShowColorPicker] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData({ ...formData, weekImage: result.assets[0].uri });
    }
  };

  const onColorChange = (color: string) => {
    setFormData({ ...formData, weekColor: color });
  };

  return (
    <>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <ThemedText style={styles.header}>Add Pregnancy Week</ThemedText>
        </View>

        <View style={styles.formContainer}>
          {/* Week Number */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Week Number</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Enter Week Number"
              keyboardType="numeric"
              value={formData.weekNumber}
              onChangeText={(text) => setFormData({ ...formData, weekNumber: text })}
            />
          </View>

          {/* Week Color */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Week Color</ThemedText>
            <TouchableOpacity 
              style={[styles.colorPreview, { backgroundColor: formData.weekColor }]}
              onPress={() => setShowColorPicker(true)}
            >
              <ThemedText style={styles.colorPreviewText}>Select Color</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Week Image */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Week Image</ThemedText>
            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
              <ThemedText style={styles.imageButtonText}>Choose Image</ThemedText>
            </TouchableOpacity>
            {formData.weekImage && (
              <Image source={{ uri: formData.weekImage }} style={styles.previewImage} />
            )}
          </View>

          {/* Video Link */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Week Video Link</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Enter YouTube Video Link"
              value={formData.weekVideoLink}
              onChangeText={(text) => setFormData({ ...formData, weekVideoLink: text })}
            />
          </View>

          {/* Title 1 */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Title 1</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Enter Title 1"
              value={formData.title1}
              onChangeText={(text) => setFormData({ ...formData, title1: text })}
            />
          </View>

          {/* Essay 1 */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Essay 1</ThemedText>
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              numberOfLines={4}
              placeholder="Enter Essay 1"
              value={formData.essay1}
              onChangeText={(text) => setFormData({ ...formData, essay1: text })}
            />
          </View>

          {/* Title 2 */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Title 2</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Enter Title 2"
              value={formData.title2}
              onChangeText={(text) => setFormData({ ...formData, title2: text })}
            />
          </View>

          {/* Essay 2 */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Essay 2</ThemedText>
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              numberOfLines={4}
              placeholder="Enter Essay 2"
              value={formData.essay2}
              onChangeText={(text) => setFormData({ ...formData, essay2: text })}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton}>
            <ThemedText style={styles.submitButtonText}>Add Week</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Color Picker Modal */}
        <Modal
          visible={showColorPicker}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowColorPicker(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.colorPickerContainer}>
              <ThemedText style={styles.colorPickerTitle}>Choose Color</ThemedText>
              <View style={styles.colorPicker}>
                <ColorPicker
                  color={formData.weekColor}
                  onColorChange={onColorChange}
                  thumbSize={30}
                  sliderSize={30}
                  noSnap={true}
                  row={false}
                />
              </View>
              <View style={styles.colorPickerButtons}>
                <TouchableOpacity 
                  style={[styles.colorPickerButton, styles.cancelButton]}
                  onPress={() => setShowColorPicker(false)}
                >
                  <ThemedText style={styles.colorPickerButtonText}>Cancel</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.colorPickerButton, styles.selectButton]}
                  onPress={() => setShowColorPicker(false)}
                >
                  <ThemedText style={styles.colorPickerButtonText}>Select</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
    backgroundColor: '#FFB6C1',
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
  colorPreview: {
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  colorPreviewText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorPickerContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  colorPickerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1a1a1a',
  },
  colorPicker: {
    height: 300,
  },
  colorPickerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  colorPickerButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
  },
  selectButton: {
    backgroundColor: '#FFB6C1',
  },
  colorPickerButtonText: {
    color: '#1a1a1a',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
}); 