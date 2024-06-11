const express = require('express');
require ('dotenv').config();
const morgan = require('morgan');
const connectToDb = require('./config/db');
const passportSetup = require('./config/passport');

const authRouter = require('./routes/auth-routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
app.use(morgan('dev'));
connectToDb();

app.use('/auth', authRouter);

app.get('/', async (req, res) => {
    res.json({
        message: 'Welcome nigga.'
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});