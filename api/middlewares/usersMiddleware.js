/* eslint-disable require-atomic-updates */
const bcrypt = require('bcrypt');

const usersDb = require('../users/usersDb');

async function hashPassword(req, res, next) {
  const user = { username, password } = req.body;
  try {
    user.password = await bcrypt.hashSync(user.password, 12);
    req.user = user;
  } catch (error) {
    next(new Error('Something went wrong. Please try again.'));
  }
}