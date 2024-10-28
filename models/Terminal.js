// models/Terminal.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Terminal = sequelize.define('Terminal', {
  terminalCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  terminalName: {
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

module.exports = Terminal;
