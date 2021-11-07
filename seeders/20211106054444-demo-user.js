'use strict';
const models = require('../models');
const User = models.User;

var faker = require('faker');
faker.locale = "id_ID";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    var userCount = await User.count();
    if (userCount == 0) {
      var setData = [];
      for (let i = 0; i < 10; i++) {
        setData.push({
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email().toLowerCase(),
        });
      }
      await User.bulkCreate(setData);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {
      truncate: true
    }, 'User');
  }
};
