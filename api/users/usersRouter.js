const express = require('express');

const router = express.Router();
const usersDb = require('./usersDb');
const { hashPassword, reversePasswordHash, validateUserData } = require('../middlewares/usersMiddleware');

router.get('/', async (req, res, next) => {
  try {
    const users = await usersDb.getAllUsers();
    res
      .status(200)
      .json(users);
  } catch (error) {
    next(new Error('Could not retrieve users. Please try again later.'));
  }
});

router.post('/register', [validateUserData, hashPassword], async (req, res, next) => {
  const { username } = req.body;
  const user = {
    username,
    password: req.hashedPassword
  }
  try {
    const newUser = await usersDb.addUser(user);
    res
      .status(201)
      .json(newUser);
  } catch (error) {
    next(new Error('Could not register user. Please try again'));
  }
});

router.post('/login', [validateUserData, reversePasswordHash], (req, res, next) => {
  try {
    res
      .status(200)
      .json({ message: `Welcome ${req.user.username}`});
  } catch (error) {
    next(new Error('Login failed miserably. Kindly try again'));
  }
});

module.exports = router;
