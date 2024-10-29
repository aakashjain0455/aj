// routes/masterSheetRoutes.js
const express = require('express');
const router = express.Router();
const masterSheetController = require('../controllers/masterSheetController');

router.post('/master-sheets', masterSheetController.createMasterSheet);
router.get('/master-sheets', masterSheetController.getAllMasterSheets);

module.exports = router;
