// routes/plugRoutes.js
const express = require('express');
const router = express.Router();
const plugController = require('../controllers/plugController');

router.get('/plugs', plugController.getAllPlugs);
router.post('/plugs', plugController.upload, plugController.createPlug);
router.put('/plugs/:id', plugController.upload, plugController.updatePlug);
router.delete('/plugs/:id', plugController.deletePlug);

module.exports = router;
