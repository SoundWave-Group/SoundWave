const mongoose = require('mongoose');

const trackSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: false,
    },
    genre: {
        type: String,
        required: false,
    },
    albumArt: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: false,
    },
    releaseDate: {
      type: Number,
      required: false,
    },
    link: {
      type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
      },
    uploadedAt: {
        type: Date,
        default: Date.now,
      }
  }
);

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;