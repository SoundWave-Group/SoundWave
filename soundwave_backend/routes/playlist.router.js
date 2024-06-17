const express = require("express");
const router = express.Router();
const {
  postPlaylist,
  getAllPlaylists,
  getPlaylist,
  updatePlaylist,
  deletePlaylist,
} = require("../controllers/playlist.controller.js");

router.post("/", postPlaylist); //create a playlist
router.get("/", getAllPlaylists); //get all playlists
router.get("/:id", getPlaylist); //get a playlist
router.put("/:id", updatePlaylist); //update a playlist
router.delete("/:id", deletePlaylist); //delete a playlist

module.exports = router;
