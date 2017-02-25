'use strict';
const passport = require('passport');
const h = require('../helpers');

module.exports = () => {
  const routes = {
    get: {
      '/': (req, res) => {
        res.render('login');
      },
      '/rooms': (req, res) => {
        res.render('rooms', {
          user: req.user
        });
      },
      '/chat': (req, res) => {
        res.render('chatroom');
      },
      '/auth/facebook': passport.authenticate('facebook'),
      '/auth/facebook/callback': passport.authenticate('facebook', {
        successRedirect: '/rooms',
        failureRedirect: '/'
      })
    },
    post: {

    },
    NA: (req, res) => {
      res.status(404).sendFile(`${process.cwd()}/views/404.htm`);
    }
  };
  return h.route(routes);
};
