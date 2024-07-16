// models/Item.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Item = sequelize.define('Item', {
  itemCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  itemName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  standardPacking: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subCategory: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mrp: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  gst: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  selectedData: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  photo1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  photo2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Item;
