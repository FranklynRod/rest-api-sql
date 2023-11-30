'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a value for "first name"',
        },
        notNull: {
          msg: 'Please provide a value for "first name"',
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a value for "last name"',
        },
        notEmpty: {
          msg: 'Please provide a value for "last name"',
        }
      }
    },
    emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'The email you entered already exists'
        },
        validate: {
          notEmpty: {
            msg: 'Please provide a value for "email address"',
          },
          
          isEmail:{
            msg: "Please provide a valid email address"
          }, notEmpty: {
            msg: 'Please provide a value for "email address"',
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Please provide a value for "password"',
          },
          notEmpty: {
            msg: 'Please provide a value for "password"',
          }
        },
        set(val) {
      if (val) {
        const hashedPassword = bcrypt.hashSync(val, 10);
        this.setDataValue('password', hashedPassword);
      }
      },
      },
  }, { sequelize });
    
    User.associate = (models) => {
      User.hasMany(models.Course, {
        foreignKey: {
          fieldName: 'userId',
          allowNull: false,
        },
      });
    };
  return User;
};