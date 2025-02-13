const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth.middleware');
const User = require('../models/User');

// الحصول على معلومات المستخدم والإشعارات
router.get('/user-info', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select('fullName email phone notifications role');
        
        res.json({
            success: true,
            user: {
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                role: user.role,
                notifications: user.notifications || []
            }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching user info' 
        });
    }
});

// تحديث حالة قراءة الإشعارات
router.post('/notifications/read', authMiddleware, async (req, res) => {
    try {
        const { notificationIds } = req.body;
        
        await User.updateOne(
            { _id: req.user._id },
            { 
                $set: { 
                    'notifications.$[elem].isRead': true 
                } 
            },
            { 
                arrayFilters: [{ 'elem.id': { $in: notificationIds } }] 
            }
        );

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error updating notifications' 
        });
    }
});

// حذف الإشعارات
router.delete('/notifications/clear', authMiddleware, async (req, res) => {
    try {
        await User.updateOne(
            { _id: req.user._id },
            { $set: { notifications: [] } }
        );

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error clearing notifications' 
        });
    }
});

// تحديث إعدادات الناف بار
router.post('/settings', authMiddleware, async (req, res) => {
    try {
        const { showNotifications, showProfile } = req.body;
        // يمكنك حفظ هذه الإعدادات في قاعدة البيانات
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: 'Error updating navbar settings' });
    }
});

module.exports = router;
