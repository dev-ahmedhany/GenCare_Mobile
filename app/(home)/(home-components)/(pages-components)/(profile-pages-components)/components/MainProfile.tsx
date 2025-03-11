import React, { useState } from 'react';
import { ScrollView, StyleSheet, Animated, Dimensions, View, NativeSyntheticEvent, NativeScrollEvent, RefreshControl } from 'react-native';
import { bgColors } from '@/constants/Colors';
import ProfileInfo from './profile-info/ProfileInfo';
import PregnancySection from './tracker/PregnancyTracker';
import HealthSection from './health-info/HealthSection';
import { HealthData, ExpandedSections, ExpandedCards, ProfileFormData } from '../types/profile.types';
import Navbar from '../../../(navbar)/navbar';
import SavedItems from './saved-items/SavedItems';

export default function MainProfile() {
  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: '',
    age: '',
    phone: '',
    bloodType: '',
    pregnancyWeek: '',
    avatar: 'default.png',
  });

  // بيانات الصحة
  const [currentHealth, setCurrentHealth] = useState<HealthData>({
    bloodPressure: '',
    bloodSugar: '',
    weight: '',
    symptoms: '',
  });

  // قيمة التمرير للتحكم في شريط التنقل
  const scrollY = new Animated.Value(0);

  // حالة الأقسام المفتوحة
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    diseases: false,
    weeks: false,
    babyNames: false,
  });

  // حالة البطاقات المفتوحة
  const [expandedCards, setExpandedCards] = useState<ExpandedCards>({
    healthPredictor: false,
    savedDiseases: false,
    savedItems: false,
  });

  // إضافة حالة التحديث
  const [refreshing, setRefreshing] = useState(false);

  // دالة التحديث عند السحب
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    
    // هنا يمكنك إضافة أي عمليات تحديث للبيانات
    // مثال: إعادة تحميل البيانات من الخادم
    
    // محاكاة وقت التحميل
    setTimeout(() => {
      // إعادة تعيين البيانات أو تحديثها هنا
      
      setRefreshing(false);
    }, 1000);
  }, []);

  // معالجة حدث التمرير
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    scrollY.setValue(offsetY);
  };

  return (
    <View style={styles.mainContainer}>
      <Navbar scrollY={scrollY} showProfile={false} />
      <ScrollView 
        style={styles.container}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['purple']}
            title="refreshing..."
            titleColor={bgColors.light.tint}
          />
        }
      >
        <ProfileInfo 
          formData={formData}
          setFormData={setFormData}
        />
        
        <PregnancySection 
          pregnancyWeek={formData.pregnancyWeek}
          onWeekChange={(week) => {
            setFormData(prev => ({
              ...prev,
              pregnancyWeek: week
            }));
          }}
        />
        
        <HealthSection 
          currentHealth={currentHealth} 
          setCurrentHealth={setCurrentHealth}
          expandedCards={expandedCards}
          setExpandedCards={setExpandedCards}
          expandedSections={expandedSections}
          setExpandedSections={setExpandedSections}
          savedWeeks={[]}
          savedBabyNames={[]}
          onUpdateBabyNames={() => {}}
        />
      <SavedItems />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: bgColors.light.background,
  },
  container: {
    marginTop: Dimensions.get('window').height * 0.15,
    flex: 1,
    backgroundColor: bgColors.light.background,
  },
});