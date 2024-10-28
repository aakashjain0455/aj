// models/Core.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Core = sequelize.define('Core', {
  coreCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  coreName: {
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

module.exports = Core;
