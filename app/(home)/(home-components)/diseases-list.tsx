import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function DiseasesList() {
  const handleDiseaseClick = () => {
    router.push('/(home)/(home-components)/(pages-components)/diseases-page-components');
  };

  return (
    <View style={styles.pageContainer}>
      <ThemedText style={styles.mainTitle}>Common Pregnancy Diseases</ThemedText>

      <View style={styles.container}>
        {/* Disease 1 */}
        <TouchableOpacity style={styles.card} onPress={handleDiseaseClick}>
          <View style={styles.iconContainer}>
            <Ionicons name="medical-outline" size={24} color="#4C2F96" />
          </View>
          <View style={styles.contentContainer}>
            <ThemedText style={styles.boxTitle}>First Disease</ThemedText>
            <ThemedText style={styles.boxDescription}>Common in early pregnancy</ThemedText>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#4C2F96" />
        </TouchableOpacity>

        {/* Disease 2 */}
        <TouchableOpacity style={styles.card} onPress={handleDiseaseClick}>
          <View style={styles.iconContainer}>
            <Ionicons name="fitness-outline" size={24} color="#4C2F96" />
          </View>
          <View style={styles.contentContainer}>
            <ThemedText style={styles.boxTitle}>Second Disease</ThemedText>
            <ThemedText style={styles.boxDescription}>Monitor blood sugar levels</ThemedText>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#4C2F96" />
        </TouchableOpacity>

        {/* Disease 3 */}
        <TouchableOpacity style={styles.card} onPress={handleDiseaseClick}>
          <View style={styles.iconContainer}>
            <Ionicons name="heart-outline" size={24} color="#4C2F96" />
          </View>
          <View style={styles.contentContainer}>
            <ThemedText style={styles.boxTitle}>Third Disease</ThemedText>
            <ThemedText style={styles.boxDescription}>High blood pressure during pregnancy</ThemedText>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#4C2F96" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.exploreButton}
        onPress={handleDiseaseClick}
      >
        <View style={styles.buttonContent}>
          <ThemedText style={styles.buttonText}>See All Diseases</ThemedText>
          <Ionicons name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 8 }} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    width: '100%',
    height: height * 0.63,
    padding: 15,
    marginBottom: 15,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4C2F96',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    gap: 15,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: 'rgba(76, 47, 150, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  contentContainer: {
    flex: 1,
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4C2F96',
    marginBottom: 4,
  },
  boxDescription: {
    fontSize: 14,
    color: '#666',
  },
  exploreButton: {
    backgroundColor: '#4C2F96',
    paddingVertical: 16,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
  