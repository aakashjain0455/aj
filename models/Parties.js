// models/Parties.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Parties = sequelize.define('Parties', {
  partyCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  partyName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  salesman: DataTypes.STRING,
  phone1: DataTypes.STRING,
  contactPerson1: DataTypes.STRING,
  phone2: DataTypes.STRING,
  contactPerson2: DataTypes.STRING,
  phone3: DataTypes.STRING,
  contactPerson3: DataTypes.STRING,
  shippingAddress: DataTypes.STRING,
  billingAddress: DataTypes.STRING,
  email: DataTypes.STRING,
  gstn: DataTypes.STRING,
  weeklyOff: DataTypes.STRING,
  paymentTerms: DataTypes.STRING,
  creditLimitAmount: DataTypes.INTEGER,
  creditLimitDays: DataTypes.INTEGER,
  transportDetails: DataTypes.STRING,
  remarks: DataTypes.TEXT,
  sameAsShipping: DataTypes.BOOLEAN,
});

module.exports = Parties;
