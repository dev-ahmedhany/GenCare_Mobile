import { View, StyleSheet, Text, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { diseases } from '@/data/diseases';
import { bgColors } from '@/constants/Colors';
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect } from 'react';
import { profileService } from '../(profile-pages-components)/services/api';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface DiseaseDetailsProps {
  disease: typeof diseases[number];
  updateSavedDiseases?: (callback: (prevDiseases: any[]) => any[]) => void;
}

export default function DiseaseDetails({ disease, updateSavedDiseases }: DiseaseDetailsProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    checkIfSaved();
  }, [disease]);

  const checkIfSaved = async () => {
    try {
      const response = await profileService.getProfile();
      if (response.success) {
        const savedDiseases = response.data.user.savedDiseases || [];
        setIsSaved(savedDiseases.some((d: any) => d.name === disease.name));
      }
    } catch (error) {
      console.error('Error checking saved status:', error);
    }
  };

  const handleToggleSave = async () => {
    try {
      setIsSaving(true);
      if (isSaved) {
        // إذا كان المرض محفوظ، نقوم بحذفه باستخدام اسم المرض
        const response = await profileService.deleteItem('disease', disease.name);
        if (response.success) {
          setIsSaved(false);
          if (updateSavedDiseases) {
            updateSavedDiseases(prevDiseases => 
              prevDiseases.filter(d => d.name !== disease.name)
            );
          }
        }
      } else {
        const response = await profileService.saveItem('disease', {
          name: disease.name,
          details: disease.details,
          date: new Date().toISOString()
        });

        if (response.success) {
          setIsSaved(true);
          if (updateSavedDiseases) {
            updateSavedDiseases(prevDiseases => [...prevDiseases, response.data.disease]);
          }
        }
      }
    } catch (error) {
      console.error('Error toggling save:', error);
      Alert.alert('خطأ', 'حدث خطأ أثناء تحديث المحفوظات');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity 
          style={[styles.saveButton, isSaved && styles.savedButton]} 
          onPress={handleToggleSave}
          disabled={isSaving}
        >
          <MaterialIcons 
            name={isSaved ? "bookmark" : "bookmark-outline"} 
            size={24} 
            color={isSaved ? "#fff" : "#623AA2"} 
          />
          <Text style={[styles.saveButtonText, isSaved && styles.savedButtonText]}>
            {isSaving ? "جاري المعالجة..." : (isSaved ? 'saved' : 'save')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{disease.name}</Text>
        <Text style={styles.date}>{disease.date}</Text>
        <Text style={styles.details}>{disease.details}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: bgColors.light.background,
    marginTop: Math.min(SCREEN_HEIGHT * 0.02, SCREEN_WIDTH * 0.04),
    marginBottom: Math.min(SCREEN_HEIGHT * 0.02, SCREEN_WIDTH * 0.04),
  },
  content: {
    padding: Math.min(SCREEN_WIDTH * 0.9, SCREEN_HEIGHT * 0.05),
  },
  title: {
    paddingTop: Math.min(SCREEN_WIDTH * 0.05, SCREEN_HEIGHT * 0.025),
    fontSize: Math.min(SCREEN_WIDTH * 0.06, SCREEN_HEIGHT * 0.03),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: Math.min(SCREEN_HEIGHT * 0.01, SCREEN_WIDTH * 0.02),
  },
  date: {
    paddingTop: Math.min(SCREEN_WIDTH * 0.2, SCREEN_HEIGHT * 0.06),
    fontSize: Math.min(SCREEN_WIDTH * 0.035, SCREEN_HEIGHT * 0.018),
    color: '#007AFF',
    marginBottom: Math.min(SCREEN_HEIGHT * 0.015, SCREEN_WIDTH * 0.03),
  },
  details: {
    fontSize: Math.min(SCREEN_WIDTH * 0.04, SCREEN_HEIGHT * 0.02),
    color: '#444',
    lineHeight: Math.min(SCREEN_WIDTH * 0.06, SCREEN_HEIGHT * 0.03),
  },
  saveButtonContainer: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.20,
    right: 16,
    zIndex: 3,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(98, 58, 162, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#623AA2',
  },
  savedButton: {
    backgroundColor: '#623AA2',
    borderColor: '#623AA2',
  },
  saveButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#623AA2',
  },
  savedButtonText: {
    color: '#fff',
  },
}); 