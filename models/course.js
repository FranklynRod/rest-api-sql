'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {

    static associate(models) {
      // define association here
    }
  }
Course.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a value for "title"',
        },
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a value for "description"',
        },
      }
    },
    estimatedTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      materialsNeeded: {
        type: DataTypes.STRING,
        allowNull: false,
      },
     
  }, {sequelize});

Course.associate = (models) => {
    Course.belongsTo(models.User,{
    foreignKey: {
      fieldName: 'userId',
      allowNull: false,
    },});
    
    };
  return Course;
};