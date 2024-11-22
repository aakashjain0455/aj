const OrderData = require('../models/OrderData');

// Fetch all orders
exports.getAllOrderData = async (req, res) => {
  try {
    const orders = await OrderData.findAll();
    console.log('Fetched all orders:', orders.length);
    return res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching all orders:', error);
    return res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

// Fetch order by ID
exports.getOrderDataById = async (req, res) => {
  const { id } = req.params;

  // Treat IDs as strings to preserve formats like `001`
  if (!id || isNaN(Number(id))) {
    console.error('Invalid ID:', id);
    return res.status(400).json({ message: 'Invalid order ID' });
  }

  try {
    const order = await OrderData.findByPk(id); // `id` will match the database field
    if (!order) {
      console.log('Order not found for ID:', id);
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    return res.status(500).json({ message: 'Failed to fetch order' });
  }
};

// Create or update order data
exports.createOrUpdateOrderData = async (req, res) => {
  const { orderNumber, cuttingData, packingData } = req.body;

  try {
    const existingOrder = await OrderData.findOne({ where: { orderNumber } });

    if (existingOrder) {
      existingOrder.cuttingData = JSON.stringify(cuttingData);
      existingOrder.packingData = JSON.stringify(packingData);
      await existingOrder.save();
      return res.status(200).json({ message: 'Order updated successfully', order: existingOrder });
    }

    const newOrder = await OrderData.create({
      orderNumber,
      cuttingData: JSON.stringify(cuttingData),
      packingData: JSON.stringify(packingData),
    });

    return res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error('Error saving order data:', error);
    return res.status(500).json({ message: 'Failed to save order' });
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

    return res.status(200).json({ message: 'Order updated successfully', order });
  } catch (error) {
    console.error('Error updating order:', error);
    return res.status(500).json({ message: 'Failed to update order' });
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
    return res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    return res.status(500).json({ message: 'Failed to delete order' });
  }
};
