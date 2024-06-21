const Track = require("../models/track.model.js")

const postTrack = async (req, res) => {
    try {
      const track = await Track.create(req.body);
      res.status(200).json(track);
    } catch (error) {
      console.log(error);
    }
  };
  
  const getAllTracks = async (req, res) => {
    try {
      const tracks = await Track.find();
      res.status(200).json(tracks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const getTrack = async (req, res) => {
    try {
      const { id } = req.params;
      const track = await Track.findById(id);
  
      if (!track) {
        return res.status(404).json({ message: "Track not found" });
      }
      res.status(200).json(track);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const updateTrack = async (req, res) => {
    try {
      const { id } = req.params;
      const track = await Track.findByIdAndUpdate(id, req.body);
  
      if (!track) {
        return res.status(404).json({ message: "Track not found" });
      }
      res.status(200).json({ message: "Track updated" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const deleteTrack = async (req, res) => {
    try {
      const { id } = req.params;
      const track = await Track.findByIdAndDelete(id);
  
      if (!track) {
        return res.status(404).json({ message: "Track not found" });
      }
      res.status(200).json({ message: "Track deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = {
    postTrack,
    getAllTracks,
    getTrack,
    updateTrack,
    deleteTrack,
  };
  