const express = require('express');
const router = express.Router();
const orderDataController = require('../controllers/orderDataController');

router.post('/order-data', orderDataController.createOrderData);
router.get('/order-data/:orderNumber', orderDataController.getOrderData);
router.put('/order-data/:orderNumber', orderDataController.updateOrderData);
router.delete('/order-data/:orderNumber', orderDataController.deleteOrderData);

module.exports = router;
//moulding