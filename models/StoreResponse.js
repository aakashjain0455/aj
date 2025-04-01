const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const StoreResponse = sequelize.define('StoreResponse', {
  orderNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  oldPowercord: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  wireAvailable: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  howMuchWireAvailable: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  storeRemarks: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  balanceWireRequired: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  wireIssued: { // ✅ ADD THIS FIELD
    type: DataTypes.JSON,
    allowNull: true,
  },
});

module.exports = StoreResponse;
