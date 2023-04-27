const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content:{
        type: 'string',
        required: true
    },
    // comment belongs to a user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Post',
    },
},{
    timestamp:true
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;