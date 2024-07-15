// models/Transport.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Transport = sequelize.define('Transport', {
  transportCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Define unique constraint here
  },
  transportName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  shippingLocation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Transport;
