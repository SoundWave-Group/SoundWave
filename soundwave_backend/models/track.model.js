const mongoose = require("mongoose");

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
      type: Number,
      required: false,
    },
    releaseDate: {
      type: Date,
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

const Track = mongoose.model("Track", trackSchema);

module.exports = Track;
