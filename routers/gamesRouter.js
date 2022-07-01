const express = require('express');

const router = express.Router();

class GamesRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    /* axios routes */
    router.get('/createBoard', this.controller.createFen.bind(this.controller));
    router.post('/createGame', this.controller.createGame.bind(this.controller));
    router.get('/getBoard/:id', this.controller.getBoard.bind(this.controller));
    router.put('/updateBoard/:id', this.controller.updateBoard.bind(this.controller));

    /* normal routes */
    router.get('/quickplay', this.controller.quickplay.bind(this.controller));
    router.get('/:id', this.controller.displayGame.bind(this.controller));

    return router;
  }
}

module.exports = GamesRouter;
