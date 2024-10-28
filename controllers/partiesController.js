// controllers/partiesController.js
const Parties = require('../models/Parties');
const { v4: uuidv4 } = require('uuid');

exports.getAllParties = async (req, res) => {
  try {
    const parties = await Parties.findAll();
    res.json(parties);
  } catch (error) {
    console.error('Error fetching parties:', error);
    res.status(500).json({ error: 'Failed to fetch parties' });
  }
};

exports.createParty = async (req, res) => {
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
    const party = await Parties.create({
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
    res.json(party);
  } catch (error) {
    console.error('Error creating party:', error);
    res.status(500).json({ error: 'Failed to create party' });
  }
};

exports.updateParty = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const party = await Parties.findByPk(id);

    if (party) {
      await party.update(updatedData);
      res.json(party);
    } else {
      res.status(404).json({ error: 'Party not found' });
    }
  } catch (error) {
    console.error('Error updating party:', error);
    res.status(500).json({ error: 'Failed to update party' });
  }
};

exports.deleteParty = async (req, res) => {
  try {
    const { id } = req.params;
    const party = await Parties.findByPk(id);

    if (party) {
      await party.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Party not found' });
    }
  } catch (error) {
    console.error('Error deleting party:', error);
    res.status(500).json({ error: 'Failed to delete party' });
  }
};
