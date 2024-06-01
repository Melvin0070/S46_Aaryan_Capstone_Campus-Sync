import mongoose from 'mongoose';

const dropSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true }, // 'pdf', 'jpeg', 'png', 'jpg'
    data: { type: Buffer },
    path: { type: String }, 
});

const Drop = mongoose.model('drops', dropSchema);

export default Drop;
