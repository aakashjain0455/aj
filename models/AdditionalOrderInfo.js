const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const AdditionalOrderInfo = sequelize.define('AdditionalOrderInfo', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  orderNumber: { type: DataTypes.STRING, allowNull: false },
  expectedDate: { type: DataTypes.STRING },
  inPlanning: { type: DataTypes.STRING },
  remarks: { type: DataTypes.TEXT },
  actuals: { type: DataTypes.TEXT }, // Store actuals as stringified JSON
  coreActual: { type: DataTypes.FLOAT },
issueDetails: { type: DataTypes.TEXT },

}, {
  timestamps: true
});

module.exports = AdditionalOrderInfo;