import { API_URL, LOCAL_URL } from "@/config/config";
import axios from "axios";
const URL = LOCAL_URL;
import * as SecureStore from 'expo-secure-store';
import { ProfileFormData } from "../../../types/profile.types";

// إضافة بيانات افتراضية للاستخدام في حالة فشل الاتصال بالخادم
const defaultProfileData: ProfileFormData = {
    fullName: '',
    age: '',
    phone: '',
    bloodType: '',
    pregnancyWeek: '',
    avatar: 'default.png'
};

export const getPersonalInfo = async () => {
    try {
        const token = await SecureStore.getItemAsync('token');

        console.log('API URL:', `${URL}/api/personalInfo`);
        
        const response = await axios.get(`${URL}/api/personalInfo`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        console.log('API Response:', response.data);
        
        if (response.data && response.data.personalInfo) {
            return response.data.personalInfo;
        } else if (response.data) {
            return response.data;
        }
        
        return defaultProfileData;
    } catch (error) {
        console.error('Error fetching personal info:', error);
        console.log('Error details:', (error as any).response?.data || 'No response data');
        
        return defaultProfileData;
    }
};

export const updatePersonalInfo = async (data: Partial<ProfileFormData>) => {
    try {
        const token = await SecureStore.getItemAsync('token');
        
        // تغيير المسار إلى المسار الصحيح المستخدم في الباك إند
        console.log('Update API URL:', `${URL}/api/personalInfo`);
        console.log('Update Data:', data);
        
        const response = await axios.put(`${URL}/api/personalInfo`, { personalInfo: data }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        console.log('Update API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating personal info:', error);
        console.log('Update Error details:', (error as any).response?.data || 'No response data');
        throw error;
    }
};

export default { getPersonalInfo, updatePersonalInfo };
