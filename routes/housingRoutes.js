// routes/housingRoutes.js
const express = require('express');
const router = express.Router();
const housingController = require('../controllers/housingController');

router.get('/housing', housingController.getAllHousing);
router.post('/housing', housingController.upload, housingController.createHousing);
router.put('/housing/:id', housingController.upload, housingController.updateHousing);
router.delete('/housing/:id', housingController.deleteHousing);

module.exports = router;
