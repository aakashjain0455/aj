const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const IssueMaterial = sequelize.define('IssueMaterial', {
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
    type: DataTypes.DATEONLY, // Use DATEONLY for yyyy-MM-dd format
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
    type: DataTypes.TEXT, // Use TEXT instead of JSON
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = IssueMaterial;
