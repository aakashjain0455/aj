const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const DispatchResponse = sequelize.define('DispatchResponse', {
  orderNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  dispatchData: {
    type: DataTypes.TEXT, // Store JSON data as a string
    allowNull: true,
  },
  balanceOrderQty: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'DispatchResponses', // Explicit table name
});

module.exports = DispatchResponse;
