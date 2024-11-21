const OrderData = require('../models/OrderData');

exports.createOrderData = async (req, res) => {
  try {
    const { orderNumber, cuttingData, packingData } = req.body;

    const newOrderData = await OrderData.create({
      orderNumber,
      cuttingData,
      packingData,
    });

    res.status(201).json(newOrderData);
  } catch (error) {
    console.error('Error creating order data:', error);
    res.status(500).json({ error: 'Failed to create order data', details: error.message });
  }
};

exports.getOrderData = async (req, res) => {
  try {
    const { orderNumber } = req.params;
    const orderData = await OrderData.findOne({ where: { orderNumber } });

    if (orderData) {
      res.json(orderData);
    } else {
      res.status(404).json({ error: 'Order data not found' });
    }
  } catch (error) {
    console.error('Error fetching order data:', error);
    res.status(500).json({ error: 'Failed to fetch order data', details: error.message });
  }
};

exports.updateOrderData = async (req, res) => {
  try {
    const { orderNumber } = req.params;
    const { cuttingData, packingData } = req.body;

    const orderData = await OrderData.findOne({ where: { orderNumber } });

    if (orderData) {
      await orderData.update({ cuttingData, packingData });
      res.json(orderData);
    } else {
      res.status(404).json({ error: 'Order data not found' });
    }
  } catch (error) {
    console.error('Error updating order data:', error);
    res.status(500).json({ error: 'Failed to update order data', details: error.message });
  }
};

exports.deleteOrderData = async (req, res) => {
  try {
    const { orderNumber } = req.params;

    const orderData = await OrderData.findOne({ where: { orderNumber } });

    if (orderData) {
      await orderData.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Order data not found' });
    }
  } catch (error) {
    console.error('Error deleting order data:', error);
    res.status(500).json({ error: 'Failed to delete order data', details: error.message });
  }
};
//moulding