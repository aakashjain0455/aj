const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Adjust the path according to your project structure

const Party = sequelize.define('Party', {
  partyCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING
  },
  city: {
    type: DataTypes.STRING
  },
  state: {
    type: DataTypes.STRING
  },
  pinCode: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING
  },
  mobile: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  gstn: {
    type: DataTypes.STRING
  },
  pan: {
    type: DataTypes.STRING
  },
  openingBalance: {
    type: DataTypes.FLOAT
  },
  balanceType: {
    type: DataTypes.STRING
  },
  tds: {
    type: DataTypes.STRING
  },
  creditLimit: {
    type: DataTypes.FLOAT
  },
  accountGroup: {
    type: DataTypes.STRING
  },
  natureOfGroup: {
    type: DataTypes.STRING
  },
  underGroup: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true
});

module.exports = Party;
