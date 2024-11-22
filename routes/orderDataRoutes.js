const express = require('express');
const router = express.Router();
const orderDataController = require('../controllers/orderDataController');

// Define explicit routes
router.get('/', orderDataController.getAllOrderData); // Fetch all orders
router.get('/:id', orderDataController.getOrderDataById); // Fetch order by ID
router.post('/', orderDataController.createOrUpdateOrderData); // Create or update order
router.put('/:id', orderDataController.updateOrderData); // Update order
router.delete('/:id', orderDataController.deleteOrderData); // Delete order

module.exports = router;
