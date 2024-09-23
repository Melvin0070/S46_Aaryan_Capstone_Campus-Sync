import express from 'express';
import * as razorpayController from '../controllers/razorpayController.js';
import { verifyToken } from '../controllers/jwtMiddleware.js';
import  apiLimiter  from '../middleware/rateLimiter.js';

const router = express.Router();
const { createOrder, verifyPayment } = razorpayController;

router.post('/create-order', apiLimiter, verifyToken, createOrder); //route to create a razorpay order
router.post('/verify-payment', apiLimiter, verifyToken, verifyPayment); //route to verify a razorpay payment

export default router;
