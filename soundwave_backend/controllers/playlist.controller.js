const Playlist = require("../models/playlist.model.js");

const postPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.create(req.body);
    res.status(200).json(playlist);
  } catch (error) {
    console.log(error);
  }
};

const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({});
    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const playlist = await Playlist.findById(id);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const playlist = await Playlist.findByIdAndUpdate(id, req.body);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    res.status(200).json({ message: "Playlist updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const playlist = await Playlist.findByIdAndDelete(id);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    res.status(200).json({ message: "Playlist deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  postPlaylist,
  getAllPlaylists,
  getPlaylist,
  updatePlaylist,
  deletePlaylist,
};
