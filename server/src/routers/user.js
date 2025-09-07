import { Router } from 'express';
import {
    registerUser,
    loginUser,
    refreshToken,
    getUserById,
    updateUser,
    deleteUser,
    getAllUsers
} from '../controllers/user.js';

const router = Router();

// Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshToken);

// User CRUD routes
router.get('/', getAllUsers); // Get all users
router.get('/:id', getUserById); // Get a single user by ID
router.put('/:id', updateUser); // Update a user
router.delete('/:id', deleteUser); // Delete a user

export default router;
