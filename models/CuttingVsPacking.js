// CuttingVsPacking.js (Model)
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CuttingVsPacking = sequelize.define('CuttingVsPacking', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  orderNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lotNo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true 
  },
  data: {
    type: DataTypes.TEXT, // Stores Cutting, Packing, Dispatch details as JSON
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = CuttingVsPacking;