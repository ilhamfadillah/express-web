'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
const saltRound = 10;
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        isNull: false
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        isNull: false,
        unique: true,
      },
      set(value) {
        this.setDataValue('email', value.toLowerCase())
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        isNull: false,
        len: [8,100],
      },
      set(value) {
        this.setDataValue('password', bcrypt.hashSync(value, saltRound))
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};