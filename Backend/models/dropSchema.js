import mongoose from 'mongoose';

const dropSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true,
    },
    content: {
        type: Buffer,
        required: true,
    },
    uploadedBy: {
        type: String,
        required: true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
    contentType: {
        type: String,
        required: true,
    },
});

const Drop = mongoose.model('Drop', dropSchema);

export default Drop;
