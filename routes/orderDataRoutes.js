const express = require('express');
const router = express.Router();
const orderDataController = require('../controllers/orderDataController');

// Define routes
router.get('/', orderDataController.getAllOrderData);
router.get('/:id', orderDataController.getOrderDataById);
router.post('/', orderDataController.createOrUpdateOrderData); // Combined create/update
router.put('/:id', orderDataController.updateOrderData);
router.delete('/:id', orderDataController.deleteOrderData);

module.exports = router;
