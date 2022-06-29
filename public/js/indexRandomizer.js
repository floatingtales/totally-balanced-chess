/* eslint-disable no-undef */
let board;

const initGame = async () => {
  const createBoard = await axios.get('/games/createBoard');
  const { chessboardFen } = createBoard.data;
  const cfg = {
    pieceTheme: '../img/chesspieces/wikipedia/{piece}.png',
    position: chessboardFen,
  };
  board = new ChessBoard('gameBoard', cfg);
};

setInterval(initGame, 1000);
