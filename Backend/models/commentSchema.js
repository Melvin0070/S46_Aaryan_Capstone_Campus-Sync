import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    commenter: {type: String, required: true},    
    comment: { type: String, required: true },
    likes: { type: Number, default: 0 },        
});




const Comment = mongoose.model('comments', commentSchema);

export default Comment;