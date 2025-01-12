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
      <View style={styles.contentContainer}>
        <Image 
          source={item.image}
          style={styles.image}
          resizeMode="contain"
        />
        
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
      <Image 
        source={require('@/assets/home_swiper/blueTopLeft.jpeg')}
        style={styles.topLeftImage}
      />
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
    marginTop: 10,
    alignItems: 'center',
    height: 550,
    backgroundColor: '#fff',
    width: '100%',
  },
  slide: {
    padding: 20,
    height: '100%'
    },
  contentContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  image: {
    width: 350,
    height: 300,
    marginBottom: -50,
    zIndex: 1,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    flex: 1,
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#89CFF0',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#89CFF0',
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  topLeftImage: {
    position: 'absolute',
    marginTop: -180,
    left: -30,
    width: 200,
    height: 250,
    zIndex: 0,
  },
  button: {
    backgroundColor: '#89CFF0',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    
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
