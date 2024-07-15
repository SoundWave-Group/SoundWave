const User = require('../models/user.model');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            users: users
        });
    } catch (error) {
        console.error(`Error:\n${error}`);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

exports.getUserProfile = async (req, res) => {
    try {
        const username = req.params;

        const userProfile = await User.findOne(username);

        if (!userProfile) {
            return res.status(404).json({ message: 'user not found' });
        }

        return res.status(200).json({
            userProfile: userProfile,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

exports.editProfile = async (req, res) => {
    try {
        const { usernameParam } = req.params;

        const user = await User.findOne({ username: usernameParam });

        if (!user) {
            return res.status(404).json({
                message: 'account not found'
            });
        }

        const { username, location, bio } = req.body;

        if ( !username ) {
    		return res.status(400).json({ message: 'username cannot be blank' });
    	}

        user.username = username;
        user.location = location;
        user.bio = bio;

        await user.save();

        res.status(200).json({
            message: 'updated'
        });

    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

exports.changePassword = async (req, res) => {
    try {
        const { userId } = req.params;

        const { password, newPassword, confirmPassword } = req.body;

        if ( !password || !newPassword || !confirmPassword ) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        const match = await bcrypt.compare(password, currentUser.password)

        if (!match) {
            return res.status(401).json({ message: 'Incorrect password' })
        }

        if ( confirmPassword !== newPassword ) {
            return res.status(400).json({ message: 'Invalid confirm password' })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(confirmPassword, salt);

        const user = await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });

        if (!user) {
            return res.status(404).json({
                message: 'Account not found'
            });
        }

        res.status(200).redirect('/account');
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(400).json({ message: 'user does not exist' });
        }

        await User.deleteOne({ _id: userId });

        return res.status(200).json({
            message: 'user deleted'
        })
    } catch (error) {
        console.log(`Error:\n${error}`);
		return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

exports.deleteAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        if (!users) {
            return res.status(400).json({ message: 'there are no users' })
        }

        await User.deleteMany()

        return res.status(200).json({
            message: 'all users deleted'
        })
    } catch (error) {
        console.log(`Error:\n${error}`)
		return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}