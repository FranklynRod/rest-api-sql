'use strict';
const Sequelize = require('sequelize');
import { Sequelize, DataTypes } from 'sequelize';

module.exports = (sequelize) => {
  class User extends Sequelize.Model {}
  User.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    emailAddresse: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
  }, { sequelize });

    User.associate = (models) => {
      User.hasMany(models.Courses, {
        as: 'student',
        foreignKey: {
          fieldName: 'studentUserId',
          allowNull: false,
        },});
    };
  return User;
};