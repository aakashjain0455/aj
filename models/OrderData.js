const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const OrderData = sequelize.define('OrderData', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orderNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure unique order numbers
  },
  cuttingData: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  packingData: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = OrderData;
