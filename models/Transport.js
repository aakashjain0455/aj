
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Transport = sequelize.define('Transport', {
  transportCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  transportName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
  },
  mobile: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  shippingLocation: {
    type: DataTypes.STRING,
  },
});

module.exports = Transport;
