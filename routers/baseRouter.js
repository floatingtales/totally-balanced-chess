const express = require('express');

const router = express.Router();

const routes = () => {
  router.get('/', (req, res) => {
    console.log('in base router');
    console.log('get:', req.url);
    res.render('index');
  });
  return router;
};

module.exports = routes;
