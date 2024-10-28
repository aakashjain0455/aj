// models/Plug.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Plug = sequelize.define('Plug', {
  plugCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  plugName: {
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

module.exports = Plug;
