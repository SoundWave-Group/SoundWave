const express = require('express');
const passport = require('passport');
const { signUp, login, logout } = require('../controllers/auth.controller');

const authRouter = express.Router();

const authCheck = (req, res, next) => {
    if(!req.user) {
        console.log(req.user);
        res.redirect('/auth/login')
    } else {
        next();
    }
}

authRouter.post('/signup', signUp);
authRouter.post('/login', async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: info.message });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/');
        });
    })(req, res, next);
});
authRouter.get('/login', (req, res) => {
    res.send('log in page nigga');//sending the login page
});
authRouter.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));
authRouter.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/');
})
authRouter.get('/logout', logout);

module.exports = {
    authRouter,
    authCheck
}