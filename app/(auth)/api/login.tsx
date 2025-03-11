import axios from "axios";
import { API_URL, LOCAL_URL } from '@/config/config';
import { router } from 'expo-router';
import { Alert } from 'react-native'; // استبدل alert بـ Alert
import * as SecureStore from 'expo-secure-store';

const URL = LOCAL_URL;

export const login = async (identifier: string, password: string) => {
  try {
    const response = await axios.post(`${URL}/api/login`, {
      identifier: identifier,
      password: password
    }, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200 && response.data) {
      const token = response.data.token;
      if (!token) {
        throw new Error('Token not found in response');
      }
      try {
        await SecureStore.setItemAsync('token', token);
      } catch (secureStoreError) {
        console.error('Failed to save token:', secureStoreError);
        throw new Error('Failed to save token');
      }

      router.push('/(home)/home');
      
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error: any) {
    console.log('Login error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });

    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || 
                           error.response?.data?.message || 
                           'خطأ في تسجيل الدخول';
      Alert.alert('Error', errorMessage); // استخدام Alert من react-native
    }
    throw error;
  }
};

export default login;