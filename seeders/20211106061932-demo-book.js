'use strict';
const models = require('../models');
const Book = models.Book;

const faker = require('faker');
faker.locale = "id_ID";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    var bookCount = await Book.count();
    if (bookCount == 0) {
      var setData = [];
      for (let i = 0; i < 10; i++) {
        setData.push({
          name: faker.commerce.productName(),
          author: faker.name.findName(),
        });
      }
      await Book.bulkCreate(setData);
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Books', null, {
      truncate: true
    }, 'Book');
  }
};
