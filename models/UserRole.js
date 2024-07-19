// models/UserRole.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const UserRole = sequelize.define('UserRole', {
  groupName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  selectedTabs: {
    type: DataTypes.TEXT, // Change from JSON to TEXT (or NVARCHAR(MAX))
    allowNull: false,
    get() {
      const rawValue = this.getDataValue('selectedTabs');
      return JSON.parse(rawValue);
    },
    set(value) {
      this.setDataValue('selectedTabs', JSON.stringify(value));
    },
  },
});

module.exports = UserRole;
