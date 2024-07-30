const Track = require('../models/track.model.js');

const uploadTrack = async (req, res) => {
    try {
      res.status(200).json({
        message: 'track uploaded'
      });
    } catch (error) {
      console.log(`Error:\n${error}`)
		  return res.status(500).json({ message: 'internal server error' })
    }
  };
  
  const getAllTracks = async (req, res) => {
    try {
      const tracks = await Track.find();

      if (!tracks) {
        return res.status(404).json({ message: 'there are no tracks' })
      }

      res.status(200).json({
        tracks: tracks
      });
    } catch (error) {
      console.log(`Error:\n${error}`)
		  return res.status(500).json({ message: 'internal server error' })
    }
  };
  
  const getTrack = async (req, res) => {
    try {
      const { id } = req.params;
      const track = await Track.findById(id);
  
      if (!track) {
        return res.status(404).json({ message: 'track not found' });
      }
      res.status(200).json({
        trackBody: track
      });
    } catch (error) {
      console.log(`Error:\n${error}`)
		  return res.status(500).json({ message: 'internal server error' })
    }
  };
  
  const updateTrack = async (req, res) => {
    try {
      const { id } = req.params;
      const track = await Track.findByIdAndUpdate(id, req.body);
  
      if (!track) {
        return res.status(404).json({ message: 'track not found' });
      }
      res.status(200).json({ message: 'track updated' });
    } catch (error) {
      console.log(`Error:\n${error}`)
		  return res.status(500).json({ message: 'internal server error' })
    }
  };
  
  const deleteTrack = async (req, res) => {
    try {
      const { id } = req.params;
      const track = await Track.findByIdAndDelete(id);
  
      if (!track) {
        return res.status(404).json({ message: 'track not found' });
      }
      res.status(200).json({ message: 'track deleted' });
    } catch (error) {
      console.log(`Error:\n${error}`)
		  return res.status(500).json({ message: 'internal server error' })
    }
  };
  
  module.exports = {
    uploadTrack,
    getAllTracks,
    getTrack,
    updateTrack,
    deleteTrack,
  };
  