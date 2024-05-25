import mongoose from 'mongoose';

const feeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ID: { type: String, required: true},
    amount: { type: Number, required: true },
    details: { type: String, required: true },
    status: {
        type: String,
        enum: ['Paid', 'Pending', 'Late'],
        default: 'Pending'
    } 
});




const Fee = mongoose.model('fees', feeSchema);

export default Fee;