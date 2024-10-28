// controllers/partieesController.js
const Partiees = require('../models/Partiees');
const { v4: uuidv4 } = require('uuid');

exports.getAllPartiees = async (req, res) => {
  try {
    const partiees = await Partiees.findAll();
    res.json(partiees);
  } catch (error) {
    console.error('Error fetching partiees:', error);
    res.status(500).json({ error: 'Failed to fetch partiees' });
  }
};

exports.createPartiee = async (req, res) => {
  try {
    const {
      partyName,
      salesman,
      phone1,
      contactPerson1,
      phone2,
      contactPerson2,
      phone3,
      contactPerson3,
      shippingAddress,
      billingAddress,
      email,
      gstn,
      weeklyOff,
      paymentTerms,
      creditLimitAmount,
      creditLimitDays,
      transportDetails,
      remarks,
      sameAsShipping
    } = req.body;

    const partyCode = uuidv4();
    const partiee = await Partiees.create({
      partyCode,
      partyName,
      salesman,
      phone1,
      contactPerson1,
      phone2,
      contactPerson2,
      phone3,
      contactPerson3,
      shippingAddress,
      billingAddress: sameAsShipping ? shippingAddress : billingAddress,
      email,
      gstn,
      weeklyOff,
      paymentTerms,
      creditLimitAmount,
      creditLimitDays,
      transportDetails,
      remarks,
      sameAsShipping
    });
    res.json(partiee);
  } catch (error) {
    console.error('Error creating partiee:', error);
    res.status(500).json({ error: 'Failed to create partiee' });
  }
};

exports.updatePartiee = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const partiee = await Partiees.findByPk(id);

    if (partiee) {
      await partiee.update(updatedData);
      res.json(partiee);
    } else {
      res.status(404).json({ error: 'Partiee not found' });
    }
  } catch (error) {
    console.error('Error updating partiee:', error);
    res.status(500).json({ error: 'Failed to update partiee' });
  }
};

exports.deletePartiee = async (req, res) => {
  try {
    const { id } = req.params;
    const partiee = await Partiees.findByPk(id);

    if (partiee) {
      await partiee.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Partiee not found' });
    }
  } catch (error) {
    console.error('Error deleting partiee:', error);
    res.status(500).json({ error: 'Failed to delete partiee' });
  }
};
