const express = require('express');
const router = express.Router();
const storeResponseController = require('../controllers/storeResponseController');

// Routes for StoreResponse
router.get('/store-responses', storeResponseController.getAllResponses);
router.post('/store-responses', storeResponseController.createResponse);
router.put('/store-responses/:id', storeResponseController.updateResponse);
router.delete('/store-responses/:id', storeResponseController.deleteResponse);
router.get('/store-responses/:orderNumber', storeResponseController.getResponseByOrderNumber);


module.exports = router;
