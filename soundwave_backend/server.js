const express = require('express');
require ('dotenv').config();
const morgan = require('morgan');
const connectToDb = require('./config/db');
const passport = require('passport');
const passportSetup = require('./config/passport');
const cookieSession = require('cookie-session');

const userRouter = require('./routes/user-routes');
const { authRouter, authCheck } = require('./routes/auth-routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
app.use(morgan('dev'));
app.use(cookieSession({
    maxAge: 7 * 24 * 60 * 60 * 1000,
    keys: [process.env.SESSION_KEY]
}))
app.use(passport.initialize());
app.use(passport.session());
connectToDb();

app.use('/auth', authRouter);

app.get('/', authCheck, async (req, res) => {
    res.json({
        message: 'welcome nigga.'
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});