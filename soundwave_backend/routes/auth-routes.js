const express = require('express');
const passport = require('passport');
const { signUp, login, logout } = require('../controllers/auth');

const authRouter = express.Router();

const authCheck = (req, res, next) => {
    if(!req.user) {
        res.redirect('/auth/login')
    } else {
        next();
    }
}

authRouter.post('/signup', signUp);
authRouter.post('/login', login);
authRouter.get('/login', (req, res) => {//sending the login page
    res.send('niggaaaa')
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