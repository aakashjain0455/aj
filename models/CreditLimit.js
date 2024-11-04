// models/CreditLimit.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CreditLimit = sequelize.define('CreditLimit', {
  orderNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  creditLimitStatus: {
    type: DataTypes.ENUM('New Order', 'Available', 'Hold'),
    defaultValue: 'New Order',
  },
  creditLimitRemarks: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = CreditLimit;
