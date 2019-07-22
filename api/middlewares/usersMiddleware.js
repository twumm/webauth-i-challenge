/* eslint-disable require-atomic-updates */
const bcrypt = require('bcrypt');

const usersDb = require('../users/usersDb');

async function hashPassword(req, res, next) {
  const user = { username, password } = req.body;
  try {
    user.password = await bcrypt.hashSync(user.password, 12);
    req.user = user;
    next();
  } catch (error) {
    next(new Error('Something went wrong. Please try again.'));
  }
}

async function reversePasswordHash(req, res, next) {
  const { username, password } = req.body;
  try {
    usersDb.findUserBy(username)
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          req.user = user;
          next();
        } else {
          res.status(401).json({ message: 'Invalid credentials '});
        }
      })
  } catch (error) {
    next(error);
  }
}

module.exports = {
  hashPassword,
  reversePasswordHash,
};
