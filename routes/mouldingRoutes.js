const express = require('express');
const router = express.Router();
const mouldingController = require('../controllers/mouldingController');

router.get('/moulding/:orderNumber', mouldingController.getMouldingDataByOrder);
router.post('/moulding', mouldingController.saveMouldingData);
router.delete('/moulding/:id', mouldingController.deleteMouldingData);
router.delete('/moulding/:orderNumber', mouldingController.deleteMouldingByOrder);


module.exports = router;
