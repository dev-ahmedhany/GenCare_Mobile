import { View, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import { useState, useRef } from 'react';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75; // Card takes 75% of screen width

const steps = [
  {
    id: '1',
    image: require('@/assets/ai_components/home/card1.jpg'),
    title: 'Step 1',
    description: 'Sonographic Image'
  },
  {
    id: '2',
    image: require('@/assets/ai_components/home/card2.jpg'),
    title: 'Step 2',
    description: 'Upload Image'
  },
  {
    id: '3',
    image: require('@/assets/ai_components/home/card3.jpg'),
    title: 'Step 3',
    description: 'AI Result'
  }
];

export default function AiPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    setActiveIndex(index);
  };

  const handleAITest = () => {
    router.push('/(home)/(home-components)/(pages-components)/ai-page-components');   
  };

  return (
    <View style={styles.pageContainer}>
        <ThemedText style={styles.mainTitle}>Fetal's Brain Disease Test</ThemedText>
        
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollContent}
          decelerationRate="fast"
          snapToInterval={CARD_WIDTH + 20} // Card width + spacing
          snapToAlignment="center"
        >
          {steps.map((item, index) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.imageContainer}>
                <Image 
                  source={item.image}
                  style={styles.image}
                  resizeMode="cover"
                />
                <View style={styles.overlay} />
                <View style={styles.stepIndicator}>
                  <ThemedText style={styles.stepNumber}>{index + 1}/3</ThemedText>
                </View>
              </View>
              <View style={styles.textContainer}>
                <ThemedText style={styles.stepTitle}>{item.title}</ThemedText>
                <ThemedText style={styles.description}>{item.description}</ThemedText>
              </View>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity 
          style={styles.aiButton}
          onPress={handleAITest}
        >
          <ThemedText style={styles.buttonText}>Start Test</ThemedText>
        </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    width: '100%',
    height: height * 0.70,
    marginBottom: 15,
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 25,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    height: '95%',
    width: '95%',
    alignSelf: 'center',
    padding: 15,
  },
  mainTitle: {
    fontSize: 24,
    color: '#4C2F96',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  scrollContent: {
    paddingHorizontal: 10,
    alignItems: 'center',
    paddingBottom: 60,
  },
  card: {
    width: CARD_WIDTH,
    height: height * 0.45,
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  imageContainer: {
    width: '100%',
    height: '65%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(76, 47, 150, 0.1)', // Light purple overlay
  },
  stepIndicator: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(76, 47, 150, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  stepNumber: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  textContainer: {
    padding: 20,
    alignItems: 'center',
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4C2F96',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  aiButton: {
    backgroundColor: '#4C2F96',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    position: 'absolute',
    bottom: 25,
    alignSelf: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
