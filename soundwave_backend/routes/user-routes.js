const express = require('express');
const { signUp, login, getUsers } = require('../controllers/user');

const userRouter = express.Router();


module.exports = userRouter;