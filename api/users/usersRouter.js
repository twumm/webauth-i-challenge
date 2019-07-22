const express = require('express');

const router = express.Router();
const usersDb = require('./usersDb');

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

router.post('/register', async (req, res, next) => {
  const user = { username, password } = req.body;
  try {
    const newUser = await usersDb.addUser(user);
    res
      .status(201)
      .json(newUser);
  } catch (error) {
    next(new Error('Could not register user. Please try again'));
  }
})

module.exports = router;
