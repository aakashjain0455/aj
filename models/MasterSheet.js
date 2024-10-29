// models/MasterSheet.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const MasterSheet = sequelize.define('MasterSheet', {
    masterId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    partyName: { type: DataTypes.STRING, allowNull: false },
    salesMan: { type: DataTypes.STRING, allowNull: false },
    wireSpec: { type: DataTypes.STRING, allowNull: false },
    core: { type: DataTypes.STRING, allowNull: false },
    colour: { type: DataTypes.STRING, allowNull: false },
    brandNameForPlug: { type: DataTypes.STRING, allowNull: false },
    otherBrandName: { type: DataTypes.STRING },
    length: { type: DataTypes.STRING, allowNull: false },
    clientOfAdvancePayment: { type: DataTypes.STRING, allowNull: false },
    typeOfPin: { type: DataTypes.STRING, allowNull: false },
    backStripping: { type: DataTypes.STRING },
    backCopperStripping: { type: DataTypes.STRING },
    terminal: { type: DataTypes.STRING, allowNull: false },
    housing: { type: DataTypes.STRING, allowNull: false },
    sleeve: { type: DataTypes.STRING },
    typeOfSleeve: { type: DataTypes.STRING },
    solderingTwisting: { type: DataTypes.STRING },
    backSolder: { type: DataTypes.STRING },
    packing: { type: DataTypes.STRING },
    grommetName: { type: DataTypes.STRING, allowNull: false },
    grommetLength: { type: DataTypes.STRING },
    plug: { type: DataTypes.STRING, allowNull: false },
    computerSocket: { type: DataTypes.STRING },
    amp: { type: DataTypes.STRING },
    remarksPowerCord: { type: DataTypes.STRING },
    coreOd: { type: DataTypes.STRING },
    coreColours: { type: DataTypes.STRING },
    outerOd: { type: DataTypes.STRING },
    copperDia: { type: DataTypes.STRING },
    printingOnWire: { type: DataTypes.STRING },
    pvcInCore: { type: DataTypes.STRING },
    pvcInOuter: { type: DataTypes.STRING },
    wireCmlNo: { type: DataTypes.STRING },
    remarksWire: { type: DataTypes.STRING },
    noOfStands: { type: DataTypes.STRING },
    copperStandsDia: { type: DataTypes.STRING },
    brandNameOnWire: { type: DataTypes.STRING },
    coreColour: { type: DataTypes.STRING },
    corePVC: { type: DataTypes.STRING },
    finishing: { type: DataTypes.STRING },
}, { timestamps: true });

module.exports = MasterSheet;
