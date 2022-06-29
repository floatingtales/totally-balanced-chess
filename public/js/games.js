/* eslint-disable no-undef */
let board;
let game;

const handleDragStart = (source, piece) => {
  // do not pick up pieces if the game is over
  if (game.game_over()) return false;

  // only pick up pieces for the side to move
  if ((game.turn() === 'w' && piece.search(/^b/) !== -1)
      || (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false;
  }
  return true;
};

const handleSnapEnd = () => {
  board.position(game.fen());
};

const updateStatus = () => {
  let gameMsg = '';
  if (!game.game_over()) {
    if (game.in_check()) {
      gameMsg += 'check. ';
    }
    if (game.turn() === 'b') {
      gameMsg += 'black to move';
    } else {
      gameMsg += 'white to move';
    }
  } else if (game.in_checkmate()) {
    gameMsg += 'checkmate. ';
    if (game.turn() === 'b') {
      gameMsg += 'white wins';
    } else {
      gameMsg += 'black wins';
    }
  } else {
    gameMsg += 'draw';
  }
  $('#info').html(gameMsg);
};

const handleMove = (source, target) => {
  const move = game.move({ from: source, to: target, promotion: 'q' });
  if (move === null) return 'snapback';
  return updateStatus();
};

const initGame = async () => {
  const createBoard = await axios.get('/games/createBoard');
  const { chessboardFen, chessjsFen } = createBoard.data;
  const cfg = {
    pieceTheme: '../img/chesspieces/wikipedia/{piece}.png',
    draggable: true,
    position: chessboardFen,
    onDragStart: handleDragStart,
    onDrop: handleMove,
    onSnapEnd: handleSnapEnd,
  };
  board = new ChessBoard('gameBoard', cfg);
  game = new Chess(chessjsFen);
};
window.onload = () => { initGame(); };
