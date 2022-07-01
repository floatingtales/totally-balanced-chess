/* eslint-disable no-undef */

const findGames = async () => {
  let results;
  $('#gamesData').html('');
  try {
    results = await axios.get('/users/userGames');
  } catch (err) {
    $('#gamesData').html('no games? Go get a sucker to play with you');
    return;
  }
  console.log(results);
  const { blackGames, whiteGames } = results.data;
  console.log(blackGames, whiteGames);
  if (whiteGames.length !== 0) {
    // display all games as white
    const $gamesData = $('#gamesData');
    $gamesData.append($('<h1 />').html('You\'re white in these games'));
    whiteGames.forEach((game) => {
      const $gameCard = $('<div />').addClass('card');
      const $cardBody = $('<div />').addClass('card-body');
      const $cardHeader = $('<h3 />').addClass('card-title').text(`ID: ${game.id}`);
      const $cardButton = $('<a />').addClass('btn btn-primary').text('go to game').attr('href', `games/${game.id}`);
      $cardBody.append($cardHeader, $cardButton);
      $gameCard.append($cardBody);
      $gamesData.append($gameCard);
    });
  }
  if (blackGames.length !== 0) {
    // display all games as black
    const $gamesData = $('#gamesData');
    $gamesData.append($('<h1 />').html('You\'re black in these games'));
    blackGames.forEach((game) => {
      const $gameCard = $('<div />').addClass('card');
      const $cardBody = $('<div />').addClass('card-body');
      const $cardHeader = $('<h3 />').addClass('card-title').text(`ID: ${game.id}`);
      const $cardButton = $('<a />').addClass('btn btn-primary').text('go to game').attr('href', `games/${game.id}`);
      $cardBody.append($cardHeader, $cardButton);
      $gameCard.append($cardBody);
      $gamesData.append($gameCard);
    });
  }
};

$('#logoutBtn').on('click', async () => {
  $('#logoutBtn').html('');
  $('#loginBtn').append($('<span />').addClass('spinner-border spinner-border-sm')).append(' Loading...');

  let logoutStatus;
  try {
    logoutStatus = await axios.put('users/logout');
  } catch (err) {
    console.log(err);
  }
  console.log(logoutStatus);
  $('#logoutBtn').html('Log Out!');
  if (logoutStatus.data.status === 'logout success') { window.location = '/'; }
});

$('#pairupBtn').on('click', async () => {
  $('#pairupBtn').html('');
  $('#pairupBtn').append($('<span />').addClass('spinner-border spinner-border-sm')).append(' Loading...');
  const username = $('#username_pairup').val();
  let findStatus;

  try {
    findStatus = await axios.put('users/findUser', { username });
  } catch (err) {
    console.log(err);
    $('#error_text_pairup').append($('<div />').addClass('alert alert-warning text-center').text(err.response.data.status));
    setTimeout(() => {
      $('.alert').addClass('fade');
      setTimeout(() => {
        $('.alert').remove();
      }, 1000);
    }, 2000);
  }
  console.log(findStatus);

  $('#pairupBtn').html('Pair up!');
  if (findStatus.data.status === 'not found') {
    return;
  }
  const { id } = findStatus.data.results;
  console.log(id);
  let createGame;
  let randomBoard;
  try {
    randomBoard = await axios.get('/games/createBoard');
    const { chessjsFen } = randomBoard.data;
    createGame = await axios.post('/games/createGame', { id, chessjsFen });
  } catch (err) {
    console.log(err);
    $('#error_text_pairup').append($('<div />').addClass('alert alert-warning text-center').text(err.response.data.status));

    setTimeout(() => {
      $('.alert').addClass('fade');
      setTimeout(() => {
        $('.alert').remove();
      }, 1000);
    }, 2000);
  }
  console.log(createGame);
  findGames();
});

findGames();
