// models/Color.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Color = sequelize.define('Color', {
  colorCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  colorName: {
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

module.exports = Color;
