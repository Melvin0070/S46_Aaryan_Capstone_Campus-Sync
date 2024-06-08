import express from 'express';
import * as razorpayController from '../controllers/razorpayController.js';


const router = express.Router();
const { createOrder, verifyPayment } = razorpayController;

router.post('/create-order', createOrder);  // Route to create a new Razorpay order
router.post('/verify-payment', verifyPayment);  // Route to verify Razorpay payment

export default router;
