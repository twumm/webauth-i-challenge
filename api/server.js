/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const server = express();
const usersRouter = require('../api/users/usersRouter');

server.use(helmet());
server.use(express.json());
server.use(session({
  name: 'hotInHereId',
  secret: 'hsdf78y4rbjd9823rbd298ycb3498',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: true,
  store: new KnexSessionStore({
    knex: require('../data/dbConfig'), //configured instance of knex
    tablename: 'user_sessions', // table that will store sessions inside the db, name can be anything
    sidfieldname: 'sid', // column that will hold the session id, name can be anything
    createtable: true, // if the table does not exist, it will create it automatically
    clearInterval: 1000 * 60 * 60, // time it takes to check for old sessions and remove them from the database to keep it clean and performant
  })
}))
server.use(cors());
server.use(logger);
server.use('/api/users', usersRouter);

server.get('/', async (req, res, next) => {
  try {
    res.status(200).json('<h3>You got to the authentication app</h3>');
  } catch (error) {
    next(new Error('There was an error'));
  }
});

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} request from ${req.url}}`
  );
  next();
}

function errorHandler(error, req, res) {
  console.error('ERROR', error);
  res
    .status(500)
    .json({
      message: error.message,
      stack: error.stack
    });
}

server.use(errorHandler);

module.exports = server;