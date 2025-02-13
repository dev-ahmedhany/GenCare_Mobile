const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const User = require('../models/User');
const HealthRecord = require('../models/HealthRecord');
const jwt = require('jsonwebtoken');

// middleware للتحقق من التوكن
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'No token provided' 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        if (!decoded || !decoded.userId) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid token' 
            });
        }

        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'User not found' 
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({ 
            success: false, 
            message: 'Invalid token' 
        });
    }
};

// الحصول على الملف الشخصي
router.get('/', authMiddleware, async (req, res) => {
    try {
        // التحقق من وجود المستخدم أولاً
        if (!req.user || !req.user._id) {
            return res.status(401).json({ 
                success: false, 
                message: 'غير مصرح به' 
            });
        }

        // جلب البيانات
        const [user, healthRecord] = await Promise.all([
            User.findById(req.user._id).select('-password'),
            HealthRecord.findOne({ userId: req.user._id })
        ]);

        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'المستخدم غير موجود' 
            });
        }

        // إرجاع البيانات
        res.json({ 
            success: true, 
            data: {
                user: {
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    phone: user.phone,
                    age: user.age,
                    bloodType: user.bloodType,
                    pregnancyWeek: user.pregnancyWeek,
                    role: user.role,
                    notifications: user.notifications || [],
                    savedDiseases: user.savedDiseases || [],
                    savedWeeks: user.savedWeeks || [],
                    savedBabyNames: user.savedBabyNames || []
                },
                healthRecord: healthRecord || null
            }
        });
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'حدث خطأ في تحميل البيانات',
            error: error.message 
        });
    }
});

// تحديث الملف الشخصي
router.put('/update', authMiddleware, async (req, res) => {
    try {
        // التحقق من وجود المستخدم
        if (!req.user || !req.user._id) {
            return res.status(401).json({ 
                success: false, 
                message: 'غير مصرح به' 
            });
        }

        const updates = req.body;
        // حذف الحقول التي لا نريد تحديثها
        delete updates.password;
        delete updates._id;

        // تحديث البيانات
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { $set: updates },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'المستخدم غير موجود' 
            });
        }

        res.json({ 
            success: true, 
            message: 'تم تحديث الملف الشخصي بنجاح',
            data: {
                user: {
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    phone: user.phone,
                    age: user.age,
                    bloodType: user.bloodType,
                    pregnancyWeek: user.pregnancyWeek,
                    role: user.role
                }
            }
        });
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'حدث خطأ في تحديث الملف الشخصي',
            error: error.message 
        });
    }
});

// تحديث البيانات الصحية
router.put('/health', authMiddleware, async (req, res) => {
    try {
        // التحقق من وجود المستخدم
        if (!req.user || !req.user._id) {
            return res.status(401).json({ 
                success: false, 
                message: 'غير مصرح به' 
            });
        }

        const { bloodPressure, bloodSugar, weight, symptoms } = req.body;
        
        let healthRecord = await HealthRecord.findOne({ userId: req.user._id });
        
        if (!healthRecord) {
            healthRecord = new HealthRecord({
                userId: req.user._id,
                bloodPressure,
                bloodSugar,
                weight,
                symptoms
            });
        } else {
            healthRecord.bloodPressure = bloodPressure;
            healthRecord.bloodSugar = bloodSugar;
            healthRecord.weight = weight;
            healthRecord.symptoms = symptoms;
        }

        await healthRecord.save();
        
        res.json({ 
            success: true, 
            message: 'تم تحديث البيانات الصحية بنجاح',
            data: {
                healthRecord: {
                    bloodPressure: healthRecord.bloodPressure,
                    bloodSugar: healthRecord.bloodSugar,
                    weight: healthRecord.weight,
                    symptoms: healthRecord.symptoms
                }
            }
        });
    } catch (error) {
        console.error('Error updating health data:', error);
        res.status(500).json({ 
            success: false, 
            message: 'حدث خطأ في تحديث البيانات الصحية',
            error: error.message 
        });
    }
});

// save items (diseases, weeks, baby names)
router.post('/save-item', authMiddleware, async (req, res) => {
  try {
    const { type, data } = req.body;
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'المستخدم غير موجود' 
      });
    }

    switch (type) {
      case 'disease':
        if (!user.savedDiseases) user.savedDiseases = [];
        user.savedDiseases.push(data);
        break;
      case 'week':
        if (!user.savedWeeks) user.savedWeeks = [];
        if (!user.savedWeeks.find(w => w.week === data.week)) {
          user.savedWeeks.push(data);
        }
        break;
      case 'babyName':
        if (!user.savedBabyNames) user.savedBabyNames = [];
        user.savedBabyNames.push(data);
        break;
      default:
        return res.status(400).json({ 
          success: false,
          message: 'نوع غير صالح' 
        });
    } 

    await user.save();
    res.json({ 
      success: true,
      message: 'تم الحفظ بنجاح',
      data: { user }
    });
  } catch (error) {
    console.error('Error saving item:', error);
    res.status(500).json({ 
      success: false,
      message: 'حدث خطأ في حفظ العنصر'
    });
  }
});

// delete saved items
router.delete('/saved-item/:type/:id', authMiddleware, async (req, res) => {
    try {
        const { type, id } = req.params;
        const user = await User.findById(req.user._id);
        
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'المستخدم غير موجود' 
            });
        }

        switch (type) {
            case 'disease':
                user.savedDiseases = user.savedDiseases.filter(item => item._id.toString() !== id);
                break;
            case 'week':
                user.savedWeeks = user.savedWeeks.filter(item => item._id.toString() !== id);
                break;
            case 'babyName':
                user.savedBabyNames = user.savedBabyNames.filter(item => item._id.toString() !== id);
                break;
            default:
                return res.status(400).json({ 
                    success: false,
                    message: 'نوع غير صالح' 
                });
        }

        await user.save();
        res.json({ 
            success: true,
            message: 'تم حذف العنصر بنجاح',
            user
        });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ 
            success: false,
            message: 'خطأ في الخادم',
            error: error.message
        });
    }
});

// get health record
router.get('/health-record', authMiddleware, async (req, res) => {
    try {
        const healthRecord = await HealthRecord.findOne({ userId: req.user._id });
        if (!healthRecord) {
            return res.status(404).json({ 
                success: false,
                message: 'السجل الصحي غير موجود' 
            });
        }
        res.json({ 
            success: true,
            healthRecord 
        });
    } catch (error) {
        console.error('Error fetching health record:', error);
        res.status(500).json({ 
            success: false,
            message: 'حدث خطأ في الخادم',
            error: error.message 
        });
    }
});
 
module.exports = router;
