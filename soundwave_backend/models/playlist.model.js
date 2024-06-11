const mongoose = require('mongoose');

const playlistSchema = mongoose.Schema(
  {
    playlistTitle: {
      type: String,
      required: true,
    },
    trackCount: {
      type: Number,
      required: false,
    },
    tracks: {
      type: Array,
      required: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  }
);

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;