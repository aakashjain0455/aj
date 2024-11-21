const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const OrderData = sequelize.define('OrderData', {
  orderNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  cuttingData: {
    type: DataTypes.JSON, // Stores array of objects [{date: '2024-11-21', totalPcs: 100}]
    allowNull: true,
  },
  packingData: {
    type: DataTypes.JSON, // Stores array of objects [{date: '2024-11-21', totalPcs: 200}]
    allowNull: true,
  },
});

module.exports = OrderData;
//moulding