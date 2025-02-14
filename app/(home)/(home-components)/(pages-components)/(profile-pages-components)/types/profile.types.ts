export interface FormData {
  fullName: string;
  age: string;
  pregnancyWeek: string;
  phone: string;
  bloodType: string;
}

export interface HealthData {
  bloodPressure: string;
  bloodSugar: string;
  weight: string;
  symptoms: string;
}

export interface Disease {
  name: string;
  risk: string;
  symptoms: string[];
  nextCheckup: string;
}

export interface ExpandedSections {
  diseases: boolean;
  weeks: boolean;
  babyNames: boolean;
}

export interface ExpandedCards {
  healthPredictor: boolean;
  savedDiseases: boolean;
  savedItems: boolean;
}

export interface SavedDisease {
  _id: string;
  name: string;
  date: string;
  details?: string;
  risk?: string;
}

interface HealthSectionProps {
  savedDiseases?: SavedDisease[];
  onDeleteDisease?: (id: string) => void;
}

// إضافة مكون افتراضي فارغ
const ProfileTypes = () => null;
export default ProfileTypes;
