const express = require('express');
require ('dotenv').config();
const morgan = require('morgan');
const connectToDb = require('./config/db');
const passport = require('passport');
const passportSetup = require('./config/passport');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const userRouter = require('./routes/user-routes');
const playlistRouter = require('./routes/playlist.router.js');
const trackRouter = require('./routes/track.router.js');
const { authRouter, authCheck } = require('./routes/auth-routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/playlists', playlistRouter)
app.use('/api/tracks', trackRouter)


const port = process.env.PORT || 3000;
app.use(morgan('dev'));
app.use(cookieParser());
app.use(cookieSession({
    maxAge: 7 * 24 * 60 * 60 * 1000,
    keys: [process.env.SESSION_KEY]
}));
app.use(passport.initialize());
app.use(passport.session());
connectToDb();

app.use('/', userRouter)
app.use('/auth', authRouter);

app.post('/', authCheck, async (req, res) => {
    res.json({
        message: 'home page nigga.'
    });
});

app.post('/', authCheck, async (req, res) => {
    res.json({
        message: 'home page nigga.'
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});