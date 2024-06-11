const passport = require('passport');
const User = require('../models/user.model');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require ('dotenv').config();

passport.use(
    new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ email: profile._json.email })
            .then((currentUser) => {
                if (currentUser) {
                    console.log('user already exists:', currentUser);
                } else {
                    new User({
                        googleId: profile.id,
                        fullname: profile.displayName,
                        username: profile._json.given_name,
                        email: profile._json.email
                    }).save().then((newUser) => {
                        console.log('new user created:', newUser);
                    })
                }
            })
    })
);