const express = require('express');
const { createPlaylist, getAllPlaylists, getPlaylist, renamePlaylist, deletePlaylist, addTrackToPlaylist, removeTrackFromPlaylist } = require('../controllers/playlist.controller');
const { authCheck } = require('./auth.router');
const playlistRouter = express.Router();

playlistRouter.post('/create', createPlaylist); //create a playlist
playlistRouter.get('/', getAllPlaylists); //get all playlists
playlistRouter.get('/:id', getPlaylist); //get a playlist
playlistRouter.put('/rename/:id', renamePlaylist); //rename a playlist
playlistRouter.put('/add-track/:id', addTrackToPlaylist); //add track to a playlist
playlistRouter.put('/remove-track/:id', removeTrackFromPlaylist); //remove track from a playlist
playlistRouter.delete('/delete/:id', deletePlaylist); //delete a playlist

module.exports = playlistRouter;