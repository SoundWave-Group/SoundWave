const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require ('dotenv').config();

exports.signUp = async (req, res) => {
    try {
        const { fullName, username, email, password, confirmPassword } = req.body;

        if (!username || !email || !password || !confirmPassword) {
    		return res.status(400).json({ message: 'please fill all fields' })
    	}

        const existingUser = await User.findOne({ username })

    	if (existingUser) {
    		return res.status(400).json({ message: 'user already exists' })
    	}

        if (confirmPassword !== password) {
            return res.status(400).json({ message: 'invalid confirm password' })
        }

        const salt = await bcrypt.genSalt(10);
    	const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            fullName,
            username,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '12h' })
        user.token = token;

        res.status(200)
            .cookie('access_token', token, {
            httpOnly: true,
            })
            .json({
                message: 'signed up successfully',
                user: user
            });
    } catch (error) {
        console.log(`Error:\n${error}`)
		return res.status(500).json({ message: 'internal server error' })
    }
}

exports.login = async (req, res, next) => {
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
}

exports.logout = async (req, res) => {
    try {
        req.logout();
        res.status(200).clearCookie('access_token').redirect('/');
    } catch (error) {
        console.log(`Error:\n${error}`)
		res.status(500).json({ success: false, message: 'Error logging out' })
    }
}