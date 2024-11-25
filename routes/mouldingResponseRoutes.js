const express = require('express');
const router = express.Router();
const mouldingResponseController = require('../controllers/mouldingResponseController');

// Routes for MouldingResponse
router.get('/moulding-responses', mouldingResponseController.getAllResponses);
router.get('/moulding-responses/:orderNumber', mouldingResponseController.getResponseByOrderNumber);
router.post('/moulding-responses', mouldingResponseController.saveResponse);
router.put('/moulding-responses/:orderNumber', mouldingResponseController.saveResponse);
router.delete('/moulding-responses/:orderNumber', mouldingResponseController.deleteResponse);

module.exports = router;
