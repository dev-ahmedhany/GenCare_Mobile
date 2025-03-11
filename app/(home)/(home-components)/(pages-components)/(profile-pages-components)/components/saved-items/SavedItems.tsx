import React, { useState } from 'react';
import { SavedItemsSection } from './SavedItemsSection';
import { SavedDisease, ExpandedSections } from '../../types/profile.types';
import { BabyName } from '@/data/babyNames';

// نوع البيانات للأقسام المفتوحة
type SectionName = 'weeks' | 'diseases' | 'babyNames';

const SavedItems = () => {
  // تعريف حالة الأقسام المفتوحة
  const [expandedSections, setExpandedSections] = useState<SectionName[]>([]);
  
  // بيانات افتراضية - استبدلها بالبيانات الفعلية من API أو مخزن الحالة
  const savedWeeks: Array<{ week: string; date: string }> = [];
  const savedDiseases: SavedDisease[] = [];
  const savedBabyNames: Array<{ letter: string; names: BabyName[] }> = [];
  
  // دالة لتبديل حالة القسم (مفتوح/مغلق)
  const toggleSection = (section: SectionName) => {
    if (expandedSections.includes(section)) {
      setExpandedSections(expandedSections.filter(s => s !== section));
    } else {
      setExpandedSections([...expandedSections, section]);
    }
  };
  
  // دوال الحذف
  const onDeleteWeek = (id: string) => {
    // منطق حذف الأسبوع
    console.log('Delete week', id);
  };
  
  const onDeleteDisease = (id: string) => {
    // منطق حذف المرض
    console.log('Delete disease', id);
  };
  
  return (
    <SavedItemsSection
      expandedSections={expandedSections as unknown as ExpandedSections}
      toggleSection={toggleSection}
      savedWeeks={savedWeeks}
      savedDiseases={savedDiseases}
      savedBabyNames={savedBabyNames}
      onDeleteWeek={onDeleteWeek}
      onDeleteDisease={onDeleteDisease}
    />
  );
};

export default SavedItems;  