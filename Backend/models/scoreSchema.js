import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ID: { type: String, required: true },
    details: [{
        exam: { type: String},
        date: { type: String },
        aggregateScore: { type: String, default: 0 },
        subjects: [{ type: String, required: true }],
        scores: [{ type: Number, required: true }]
    }]
});


const Score = mongoose.model('scores', scoreSchema);

export default Score;