const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    ID: { type: String, required: true},
    subject: [{type: String, required: true}],
    score: [{type: Number, required: true}]

})


const Score = mongoose.model('scores', scoreSchema);

module.exports = { Score }