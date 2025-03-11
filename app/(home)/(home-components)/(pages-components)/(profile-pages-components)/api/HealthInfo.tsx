import { API_URL, LOCAL_URL } from "@/config/config";
import axios from "axios";
const URL = LOCAL_URL;
import * as SecureStore from 'expo-secure-store';
import { HealthData } from "../types/profile.types";

export const getHealthInfo = async () => {
    try {
        const token = await SecureStore.getItemAsync('token');
        const response = await axios.get(`${URL}/api/healthInfo`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }); 
        return response.data;
    } catch (error) {
        console.error('Error fetching health info:', error);
        throw error;
    }
};

export const updateHealthInfo = async (data: HealthData) => {
    const token = await SecureStore.getItemAsync('token');
    const response = await axios.put(`${URL}/api/healthInfo`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export default { getHealthInfo, updateHealthInfo };
