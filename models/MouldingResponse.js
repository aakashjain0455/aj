const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path to your Sequelize instance

const MouldingResponse = sequelize.define('MouldingResponse', {
  orderNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  cutting: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  packing: {
    type: DataTypes.JSON,
    allowNull: true,
  },
}, {
  tableName: 'MouldingResponses', // Explicit table name
});

module.exports = MouldingResponse;
