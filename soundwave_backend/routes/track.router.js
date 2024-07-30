const express = require('express')
const router = express.Router()
const {
  postTrack,
  getAllTracks,
  getTrack,
  updateTrack,
  deleteTrack,
  uploadTrack,
} = require('../controllers/track.controller.js'); 

router.post('/upload', uploadTrack); //upload a track
router.get('/', getAllTracks); //get all tracks
router.get('/:trackId', getTrack); //get a track
router.put('/update/:trackId', updateTrack); //update a track
router.delete('/delete/:trackId', deleteTrack); //delete a track

module.exports = router;