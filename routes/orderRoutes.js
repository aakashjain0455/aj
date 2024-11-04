// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// CRUD routes for orders
router.get('/orders', orderController.getAllOrders); // GET /api/orders
router.post('/orders', orderController.createOrder); // POST /api/orders
router.put('/orders/:id', orderController.updateOrder); // PUT /api/orders/:id
router.delete('/orders/:id', orderController.deleteOrder); // DELETE /api/orders/:id

module.exports = router;
