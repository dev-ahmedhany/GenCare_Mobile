const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const User = require('../models/User');
const HealthRecord = require('../models/HealthRecord');

// get profile data from database
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const healthRecord = await HealthRecord.findOne({ userId: req.user.id });
    
    res.json({
      profile: user,
      health: healthRecord || {}
    });
  } catch (err) {
    console.error('Error fetching profile data:', err);
    res.status(500).send('Server error');
  }
});

// update profile data
router.put('/update', auth, async (req, res) => {
  try {
    const { fullName, age, phone, bloodType, pregnancyWeek } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // update profile data
    if (fullName) user.fullName = fullName;
    if (age) user.age = age;
    if (phone) user.phone = phone;
    if (bloodType) user.bloodType = bloodType;
    if (pregnancyWeek) user.pregnancyWeek = pregnancyWeek;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error('Error updating profile data:', err);
    res.status(500).send('Server error');
  }
});

// update health data
router.put('/health', auth, async (req, res) => {
  try {
    const { bloodPressure, bloodSugar, weight, symptoms } = req.body;
    
    let healthRecord = await HealthRecord.findOne({ userId: req.user.id });
    
    if (!healthRecord) {
      // create new health record if it doesn't exist
      healthRecord = new HealthRecord({
        userId: req.user.id,
        bloodPressure,
        bloodSugar,
        weight,
        symptoms
      });
    } else {
      // update existing health record
      if (bloodPressure) healthRecord.bloodPressure = bloodPressure;
      if (bloodSugar) healthRecord.bloodSugar = bloodSugar;
      if (weight) healthRecord.weight = weight;
      if (symptoms) healthRecord.symptoms = symptoms;
    }

    await healthRecord.save();
    res.json(healthRecord);
  } catch (err) {
    console.error('Error updating health data:', err);
    res.status(500).send('Server error');
  }
});

// save items (diseases, weeks, baby names)
router.post('/save-item', auth, async (req, res) => {
  try {
    const { type, data } = req.body;
    const user = await User.findById(req.user.id);
    
    if (!user) return res.status(404).json({ msg: 'User not found' });

    switch (type) {
      case 'disease':
        if (!user.savedDiseases) user.savedDiseases = [];
        user.savedDiseases.push(data);
        break;
      case 'week':
        if (!user.savedWeeks) user.savedWeeks = [];
        user.savedWeeks.push(data);
        break;
      case 'babyName':
        if (!user.savedBabyNames) user.savedBabyNames = [];
        user.savedBabyNames.push(data);
        break;
      default:
        return res.status(400).json({ msg: 'Invalid type' });
    }

    await user.save();
    res.json(user);
  } catch (err) {
    console.error('Error saving item:', err);
    res.status(500).send('Server error');
  }
});

// delete saved items
router.delete('/saved-item/:type/:id', auth, async (req, res) => {
  try {
    const { type, id } = req.params;
    const user = await User.findById(req.user.id);
    
    if (!user) return res.status(404).json({ msg: 'User not found' });

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
        return res.status(400).json({ msg: 'Invalid type' });
    }

    await user.save();
    res.json({ msg: 'Item deleted successfully' });
  } catch (err) {
    console.error('Error deleting item:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
