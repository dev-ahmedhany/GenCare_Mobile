const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('HealthRecord', healthRecordSchema);
