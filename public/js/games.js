const Chess = require('chess.js');

const board2 = Chessboard('board2', {
  draggable: true,
  dropOffBoard: 'trash',
  sparePieces: true,
});

$('#startBtn').on('click', board2.start);
$('#clearBtn').on('click', board2.clear);

const game = new Chess();
