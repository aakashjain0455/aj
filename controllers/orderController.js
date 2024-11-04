// controllers/orderController.js
const Order = require('../models/Order');

// Retrieve all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

// Create a new order
exports.createOrder = async (req, res) => {
  const { orderNumber, orderConfirmation, fmsRemarks } = req.body;
  try {
    const newOrder = await Order.create({ orderNumber, orderConfirmation, fmsRemarks });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error creating order', error: error.message });
  }
};

// Update an existing order by ID
exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const { orderNumber, orderConfirmation, fmsRemarks } = req.body;
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    await order.update({ orderNumber, orderConfirmation, fmsRemarks });
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: 'Error updating order', error: error.message });
  }
};

// Delete an order by ID
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    await order.destroy();
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error: error.message });
  }
};
