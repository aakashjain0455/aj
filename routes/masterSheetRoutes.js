const express = require('express');
const router = express.Router();
const masterSheetController = require('../controllers/masterSheetController');

router.get('/master-sheets', masterSheetController.getAllMasterSheets);
router.get('/master-sheets/:id', masterSheetController.getMasterSheetById);
router.post('/master-sheets', masterSheetController.createMasterSheet);
router.put('/master-sheets/:id', masterSheetController.updateMasterSheet);
router.delete('/master-sheets/:id', masterSheetController.deleteMasterSheet);

module.exports = router;
