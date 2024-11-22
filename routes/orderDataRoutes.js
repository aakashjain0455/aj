const express = require('express');
const router = express.Router();
const orderDataController = require('../controllers/orderDataController');

// Define routes
router.get('/', orderDataController.getAllOrderData); // Fetch all orders
router.get('/:orderNumber', orderDataController.getOrderDataByOrderNumber); // Fetch order by orderNumber
router.post('/', orderDataController.createOrUpdateOrderData); // Create or update order
router.put('/:orderNumber', orderDataController.updateOrderData); // Update order by orderNumber
router.delete('/:orderNumber', orderDataController.deleteOrderData); // Delete order by orderNumber

module.exports = router;
