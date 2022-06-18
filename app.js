const cookieParser = require('cookie-parser');
const express = require('express');

// import models
const db = require('./models/index');

// import controllers
const UsersController = require('./controllers/usersController');
const GamesController = require('./controllers/gamesController');

// import routers
const UsersRouter = require('./routers/usersRouter');
const GamesRouter = require('./routers/gamesRouter');

// initialize controllers
const usersController = new UsersController(db.users);
const gamesController = new GamesController(db.gameRoom);

// initialize routers
const usersRouter = new UsersRouter(usersController).routes();
const gamesRouter = new GamesRouter(gamesController).routes();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cookieParser());

app.use('/users', usersRouter);
app.use('/games', gamesRouter);

const PORT = 3004;
app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
