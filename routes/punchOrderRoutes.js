// routes/punchOrderRoutes.js
const express = require('express');
const router = express.Router();
const punchOrderController = require('../controllers/punchOrderController');

router.get('/punch-orders/next-order-number', punchOrderController.getNextOrderNumber);
router.post('/punch-orders', punchOrderController.createPunchOrder);
router.get('/punch-orders', punchOrderController.getAllPunchOrders);
router.put('/punch-orders/by-master/:masterId', punchOrderController.updatePunchOrdersByMasterId);

module.exports = router;
