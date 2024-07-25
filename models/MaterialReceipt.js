const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ensure this path is correct according to your project structure

const MaterialReceipt = sequelize.define('MaterialReceipt', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  voucherNo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  date: {
    type: DataTypes.DATEONLY,
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
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = MaterialReceipt;
