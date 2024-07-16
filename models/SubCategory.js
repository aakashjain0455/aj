// models/SubCategory.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Category = require('./Category'); // Assuming Category model is in the same folder

const SubCategory = sequelize.define('SubCategory', {
  subCategoryCode: {
    type: DataTypes.STRING,
    allowNull: true, // Allow null values for the subCategoryCode field
  },
  subCategoryName: {
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
    allowNull: true,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'id',
    },
  },
});

Category.hasMany(SubCategory, { foreignKey: 'categoryId' });
SubCategory.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = SubCategory;
