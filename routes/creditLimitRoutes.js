// routes/creditLimitRoutes.js
const express = require('express');
const router = express.Router();
const creditLimitController = require('../controllers/creditLimitController');

// Retrieve all credit limits
router.get('/', async (req, res) => {
  try {
    await creditLimitController.getAllCreditLimits(req, res);
  } catch (error) {
    console.error('Error fetching credit limits:', error);
    res.status(500).json({ message: 'Failed to fetch credit limits', error: error.message });
  }
});

// Create a new credit limit
router.post('/', async (req, res) => {
  try {
    await creditLimitController.createCreditLimit(req, res);
  } catch (error) {
    console.error('Error creating credit limit:', error);
    res.status(400).json({ message: 'Failed to create credit limit', error: error.message });
  }
});

// Update an existing credit limit
router.put('/', async (req, res) => {
  try {
    await creditLimitController.updateCreditLimit(req, res);
  } catch (error) {
    console.error('Error updating credit limit:', error);
    res.status(400).json({ message: 'Failed to update credit limit', error: error.message });
  }
});

// Delete a credit limit by order number
router.delete('/:orderNumber', async (req, res) => {
  try {
    await creditLimitController.deleteCreditLimit(req, res);
  } catch (error) {
    console.error('Error deleting credit limit:', error);
    res.status(500).json({ message: 'Failed to delete credit limit', error: error.message });
  }
});

module.exports = router;
