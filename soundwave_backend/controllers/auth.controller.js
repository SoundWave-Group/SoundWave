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

        const existingUsername = await User.findOne({ username })

    	if (existingUsername) {
    		return res.status(400).json({ message: 'this username is taken' })
    	}

        const existingUser= await User.findOne({ email })

    	if (existingUser) {
    		return res.status(400).json({ message: 'this email is taken' })
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

        const token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '12h' });

        res.status(200)
            .cookie('access_token', token, {
            httpOnly: true,
            })
            .json({
                message: 'signed up successfully',
                user: user
            });
    } catch (error) {
        console.log(`Error:\n${error}`);
		return res.status(500).json({ message: 'internal server error' });
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
            // const token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '12h' });
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

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ message: 'Account not found' });
        }

        const secret = process.env.PASSWORD_SECRET + user.password;
        const token = jwt.sign({ user }, secret, { expiresIn: '20m' });
        const link = `http://localhost:3000/api/auth/reset-password/${user._id}/${token}`;
        console.log(link);
        return res.status(200).json({
            message: 'A password reset link has beeb set to your email'
        })
    } catch (error) {
        console.log(`Error:\n${error}`)
		res.status(500).json({ success: false, message: 'Error' })
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const { id, token } = req.params;
        
    } catch (error) {
        
    }
}