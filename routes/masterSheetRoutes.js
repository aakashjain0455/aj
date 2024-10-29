const express = require('express');
const router = express.Router();
const MasterSheet = require('../models/MasterSheet');

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

// Other routes (GET, PUT, DELETE) can be added here

module.exports = router;
