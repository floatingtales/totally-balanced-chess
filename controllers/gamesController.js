const BaseController = require('./baseController');

class GamesController extends BaseController {
  constructor(model) {
    super(model);
    this.title = 'Games';
  }

  quickplay(req, res) {
    console.log(req.url);
    res.render('quickplay');
  }
}

module.exports = GamesController;
