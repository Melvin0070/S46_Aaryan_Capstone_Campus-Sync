import express from 'express';
import { loginUser, refreshToken, logout } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/token', refreshToken);
router.post('/logout', logout);

export default router;
