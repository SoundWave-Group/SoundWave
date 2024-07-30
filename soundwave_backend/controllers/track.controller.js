const Track = require('../models/track.model.js');
const cloudinary = require('../config/cloudinary.js');
const multer = require('../middleware/multer.js');

const uploadTrack = async (req, res) => {
  try {
    const { title, artist } = req.body;
    
    if (!title || !artist) {
      return res.status(400).json({ message: 'Enter track details'});
    }
  
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'SoundWave/tracks',
      use_filename: true,
      unique_filename: false,
      resource_type: 'auto'
    });

    const track = await Track.create({
      title: title,
      artist: artist,
      link: result.secure_url
    });

    res.status(200).json({
      success: true,
      message: 'Track uploaded!',
      trackDetails: track,
      trackData: result
    });
  } catch (error) {
    console.log(`Error:\n${error}`);
    return res.status(500).json({ success: false, message: 'Internal server error' });
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
    console.log(`Error:\n${error}`);
	  return res.status(500).json({ message: 'internal server error' });
  }
};
  
const getTrack = async (req, res) => {
  try {
    const { title } = req.params;
    const track = await Track.findOne({ title: title });

    if (!track) {
      return res.status(404).json({ message: 'Track not found' });
    }

    res.status(200).json({
      trackBody: track
    });
  } catch (error) {
    console.log(`Error:\n${error}`);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
  
const updateTrack = async (req, res) => {
  try {
    const { title } = req.params;
    const updateData = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Track title is required' });
    }

    const track = await Track.findOneAndUpdate({ title: title }, updateData, { new: true });

    if (!track) {
      return res.status(404).json({ message: 'Track not found' });
    }

    res.status(200).json({
      message: 'Track updated',
      track: track
    });
  } catch (error) {
    console.log(`Error:\n${error}`);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
  
const deleteTrack = async (req, res) => {
  try {
    const { title } = req.params;

    if (!title) {
      return res.status(400).json({ message: 'Track title is required' });
    }

    const track = await Track.findOneAndDelete({ title: title });

    if (!track) {
      return res.status(404).json({ message: 'Track not found' });
    }

    res.status(200).json({ message: 'Track deleted' });
  } catch (error) {
    console.log(`Error:\n${error}`);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
  
module.exports = {
  uploadTrack,
  getAllTracks,
  getTrack,
  updateTrack,
  deleteTrack,
};  