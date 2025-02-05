// models/PunchOrder.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Replace with your Sequelize instance

const PunchOrder = sequelize.define('PunchOrder', {
  orderNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  orderQty: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ratePerPcs: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  wbOrB: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  orderRemarks: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  partyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  masterId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  punchedDateTime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  userName: {  // ✅ Add this field
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = PunchOrder;
