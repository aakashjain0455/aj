
const express = require('express');
const router = express.Router();
const transportController = require('../controllers/transportController');

router.get('/transports', transportController.getAllTransports);
router.post('/transports', transportController.createTransport);
router.put('/transports/:id', transportController.updateTransport);
router.delete('/transports/:id', transportController.deleteTransport);

module.exports = router;
