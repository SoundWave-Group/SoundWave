const express = require('express');
const { getUsers, deleteUser, deleteAllUsers, getUserProfile, editProfile, changePassword } = require('../controllers/user.controller');
const { authCheck } = require('./auth.router');
const { cookieAuth } = require('../middleware/cookieAuth');

const userRouter = express.Router();

userRouter.get('/users', getUsers);
userRouter.get('/user-profile', cookieAuth, getUserProfile);
userRouter.post('/user-profile/edit', authCheck, editProfile);
userRouter.put('/settings/account/password', authCheck, changePassword);
userRouter.delete('/delete-user/:userId', deleteUser);
userRouter.delete('/delete-all-users', deleteAllUsers);

module.exports = userRouter;