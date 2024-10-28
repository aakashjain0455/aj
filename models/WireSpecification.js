// models/WireSpecification.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const WireSpecification = sequelize.define('WireSpecification', {
  wireSpecificationCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  wireSpecificationName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  document: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = WireSpecification;
