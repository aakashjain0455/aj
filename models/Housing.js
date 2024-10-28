// models/Housing.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Housing = sequelize.define('Housing', {
  housingCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  housingName: {
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

module.exports = Housing;
