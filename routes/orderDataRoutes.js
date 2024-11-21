const express = require('express');
const orderDataController = require('../controllers/orderDataController');

const router = express.Router();

// Routes for OrderData
router.get('/', orderDataController.getAllOrderData);
router.get('/:id', orderDataController.getOrderDataById);
router.post('/', orderDataController.createOrderData);
router.put('/:id', orderDataController.updateOrderData);
router.delete('/:id', orderDataController.deleteOrderData);

module.exports = router;
