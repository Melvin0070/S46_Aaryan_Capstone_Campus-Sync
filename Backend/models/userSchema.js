const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    ID: { type: String, required: true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: true }    //For Testing purposes this value is set to true
});




const User = mongoose.model('users', userSchema);

module.exports = { User };