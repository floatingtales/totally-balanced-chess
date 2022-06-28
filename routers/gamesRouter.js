const express = require('express');

const router = express.Router();

class GamesRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    /* axios routes */
    router.get('/', this.controller.getAll.bind(this.controller));

    /* normal routes */
    router.get('/quickplay', this.controller.quickplay.bind(this.controller));

    return router;
  }
}

module.exports = GamesRouter;
