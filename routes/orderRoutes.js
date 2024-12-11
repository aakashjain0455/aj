// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Define routes
router.get('/', orderController.getAllOrders); // GET /api/orders
router.post('/', orderController.createOrder); // POST /api/orders
router.put('/', (req, res, next) => {
    console.log('PUT /api/orders called');
    console.log('Request Body:', req.body);
    next();
  }, orderController.updateOrder);
router.delete('/:orderNumber', orderController.deleteOrder); // DELETE /api/orders/:orderNumber

module.exports = router;
