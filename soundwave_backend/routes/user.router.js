const express = require('express');
const { getUsers, deleteUser, deleteAllUsers, getUserProfile, editProfile, changePassword } = require('../controllers/user.controller');
const { authCheck } = require('./auth.router');
const { cookieAuth } = require('../middleware/cookieAuth');

const userRouter = express.Router();

userRouter.get('/users', getUsers);
userRouter.get('/user-profile/:username', getUserProfile);
userRouter.put('/user-profile/edit/:username', editProfile);
userRouter.put('/settings/account/password', changePassword);
userRouter.delete('/delete-user/:userId', deleteUser);
userRouter.delete('/delete-all-users', deleteAllUsers);

module.exports = userRouter;