import axios from 'axios';
import config from '@/app/config/config';

// إنشاء instance من axios مع الإعدادات الأساسية
const api = axios.create({
    baseURL: config.apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

// إضافة interceptors للتعامل مع الأخطاء
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // خطأ من السيرفر
            console.error('Server Error:', error.response.data);
        } else if (error.request) {
            // لم يصل الطلب للسيرفر
            console.error('Network Error:', error.request);
        } else {
            // خطأ في إعداد الطلب
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

// تعريف الـ API endpoints
export const authAPI = {
    signup: (data: {
        fullName: string;
        email: string;
        password: string;
        phone: string;
    }) => {
        return api.post('/auth/signup', data);
    },
    
    login: (data: { email: string; password: string }) => {
        return api.post('/auth/login', data);
    },
};

export const userAPI = {
    getProfile: () => {
        return api.get('/user/profile');
    },
    updateProfile: (data: any) => {
        return api.put('/user/profile', data);
    },
};

export default api; 