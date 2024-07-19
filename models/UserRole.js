// models/UserRole.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const UserRole = sequelize.define('UserRole', {
  groupName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  selectedTabs: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

module.exports = UserRole;
