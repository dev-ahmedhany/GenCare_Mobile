const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bloodPressure: {
        type: String
    },
    bloodSugar: {
        type: String
    },
    weight: {
        type: String
    },
    symptoms: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('HealthRecord', healthRecordSchema);
