const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const MouldingNew = sequelize.define('MouldingNew', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  orderNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data: {
    type: DataTypes.TEXT, // Stores JSON data
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = MouldingNew;
