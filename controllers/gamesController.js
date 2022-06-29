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

    res.json({ chessboardFen, chessjsFen });
  }
}

module.exports = GamesController;
