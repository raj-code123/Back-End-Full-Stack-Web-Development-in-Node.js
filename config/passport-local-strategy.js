const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true,
    },
    function(req ,email, password, done) {
        // find a user and establish the identity
        User.findOne({email: email})
        .then(user => {
            if(!user || user.password != password){
               req.flash('error', 'Invalid username / password');
               return done(null, false);
            }
            return done(null, user);
        })
        .catch(err => {
            req.flash('error', err);
            return done(err);
        });
}));


passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
        return done(null, user);
    })
    .catch(err => {
        console.log("Error in finding user --- > Passport");
        return done(err);
    });
});

// check if the user is already authenticated

passport.checkAuthentication = function(req, res, next) {
    //if the user is already authenticated then pass on the next function (controller's action)
    if(req.isAuthenticated()) {
        return next();
    }

    // if the user is not authenticated
    return res.redirect('/users/sign-in')
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){

        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;