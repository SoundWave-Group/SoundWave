const mongoose = require("mongoose");

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
      required: true,
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
    description: {
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
    playlistCount: {
      type: Number,
      required: false,
    }

  },
  {
    Timestamp: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
