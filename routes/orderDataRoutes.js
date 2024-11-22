const express = require('express');
const router = express.Router();
const orderDataController = require('../controllers/orderDataController');

// Define routes
router.get('/:id?', orderDataController.getOrderData); // Combined fetch all and fetch by ID
router.post('/', orderDataController.createOrUpdateOrderData); // Combined create/update
router.put('/:id', orderDataController.updateOrderData);
router.delete('/:id', orderDataController.deleteOrderData);

module.exports = router;
