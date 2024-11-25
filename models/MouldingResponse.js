const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const MouldingResponse = sequelize.define('MouldingResponse', {
  orderNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  cutting: {
    type: DataTypes.JSON, // To store array of objects [{date: '', totalPcs: 0}, ...]
    allowNull: true,
  },
  packing: {
    type: DataTypes.JSON, // To store array of objects [{date: '', totalPcs: 0}, ...]
    allowNull: true,
  },
});

module.exports = MouldingResponse;
