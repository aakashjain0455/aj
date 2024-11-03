const express = require('express');
const router = express.Router();
const MasterSheet = require('../models/MasterSheet');
const masterSheetController = require('../controllers/masterSheetController');

router.get('/generate-master-id', masterSheetController.generateMasterId);

// Create a new master sheet
router.post('/master-sheets', async (req, res) => {
    try {
        const masterSheet = await MasterSheet.create(req.body);
        res.status(201).json(masterSheet);
    } catch (error) {
        console.error("Failed to create master sheet:", error);
        res.status(400).json({ error: 'Failed to create master sheet', details: error.message });
    }
});

// Fetch a specific master sheet by masterId
router.get('/master-sheets/:masterId', async (req, res) => {
    const { masterId } = req.params;
    try {
        const masterSheet = await MasterSheet.findOne({ where: { masterId } });
        if (masterSheet) {
            res.status(200).json(masterSheet);
        } else {
            res.status(404).json({ message: "Master ID not found" });
        }
    } catch (error) {
        console.error("Error fetching master sheet:", error);
        res.status(500).json({ message: "Error fetching Master Sheet data" });
    }
});

module.exports = router;
