const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const initUsersModel = require('./users');
const initGamesModel = require('./games');

db.users = initUsersModel(sequelize, Sequelize.DataTypes);
db.games = initGamesModel(sequelize, Sequelize.DataTypes);

// many-to-many relationship between users table and users table, through games table
db.users.belongsToMany(db.users, { as: 'whiteGame', foreignKey: 'white_player_id', through: db.games });
db.users.belongsToMany(db.users, { as: 'blackGame', foreignKey: 'black_player_id', through: db.games });

// defining two one-to-many relationship between users and games table
db.users.hasMany(db.games, { as: 'whitePlayer', foreignKey: 'white_player_id' });
db.users.hasMany(db.games, { as: 'blackPlayer', foreignKey: 'black_player_id' });
db.games.belongsTo(db.users, { foreignKey: 'white_player_id' });
db.games.belongsTo(db.users, { foreignKey: 'black_player_id' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
