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
    const { orderNumber, orderQty, ratePerPcs, wbOrB, orderRemarks, partyName, masterId, punchedDateTime, userName  } = req.body;

    const newOrder = await PunchOrder.create({
      orderNumber,
      orderQty,
      ratePerPcs,
      wbOrB,
      orderRemarks,
      partyName,
      masterId,
      punchedDateTime,
      userName, // ✅ Store userName
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
