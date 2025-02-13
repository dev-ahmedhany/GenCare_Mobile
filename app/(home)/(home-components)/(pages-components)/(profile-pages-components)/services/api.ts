import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@/app/config/config';

// إنشاء مثيل axios مع الإعدادات الأساسية
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// إضافة interceptor لإضافة التوكن لكل الطلبات
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// إضافة interceptor للرد للتعامل مع أخطاء المصادقة
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // إعادة توجيه المستخدم لصفحة تسجيل الدخول
      // يمكنك استخدام navigation أو أي طريقة أخرى للتوجيه
      await AsyncStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

// خدمات الملف الشخصي
export const profileService = {
  // جلب بيانات الملف الشخصي
  getProfile: async () => {
    try {
      const response = await api.get('/profile');
      console.log('Profile API response:', response.data); // للتأكد من البيانات
      return response.data;
    } catch (error) {
      console.error('Profile API error:', error);
      throw error;
    }
  },

  // تحديث البيانات الشخصية
  updateProfile: async (data: any) => {
    try {
      console.log('Updating profile with data:', data);
      const response = await api.put('/profile/update', data);
      console.log('Update response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  },

  // تحديث البيانات الصحية
  updateHealth: async (data: any) => {
    try {
      console.log('Updating health data:', data);
      const response = await api.put('/profile/health', data);
      console.log('Health update response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Health update error:', error);
      throw error;
    }
  },

  // حفظ عنصر (مرض، أسبوع، اسم طفل)
  saveItem: async (type: string, data: any) => {
    try {
      const response = await api.post('/profile/save-item', { type, data });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // حذف عنصر محفوظ
  deleteItem: async (type: string, id: string) => {
    try {
      const response = await api.delete(`/profile/saved-item/${type}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}; 