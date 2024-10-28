// routes/coreRoutes.js
const express = require('express');
const router = express.Router();
const coreController = require('../controllers/coreController');

router.get('/cores', coreController.getAllCores);
router.post('/cores', coreController.upload, coreController.createCore);
router.put('/cores/:id', coreController.upload, coreController.updateCore);
router.delete('/cores/:id', coreController.deleteCore);

module.exports = router;
