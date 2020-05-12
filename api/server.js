const express = require("express");

const AcctRouter = require('../accounts/accounts-router')

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.use('/api/accts', AcctRouter)

module.exports = server;
