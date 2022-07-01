/* eslint-disable no-undef */
let board;

const initGame = async () => {
  let createBoard;
  try {
    createBoard = await axios.get('/games/createBoard');
  } catch (err) {
    console.log(err);
  }
  const { chessjsFen } = createBoard.data;
  const cfg = {
    pieceTheme: '../img/chesspieces/wikipedia/{piece}.png',
    position: chessjsFen.split(' ')[0],
  };
  board = new ChessBoard('gameBoard', cfg);
};

setInterval(initGame, 1000);
