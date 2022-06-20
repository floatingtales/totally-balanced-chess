const axios = require('axios');

console.log('foobar');

const testAxios = async () => {
  const axiosJson = await axios.get('/users/foo');
  console.log(axiosJson);
};

const arrFunc = async () => {
  const obj = { a: 'first', b: 'second' };

  const newObj = { ...obj, c: 'third' };

  console.log(newObj);
  await testAxios();
};

arrFunc();
