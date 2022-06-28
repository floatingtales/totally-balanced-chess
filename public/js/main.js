/* eslint-disable no-undef */

$('#loginBtn').on('click', async () => {
  // on login btn click
  $('#loginBtn').html('');
  $('#loginBtn').append($('<span />').addClass('spinner-border spinner-border-sm')).append(' Loading...');

  const username = $('#username_login').val();
  const password = $('#password_login').val();
  let loginStatus;

  try {
    loginStatus = await axios.put('/users/login', { username, password });
  } catch (err) {
    console.log(err);

    $('#error_text_login').append($('<div />').addClass('alert alert-warning text-center').text(err.response.data.status));

    setTimeout(() => {
      $('.alert').addClass('fade');
      setTimeout(() => {
        $('.alert').remove();
      }, 1000);
    }, 2000);
  }

  console.log(loginStatus);

  $('#loginBtn').html('log in!');

  if (loginStatus.data.status === 'logged in succesfully') {
    console.log('redirecting');
    window.location = '/users';
  }
});

$('#signupBtn').on('click', async () => {
  // on signup button click
  $('#signupBtn').html('');
  $('#signupBtn').append($('<span />').addClass('spinner-border spinner-border-sm')).append(' Loading...');

  const email = $('#email_signup').val();
  const username = $('#username_signup').val();
  const password = $('#password_signup').val();
  let signupStatus;

  try {
    signupStatus = await axios.post('/users/signup', { email, username, password });
  } catch (err) {
    console.log(err);

    $('#error_text_signup').append($('<div />').addClass('alert alert-warning text-center').text(err.response.data.status));

    setTimeout(() => {
      $('.alert').addClass('fade');
      setTimeout(() => {
        $('.alert').remove();
      }, 1000);
    }, 2000);
  }

  console.log(signupStatus);
  $('#signupBtn').html('Sign up!');
  if (signupStatus.data.status === 'user created') {
    window.location = '/users';
  }
});
