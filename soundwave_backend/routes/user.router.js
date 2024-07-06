const express = require('express');
const { getUsers, deleteUser, deleteAllUsers, getUserProfile, editProfile, changePassword } = require('../controllers/user.controller');
const { authCheck } = require('./auth.router');

const userRouter = express.Router();

userRouter.get('/users', getUsers);
userRouter.get('/user-profile', authCheck, getUserProfile);
userRouter.post('/user-profile/edit', authCheck, editProfile);
userRouter.post('/settings/account/password', authCheck, changePassword);
userRouter.post('/delete-user/:userId', deleteUser);
userRouter.post('/delete-all-users', deleteAllUsers);

module.exports = userRouter;