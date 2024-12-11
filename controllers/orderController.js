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
// Update or create an order by orderNumber (Upsert)
exports.updateOrder = async (req, res) => {
  console.log('Updating order with data:', req.body);
  const { orderNumber, orderConfirmation, fmsRemarks } = req.body;
  try {
    // Use upsert to either update if exists or create if not
    const [order, created] = await Order.upsert(
      { orderNumber, orderConfirmation, fmsRemarks },
      { returning: true } // Returns the updated row after upsert
    );

    // Respond with the updated or created order data
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
