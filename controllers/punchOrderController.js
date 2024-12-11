// controllers/punchOrderController.js
const PunchOrder = require('../models/PunchOrder');
const { v4: uuidv4 } = require('uuid');

// Fetch the next available order number
exports.getNextOrderNumber = async (req, res) => {
  try {
    const lastOrder = await PunchOrder.findOne({
      order: [['createdAt', 'DESC']],
    });

    // Determine next order number
    const nextOrderNumber = lastOrder ? parseInt(lastOrder.orderNumber) + 1 : 1;
    res.json({ nextOrderNumber: nextOrderNumber.toString().padStart(3, '0') });
  } catch (error) {
    console.error('Error fetching next order number:', error);
    res.status(500).json({ error: 'Failed to fetch next order number' });
  }
};

// Create a new punch order
exports.createPunchOrder = async (req, res) => {
  try {
    const { orderNumber, orderQty, ratePerPcs, wbOrB, orderRemarks, partyName, masterId, punchedDateTime } = req.body;

    const newOrder = await PunchOrder.create({
      orderNumber,
      orderQty,
      ratePerPcs,
      wbOrB,
      orderRemarks,
      partyName,
      masterId,
      punchedDateTime,
    });

    res.json(newOrder);
  } catch (error) {
    console.error('Error creating punch order:', error);
    res.status(500).json({ error: 'Failed to create punch order' });
  }
};

// Fetch all punch orders
exports.getAllPunchOrders = async (req, res) => {
  try {
    const orders = await PunchOrder.findAll();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching punch orders:', error);
    res.status(500).json({ error: 'Failed to fetch punch orders' });
  }
};


// Update an existing punch order
exports.updatePunchOrder = async (req, res) => {
  try {
    const { orderNumber } = req.params; // Extract order number from request params
    const { orderQty, ratePerPcs, wbOrB, orderRemarks } = req.body; // Extract updated fields from request body

    // Find the order by orderNumber
    const order = await PunchOrder.findOne({ where: { orderNumber } });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update the order details
    await order.update({
      orderQty,
      ratePerPcs,
      wbOrB,
      orderRemarks,
    });

    res.json({ message: 'Order updated successfully', order });
  } catch (error) {
    console.error('Error updating punch order:', error);
    res.status(500).json({ error: 'Failed to update punch order' });
  }
};

// Fetch a single punch order by order number
exports.getPunchOrderById = async (req, res) => {
  try {
    const { orderNumber } = req.params;
    const order = await PunchOrder.findOne({ where: { orderNumber } });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching punch order:', error);
    res.status(500).json({ error: 'Failed to fetch punch order' });
  }
};

