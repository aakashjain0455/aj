const MasterSheet = require('../models/MasterSheet');
const sequelize = require('../config/db'); // Import sequelize for raw queries

exports.generateMasterId = async (req, res) => {
    try {
        // Use a raw SQL query to get the maximum masterId
        const [result] = await sequelize.query('SELECT MAX(CAST(masterId AS INT)) as maxMasterId FROM MasterSheets');

        const lastMasterId = result[0].maxMasterId || 0;

        // Increment and format the new masterId
        const newMasterId = (lastMasterId + 1).toString().padStart(5, '0'); // Ensure 5-digit format

        res.status(200).json({ masterId: newMasterId });
    } catch (error) {
        console.error("Error generating Master ID:", error.message);
        res.status(500).json({ error: "Failed to generate Master ID", details: error.message });
    }
};



// Creates a new master sheet entry with incremental masterId
exports.createMasterSheet = async (req, res) => {
    try {
        // Retrieve the highest masterId and increment by 1
        const maxEntry = await MasterSheet.findOne({
            attributes: [[sequelize.fn('MAX', sequelize.col('masterId')), 'maxMasterId']]
        });

        const lastMasterId = maxEntry && maxEntry.dataValues.maxMasterId 
            ? parseInt(maxEntry.dataValues.maxMasterId, 10)
            : 0;
        const newMasterId = (lastMasterId + 1).toString().padStart(5, '0');

        // Add the new masterId to the request body
        req.body.masterId = newMasterId;

        // Create the new master sheet record
        const masterSheet = await MasterSheet.create(req.body);
        res.status(201).json(masterSheet);
    } catch (error) {
        console.error("Failed to create master sheet", error);
        res.status(400).json({ error: "Failed to create master sheet", details: error.message });
    }
};

exports.getBatchMasterSheets = async (req, res) => {
    const { masterIds } = req.body; // Expecting an array of master IDs
    if (!Array.isArray(masterIds) || masterIds.length === 0) {
        return res.status(400).json({ message: "Invalid or empty masterIds array" });
    }

    try {
        const masterSheets = await MasterSheet.findAll({
            where: { masterId: masterIds }
        });

        if (masterSheets.length === 0) {
            return res.status(404).json({ message: "No Master Sheets found for the given IDs" });
        }

        // Return data as an object with masterId as keys
        const result = masterSheets.reduce((acc, sheet) => {
            acc[sheet.masterId] = sheet;
            return acc;
        }, {});

        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching batch master sheets:", error);
        res.status(500).json({ message: "Error fetching batch master sheets" });
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
