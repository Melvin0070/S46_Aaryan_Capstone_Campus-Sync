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
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, feeId } = req.body;

    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(razorpay_order_id + '|' + razorpay_payment_id)
        .digest('hex');

    if (expectedSignature === razorpay_signature) {
        console.log('Signature verification successful');

        const newPayment = new RazorpayModel({
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            signature: razorpay_signature,
            amount: req.body.amount,
            currency: req.body.currency,
        });

        try {
            await newPayment.save();

            const fee = await Fee.findById(feeId);
            if (fee) {
                fee.status = 'Paid';
                fee.razorpay = {
                    orderId: razorpay_order_id,
                    paymentId: razorpay_payment_id,
                    signature: razorpay_signature,
                };
                await fee.save();
                res.json({ status: 'success' });
            } else {
                res.status(404).json({ error: 'Fee record not found' });
            }
        } catch (error) {
            console.error('Error saving payment details:', error);
            res.status(500).send(error);
        }
    } else {
        console.log('Signature verification failed');
        res.json({ status: 'failure' });
    }
};
