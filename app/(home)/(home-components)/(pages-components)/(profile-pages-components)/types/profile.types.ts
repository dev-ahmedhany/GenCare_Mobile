export interface FormData {
  fullName: string;
  address: string;
  age: string;
  pregnancyWeek: string;
  phone: string;
  email: string;
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

// إضافة مكون افتراضي فارغ
const ProfileTypes = () => null;
export default ProfileTypes;
