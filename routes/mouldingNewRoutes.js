const express = require('express');
const router = express.Router();
const mouldingNewController = require('../controllers/mouldingNewController');

router.get('/mouldingNew', mouldingNewController.getMouldingRecords);
router.post('/mouldingNew', mouldingNewController.createMouldingRecord);
router.put('/mouldingNew/:id', mouldingNewController.updateMouldingRecord);
router.delete('/mouldingNew/:id', mouldingNewController.deleteMouldingRecord);

module.exports = router;
