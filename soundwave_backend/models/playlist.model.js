const mongoose = require("mongoose");

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
    genre: {
       type: String,
       required: false,
     },
    playlistArt: {
      type: String,
      required: true,
    },
    tracks: {
      type: Array,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    user: {
        type: String,
        required: true,
      }
  },
  {
    Timestamp: true,
  }
);

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
