// routes/colorRoutes.js
const express = require('express');
const router = express.Router();
const colorController = require('../controllers/colorController');

router.get('/colors', colorController.getAllColors);
router.post('/colors', colorController.upload, colorController.createColor);
router.put('/colors/:id', colorController.upload, colorController.updateColor);
router.delete('/colors/:id', colorController.deleteColor);

module.exports = router;
