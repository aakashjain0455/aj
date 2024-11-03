const MasterSheet = require('../models/MasterSheet');

// Generates the next master ID in sequence and returns it
exports.generateMasterId = async (req, res) => {
    try {
        // Retrieve the latest entry with the highest masterId
        const lastEntry = await MasterSheet.findOne({ order: [['masterId', 'DESC']] });
        const lastMasterId = lastEntry ? parseInt(lastEntry.masterId, 10) : 0;

        // Increment the masterId by 1
        const newMasterId = (lastMasterId + 1).toString().padStart(5, '0'); // Format to ensure 5-digit padding

        res.status(200).json({ masterId: newMasterId });
    } catch (error) {
        console.error("Error generating Master ID:", error);
        res.status(500).json({ error: "Failed to generate Master ID" });
    }
};

// Creates a new master sheet entry
exports.createMasterSheet = async (req, res) => {
    try {
        // Create a new master sheet record using the provided data
        const masterSheet = await MasterSheet.create(req.body);
        res.status(201).json(masterSheet);
    } catch (error) {
        console.error("Failed to create master sheet", error);
        res.status(400).json({ error: "Failed to create master sheet", details: error.message });
    }
};

// Fetches all master sheets
exports.getAllMasterSheets = async (req, res) => {
    try {
        const masterSheets = await MasterSheet.findAll();
        res.status(200).json(masterSheets);
    } catch (error) {
        console.error("Failed to fetch master sheets", error);
        res.status(500).json({ error: "Failed to fetch master sheets" });
    }
};
