const express = require('express');
require ('dotenv').config();
const morgan = require('morgan');
const connectToDb = require('./config/db');
const passport = require('passport');
const passportSetup = require('./middleware/passport');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const userRouter = require('./routes/user.router');
const playlistRouter = require('./routes/playlist.router');
const trackRouter = require('./routes/track.router');
const { authRouter, authCheck } = require('./routes/auth.router');
// const swaggerjsdoc = require('swagger-jsdoc');
// const swaggerui = require('swagger-ui-express');
const apiDoc = require('./routes/api_doc');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// routes
app.use('/api/playlists', playlistRouter);
app.use('/api/tracks', trackRouter);
app.use('/api/', userRouter);
app.use('/api/auth', authRouter);

// const spacs = swaggerjsdoc(userRouter.options);
// app.use(
//     '/api/docs',
//     swaggerui.serve,
//     swaggerui.setup(spacs)
// );

app.post('/', authCheck, async (req, res) => {
    res.json({
        message: 'home page.'
    });
});

app.get('/', authCheck, async (req, res) => {
    res.json({
        message: 'home page.'
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});