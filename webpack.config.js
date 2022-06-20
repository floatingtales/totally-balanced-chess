// webpack.config.js
const path = require('path');

module.exports = {
  entry: {
    main: './src/main.js',
    users: './src/users.js',
    games: './src/games.js',
  },
  mode: 'production',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/js'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
