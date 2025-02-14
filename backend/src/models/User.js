const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: String
    },
    phone: {
        type: String,
        required: true
    },
    bloodType: {
        type: String
    },
    pregnancyWeek: {
        type: String
    },
    notifications: [{
        id: Number,
        title: String,
        description: String,
        icon: String,
        time: String,
        isRead: {
            type: Boolean,
            default: false
        }
    }],
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    savedDiseases: [{
        name: {
            type: String,
            required: true
        },
        details: String,
        date: {
            type: String,
            required: true
        },
        risk: String
    }],
    savedWeeks: [{
        week: String,
        date: Date
    }],
    savedBabyNames: [{
        letter: {
            type: String,
            required: true
        },
        names: [{
            name: {
                type: String,
                required: true
            },
            gender: {
                type: String,
                enum: ['M', 'F'],
                required: true
            }
        }]
    }],
    avatar: {
        type: String,
        default: 'default.png'
    }
}, { timestamps: true });

// password hashing before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('User', userSchema);
