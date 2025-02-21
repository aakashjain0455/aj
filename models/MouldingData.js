const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const MouldingData = sequelize.define('MouldingData', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orderNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lotNo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  storeData: {
    type: DataTypes.JSON,  // ✅ JSON Column to store Cutting, Packing, Dispatch Data
    allowNull: false,
  }
}, {
  timestamps: true,
});

module.exports = MouldingData;
