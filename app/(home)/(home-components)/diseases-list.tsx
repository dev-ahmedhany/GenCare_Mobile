import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function DiseasesList() {
  const handleDiseaseClick = () => {
    router.push('/(home)/(home-components)/(pages-components)/diseases-page-components');
  };

  return (
    <View style={styles.pageContainer}>
      {/* Left Side Image */}
      <View style={styles.leftSection}>
        <Image 
          source={require('@/assets/images/favicon.png')}
          style={styles.mainImage}
        />
        <TouchableOpacity 
          style={styles.exploreButton}
          onPress={handleDiseaseClick}
        >
          <View style={styles.buttonContent}>
            <Ionicons name="medical-outline" size={24} color="#fff" />
            <ThemedText style={styles.exploreButtonText}>
              Explore Diseases
            </ThemedText>
            <Ionicons name="chevron-forward" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Right Side Boxes */}
      <View style={styles.rightSection}>
        {/* Box 1 */}
        <View style={styles.box}>
          <ThemedText style={styles.boxTitle}>First Disease</ThemedText>
          <ThemedText style={styles.boxDescription}>
            Common in early pregnancy
          </ThemedText>
        </View>

        {/* Box 2 */}
        <View style={styles.box}>
          <ThemedText style={styles.boxTitle}>Second Disease</ThemedText>
          <ThemedText style={styles.boxDescription}>
            Monitor blood sugar levels
          </ThemedText>
        </View>

        {/* Box 3 */}
        <View style={styles.box}>
          <ThemedText style={styles.boxTitle}>Third Disease</ThemedText>
          <ThemedText style={styles.boxDescription}>
            High blood pressure during pregnancy
          </ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
  },
  leftSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightSection: {
    width: '40%',
    gap: 15,
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  boxDescription: {
    fontSize: 14,
    color: '#666',
  },
  mainImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  mainImageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  exploreButton: {
    backgroundColor: '#007AFF',
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '80%',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
