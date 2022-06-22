'use strict';
const {randFirstName, randLastName, randEmail } = require("@ngneat/falso");

module.exports = {
  async up (queryInterface, Sequelize) {
    
    let users = [];

    for(let i = 0; i < 3; i++){
      users.push({
        firstName: randFirstName(),
        lastName: randLastName(),
        email: randEmail(),
        createdAt: new Date,
        updatedAt: new Date
      })
    }

    await queryInterface.bulkInsert('users', users, {})

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
