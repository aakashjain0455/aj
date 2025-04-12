const PunchOrder = require('../models/PunchOrder');
const { v4: uuidv4 } = require('uuid');

// Fetch the next available order number
exports.getNextOrderNumber = async (req, res) => {
  try {
    const lastOrder = await PunchOrder.findOne({
      order: [['createdAt', 'DESC']],
    });

    const nextOrderNumber = lastOrder ? parseInt(lastOrder.orderNumber) + 1 : 1;
    res.json({ nextOrderNumber: nextOrderNumber.toString().padStart(3, '0') });
  } catch (error) {
    console.error('Error fetching next order number:', error);
    res.status(500).json({ error: 'Failed to fetch next order number' });
  }
};

// Create a new punch order with full details
exports.createPunchOrder = async (req, res) => {
  try {
    const {
      orderNumber, orderQty, ratePerPcs, wbOrB, poNumber, poDate, orderRemarks, partyName, masterId, punchedDateTime, userName,    
      wireSpec, core, colour, length, brandNameForPlug, otherBrandName, clientOfAdvancePayment,
      typeOfPin, backStripping, backCopperStripping, terminal, housing, sleeve, solderingTwisting,
      backSolder, packing, grommetName, grommetLength, plug, computerSocket, amp, remarksPowerCord,
      noOfStands, copperStandsDia, brandNameOnWire, coreColours, coreOd, corePVC, outerOd,
      pvcInOuter, finishing, printingOnWire, wireCmlNo, planCoilWeight, coilLength, remarksWire
    } = req.body;

    const newOrder = await PunchOrder.create({
      orderNumber,
      orderQty,
      ratePerPcs,
      wbOrB,
      poNumber,
      poDate,
      orderRemarks,
      partyName,
      masterId,
      punchedDateTime,
      userName,

      // Extra fields
      wireSpec, core, colour, length, brandNameForPlug, otherBrandName, clientOfAdvancePayment,
      typeOfPin, backStripping, backCopperStripping, terminal, housing, sleeve, solderingTwisting,
      backSolder, packing, grommetName, grommetLength, plug, computerSocket, amp, remarksPowerCord,
      noOfStands, copperStandsDia, brandNameOnWire, coreColours, coreOd, corePVC, outerOd,
      pvcInOuter, finishing, printingOnWire, wireCmlNo, planCoilWeight, coilLength, remarksWire
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

exports.updatePunchOrdersByMasterId = async (req, res) => {
  const { masterId } = req.params;
  const updatedFields = req.body;

  try {
    const [updatedCount] = await PunchOrder.update(updatedFields, {
      where: { masterId }
    });

    if (updatedCount === 0) {
      return res.status(404).json({ message: 'No punch orders found for the given Master ID.' });
    }

    res.json({ message: `Successfully updated ${updatedCount} punch orders.` });
  } catch (error) {
    console.error('Error updating punch orders by Master ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
