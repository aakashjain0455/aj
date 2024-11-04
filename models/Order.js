// models/Order.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Order = sequelize.define('Order', {
  orderNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  orderConfirmation: {
    type: DataTypes.ENUM('New order', 'Hold', 'Cancelled', 'Confirmed'),
    defaultValue: 'New order',
  },
  fmsRemarks: {
    type: DataTypes.TEXT,
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = Order;
