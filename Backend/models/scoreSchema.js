import mongoose from 'mongoose';

const detailSchema = new mongoose.Schema({
    exam: { type: String, required: true },
    date: { type: String, required: true },
    aggregateScore: { type: String, default: 0 },
    subjects: [{ type: String, required: true }],
    scores: [{ type: Number, required: true }]
});

const scoreSchema = new mongoose.Schema({
    ID: { type: String, required: true },
    details: [detailSchema]
});



const Score = mongoose.model('scores', scoreSchema);

export default Score;