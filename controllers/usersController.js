const BaseController = require('./baseController');

class UsersController extends BaseController {
  constructor(model) {
    super(model);
    this.title = 'Users';
  }

  getFoo(req, res) {
    console.log(req.url);
    res.json({ sent: 'foofoo', title: this.title });
  }
}

module.exports = UsersController;
