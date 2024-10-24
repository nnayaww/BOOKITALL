import { Schema, model } from 'mongoose';
import { genSalt, hash } from 'bcryptjs';

const UserSchema = new Schema({
    name: { type: String, required: true },
    username: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 20
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true},
    profilePicture: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    date: { type: Date, default: Date.now }
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    next();
});

export default model('User', UserSchema);
