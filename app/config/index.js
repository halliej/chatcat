'use strict';

if (process.env.NODE_ENV === 'production') {
  /* eslint-disable global-require */
  const redisURI = require('url').parse(process.env.REDIS_URL);
  /* eslint-enable global-require */
  const redisPassword = redisURI.auth.split(':')[1];

  module.exports = {
    host: process.env.host || '',
    dbURI: process.env.dbURI,
    sessionSecret: process.env.sessionSecret,
    fb: {
      clientID: process.env.fbClientID,
      clientSecret: process.env.fbClientSecret,
      callbackURL: `${process.env.host}/auth/facebook/callback`,
      profileFields: ['id', 'displayName', 'photos']
    },
    twitter: {
      consumerKey: process.env.twConsumerKey,
      consumerSecret: process.env.twConsumerSecret,
      callbackURL: `${process.env.host}/auth/twitter/callback`,
      profileFields: ['id', 'displayName', 'photos']
    },
    redis: {
      host: redisURI.hostname,
      port: redisURI.port,
      password: redisPassword
    }
  };
} else {
  /* eslint-disable global-require */
  module.exports = require('./development.json');
  /* eslint-enable global-require */
}
