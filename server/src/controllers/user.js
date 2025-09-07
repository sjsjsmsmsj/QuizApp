import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Helper function to generate tokens
const generateTokens = (userId, userRole) => {
    const accessToken = jwt.sign({ userId, role: userRole }, process.env.JWT_SECRET, { expiresIn: '7d' });
    const refreshToken = jwt.sign({ userId, role: userRole }, process.env.JWT_REFRESH_SECRET, { expiresIn: '14d' });
    return { accessToken, refreshToken };
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req, res) => {
    try {
        const { email, username, password, name, age, role } = req.body;

        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            email,
            username,
            password: hashedPassword,
            name,
            age,
            role
        });

        const { accessToken, refreshToken } = generateTokens(user._id, user.role);
        user.refreshToken = refreshToken;

        await user.save();

        res.status(201).json({
            message: 'User registered successfully',
            accessToken,
            refreshToken
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            const { accessToken, refreshToken } = generateTokens(user._id, user.role);
            user.refreshToken = refreshToken;
            await user.save();

            res.status(200).json({
                message: 'Login successful',
                accessToken,
                refreshToken
            });
        } else {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

// @desc    Refresh access token
// @route   POST /api/users/refresh-token
// @access  Public
export const refreshToken = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user || user.refreshToken !== token) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        const { accessToken, refreshToken: newRefreshToken } = generateTokens(user._id, user.role);
        user.refreshToken = newRefreshToken;
        await user.save();

        res.status(200).json({
            accessToken,
            refreshToken: newRefreshToken
        });

    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired refresh token' });
    }
};


// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password -refreshToken');
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/:id
// @access  Private
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (updates.password) {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(updates.password, salt);
        }

        const user = await User.findByIdAndUpdate(id, updates, { new: true }).select('-password -refreshToken');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password -refreshToken');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};