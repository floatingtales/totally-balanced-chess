/* eslint-disable no-undef */
let board;
let game;
let playerColor;

const handleDragStart = (source, piece) => {
  // do not pick up pieces if the game is over
  if (game.game_over()) return false;

  // only pick up pieces for the side to move
  if ((game.turn() === 'w' && piece.search(/^b/) !== -1)
      || (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false;
  }

  if ((game.turn() === 'w' && playerColor === 'b') || (game.turn() === 'b' && playerColor === 'w')) { return false; }

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

const handleMove = async (source, target) => {
  const currentID = $('#gameID').val();
  const move = game.move({ from: source, to: target, promotion: 'q' });
  if (move === null) { return 'snapback'; }
  let updateGameBoard;
  try {
    const currentFen = game.fen();
    console.log(currentFen);
    updateGameBoard = await axios.put(`/games/updateBoard/${currentID}`, { currentFen });
  } catch (err) {
    console.log(err);
  }
  return updateStatus();
};

const initGame = async () => {
  const currentID = $('#gameID').val();
  const userID = $('#userID').val();
  let gameBoard;
  try {
    gameBoard = await axios.get(`/games/getBoard/${currentID}`);
  } catch (err) {
    console.log(err);
  }
  const { gameState } = gameBoard.data;
  const cfg = {
    pieceTheme: '../img/chesspieces/wikipedia/{piece}.png',
    draggable: true,
    position: gameState.currentFen.split(' ')[0],
    onDragStart: handleDragStart,
    onDrop: handleMove,
    onSnapEnd: handleSnapEnd,
  };
  if (gameState.white_player_id === Number(userID)) { playerColor = 'w'; }
  if (gameState.black_player_id === Number(userID)) { playerColor = 'b'; }
  board = new ChessBoard('gameBoard', cfg);
  game = new Chess(gameState.currentFen);
};

window.onload = () => { initGame(); };

setInterval(() => {
  initGame();
  updateStatus();
}, 2000);
