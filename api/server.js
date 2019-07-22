const express = require('express');
const cors = require('cors');

const server = express();

server.use(express.json());

server.get('/', async (req, res, next) => {
  try {
    res.status(200).json('<h3>You got to the authentication app</h3>');
  } catch (error) {
    res.status(500).json({ message: "There was an error" });
  }
})

module.exports = server;