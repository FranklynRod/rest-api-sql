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
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a value for "title"',
        },
        notEmpty: {
          msg: 'Please provide a value for "title"',
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a value for "description"',
        },
        notEmpty: {
          msg: 'Please provide a value for "description"',
        }
      }
    },
    estimatedTime: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      materialsNeeded: {
        type: DataTypes.STRING,
        allowNull: true,
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