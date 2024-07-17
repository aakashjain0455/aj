const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ensure this path is correct according to your project structure

const MaterialReceipt = sequelize.define('MaterialReceipt', {
  voucherNo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  partyName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  remarks: {
    type: DataTypes.STRING
  },
  data: {
    type: DataTypes.JSON,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = MaterialReceipt;
