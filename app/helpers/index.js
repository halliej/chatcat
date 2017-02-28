'use strict';
const router = require('express').Router();
const crypto = require('crypto');

const db = require('../db');

const _registerRoutes = (routes, method) => {
  /* eslint-disable no-restricted-syntax */
  for (const key in routes) {
    if (typeof routes[key] === 'object' &&
        routes[key] !== null &&
        !(routes[key] instanceof Array)) {
      _registerRoutes(routes[key], key);
    } else {
      if (method === 'get') {
        router.get(key, routes[key]);
      } else if (method === 'post') {
        router.post(key, routes[key]);
      } else {
        router.use(routes[key]);
      }
      console.log('register', key);
    }
  }
  /* eslint-enable no-restricted-syntax */
};

const route = routes => {
  _registerRoutes(routes);
  return router;
};

const findOne = profileID => {
  return db.userModel.findOne({
    profileId: profileID
  });
};

const createNewUser = profile => {
  return new Promise((resolve, reject) => {
    const newChatUser = new db.userModel({
      profileId: profile.id,
      fullName: profile.displayName,
      profilePic: profile.photos[0].value || ''
    });

    newChatUser.save(error => {
      if (error) {
        reject(error);
      } else {
        resolve(newChatUser);
      }
    });
  });
};

const findById = id => {
  return new Promise((resolve, reject) => {
    db.userModel.findById(id, (error, user) => {
      if (error) {
        reject(error);
      } else {
        resolve(user);
      }
    });
  });
};

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
};

const findRoomByName = (allrooms, room) => {
  const findRoom = allrooms.findIndex((element) => {
    return element.room === room;
  });
  return findRoom > -1;
};

const randomHex = () => {
  return crypto.randomBytes(24).toString('hex');
};

module.exports = {
  route,
  findOne,
  createNewUser,
  findById,
  isAuthenticated,
  findRoomByName,
  randomHex
};
