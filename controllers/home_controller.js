// module.exports.actionName = function(req,res){return}
const Post = require('../models/post');
const User = require('../models/user');


module.exports.home = async function(req,res){
    try {
        const posts = await Post.find({}).populate('user').populate({
            path: 'comments',
            populate : {
                path: 'user'
            }
        });

        try {
            const users = await User.find({}).then(users => {
                    res.render('home', {
                        title: 'Home',
                        posts: posts,
                        all_users: users
                    })
                })
               return users;
            } catch (err) {
                console.log(err);
                return res.redirect('/');
            }
        
    } catch (err) { 
        console.error(err);
        // handle error
        return res.render('error', {
            title: 'Error',
            message: 'An error occurred while fetching posts.'
        });
    }
}