'use strict';
const h = require('../helpers');

module.exports = () => {
  const routes = {
    get: {
      '/': (req, res) => {
        res.render('login');
      },
      '/rooms': (req, res) => {
        res.render('rooms');
      },
      '/chat': (req, res) => {
        res.render('chatroom');
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
