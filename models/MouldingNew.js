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
  storeData: {
    type: DataTypes.JSON,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = MouldingNew;
