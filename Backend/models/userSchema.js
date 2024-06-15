import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    ID: { type: String, required: true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false }    //For Testing purposes this value can be set to true
});




const User = mongoose.model('users', userSchema);

export default User;