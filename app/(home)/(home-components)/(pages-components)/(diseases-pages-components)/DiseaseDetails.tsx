import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { diseases } from '@/data/diseases';
import { bgColors } from '@/constants/Colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface DiseaseDetailsProps {
  disease: typeof diseases[number];
}

export default function DiseaseDetails({ disease }: DiseaseDetailsProps) {
  return (
    <View style={styles.container}>
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
    padding: Math.min(SCREEN_WIDTH * 0.05, SCREEN_HEIGHT * 0.025),
  },
  title: {
    fontSize: Math.min(SCREEN_WIDTH * 0.06, SCREEN_HEIGHT * 0.03),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: Math.min(SCREEN_HEIGHT * 0.01, SCREEN_WIDTH * 0.02),
  },
  date: {
    fontSize: Math.min(SCREEN_WIDTH * 0.035, SCREEN_HEIGHT * 0.018),
    color: '#007AFF',
    marginBottom: Math.min(SCREEN_HEIGHT * 0.015, SCREEN_WIDTH * 0.03),
  },
  details: {
    fontSize: Math.min(SCREEN_WIDTH * 0.04, SCREEN_HEIGHT * 0.02),
    color: '#444',
    lineHeight: Math.min(SCREEN_WIDTH * 0.06, SCREEN_HEIGHT * 0.03),
  },
}); 