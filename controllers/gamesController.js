/* eslint-disable class-methods-use-this */
const BaseController = require('./baseController');

class GamesController extends BaseController {
  constructor(model, db) {
    super(model);
    this.users = db.users;
  }

  quickplay(req, res) {
    console.log(req.url);
    res.render('quickplay');
  }

  displayGame(req, res) {
    console.log(req.url);
    const { id } = req.params;
    const { loggedUser } = req.cookies;
    res.render('pairplay', { id, userId: loggedUser });
  }

  createFen(req, res) {
    console.log(req.url);
    const maxPieces = 15;
    const pieceArr = ['r', 'n', 'b', 'q'];
    const blackFen = [];
    const whiteFen = [];
    for (let i = 0; i < maxPieces; i += 1) {
      const randomizedPiece = pieceArr[(Math.floor(Math.random() * pieceArr.length))];
      blackFen.push(randomizedPiece);
      whiteFen.push(randomizedPiece.toUpperCase());
    }
    blackFen.sort(() => Math.random() - 0.5);
    whiteFen.sort(() => Math.random() - 0.5);

    let blackFenString = 'xxxxkxxx/xxxxxxxx';
    let whiteFenString = 'XXXXXXXX/XXXXKXXX';

    while (blackFen.length > 0 || whiteFen.length > 0) {
      blackFenString = blackFenString.replace('x', blackFen.pop());
      whiteFenString = whiteFenString.replace('X', whiteFen.pop());
    }
    const chessboardFen = `${blackFenString}/8/8/8/8/${whiteFenString}`;
    const chessjsFen = `${chessboardFen} w - - 0 1`;

    res.json({ chessjsFen });
  }

  async createGame(req, res) {
    console.log(req.url);
    const { id, chessjsFen } = req.body;
    let game;
    try {
      if (Number(id) === Number(req.cookies.loggedUser)) {
        throw new Error('same id');
      }
      game = await this.model.create({
        white_player_id: id,
        black_player_id: req.cookies.loggedUser,
        startingFen: chessjsFen,
        currentFen: chessjsFen,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ status: 'id is same' });
    }
    return res.json({ status: 'success', game });
  }

  async getBoard(req, res) {
    console.log(req.url);
    let gameState;
    try {
      gameState = await this.model.findOne({
        where: {
          id: req.params.id,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ status: 'error loading gameState' });
    }
    return res.json({ status: 'game loaded', gameState });
  }

  async updateBoard(req, res) {
    console.log(req.url);
    let gameState;
    try {
      gameState = await this.model.update({
        currentFen: req.body.currentFen,
      }, {
        where: {
          id: req.params.id,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ status: 'error saving gameState' });
    }
    return res.json({ status: 'game saved', gameState });
  }
}

module.exports = GamesController;
