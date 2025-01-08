import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';

export default function AiPage() {
  const handleAITest = () => {
    router.push('/(home)/(home-components)/(pages-components)/ai-page-components');   
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.container}>
        {/* Box 1 - Top Left */}
        <View style={[styles.box, { alignSelf: 'flex-start' }]}>
          <Image 
            source={require('@/assets/images/favicon.png')} 
            style={styles.boxImage} 
          />
          <View style={styles.contentContainer}>
            <ThemedText style={styles.boxTitle}>First Title</ThemedText>
            <ThemedText style={styles.boxDescription}>First Line</ThemedText>
            <ThemedText style={styles.boxDescription}>Second Line</ThemedText>
          </View>
        </View>

        {/* Box 2 - Middle Center */}
        <View style={[styles.box, { alignSelf: 'center' }]}>
          <Image 
            source={require('@/assets/images/favicon.png')} 
            style={styles.boxImage} 
          />
          <View style={styles.contentContainer}>
            <ThemedText style={styles.boxTitle}>Second Title</ThemedText>
            <ThemedText style={styles.boxDescription}>First Line</ThemedText>
            <ThemedText style={styles.boxDescription}>Second Line</ThemedText>
          </View>
        </View>

        {/* Box 3 - Bottom Right */}
        <View style={[styles.box, { alignSelf: 'flex-end' }]}>
          <Image 
            source={require('@/assets/images/favicon.png')} 
            style={styles.boxImage} 
          />
          <View style={styles.contentContainer}>
            <ThemedText style={styles.boxTitle}>Third Title</ThemedText>
            <ThemedText style={styles.boxDescription}>First Line</ThemedText>
            <ThemedText style={styles.boxDescription}>Second Line</ThemedText>
          </View>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.aiButton}
        onPress={handleAITest}
      >
        <ThemedText style={styles.buttonText}>AI Test</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    padding: 20,
    gap: 20,
  },
  box: {
    width: '60%',
    aspectRatio: 1.2,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    marginLeft: 8,
  },
  boxImage: {
    width: '45%',
    height: '100%',
    resizeMode: 'contain',
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
    marginBottom: 4,
  },
  aiButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
