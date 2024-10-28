// routes/partieesRoutes.js
const express = require('express');
const router = express.Router();
const partieesController = require('../controllers/partieesController');

router.get('/partiees', partieesController.getAllPartiees);
router.post('/partiees', partieesController.createPartiee);
router.put('/partiees/:id', partieesController.updatePartiee);
router.delete('/partiees/:id', partieesController.deletePartiee);

module.exports = router;
