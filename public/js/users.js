/* eslint-disable no-undef */

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
