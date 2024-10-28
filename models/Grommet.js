// models/Grommet.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Grommet = sequelize.define('Grommet', {
  grommetCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  grommetName: {
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

module.exports = Grommet;
