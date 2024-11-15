const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust this path based on your project structure

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
});

module.exports = StoreResponse;
