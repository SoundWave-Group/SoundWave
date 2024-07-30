const express = require('express');
const router = express.Router();
const {
  getAllTracks,
  getTrack,
  updateTrack,
  deleteTrack,
  uploadTrack,
} = require('../controllers/track.controller.js');
const upload = require('../middleware/multer.js');

router.post('/upload', upload.single('track'), uploadTrack); //upload a track
router.get('/', getAllTracks); //get all tracks
router.get('/:trackId', getTrack); //get a track
router.put('/update/:trackId', updateTrack); //update a track
router.delete('/delete/:trackId', deleteTrack); //delete a track

module.exports = router;