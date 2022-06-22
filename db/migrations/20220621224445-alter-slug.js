'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('repositories', 'slug', {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable();
  }
};