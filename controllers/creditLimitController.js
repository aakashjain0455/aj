// controllers/creditLimitController.js
const CreditLimit = require('../models/CreditLimit');

// Retrieve all credit limits
exports.getAllCreditLimits = async (req, res) => {
  try {
    const creditLimits = await CreditLimit.findAll();
    res.json(creditLimits);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching credit limits', error: error.message });
  }
};

// Create a new credit limit record
exports.createCreditLimit = async (req, res) => {
  const { orderNumber, creditLimitStatus, creditLimitRemarks } = req.body;
  try {
    const newCreditLimit = await CreditLimit.create({ orderNumber, creditLimitStatus, creditLimitRemarks });
    res.status(201).json(newCreditLimit);
  } catch (error) {
    res.status(400).json({ message: 'Error creating credit limit', error: error.message });
  }
};

// Update or create a credit limit record by orderNumber (Upsert)
exports.updateCreditLimit = async (req, res) => {
  const { orderNumber, creditLimitStatus, creditLimitRemarks } = req.body;
  try {
    const [creditLimit, created] = await CreditLimit.upsert(
      { orderNumber, creditLimitStatus, creditLimitRemarks },
      { returning: true }
    );
    res.json(creditLimit);
  } catch (error) {
    res.status(400).json({ message: 'Error updating credit limit', error: error.message });
  }
};

// Delete a credit limit by orderNumber
exports.deleteCreditLimit = async (req, res) => {
  const { orderNumber } = req.params;
  try {
    const creditLimit = await CreditLimit.findOne({ where: { orderNumber } });
    if (!creditLimit) {
      return res.status(404).json({ message: `Credit limit for order number ${orderNumber} not found` });
    }
    await creditLimit.destroy();
    res.json({ message: 'Credit limit deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting credit limit', error: error.message });
  }
};
