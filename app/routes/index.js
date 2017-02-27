'use strict';
const passport = require('passport');
const h = require('../helpers');

module.exports = () => {
  const routes = {
    get: {
      '/': (req, res) => {
        res.render('login');
      },
      '/rooms': [h.isAuthenticated, (req, res) => {
        res.render('rooms', {
          user: req.user
        });
      }],
      '/chat': [h.isAuthenticated, (req, res) => {
        res.render('chatroom', {
          user: req.user
        });
      }],
      '/auth/facebook': passport.authenticate('facebook'),
      '/auth/facebook/callback': passport.authenticate('facebook', {
        successRedirect: '/rooms',
        failureRedirect: '/'
      }),
      '/auth/twitter': passport.authenticate('twitter'),
      '/auth/twitter/callback': passport.authenticate('twitter', {
        successRedirect: '/rooms',
        failureRedirect: '/'
      }),
      '/logout': (req, res) => {
        req.logout();
        res.redirect('/');
      }
    },
    post: {

    },
    NA: (req, res) => {
      res.status(404).sendFile(`${process.cwd()}/views/404.htm`);
    }
  };
  return h.route(routes);
};
