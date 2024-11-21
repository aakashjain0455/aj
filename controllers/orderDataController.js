const OrderData = require('../models/OrderData');

// Fetch all OrderData entries
exports.getAllOrderData = async (req, res) => {
  try {
    const orders = await OrderData.findAll();
    const parsedOrders = orders.map(order => ({
      ...order.toJSON(),
      cuttingData: order.cuttingData ? JSON.parse(order.cuttingData) : null,
      packingData: order.packingData ? JSON.parse(order.packingData) : null,
    }));
    res.status(200).json(parsedOrders);
  } catch (error) {
    console.error('Error fetching orders:', error.message, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Fetch a single OrderData entry by ID
exports.getOrderDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderData.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      ...order.toJSON(),
      cuttingData: order.cuttingData ? JSON.parse(order.cuttingData) : null,
      packingData: order.packingData ? JSON.parse(order.packingData) : null,
    });
  } catch (error) {
    console.error('Error fetching order by ID:', error.message, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create or update an OrderData entry
exports.createOrUpdateOrderData = async (req, res) => {
  try {
    const { orderNumber, cuttingData, packingData } = req.body;

    console.log('Received payload:', { orderNumber, cuttingData, packingData });

    // Validate payload
    if (!orderNumber) {
      return res.status(400).json({ message: 'Order number is required.' });
    }

    const isValidData = (data) =>
      Array.isArray(data) && data.every(row => row.date && !isNaN(parseInt(row.totalPcs, 10)));

    if (!isValidData(cuttingData) || !isValidData(packingData)) {
      return res.status(400).json({
        message: 'Invalid cutting or packing data. Ensure all rows have valid dates and total pieces.',
      });
    }

    // Upsert order data
    const [order, created] = await OrderData.upsert({
      orderNumber,
      cuttingData: JSON.stringify(cuttingData),
      packingData: JSON.stringify(packingData),
    });

    res.status(created ? 201 : 200).json({
      message: created ? 'Order created successfully.' : 'Order updated successfully.',
      order,
    });
  } catch (error) {
    console.error('Error in createOrUpdateOrderData:', error.message, error);

    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: 'Validation error', details: error.errors });
    }

    res.status(500).json({ message: 'Internal server error' });
  }
};



// Update an existing OrderData entry
exports.updateOrderData = async (req, res) => {
  try {
    const { id } = req.params;
    const { cuttingData, packingData } = req.body;

    const order = await OrderData.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.update({
      cuttingData: cuttingData ? JSON.stringify(cuttingData) : order.cuttingData,
      packingData: packingData ? JSON.stringify(packingData) : order.packingData,
    });

    res.status(200).json({ message: 'Order updated successfully.', order });
  } catch (error) {
    console.error('Error updating order:', error.message, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete an OrderData entry
exports.deleteOrderData = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await OrderData.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.destroy();
    res.status(200).json({ message: 'Order deleted successfully.' });
  } catch (error) {
    console.error('Error deleting order:', error.message, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
