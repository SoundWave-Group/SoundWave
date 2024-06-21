const Playlist = require('../models/playlist.model.js');
const Track = require('../models/track.model.js');

const createPlaylist = async (req, res) => {
  try {
    const { playlistTitle } = req.body;

    if (!playlistTitle) {
      return res.status(400).json({ message: 'playlist title is required' });
    }

    const playlist = await Playlist.create({ playlistTitle});

    res.status(201).json({
      playlist: playlist
    });
  } catch (error) {
    console.log(`Error:\n${error}`)
		return res.status(500).json({ message: 'internal server error' })
  }
};

const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find();

    res.status(200).json({
      playlists: playlists
    });
  } catch (error) {
    console.log(`Error:\n${error}`)
		return res.status(500).json({ message: 'internal server error' })
  }
};

const getPlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const playlist = await Playlist.findById({ _id: playlistId });

    if (!playlist) {
      return res.status(404).json({ message: 'playlist not found' });
    }

    res.status(200).json({
      playlist: playlist,
      trackCount: playlist.tracks.count()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const renamePlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { playlistTitle } = req.body;

    const playlist = await Playlist.findByIdAndUpdate(playlistId,  req.body, { new: true });

    if (!playlist) {
      return res.status(404).json({ message: 'playlist not found' });
    }

    res.status(200).json({
      playlist: playlist
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addTrackToPlaylist = async (req, res) => {
  try {
    const { playlistId, trackId } = req.body;

    if (!playlistId || !trackId) {
      return res.status(400).json({ message: 'playlist ID and track ID are required' });
    }

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: 'playlist not found' });
    }

    const track = await Track.findById({ _id: trackId });
    if (!track) {
      return res.status(404).json({ message: 'track not found' });
    }

    if (playlist.tracks.includes(trackId)) {
      return res.status(400).json({ message: 'track is already in the playlist' });
    }

    playlist.tracks.push(trackId);
    await playlist.save();

    res.status(200).json({ message: 'track added to playlist', playlist });
  } catch (error) {
    console.error(`Error: ${error.message}`, error);
    res.status(500).json({ message: 'internal server error' });
  }
};

const removeTrackFromPlaylist = async (req, res) => {
  try {
    const { playlistId, trackId } = req.body;

    if (!playlistId || !trackId) {
      return res.status(400).json({ message: 'playlist ID and track ID are required' });
    }

    const playlist = await Playlist.findById({ _id: playlistId });
    if (!playlist) {
      return res.status(404).json({ message: 'playlist not found' });
    }

    const track = await Track.findById({ _id: trackId });
    if (!track) {
      return res.status(404).json({ message: 'track not found' });
    }

    playlist.tracks.pull(trackId);
    await playlist.save();

    res.status(200).json({ message: 'track added to playlist', playlist });
  } catch (error) {
    console.error(`Error: ${error.message}`, error);
    res.status(500).json({ message: 'internal server error' });
  }
};


const deletePlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const playlist = await Playlist.findByIdAndDelete({ _id: playlistId });

    if (!playlist) {
      return res.status(404).json({ message: 'playlist not found' });
    }

    res.status(200).json({ message: 'playlist deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPlaylist,
  getAllPlaylists,
  getPlaylist,
  renamePlaylist,
  addTrackToPlaylist,
  removeTrackFromPlaylist,
  deletePlaylist
};