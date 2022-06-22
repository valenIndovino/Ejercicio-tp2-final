'use strict';
const {randJobTitle, randBoolean } = require("@ngneat/falso");

module.exports = {
  async up (queryInterface, Sequelize) {

    let repos = [];

    for(let i = 0; i < 3; i++){
      repos.push({
        name: randJobTitle(),
        visibility: randBoolean(),
        createdAt: new Date,
        updatedAt: new Date
      })
    }

    await queryInterface.bulkInsert('repositories', repos, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('repositories', null, {});
  }
};
