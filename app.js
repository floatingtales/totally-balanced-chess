const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

// import models
const db = require('./models/index');

// import controllers
const UsersController = require('./controllers/usersController');
const GamesController = require('./controllers/gamesController');

// import routers
const UsersRouter = require('./routers/usersRouter');
const GamesRouter = require('./routers/gamesRouter');

// initialize controllers
const usersController = new UsersController(db.users, db);
const gamesController = new GamesController(db.games, db);

// initialize routers
const usersRouter = new UsersRouter(usersController).routes();
const gamesRouter = new GamesRouter(gamesController).routes();
const baseRouter = require('./routers/baseRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(favicon(path.join('public', 'favicon.svg')));
app.use(cookieParser());

app.use('/users', usersRouter);
app.use('/games', gamesRouter);
app.use('/', baseRouter());

// 404 handler
app.get('*', (req, res) => {
  console.log(req.url);
  res.status(404).render('not-found');
});

const PORT = 1111;
app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
