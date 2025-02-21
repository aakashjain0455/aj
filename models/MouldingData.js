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
  tableType: {
    type: DataTypes.ENUM('Cutting', 'Packing', 'Dispatch'),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  totalPcs: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  billNo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = MouldingData;
