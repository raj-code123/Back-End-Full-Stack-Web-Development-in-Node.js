const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res) {
    try {
        const post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        return res.redirect('back');
    } catch(err) {
        // console.log("error creating post", err);
        return;
    }
};

module.exports.destroy = async function(req, res) {
    try {
        const post = await Post.findById(req.params.id).exec();
        if (post.user == req.user.id) {
            await post.deleteOne();
            await Comment.deleteMany({post: req.params.id});
            req.flash('success', 'post and comment deleted successfully');
            return res.redirect('back');
        } else {
            req.flash('error', 'you cannot delete this post!');
            throw new Error('Unauthorized user');
        }
    } catch (err) {
        req.flash('error', err);
        return res.redirect('back');
    }
};