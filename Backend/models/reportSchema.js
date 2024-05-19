import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
    ID: { type: String, required: true },
    issue: { type: String, required: true },
    proposal: { type: String },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open'
    },
    solution: { type: String, default: '' }
});




const Report = mongoose.model('reports', reportSchema);

export default Report;