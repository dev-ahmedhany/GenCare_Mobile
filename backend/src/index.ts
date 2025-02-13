import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import profileRoutes from './routes/profile';
import navbarRoutes from './routes/navbar';

const app = express();

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// إضافة middleware للتحقق من وصول الطلبات
app.use((req, res, next) => {
    console.log('Incoming request:', {
        method: req.method,
        path: req.url,
        body: req.body,
        headers: req.headers
    });
    next();
});

// الاتصال بقاعدة البيانات
connectDB().then(() => {
    console.log('Successfully connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// تسجيل المسارات
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/profile', profileRoutes);
app.use('/navbar', navbarRoutes);

// معالجة الأخطاء العامة
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'حدث خطأ في الخادم' });
});

const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on:`);
    console.log(`- http://localhost:${PORT}`);
    console.log(`- http://10.0.2.2:${PORT}`);
    console.log(`- http://127.0.0.1:${PORT}`);
}); 