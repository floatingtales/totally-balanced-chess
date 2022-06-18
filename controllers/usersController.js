const BaseController = require('./baseController');

class UsersController extends BaseController {
  constructor(model) {
    super(model);
    this.title = 'Users';
  }
}

module.exports = UsersController;
