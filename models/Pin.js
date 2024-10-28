// models/Pin.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Pin = sequelize.define('Pin', {
  pinCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  pinName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Pin;
