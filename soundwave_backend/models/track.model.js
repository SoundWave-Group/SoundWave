const mongoose = require('mongoose');

const trackSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      enum: [
        'Hip Hop & Rap',
        'Pop',
        'Electronic',
        'R&B', 'Party',
        'Chill',
        'Workout',
        'Techno',
        'House',
        'Feel Good',
        'At home',
        'Healing Era',
        'Study',
        'Folk',
        'Indie',
        'Soul',
        'Country',
        'Latin',
        'Rock'
      ],
    },
    albumArt: {
      type: String,
    },
    duration: {
      type: String,
    },
    releaseDate: {
      type: Date,
      default: Date.now,
    },
    link: {
      type: String
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
  }
);

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;