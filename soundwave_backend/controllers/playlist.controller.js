const Playlist = require('../models/playlist.model.js');
const Track = require('../models/track.model.js');

const createPlaylist = async (req, res) => {
  try {
    const { playlistTitle } = req.body;

    if (!playlistTitle) {
      return res.status(400).json({ message: 'Playlist title is required' });
    }

    const playlist = await Playlist.create({ playlistTitle});

    res.status(200).json({
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

    if (!playlists) {
      return res.status(404).json({ message: 'There are no playlists' })
    }

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
    const { playlistTitle } = req.params;
    const playlist = await Playlist.findOne({ playlistTitle: playlistTitle });

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    res.status(200).json({
      playlist: playlist,
      trackCount: playlist.tracks.length
    });
  } catch (error) {
    console.log(`Error:\n${error}`);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const renamePlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { playlistTitle } = req.body;

    if (!playlistTitle) {
      return res.status(400).json({ message: 'Playlist title is required' });
    }

    const playlist = await Playlist.findByIdAndUpdate(
      playlistId,
      { title: playlistTitle },
      { new: true }
    );

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    res.status(200).json({
      playlist: playlist,
      message: 'Playlist renamed successfully'
    });
  } catch (error) {
    console.log(`Error:\n${error}`);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const addTrackToPlaylist = async (req, res) => {
  try {
    const { playlistTitle, trackId } = req.params;

    if (!playlistTitle || !trackId) {
      return res.status(400).json({ message: 'Playlist title and track ID are required' });
    }

    const playlist = await Playlist.findOne({ playlistTitle: playlistTitle });
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    const track = await Track.findById(trackId);
    if (!track) {
      return res.status(404).json({ message: 'Track not found' });
    }

    if (playlist.tracks.includes(trackId)) {
      return res.status(400).json({ message: 'Track is already in the playlist' });
    }

    playlist.tracks.push(trackId);
    await playlist.save();

    res.status(200).json({ message: 'Track added to playlist', playlist });
  } catch (error) {
    console.error(`Error: ${error.message}`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const removeTrackFromPlaylist = async (req, res) => {
  try {
    const { playlistTitle, trackId } = req.params;

    if (!playlistTitle || !trackId) {
      return res.status(400).json({ message: 'Playlist title and track ID are required' });
    }

    const playlist = await Playlist.findOne({ playlistTitle: playlistTitle });
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    const track = await Track.findById(trackId);
    if (!track) {
      return res.status(404).json({ message: 'Track not found' });
    }

    playlist.tracks.pull(trackId);
    await playlist.save();

    res.status(200).json({ message: 'Track removed from playlist', playlist });
  } catch (error) {
    console.error(`Error: ${error.message}`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deletePlaylist = async (req, res) => {
  try {
    const { playlistTitle } = req.params;playlistTitle
    const playlist = await Playlist.findOneAndDelete({ playlistTitle: playlistTitle });

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    res.status(200).json({ message: 'Playlist deleted' });
  } catch (error) {
    console.log(`Error:\n${error}`)
		return res.status(500).json({ message: 'internal server error' })
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