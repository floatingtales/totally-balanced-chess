/* eslint-disable class-methods-use-this */
const bcrypt = require('bcryptjs');

const BaseController = require('./baseController');

class UsersController extends BaseController {
  constructor(model, db) {
    super(model);
    this.games = db.games;
  }

  async login(req, res) {
    console.log(req.url);
    let results;
    try {
      results = await this.model.findOne({ where: { username: req.body.username } });
      if (results === null) {
        throw new Error('nothing found');
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ status: 'username not found' });
    }
    if (!bcrypt.compareSync(req.body.password, results.password)) {
      return res.status(500).json({ status: 'incorrect password' });
    }
    res.cookie('loggedUser', results.id);
    return res.json({ status: 'logged in succesfully' });
  }

  async signUp(req, res) {
    console.log(req.url);
    let results;
    try {
      results = await this.model.findOne({ where: { email: req.body.email } });
      if (results !== null) {
        throw new Error('email found');
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ status: 'email already in use' });
    }
    try {
      results = await this.model.findOne({ where: { username: req.body.username } });
      if (results !== null) {
        throw new Error('username found');
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ status: 'username already in use' });
    }
    try {
      results = await this.model.create({
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ status: 'cannot create user' });
    }
    res.cookie('loggedUser', results.id);
    return res.json({ status: 'user created' });
  }

  logout(req, res) {
    console.log(req.url);
    res.clearCookie('loggedUser');
    res.json({ status: 'logout success' });
  }

  async findGames(req, res) {
    let whiteGames;
    let blackGames;
    try {
      whiteGames = await this.games.findAll({
        where: {
          white_player_id: req.cookies.loggedUser,
        },
      });
      blackGames = await this.games.findAll({
        where: {
          black_player_id: req.cookies.loggedUser,
        },
      });
      if (whiteGames.length === 0 && blackGames.length === 0) {
        throw new Error('no games found');
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ status: 'noGameFound' });
    }
    return res.json({ status: 'gamesFound', whiteGames, blackGames });
  }

  isLoggedIn(req, res, next) {
    console.log('login check');
    if (!req.cookies.loggedUser) {
      return res.redirect('/');
    }
    return next();
  }

  async renderUser(req, res) {
    console.log(req.url);
    return res.render('user');
  }
}

module.exports = UsersController;
