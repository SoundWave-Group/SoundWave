const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    googleId: {
      type: String,
    },
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please enter a valid email address'
    ]
    },
    googleId: {
      type: String,
      required: false,
    },
    password: {
      type: String,
    },
    profilePicture: {
      type: String
    },
    location: {
      type: String
    },
    bio: {
      type: String
    },
    following: {
      type: Number
    },
    followers: {
      type: Number
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
