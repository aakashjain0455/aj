const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Benchmark = sequelize.define('Benchmark', {
  itemCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  benchmark: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  timestamps: true
});

module.exports = Benchmark;
