const express = require('express');
require ("dotenv").config();
const morgan = require('morgan');
const SpotifyWebApi = require('spotify-web-api-node');
const app = express();
const bodyParser = require("body-parser");
const user = require("./models/user.model.js");
const playlist = require("./models/playlist.model.js");
const track = require("./models/track.model.js");
const mongoose = require("mongoose");
const mongoDB =
  "mongodb+srv://infynnity:YjxxkPbimflYw5mp@soundwave-db.idlyeka.mongodb.net/soundWaveDB?retryWrites=true&w=majority&appName=soundWave-DB";
app.use(bodyParser.urlencoded({ extended: false }));


const port = process.env.PORT || 3000;
app.use(morgan('dev'));

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.R_UR
});

app.get('/login', (req, res) => {
    const scopes = ['user-read-private', 'user-read-email', 'user-read-playback-state', 'user-modify-playback-state'];
    res.redirect(spotifyApi.createAuthorizeURL(scopes));
})

app.get('/callback', (req, res) => {
    const error = req.query.error;
    const code = req.query.code;
    const state = req.query.state;

    if (error) {
        console.error(`Error:`, error);
        res.send(`Error: ${error}`);
        return;
    }

    spotifyApi.authorizationCodeGrant(code).then(data=>{
        const accessToken = data.body['access_token'];
        const refreshToken = data.body['refresh_token'];
        const expiresIn = data.body['expires_in'];

        spotifyApi.setAccessToken(accessToken);
        spotifyApi.setRefreshToken(refreshToken);

        console.log(accessToken, refreshToken);
        res.send('Success');

        setInterval(async () => {
            const data = await spotifyApi.refreshAccessToken();
            const accessTokenRefreshed = data.body['access_token'];
            spotifyApi.setAccessToken(accessTokenRefreshed);
        }, expiresIn/2*1000);
    }).catch(error => {
        console.error(`Error:`, error);
        res.send('Error getting token');
    });
});

app.get('/search', (req, res) => {
    const {q} = req.query;
    spotifyApi.searchTracks(q).then(searchData => {
        const trackUrl = searchData.body.tracks.items[0].uri;
        res.send({uri: trackUrl});
    }).catch(err => {
        console.error('Search Error:', err);
        res.send('Error occurred during search');
    });
});

app.get('/play', (req, res) => {

    const { uri } = req.query;

    spotifyApi.play({ uris: [uri] }).then(() => {
        res.send('Playback started');
    }).catch(err => {
        console.error('Play Error:', err);
        res.send('Error occurred during playback');
    });
});












// CREATE COLLECTION API'S

app.post("/api/users", async (req, res) => {
    try {
       const User = await user.create(req.body);
       res.status(200).json(User)
    } catch (error) {
        console.log(error);
    }
  });


  app.post("/api/playlists", async (req, res) => {
    try {
       const Playlist = await playlist.create(req.body);
       res.status(200).json(Playlist)
    } catch (error) {
        console.log(error);
    }
  });

  app.post("/api/tracks", async (req, res) => {
    try {
       const Track = await track.create(req.body);
       res.status(200).json(Track)
    } catch (error) {
        console.log(error);
    }
  });


mongoose.connect(mongoDB)
  .then(() => {
    console.log("connected");

    app.listen(port, () => {
        console.log(`Server listening on port ${port}...`);
    });
    
  })
  .catch((err) => {
    console.log("failed to connect");
    console.log(err);
  });