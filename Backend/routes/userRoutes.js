import express from 'express';
import { loginUser } from '../controllers/userController.js';
import apiLimiter from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/login', apiLimiter, loginUser);

export default router;
