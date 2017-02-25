'use strict';

require('./auth')();

/* eslint-disable global-require */
module.exports = {
  router: require('./routes')(),
  session: require('./session')
};
