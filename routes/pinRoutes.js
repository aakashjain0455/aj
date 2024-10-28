// routes/pinRoutes.js
const express = require('express');
const router = express.Router();
const pinController = require('../controllers/pinController');

router.get('/pins', pinController.getAllPins);
router.post('/pins', pinController.upload, pinController.createPin);
router.put('/pins/:id', pinController.upload, pinController.updatePin);
router.delete('/pins/:id', pinController.deletePin);

module.exports = router;
