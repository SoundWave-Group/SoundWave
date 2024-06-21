const mongoose = require('mongoose');

const playlistSchema = mongoose.Schema(
  {
    playlistTitle: {
      type: String,
      required: true,
    },
    trackCount: {
      type: Number,
    },
    playlistTracks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track',
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  }
);

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;