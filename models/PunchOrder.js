const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

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
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // ✅ Extra Fields (Power Cord + Wire Details)
  wireSpec: DataTypes.STRING,
  core: DataTypes.STRING,
  colour: DataTypes.STRING,
  length: DataTypes.STRING,
  brandNameForPlug: DataTypes.STRING,
  otherBrandName: DataTypes.STRING,
  clientOfAdvancePayment: DataTypes.STRING,
  typeOfPin: DataTypes.STRING,
  backStripping: DataTypes.STRING,
  backCopperStripping: DataTypes.STRING,
  terminal: DataTypes.STRING,
  housing: DataTypes.STRING,
  sleeve: DataTypes.STRING,
  solderingTwisting: DataTypes.STRING,
  backSolder: DataTypes.STRING,
  packing: DataTypes.STRING,
  grommetName: DataTypes.STRING,
  grommetLength: DataTypes.STRING,
  plug: DataTypes.STRING,
  computerSocket: DataTypes.STRING,
  amp: DataTypes.STRING,
  remarksPowerCord: DataTypes.STRING,

  noOfStands: DataTypes.STRING,
  copperStandsDia: DataTypes.STRING,
  brandNameOnWire: DataTypes.STRING,
  coreColours: DataTypes.STRING,
  coreOd: DataTypes.STRING,
  corePVC: DataTypes.STRING,
  outerOd: DataTypes.STRING,
  pvcInOuter: DataTypes.STRING,
  finishing: DataTypes.STRING,
  printingOnWire: DataTypes.STRING,
  wireCmlNo: DataTypes.STRING,
  planCoilWeight: DataTypes.STRING,
  coilLength: DataTypes.STRING,
  remarksWire: DataTypes.STRING,
});

module.exports = PunchOrder;
