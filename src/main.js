import axios from 'axios';
import $ from 'jquery';

$('#loginBtn').on('click', async () => {
  // on login btn click
  $('#loginBtn').html('');
  $('#loginBtn').append($('<span />').addClass('spinner-border spinner-border-sm')).append(' Loading...');

  const username = $('#username_login').val();
  const password = $('#password_login').val();
  let userPresent;

  try {
    userPresent = await axios.get(`/users/byusername/${username}`);
  } catch (err) {
    console.log(err);
  }

  $('#loginBtn').html('log in!');

  if (!userPresent) {
    // if user not present show error

    $('#error_text_login').append($('<div />').addClass('alert alert-warning text-center').text('username not found'));

    setTimeout(() => {
      $('.alert').addClass('fade');
      setTimeout(() => {
        $('.alert').remove();
      }, 1000);
    }, 2000);
  } else {
    // if user present
    console.log(userPresent);
  }
});

$('#signupBtn').on('click', async () => {
  // on signup button click
  $('#signupBtn').html('');
  $('#signupBtn').append($('<span />').addClass('spinner-border spinner-border-sm')).append(' Loading...');

  const email = $('#email_signup').val();
  const username = $('#username_signup').val();
  const password = $('#password_signup').val();
  let userPresent;

  try {
    userPresent = await axios.get(`/users/byemail/${email}`);
  } catch (err) {
    console.log(err);
  }

  $('#signupBtn').html('log in!');

  if (userPresent) {
    $('#error_text_signup').append($('<div />').addClass('alert alert-warning text-center').text('email already in use!'));
    setTimeout(() => {
      $('.alert').addClass('fade');
      setTimeout(() => {
        $('.alert').remove();
      }, 1000);
    }, 2000);
    return;
  }

  try {
    userPresent = await axios.get(`/users/byusername/${username}`);
  } catch (err) {
    console.log(err);
  }
});
