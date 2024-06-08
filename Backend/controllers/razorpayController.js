import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import Fee from '../models/feeSchema.js';
import crypto from 'crypto';
import RazorpayModel from '../models/razorpaySchema.js';


dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
    const { feeId, currency, receipt } = req.body;

    try {
        const fee = await Fee.findOne({ ID: feeId });
        if (!fee) {
            return res.status(404).json({ error: 'Fee record not found' });
        }

        const amount = fee.amount * 100;

        const options = {
            amount,
            currency,
            receipt,
            payment_capture: 1,
        };

        const response = await razorpay.orders.create(options);
        console.log('Razorpay Order Response:', response);

        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
            feeId: fee._id,
        });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).send(error);
    }
};



export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, feeId, amount, currency } = req.body;
        console.log("Received payment verification request:", req.body);

        // Validate that all required fields are present
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !feeId || !amount || !currency) {
            return res.status(400).json({ error: 'Missing required fields in request body' });
        }

        // Verify the signature
        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest('hex');

        if (expectedSignature !== razorpay_signature) {
            console.log('Signature verification failed');
            return res.status(400).json({ error: 'Signature verification failed' });
        }

        // Save payment details to database
        const newPayment = new RazorpayModel({
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            signature: razorpay_signature,
            amount,
            currency,
        });

        await newPayment.save();

        // Update fee status to "Paid"
        const fee = await Fee.findOne({ ID: feeId });
        if (!fee) {
            return res.status(404).json({ error: 'Fee record not found' });
        }

        fee.status = 'Paid';
        fee.razorpay = {
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            signature: razorpay_signature,
        };

        await fee.save();

        // Send success response
        console.log('Payment verification successful');
        return res.json({ status: 'success' });
    } catch (error) {
        console.error('Error verifying payment:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
