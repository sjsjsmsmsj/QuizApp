import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    age: {
        type: Number,
    },
    role: {
        type: String,
        enum: ['admin', 'teacher', 'student'],
        default: 'teacher'
    },
    refreshToken: {
        type: String
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;

