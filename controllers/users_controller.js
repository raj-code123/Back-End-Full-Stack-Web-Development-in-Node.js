const User = require('../models/user');

// module.exports.profile = function(req, res){
//     if(req.cookies.user_id){
//     User.findById(req.cookies.user_id)
//     .then(function(user){
//         if(user){
//             return res.render('user_profile', {
//             title: 'User Profile',
//             user: user
//         });
//         } else {
//             return res.redirect('/users/sign-in');
//         }
//     })
//     .catch(function(err){
//         console.log('Error in finding user in profile', err);
//         return res.redirect('/users/sign-in');
//     });
//     } else {
//         return res.redirect('/users/sign-in');
//     }
// }

// render a sign up page

// module.exports.profile = function(req, res){
//     User.findById(req.params.id , function(err, user){
//         return res.render('user_profile', {
//             title: 'User Profile',
//             profile_user: user
//         });
//     });
// }

module.exports.profile = async function(req, res){
    try {
        const user = await User.findById(req.params.id);
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    } catch (error) {
        console.error(error);
        // Render the error template with a generic error message
        return res.render('error', {
            title: 'Error',
            message: 'An error occurred while fetching the user profile.'
        });
    }
}


module.exports.update = async function (req, res) {
    try {
        if (req.user.id == req.params.id) {
                await User.findByIdAndUpdate(req.params.id, req.body);
                return res.redirect('back');
        } else {
                return res.status(401).send('Unauthorized');
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title: "codial | sign up"
    });
}

// render a sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title: "codial | sign in"
    });
}

//get the sign up data
module.exports.create = function(req, res){
    if( req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email })
        .then(function(user){
            if(!user){
                User.create(req.body)
                    .then(function(user){
                        return res.redirect('/users/sign-in');
                    })
                    .catch(function(err){
                        console.log("error in creating user while signing up", err);
                        return res.redirect('back');
                    });
            } else {
                return res.redirect('back');
            }
        })
        .catch(function(err){
            console.log("error in finding user signing up", err);
            return res.redirect('back');
        });
}

// // sign in and create a session for the user
// module.exports.createSession = function(req, res){
//     // find the user
//     User.findOne({email: req.body.email})
//     .then(function(user){
//     // handle user found
//     if(user){
//         // handle password which dont match
//         if(user.password != req.body.password){
//             return res.redirect('back');
//         }
//         // handle session creation
//         res.cookie("user_id", user.id);
//         return res.redirect('/users/profile');
//     } else {
//     //handle user not found
//         return res.redirect('back');
//     }
//     })
//     .catch(function(err){
//         console.log("error in finding user in signing in");
//     })
// }

// // sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success','Logged in successfully');
    return res.redirect('/');
}

// sign out a user
module.exports.destroySession = function(req, res){
    if(req.isAuthenticated()){
        req.logout(function(err) {
            if (err) {
                console.log(err);
            }
            req.flash('success','Logged out successfully');
            return res.redirect('/');
        });     
    } else {
        return res.redirect('/');
    }
}
// signout cookies
// module.exports.signOut = function(req, res){

//     User.findById(req.cookies.user_id)
//     .then(function(user){
//         if(user){
//             res.clearCookie('user_id');
//             return res.redirect('/users/sign-in');
//         }
//     })
//     .catch(function(err){
//         console.log('Error in finding user in profile', err);
//         return res.redirect('/users/sign-in');
//     });
// }
