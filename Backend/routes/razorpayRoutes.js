import express from 'express';
import * as razorpayController from '../controllers/razorpayController.js';
import { verifyToken } from '../controllers/jwtMiddleware.js';

const router = express.Router();
const { createOrder, verifyPayment } = razorpayController;

router.post('/create-order', verifyToken, createOrder); //route to create a razorpay order
router.post('/verify-payment', verifyToken, verifyPayment); //route to verify a razorpay payment

export default router;
