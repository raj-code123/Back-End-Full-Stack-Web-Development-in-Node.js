const Comment = require('../models/comment');
const Post = require('../models/post');


// module.exports.create = function (req, res){
//     Post.findById(req.body.post , function (err, post){
//         if(post){
//             Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user : req.user._id
//             } , function (err, comment){
//                 post.comments.push(comment);
//                 post.save();

//                 res.redirect('/');
//             });
//         }
//     });
// }



module.exports.create = function (req, res){
    Post.findById(req.body.post)
        .then(function(post){
            if(post){
            Comment.create({
            content: req.body.content,
            post: req.body.post,
            user : req.user._id
            }).then(function (comment){
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            }).catch(function (err){
                console.log(err);
                res.redirect('/');
            });
            }
        }).catch(function (err){
            console.log(err);
            res.redirect('/');
        });
}

module.exports.destroy = function (req, res) {
    Comment.findById(req.params.id)
      .then((comment) => {
        if (comment.user == req.user.id) {
          let postId = comment.post;
  
          comment.deleteOne();
  
          return Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
        } else {
          throw new Error('Unauthorized');
        }
      })
      .then((post) => {
        return res.redirect('back');
      })
      .catch((err) => {
        console.error(err);
        return res.redirect('back');
      });
  };