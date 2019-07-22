const db = require('../../data/dbConfig');

function getAllUsers() {
  return db('users');
}

function getUserById(id) {
  return db('users')
    .where({ id });
}

function findUserBy(filter) {
  return db('users')
    .where(filter);
}

function addUser(user) {
  return db('users')
    .insert(user)
    .then(users => getUserById(users[0]));
}

function updateUser(id, changes) {
  return db('users')
    .where({ id })
    .update(changes);
}

function removeUser(id) {
  return db('users')
    .where({ id })
    .del();
}

module.exports = {
  getAllUsers,
  getUserById,
  findUserBy,
  addUser,
  updateUser,
  removeUser
};
