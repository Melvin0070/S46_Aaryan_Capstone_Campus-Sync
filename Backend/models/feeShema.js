const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ID: { type: String, required: true},
    amount: { type: Number, required: true },
    details: { type: String, required: true },
    status: { type: String }    
});




const Fee = mongoose.model('fees', feeSchema);

module.exports = { Fee };