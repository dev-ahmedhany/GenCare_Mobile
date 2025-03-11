import { API_URL, LOCAL_URL } from "@/config/config";
import axios from "axios";
const URL = LOCAL_URL;
import * as SecureStore from 'expo-secure-store';
import { ProfileFormData } from "../types/profile.types";

export const getPersonalInfo = async () => {
    try {
        const token = await SecureStore.getItemAsync('token');
        const response = await axios.get(`${URL}/api/personalInfo`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching personal info:', error);
        throw error;
    }
};

export const updatePersonalInfo = async (data: Partial<ProfileFormData>) => {
    try {
        const token = await SecureStore.getItemAsync('token');
        const response = await axios.put(`${URL}/api/personalInfo`, { personalInfo: data }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating personal info:', error);
        throw error;
    }
};


export default { getPersonalInfo, updatePersonalInfo };
