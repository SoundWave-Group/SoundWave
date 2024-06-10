const express = require('express');
require ("dotenv").config();
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;
app.use(morgan('dev'));

app.get('/', async (req, res) => {
    res.json({
        message: 'Welcome nigga.'
    })
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
})