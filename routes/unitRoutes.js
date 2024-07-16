// routes/unitRoutes.js
const express = require('express');
const router = express.Router();
const unitController = require('../controllers/unitController');

router.get('/units', unitController.getAllUnits);
router.post('/units', unitController.upload, unitController.createUnit);
router.put('/units/:id', unitController.upload, unitController.updateUnit);
router.delete('/units/:id', unitController.deleteUnit);

module.exports = router;
