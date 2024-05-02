const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    score: { type: Number, required: true }

})


const Score = mongoose.model('scores', scoreSchema);

module.exports = { Score }