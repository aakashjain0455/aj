// cuttingVsPackingRoutes.js (Routes)
const express = require('express');
const router = express.Router();
const cuttingVsPackingController = require('../controllers/cuttingVsPackingController');

router.get('/cuttingVsPacking', cuttingVsPackingController.getCuttingVsPacking);
router.post('/cuttingVsPacking', cuttingVsPackingController.createCuttingVsPacking);
router.put('/cuttingVsPacking/:id', cuttingVsPackingController.updateCuttingVsPacking);
router.delete('/cuttingVsPacking/:id', cuttingVsPackingController.deleteCuttingVsPacking);

module.exports = router;