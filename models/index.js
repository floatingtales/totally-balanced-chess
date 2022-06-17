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
const initGameRoomsModel = require('./gameRoom');

db.users = initUsersModel(sequelize, Sequelize.DataTypes);
db.gameRoom = initGameRoomsModel(sequelize, Sequelize.DataTypes);

db.users.belongsToMany(db.users, { as: 'whitePlayer', foreignKey: 'white_player_id', through: db.gameRoom });
db.users.belongsToMany(db.users, { as: 'blackPlayer', foreignKey: 'black_player_id', through: db.gameRoom });

db.users.hasMany(db.gameRoom, { as: 'whitePlayer', foreignKey: 'white_player_id' });
db.users.hasMany(db.gameRoom, { as: 'blackPlayer', foreignKey: 'black_player_id' });
db.gameRoom.belongsTo(db.users);
db.gameRoom.belongsTo(db.users);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
