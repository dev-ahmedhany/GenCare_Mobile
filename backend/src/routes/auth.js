const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
    console.log('Received signup request:', req.body);
    try {
        const { fullName, email, password, phone } = req.body;
        
        // التحقق من وجود المستخدم
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false,
                message: 'Email already exists' 
            });
        }

        // إنشاء مستخدم جديد
        const user = new User({
            fullName,
            phone,
            email,
            password
        });

        await user.save();

        // إنشاء توكن المصادقة للمستخدم الجديد
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );

        res.status(201).json({ 
            success: true,
            message: 'User created successfully',
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email
            },
            token
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error creating user',
            error: error.message 
        });
    }
});

router.post('/login', async (req, res) => {
    console.log('Received login request:', req.body);
    try {
        const { identifier, password } = req.body;
        
        // التحقق من وجود البيانات المطلوبة
        console.log('Checking if identifier and password are provided...');
        if (!identifier || !password) {
            console.log('Missing credentials');
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide both identifier and password' 
            });
        }

        // البحث عن المستخدم
        console.log('Searching for user...');
        const user = await User.findOne({
            $or: [
                { email: identifier },
                { phone: identifier }
            ]
        });
        console.log('User search result:', user ? 'User found' : 'User not found');

        if (!user) {
            console.log('Invalid credentials - user not found');
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid credentials' 
            });
        }

        // استخدام bcrypt.compare للتحقق من كلمة المرور
        console.log('Checking password with bcrypt...');
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('Password valid:', isPasswordValid);

        if (!isPasswordValid) {
            console.log('Invalid credentials - wrong password');
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid credentials' 
            });
        }

        // إنشاء توكن المصادقة
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );

        console.log('Login successful');
        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email
            },
            token
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error during login',
            error: error.message 
        });
    }
});


module.exports = router;
