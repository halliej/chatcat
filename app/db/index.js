'use strict';

const config = require('../config');
const logger = require('../logger');
const Mongoose = require('mongoose').connect(config.dbURI);

Mongoose.Promise = global.Promise;

Mongoose.connection.on('error', error => {
  logger.log('error', `MongoDB connection error: ${error}`);
});

const chatUser = new Mongoose.Schema({
  profileId: String,
  fullName: String,
  profilePic: String
});

const userModel = Mongoose.model('chatUser', chatUser);

module.exports = {
  Mongoose,
  userModel
};
