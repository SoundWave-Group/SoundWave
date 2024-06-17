const User = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            users: users
        })
    } catch (error) {
        console.error(`Error:\n${error}`);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

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

        res.status(200)
            .json({
                message: 'signed up successfully',
                user: user
            });
    } catch (error) {
        console.log(`Error:\n${error}`)
		return res.status(500).json({ message: 'internal server error' })
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body

        if ( !username || !password ) {
    		return res.status(400).json({ message: 'please fill all fields' })
    	}

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: 'user not found' })
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            return res.status(401).json({ message: 'incorrect password' })
        }
console.log(user);
        res.status(200)
            .json({
                message: 'logged in successfully',
                user: user
            });
    } catch (error) {
        console.log(`Error:\n${error}`)
		res.status(500).json({ message: 'internal server error' })
    }
}