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
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    uploadedAt: {
        type: Date,
        default: Date.now,
      }
  }
);

const Track = mongoose.model("Track", trackSchema);

module.exports = Track;
