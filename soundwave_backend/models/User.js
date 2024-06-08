const mongoose = require('mongoose');

const Schema = new mongoose.Schema

const userSchema = new Schema({
    email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please enter a valid email address"
        ]
	},
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        // default: ""
    },
    followers: {
        type: Number,
    },
    following: {
        type: Number,
    },
    playlists: {
        type: Array
    }
})

const User = mongoose.model("user", userSchema)

module.exports = User