const express = require('express');
const { getUsers, deleteUser, deleteAllUsers, getUserProfile } = require('../controllers/user.controller');
const { cookieAuth } = require('../config/cookieAuth');
const { authCheck } = require('./auth-routes');

const userRouter = express.Router();

userRouter.get('/users', getUsers);
userRouter.get('/user-profile', authCheck, getUserProfile);
userRouter.post('/delete-user/:userId', deleteUser);
userRouter.post('/delete-all-users', deleteAllUsers);

module.exports = userRouter;