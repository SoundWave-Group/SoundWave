const User = require('../models/user.model');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            users: users
        });
    } catch (error) {
        console.error(`Error:\n${error}`);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(400).json({ message: "user does not exist" });
        }

        await User.deleteOne({ _id: userId });

        return res.status(200).json({
            message: "user deleted"
        })
    } catch (error) {
        console.log(`Error:\n${error}`);
		return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

exports.deleteAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        if (!users) {
            return res.status(400).json({ message: "there are no users" })
        }

        await User.deleteMany()

        return res.status(200).json({
            message: "all users deleted"
        })
    } catch (error) {
        console.log(`Error:\n${error}`)
		return res.status(500).json({ success: false, message: "Internal server error" })
    }
}