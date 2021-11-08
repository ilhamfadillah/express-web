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
          name: faker.name.firstName(),
          email: faker.internet.email().toLowerCase(),
          password: "password",
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
