// models/Salesman.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Salesman = sequelize.define('Salesman', {
  salesmanCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  salesmanName: {
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

module.exports = Salesman;
