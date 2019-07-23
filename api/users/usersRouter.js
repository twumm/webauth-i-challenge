const express = require('express');

const router = express.Router();
const usersDb = require('./usersDb');
const { hashPassword, reversePasswordHash, validateUserData } = require('../middlewares/usersMiddleware');

router.get('/', async (req, res, next) => {
  try {
    if (req.session && req.session.user) {
      const users = await usersDb.getAllUsers();
      res
        .status(200)
        .json(users);
    } else {
      res
        .status(400)
        .json({ message: 'You need to login to view users' });
    }
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
    req.session.user = req.user;
    res
      .status(200)
      .json({ message: `Welcome ${req.user.username}` });
  } catch (error) {
    next(new Error('Login failed miserably. Kindly try again'));
  }
});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(error => {
      if (error) {
        res
          .status(400)
          .json({ message: 'You can\'t leave just yet' });
      } else {
        res
          .status(200)
          .json({ message: 'Sad to see you leave' });
      }
    });
  } else {
    res.end();
  }
});

module.exports = router;
