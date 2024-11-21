const OrderData = require('../models/OrderData');

// Get all order data
exports.getAllOrderData = async (req, res) => {
  try {
    const orders = await OrderData.findAll();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

// Get order data by ID
// Get order data by ID
exports.getOrderDataById = async (req, res) => {
  const { id } = req.params;

  // Validate and convert the id to a number
  const orderId = parseInt(id, 10);
  if (isNaN(orderId)) {
    return res.status(400).json({ message: 'Invalid order ID' });
  }

  try {
    const order = await OrderData.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    res.status(500).json({ message: 'Failed to fetch order' });
  }
};


// Create or update order data
exports.createOrUpdateOrderData = async (req, res) => {
  const { orderNumber, cuttingData, packingData } = req.body;

  try {
    const existingOrder = await OrderData.findOne({ where: { orderNumber } });

    if (existingOrder) {
      // Update existing order
      existingOrder.cuttingData = JSON.stringify(cuttingData);
      existingOrder.packingData = JSON.stringify(packingData);
      await existingOrder.save();
      res.status(200).json({ message: 'Order updated successfully', order: existingOrder });
    } else {
      // Create new order
      const newOrder = await OrderData.create({
        orderNumber,
        cuttingData: JSON.stringify(cuttingData),
        packingData: JSON.stringify(packingData),
      });
      res.status(201).json({ message: 'Order created successfully', order: newOrder });
    }
  } catch (error) {
    console.error('Error saving order data:', error);
    res.status(500).json({ message: 'Failed to save order' });
  }
};

// Update order data
exports.updateOrderData = async (req, res) => {
  const { id } = req.params;
  const { cuttingData, packingData } = req.body;

  try {
    const order = await OrderData.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.cuttingData = JSON.stringify(cuttingData);
    order.packingData = JSON.stringify(packingData);
    await order.save();

    res.status(200).json({ message: 'Order updated successfully', order });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Failed to update order' });
  }
};

// Delete order data
exports.deleteOrderData = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await OrderData.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.destroy();
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Failed to delete order' });
  }
};
