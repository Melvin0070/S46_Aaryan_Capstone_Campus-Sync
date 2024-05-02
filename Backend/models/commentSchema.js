const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    commenter: {type: String, required: true},    
    comment: { type: String, required: true },
    likes: { type: Number },        
});




const Comment = mongoose.model('comments', commentSchema);

module.exports = { Comment };