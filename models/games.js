const initGamesModel = (sequelize, DataTypes) => sequelize.define(
  'games',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    startingFen: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    currentFen: {
      allowNull: false,
      type: DataTypes.STRING,
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

module.exports = initGamesModel;
