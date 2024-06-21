const express = require('express');
const { getUsers, deleteUser, deleteAllUsers } = require('../controllers/user');

const userRouter = express.Router();

userRouter.get('/users', getUsers);
userRouter.post('/delete-user/:userId', deleteUser);
userRouter.post('/delete-all-users', deleteAllUsers);

module.exports = userRouter;