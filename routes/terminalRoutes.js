// routes/terminalRoutes.js
const express = require('express');
const router = express.Router();
const terminalController = require('../controllers/terminalController');

router.get('/terminals', terminalController.getAllTerminals);
router.post('/terminals', terminalController.upload, terminalController.createTerminal);
router.put('/terminals/:id', terminalController.upload, terminalController.updateTerminal);
router.delete('/terminals/:id', terminalController.deleteTerminal);

module.exports = router;
