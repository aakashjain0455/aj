const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const MouldingResponse = sequelize.define('MouldingResponse', {
  orderNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  cutting: {
    type: DataTypes.TEXT, // Store JSON data as string
    allowNull: true,
  },
  packing: {
    type: DataTypes.TEXT, // Store JSON data as string
    allowNull: true,
  },
}, {
  tableName: 'MouldingResponses', // Explicit table name
});

module.exports = MouldingResponse;
