import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function DiseasesList() {
  const handleDiseaseClick = () => {
    router.push('/(home)/(home-components)/(pages-components)/diseases-page-components');
  };

  return (
    <View style={styles.pageContainer}>
      <ThemedText style={styles.mainTitle}>Common Pregnancy Diseases</ThemedText>

      <View style={styles.container}>
        <View style={styles.cardsContainer}>
          {/* Disease 1 */}
          <View style={styles.box}>
            <View style={styles.contentContainer}>
              <ThemedText style={styles.boxTitle}>First Disease</ThemedText>
              <ThemedText style={styles.boxDescription}>Common in early pregnancy</ThemedText>
            </View>
          </View>

          {/* Disease 2 */}
          <View style={styles.box}>
            <View style={styles.contentContainer}>
              <ThemedText style={styles.boxTitle}>Second Disease</ThemedText>
              <ThemedText style={styles.boxDescription}>Monitor blood sugar levels</ThemedText>
            </View>
          </View>

          {/* Disease 3 */}
          <View style={styles.box}>
            <View style={styles.contentContainer}>
              <ThemedText style={styles.boxTitle}>Third Disease</ThemedText>
              <ThemedText style={styles.boxDescription}>High blood pressure during pregnancy</ThemedText>
            </View>
          </View>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.exploreButton}
        onPress={handleDiseaseClick}
      >
        <View style={styles.buttonContent}>
          <ThemedText style={styles.buttonText}>See More</ThemedText>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 5,
    paddingTop: 20,
  },
  mainTitle: {
    marginTop: -5,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4C2F96',
    marginVertical: 20,
  },
  container: {
    flex: 1,
    width: '100%',
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 20,
    height: '100%',
  },
  box: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 8,
    borderLeftColor: '#4C2F96',
  },
  contentContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  boxTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4C2F96',
    marginBottom: 8,
  },
  boxDescription: {
    fontSize: 18,
    color: '#666',
    textAlign: 'left',
  },
  exploreButton: {
    backgroundColor: '#4C2F96',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginVertical: 30,
    marginTop: 40,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
  