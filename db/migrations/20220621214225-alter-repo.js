'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('repositories', 'userId', {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable();
  }
};