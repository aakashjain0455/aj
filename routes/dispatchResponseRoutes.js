const express = require('express');
const router = express.Router();
const dispatchResponseController = require('../controllers/dispatchResponseController');

// Routes for DispatchResponse
router.get('/dispatch-responses', dispatchResponseController.getAllResponses);
router.get('/dispatch-responses/:orderNumber', dispatchResponseController.getResponseByOrderNumber);
router.post('/dispatch-responses', dispatchResponseController.saveResponse);
router.put('/dispatch-responses/:orderNumber', dispatchResponseController.saveResponse);
router.delete('/dispatch-responses/:orderNumber', dispatchResponseController.deleteResponse);

module.exports = router;
