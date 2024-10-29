// controllers/masterSheetController.js
const MasterSheet = require('../models/MasterSheet');

exports.createMasterSheet = async (req, res) => {
    try {
        const masterSheet = await MasterSheet.create(req.body);
        res.status(201).json(masterSheet);
    } catch (error) {
        console.error("Failed to create master sheet", error);
        res.status(400).json({ error: "Failed to create master sheet", details: error.message });
    }
};

exports.getAllMasterSheets = async (req, res) => {
    try {
        const masterSheets = await MasterSheet.findAll();
        res.status(200).json(masterSheets);
    } catch (error) {
        console.error("Failed to fetch master sheets", error);
        res.status(500).json({ error: "Failed to fetch master sheets" });
    }
};
