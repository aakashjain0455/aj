// models/Category.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Category = sequelize.define('Category', {
  categoryCode: {
    type: DataTypes.STRING,
    allowNull: true, // Allow null values for the categoryCode field
  },
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true, // Allow null values for the photo field
  },
});

module.exports = Category;
