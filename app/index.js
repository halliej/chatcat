'use strict';
/* eslint-disable global-require */
/* eslint-disable no-param-reassign */

require('./auth')();

const ioServer = app => {
  app.locals.chatrooms = [];
  const server = require('http').Server(app);
  const io = require('socket.io')(server);

  io.use((socket, next) => {
    require('./session')(socket.request, {}, next);
  });

  require('./socket')(io, app);

  return server;
};


module.exports = {
  router: require('./routes')(),
  session: require('./session'),
  ioServer
};
