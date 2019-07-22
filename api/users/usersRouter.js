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
})