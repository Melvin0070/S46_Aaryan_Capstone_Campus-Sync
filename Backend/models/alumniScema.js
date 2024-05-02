const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
    name: { type: String, required: true },
    successStory: { type: String, required: true},
    passout: { type: Number, required: true },     
});




const Alumni = mongoose.model('alumnis', alumniSchema);

module.exports = { Alumni };