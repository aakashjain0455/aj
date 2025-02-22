const express = require('express');
const router = express.Router();
const mouldingNewController = require('../controllers/mouldingNewController');

router.get('/mouldingNew', mouldingNewController.getMouldingNew);
router.post('/mouldingNew', mouldingNewController.createMouldingNew);
router.put('/mouldingNew/:id', mouldingNewController.updateMouldingNew);
router.delete('/mouldingNew/:id', mouldingNewController.deleteMouldingNew);

module.exports = router;
