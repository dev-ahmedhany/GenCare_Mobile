import { View, StyleSheet, Image, Animated, FlatList, Dimensions, useWindowDimensions, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useEffect, useRef, useState } from 'react';

const slides = [
  {
    id: '1',
    image: require('@/assets/home_swiper/swiper_card1.jpeg'),
    title: 'Check Posssibilities Of Fetal Diseases ',
    button: 'AI Test'
  },
  {
    id: '2',
    image: require('@/assets/home_swiper/swiper_card2.jpeg'),
    title: 'Want Baby Name ? Check Out Our Baby Names Lists',
    button: 'Baby Names'
  },
  {
    id: '3',
    image: require('@/assets/home_swiper/swiper_card3.jpeg'),
    title: 'What Does Your Baby Look Like Now?',
    button: 'Show My Baby'
  }
];

type Slide = {
  id: string;
  image: any;
  title: string;
  button: string;
};

export default function UpperSwiper({ scrollViewRef }: { scrollViewRef?: React.RefObject<ScrollView> }) {
  const flatListRef = useRef<FlatList>(null);
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animation للـ fade
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Timer للتحريك التلقائي
    const timer = setInterval(() => {
      if (currentIndex < slides.length - 1) {
        flatListRef.current?.scrollToIndex({
          index: currentIndex + 1,
          animated: true
        });
      } else {
        flatListRef.current?.scrollToIndex({
          index: 0,
          animated: true
        });
      }
    }, 3000); // كل 3 ثواني

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleButtonPress = (buttonType: string) => {
    if (scrollViewRef?.current) {
      switch (buttonType) {
        case 'AI Test':
          scrollViewRef.current?.scrollTo({
            y: 1200, // المسافة للقسم الأول
            animated: true
          });
          break;
        case 'Baby Names':
          scrollViewRef.current?.scrollTo({
            y: 1800, // المسافة للقسم الثاني
            animated: true
          });
          break;
        case 'Show My Baby':
          scrollViewRef.current?.scrollTo({
            y: 2400, // المسافة للقسم الثالث
            animated: true
          });
          break;
      }
    }
  };

  const renderItem = ({ item }: { item: Slide }) => (
    <View style={[styles.slide, { width }]}>
      <View style={styles.cardContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image 
              source={item.image}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          
          <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
            <ThemedText style={styles.title}>{item.title}</ThemedText>
            
            <TouchableOpacity 
              style={styles.button}
              onPress={() => handleButtonPress(item.button)}
            >
              <ThemedText style={styles.buttonText}>{item.button}</ThemedText>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );

  const renderDots = () => (
    <View style={styles.pagination}>
      {slides.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            { backgroundColor: index === currentIndex ? '#007AFF' : '#ccc' }
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(newIndex);
        }}
      />
      {renderDots()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 550,
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  slide: {
    padding: 20,
    height: '100%',
    justifyContent: 'center',
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    height: '80%',
    width: '95%',
    alignSelf: 'center',
    position: 'relative',
    marginBottom: 80,
    padding: 15,
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    height: '100%',
    zIndex: 1,
  },
  imageContainer: {
    width: 250,
    height: 200,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flex: 1,
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#89CFF0',
    textAlign: 'center',
    paddingHorizontal: 10,
    marginTop: -20,
  },
  subtitle: {
    fontSize: 18,
    color: '#89CFF0',
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 70,
    alignSelf: 'center',
    zIndex: 2,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: '#89CFF0',
  },
  button: {
    backgroundColor: '#89CFF0',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    marginTop: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
