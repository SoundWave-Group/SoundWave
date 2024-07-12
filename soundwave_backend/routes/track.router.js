const express = require('express')
const router = express.Router()
const {
  postTrack,
  getAllTracks,
  getTrack,
  updateTrack,
  deleteTrack,
} = require('../controllers/track.controller.js'); 

router.post('/create', postTrack); //create a track
router.get('/', getAllTracks); //get all tracks
router.get('/:id', getTrack); //get a track
router.put('/:id', updateTrack); //update a track
router.delete('/:id', deleteTrack); //delete a track

module.exports = router;