const initGameRoomsModel = (sequelize, DataTypes) => sequelize.define(
  'game_rooms',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    whitePlayerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    blackPlayerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    startingState: {
      allowNull: false,
      type: DataTypes.JSON,
    },
    gameResult: {
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    underscored: true,
  },
);

module.exports = initGameRoomsModel;
