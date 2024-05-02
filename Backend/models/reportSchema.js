const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    ID: { type: String, required: true},
    issue: { type: String, required: true },
    proposal: { type: String},
    status: { type: Boolean, required: true }  
});




const Report = mongoose.model('reports', reportSchema);

module.exports = { Report };