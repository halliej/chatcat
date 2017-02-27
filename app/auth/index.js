'use strict';
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;

const config = require('../config');
const h = require('../helpers');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  h.findById(id)
    .then(user => done(null, user))
    .catch(error => console.log('Error deserializing user', error));
});

const authProcessor = (accessToken, refreshToken, profile, done) => {
  h.findOne(profile.id)
    .then(result => {
      if (result) {
        done(null, result);
      } else {
        h.createNewUser(profile)
          .then(newChatUser => done(null, newChatUser))
          .catch(error => console.log('Error creating user:', error));
      }
    });
};

module.exports = () => {
  passport.use(new FacebookStrategy(config.fb, authProcessor));
  passport.use(new TwitterStrategy(config.twitter, authProcessor));
};
