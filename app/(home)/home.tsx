import { ScrollView, StyleSheet, Animated, NativeSyntheticEvent, NativeScrollEvent, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRef } from 'react';
import { View } from 'react-native';

import Navbar from './(home-components)/navbar';
import UpperSwiper from './(home-components)/upper-swiper';
import WeeksList from './(home-components)/weeks-list';
import BabyNames from './(home-components)/baby-names';
import AiPage from './(home-components)/ai-page';
import DiseasesList from './(home-components)/diseases-list';
import Footer from './(home-components)/footer';

export default function HomeScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    scrollY.setValue(offsetY);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Navbar scrollY={scrollY} />
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <UpperSwiper scrollViewRef={scrollViewRef} />
        <WeeksList />
        <BabyNames />
        <View style={styles.pageContainer}>
          <AiPage />
        </View>
        <View style={styles.pageContainer}>
          <DiseasesList />
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingTop: Platform.OS === 'ios' ? 90 : 70,
  },
  pageContainer: {
    flex: 1,
    marginVertical: 0, // إزالة الهوامش العمودية
    paddingVertical: 0, // إزالة الحشو العمودي
  }
});
