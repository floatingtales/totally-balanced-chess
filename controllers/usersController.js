const bcrypt = require('bcryptjs');

const BaseController = require('./baseController');

class UsersController extends BaseController {
  constructor(model) {
    super(model);
    this.title = 'Users';
    this.bcrypt = bcrypt;
  }

  hashPassword(req, res, next) {
    console.log(req.url);
    try {
      const password = bcrypt.hashSync(req.data.plaintextPassword);
      req.body = { password };
    } catch (err) {
      console.log(err);
      res.send(err);
    }
    next();
  }

  comparePassword(req, res) {
    console.log(req.url);
    const comparedPwd = bcrypt.compareSync(req.data.plaintextPassword, req.data.password);
    res.send(comparedPwd);
  }

  getFoo(req, res) {
    console.log(req.url);
    res.json({ sent: 'foofoo', title: this.title });
  }
}

module.exports = UsersController;
