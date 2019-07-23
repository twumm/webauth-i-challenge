/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();
const usersRouter = require('../api/users/usersRouter');

server.use(helmet());
server.use(express.json());
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