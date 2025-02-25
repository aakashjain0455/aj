const express = require('express');
const router = express.Router();
const mouldingNewController = require('../controllers/mouldingNewController');

router.get('/mouldingNew', mouldingNewController.getMouldingData);
router.post('/mouldingNew', mouldingNewController.saveMouldingData);
router.delete('/mouldingNew/:orderNumber', mouldingNewController.deleteMouldingData);

module.exports = router;
