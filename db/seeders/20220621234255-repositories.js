'use strict';
const {randJobTitle, randBoolean } = require("@ngneat/falso");

module.exports = {
  async up (queryInterface, Sequelize) {

    let repos = [];

    for(let i = 0; i < 1; i++){
      let name = randJobTitle();
      repos.push({
        name: name,
        visibility: randBoolean(),
        userId: 1,
        createdAt: new Date,
        updatedAt: new Date,
        slug: name.replaceAll(" ", "-"),
      })
    }

    await queryInterface.bulkInsert('repositories', repos, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('repositories', null, {});
  }
};
