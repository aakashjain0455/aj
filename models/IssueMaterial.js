const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ensure this path is correct according to your project structure

const IssueMaterial = sequelize.define('IssueMaterial', {
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
    type: DataTypes.STRING, // Use STRING to store JSON data
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = IssueMaterial;
