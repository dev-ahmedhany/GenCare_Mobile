import { API_URL, LOCAL_URL } from "@/config/config";
import axios from "axios";
const URL = LOCAL_URL;
import * as SecureStore from 'expo-secure-store';
import { HealthData } from "../../../types/profile.types";

// بيانات صحية افتراضية في حالة فشل الاتصال
const defaultHealthData: HealthData = {
    bloodPressure: '',
    bloodSugar: '',
    weight: '',
    symptoms: '',
};

export const getHealthInfo = async () => {
    try {
        const token = await SecureStore.getItemAsync('token');
        console.log('Health API URL:', `${URL}/api/healthInfo`);
        
        const response = await axios.get(`${URL}/api/healthInfo`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        console.log('Health API Response:', response.data);
        
        // التعامل مع أشكال مختلفة من البيانات
        if (response.data && response.data.healthInfo) {
            return response.data.healthInfo;
        } else if (response.data) {
            return response.data;
        }
        
        return defaultHealthData;
    } catch (error) {
        console.error('Error fetching health info:', error);
        // في حالة الخطأ 404 (البيانات غير موجودة)، قم بإنشاء بيانات جديدة
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            try {
                await createHealthInfo(defaultHealthData);
                return defaultHealthData;
            } catch (createError) {
                console.error('Error creating health info:', createError);
            }
        }
        return defaultHealthData;
    }
};

export const createHealthInfo = async (data: HealthData) => {
    try {
        const token = await SecureStore.getItemAsync('token');
        console.log('Create Health API URL:', `${URL}/api/healthInfo`);
        console.log('Create Health Data:', data);
        
        const response = await axios.post(`${URL}/api/healthInfo`, { healthInfo: data }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        console.log('Create Health API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating health info:', error);
        throw error;
    }
};

export const updateHealthInfo = async (data: HealthData) => {
    try {
        const token = await SecureStore.getItemAsync('token');
        console.log('Update Health API URL:', `${URL}/api/healthInfo`);
        console.log('Update Health Data:', data);
        
        const response = await axios.put(`${URL}/api/healthInfo`, { healthInfo: data }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        console.log('Update Health API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating health info:', error);
        // في حالة الخطأ 404 (البيانات غير موجودة)، قم بإنشاء بيانات جديدة
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return createHealthInfo(data);
        }
        throw error;
    }
};

export default { getHealthInfo, updateHealthInfo, createHealthInfo };
