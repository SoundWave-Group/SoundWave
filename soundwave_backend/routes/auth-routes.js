const express = require('express');
const passport = require('passport');
const { signUp, login } = require('../controllers/user');

const authRouter = express.Router();

authRouter.post('/signup', signUp);
authRouter.post('/login', login);
authRouter.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));
authRouter.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send('You made it here, nigga.')
})
authRouter.get('/logout', (req, res) => {
    // passp
    res.send('logout');
});

module.exports = authRouter;