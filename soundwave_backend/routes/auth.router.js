const express = require('express');
const passport = require('passport');
const { signUp, login, logout, forgotPassword } = require('../controllers/auth.controller');

const authRouter = express.Router();

const authCheck = (req, res, next) => {
    if(!req.user) {
        console.log('no user');
        res.redirect('/api/auth/login')
    } else {
        console.log(req.user);
        next();
    }
}

authRouter.post('/signup', signUp);
authRouter.post('/login', login);
authRouter.get('/login', (req, res) => {
    res.send('log in page');//sending the login page
});
authRouter.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));
authRouter.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/');
})
authRouter.get('/logout', logout);
authRouter.post('/forgot-password', forgotPassword)

module.exports = {
    authRouter,
    authCheck
}