// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Define routes
router.get('/', orderController.getAllOrders); // GET /api/orders
router.post('/', orderController.createOrder); // POST /api/orders
router.put('/', orderController.updateOrder); // PUT /api/orders (body contains orderNumber)
router.delete('/:orderNumber', orderController.deleteOrder); // DELETE /api/orders/:orderNumber

module.exports = router;
