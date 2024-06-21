const passport = require('passport');
const User = require('../models/user.model');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { generateUsername } = require('./generateUsername');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require ('dotenv').config();

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, async (username, password, done) => {
        try {
        const user = await User.findOne({ username: username });

        if (!user) {
            return done(null, false, { message: 'incorrect email.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'incorrect password.' });
        }

        return done(null, user);
        } catch (error) {
        return done(error);
        }
    })
);

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/redirect'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ googleId: profile.id });

            if (!user) {
                user = await User.findOne({ email: profile._json.email });
                if (user) {
                    user.googleId = profile.id;
                    await user.save();
                } else {
                    user = await User.create({
                        googleId: profile.id,
                        email: profile._json.email,
                        fullName: profile.displayName,
                        username: generateUsername()
                    });
                }
            }

            console.log(user);
            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    })
);