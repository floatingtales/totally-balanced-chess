const BaseController = require('./baseController');

class GamesController extends BaseController {
  constructor(model) {
    super(model);
    this.title = 'Games';
  }
}

module.exports = GamesController;
