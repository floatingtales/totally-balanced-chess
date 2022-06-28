const express = require('express');

const router = express.Router();

class UsersRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    /* axios routes */
    router.put('/login', this.controller.login.bind(this.controller));
    router.post('/signup', this.controller.signUp.bind(this.controller));
    router.put('/logout', this.controller.logout.bind(this.controller));

    /* normal routes, logged in gated */
    router.use(this.controller.isLoggedIn.bind(this.controller));
    router.get('/', this.controller.renderUser.bind(this.controller));

    return router;
  }
}

module.exports = UsersRouter;
