// models/Unit.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Unit = sequelize.define('Unit', {
  unitCode: {
    type: DataTypes.STRING,
    allowNull: true, // Allow null values for the unitCode field
  },
  unitName: {
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

module.exports = Unit;
