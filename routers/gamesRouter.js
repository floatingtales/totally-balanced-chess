const express = require('express');

const router = express.Router();

class GamesRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    /* axios routes */
    router.get('/', this.controller.getAll.bind(this.controller));
    router.get('/:id', this.controller.getOneByParam.bind(this.controller));

    return router;
  }
}

module.exports = GamesRouter;
