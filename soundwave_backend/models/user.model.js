const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
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
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    following: {
      type: Number,
      required: false,
    },
    followers: {
      type: Number,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
