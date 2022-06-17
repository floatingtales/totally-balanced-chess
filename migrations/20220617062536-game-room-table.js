module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('game_rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      white_player_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      black_player_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      starting_state: {
        allowNull: false,
        type: Sequelize.JSON,
      },
      game_result: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('game_rooms');
  },
};
