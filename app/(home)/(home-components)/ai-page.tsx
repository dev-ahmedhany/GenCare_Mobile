import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';

export default function AiPage() {
  const handleAITest = () => {
    router.push('/(home)/(home-components)/(pages-components)/ai-page-components');   
  };

  return (
    <View style={styles.pageContainer}>
      {/* Title Section */}
      <ThemedText style={styles.mainTitle}>Fetal's Brain Disease Test</ThemedText>

      <View style={styles.container}>
        {/* Cards Row */}
        <View style={styles.cardsContainer}>
          {/* Step 1 Card */}
          <View style={styles.box}>
            <Image 
              source={require('@/assets/ai_components/home/card1.jpg')} 
              style={styles.boxImage} 
            />
            <View style={styles.contentContainer}>
              <ThemedText style={styles.boxTitle}>Step 1</ThemedText>
              <ThemedText style={styles.boxDescription}>Sonographic Image</ThemedText>
            </View>
          </View>

          {/* Step 2 Card */}
          <View style={styles.box}>
            <Image 
              source={require('@/assets/ai_components/home/card2.jpg')} 
              style={styles.boxImage} 
            />
            <View style={styles.contentContainer}>
              <ThemedText style={styles.boxTitle}>Step 2</ThemedText>
              <ThemedText style={styles.boxDescription}>Upload Image</ThemedText>
            </View>
          </View>

          {/* Step 3 Card */}
          <View style={styles.box}>
            <Image 
              source={require('@/assets/ai_components/home/card3.jpg')} 
              style={styles.boxImage} 
            />
            <View style={styles.contentContainer}>
              <ThemedText style={styles.boxTitle}>Step 3</ThemedText>
              <ThemedText style={styles.boxDescription}>AI Result</ThemedText>
            </View>
          </View>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.aiButton}
        onPress={handleAITest}
      >
        <ThemedText style={styles.buttonText}>Test</ThemedText>
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
    color: '#4C2F96',
    fontWeight: 'bold',
    textAlign: 'center',
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
  boxImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
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
    textAlign: 'center',
  },
  aiButton: {
    backgroundColor: '#4C2F96',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginVertical: 30,
    marginTop: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
