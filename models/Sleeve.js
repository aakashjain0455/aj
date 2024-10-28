// models/Sleeve.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Sleeve = sequelize.define('Sleeve', {
  sleeveCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  sleeveName: {
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

module.exports = Sleeve;
