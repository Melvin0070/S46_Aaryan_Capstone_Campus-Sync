import mongoose from 'mongoose';

const razorpayDetailsSchema = new mongoose.Schema({
    orderId: { type: String },
    paymentId: { type: String },
    signature: { type: String }
}, { _id: false });


const feeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ID: { type: String, required: true },
    amount: { type: Number, required: true },
    details: { type: String, required: true },
    status: {
        type: String,
        enum: ['Paid', 'Pending', 'Late'],
        default: 'Pending'
    },
    razorpay: razorpayDetailsSchema,
    createdAt: { type: Date, default: Date.now }
});




const Fee = mongoose.model('Fee', feeSchema);

export default Fee;
