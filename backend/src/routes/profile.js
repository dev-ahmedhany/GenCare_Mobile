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
        const user = await User.findById(req.user._id).select('-password');
        const healthRecord = await HealthRecord.findOne({ userId: req.user._id });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'المستخدم غير موجود'
            });
        }

        // تأكد من وجود المصفوفات
        if (!user.savedDiseases) user.savedDiseases = [];
        if (!user.savedWeeks) user.savedWeeks = [];

        res.json({
            success: true,
            data: {
                user: {
                    ...user.toObject(),
                    savedDiseases: user.savedDiseases,
                    savedWeeks: user.savedWeeks
                },
                healthRecord: healthRecord || null
            }
        });
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({
            success: false,
            message: 'حدث خطأ في تحميل البيانات'
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
                    role: user.role,
                    savedWeeks: user.savedWeeks || [],
                    savedDiseases: user.savedDiseases || [],
                    savedBabyNames: user.savedBabyNames || []
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

// حفظ عنصر (أسبوع، مرض، اسم طفل)
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
      case 'week':
        // التحقق من عدم وجود الأسبوع مسبقاً
        const weekExists = user.savedWeeks.some(w => w.week === data.week);
        if (weekExists) {
          return res.status(400).json({
            success: false,
            message: 'هذا الأسبوع محفوظ مسبقاً'
          });
        }

        // إضافة الأسبوع الجديد
        user.savedWeeks.push({
          week: data.week,
          title: data.title,
          description: data.description,
          date: data.date
        });
        break;

      case 'disease':
        // التحقق من عدم وجود المرض مسبقاً
        const diseaseExists = user.savedDiseases.some(d => d.name === data.name);
        if (diseaseExists) {
          return res.status(400).json({
            success: false,
            message: 'هذا المرض محفوظ مسبقاً'
          });
        }

        // إضافة المرض الجديد
        user.savedDiseases.push({
          name: data.name,
          details: data.details,
          date: data.date || new Date().toISOString(),
          risk: data.risk
        });
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
    console.error('Save item error:', error);
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
        console.log('Deleting item:', { type, id }); // للتأكد من البيانات

        const user = await User.findById(req.user._id);
        
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'المستخدم غير موجود' 
            });
        }

        switch (type) {
            case 'disease':
                // تعديل طريقة الحذف لاستخدام _id
                user.savedDiseases = user.savedDiseases.filter(item => 
                    item._id.toString() !== id
                );
                break;
            case 'week':
                user.savedWeeks = user.savedWeeks.filter(item => 
                    item.week !== id
                );
                break;
            case 'babyName':
                user.savedBabyNames = user.savedBabyNames.filter(item => 
                    item._id.toString() !== id
                );
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
            data: { user }
        });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ 
            success: false,
            message: 'حدث خطأ في حذف العنصر',
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
