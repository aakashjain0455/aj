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

// Update or create an order by orderNumber (Upsert)
exports.updateOrder = async (req, res) => {
  const { orderNumber, orderConfirmation, fmsRemarks } = req.body;
  try {
    // Find an order with this orderNumber or create a new one if it doesn't exist
    const [order, created] = await Order.findOrCreate({
      where: { orderNumber },
      defaults: { orderConfirmation, fmsRemarks }
    });

    // If the order already existed, update it with the new values
    if (!created) {
      await order.update({ orderConfirmation, fmsRemarks });
    }

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: 'Error saving order data', error: error.message });
  }
};

// Delete an order by orderNumber
exports.deleteOrder = async (req, res) => {
  const { orderNumber } = req.params;
  try {
    const order = await Order.findOne({ where: { orderNumber } });
    if (!order) {
      return res.status(404).json({ message: `Order with number ${orderNumber} not found` });
    }
    await order.destroy();
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error: error.message });
  }
};
