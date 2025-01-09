import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

import Navbar from './(home-components)/navbar';
import UpperSwiper from './(home-components)/upper-swiper';
import WeeksList from './(home-components)/weeks-list';
import BabyNames from './(home-components)/baby-names';
import AiPage from './(home-components)/ai-page';
import DiseasesList from './(home-components)/diseases-list';
import Footer from './(home-components)/footer';


export default function HomeScreen() {
  const handleScroll = (event: any) => {
    // يمكن إزالة هذه الدالة إذا لم تعد مطلوبة
  };

  return (
    <SafeAreaView style={styles.container}>
      <Navbar />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <UpperSwiper />
        <WeeksList />
        <BabyNames />
        <AiPage />
        <DiseasesList />
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
  },
  scrollViewContent: {
    paddingTop: 60, // ارتفاع الـ Navbar
  },
});
