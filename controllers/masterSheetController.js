const MasterSheet = require('../models/MasterSheet');

exports.getAllMasterSheets = async (req, res) => {
    try {
        const masterSheets = await MasterSheet.findAll();
        res.status(200).json(masterSheets);
    } catch (err) {
        console.error('Error fetching master sheets:', err);
        res.status(500).json({ error: 'Failed to fetch master sheets' });
    }
};

exports.getMasterSheetById = async (req, res) => {
    try {
        const masterSheet = await MasterSheet.findByPk(req.params.id);
        if (!masterSheet) {
            return res.status(404).json({ error: 'MasterSheet not found' });
        }
        res.status(200).json(masterSheet);
    } catch (err) {
        console.error('Error fetching master sheet:', err);
        res.status(500).json({ error: 'Failed to fetch master sheet' });
    }
};

exports.createMasterSheet = async (req, res) => {
    try {
        const masterSheet = await MasterSheet.create(req.body);
        res.status(201).json(masterSheet);
    } catch (err) {
        console.error('Error creating master sheet:', err);
        res.status(400).json({ error: 'Failed to create master sheet', details: err.message });
    }
};

exports.updateMasterSheet = async (req, res) => {
    try {
        const masterSheet = await MasterSheet.findByPk(req.params.id);
        if (!masterSheet) {
            return res.status(404).json({ error: 'MasterSheet not found' });
        }
        await masterSheet.update(req.body);
        res.status(200).json(masterSheet);
    } catch (err) {
        console.error('Error updating master sheet:', err);
        res.status(400).json({ error: 'Failed to update master sheet', details: err.message });
    }
};

exports.deleteMasterSheet = async (req, res) => {
    try {
        const masterSheet = await MasterSheet.findByPk(req.params.id);
        if (!masterSheet) {
            return res.status(404).json({ error: 'MasterSheet not found' });
        }
        await masterSheet.destroy();
        res.status(204).send();
    } catch (err) {
        console.error('Error deleting master sheet:', err);
        res.status(500).json({ error: 'Failed to delete master sheet', details: err.message });
    }
};
