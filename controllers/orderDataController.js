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

// Fetch order by orderNumber
exports.getOrderDataByOrderNumber = async (req, res) => {
  const { orderNumber } = req.params;

  if (!orderNumber) {
    console.error('Order number is required');
    return res.status(400).json({ message: 'Order number is required' });
  }

  try {
    const order = await OrderData.findOne({ where: { orderNumber } });
    if (!order) {
      console.log('Order not found for orderNumber:', orderNumber);
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order by orderNumber:', error);
    return res.status(500).json({ message: 'Failed to fetch order' });
  }
};

// Create or update order data
exports.createOrUpdateOrderData = async (req, res) => {
  const { orderNumber, cuttingData, packingData } = req.body;

  if (!orderNumber) {
    return res.status(400).json({ message: 'Order number is required' });
  }

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
  const { orderNumber } = req.params;
  const { cuttingData, packingData } = req.body;

  if (!orderNumber) {
    return res.status(400).json({ message: 'Order number is required' });
  }

  try {
    const order = await OrderData.findOne({ where: { orderNumber } });
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
  const { orderNumber } = req.params;

  if (!orderNumber) {
    return res.status(400).json({ message: 'Order number is required' });
  }

  try {
    const order = await OrderData.findOne({ where: { orderNumber } });
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
