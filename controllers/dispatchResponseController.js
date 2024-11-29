const DispatchResponse = require('../models/DispatchResponse');

// Get all responses
exports.getAllResponses = async (req, res) => {
  try {
    const responses = await DispatchResponse.findAll();
    res.json(responses);
  } catch (error) {
    console.error('Error fetching dispatch responses:', error);
    res.status(500).json({ error: 'Failed to fetch dispatch responses' });
  }
};

// Get a single response by orderNumber
exports.getResponseByOrderNumber = async (req, res) => {
  const { orderNumber } = req.params;

  try {
    const response = await DispatchResponse.findOne({ where: { orderNumber } });
    if (!response) {
      return res.status(404).json({ error: `Response not found for Order Number: ${orderNumber}` });
    }

    res.json({
      ...response.dataValues,
      dispatchData: JSON.parse(response.dispatchData || '[]'), // Parse JSON string
    });
  } catch (error) {
    console.error('Error fetching response:', error.message);
    res.status(500).json({ error: 'Failed to fetch dispatch response' });
  }
};

// Create or update a response
exports.saveResponse = async (req, res) => {
  try {
    const { orderNumber, dispatchData, balanceOrderQty } = req.body;

    const response = await DispatchResponse.findOne({ where: { orderNumber } });
    if (!response) {
      // Create a new response
      const newResponse = await DispatchResponse.create({
        orderNumber,
        dispatchData: JSON.stringify(dispatchData), // Convert to JSON string
        balanceOrderQty,
      });
      return res.status(201).json({ message: 'Response created successfully', data: newResponse });
    }

    // Update existing response
    await response.update({
      dispatchData: JSON.stringify(dispatchData), // Convert to JSON string
      balanceOrderQty,
    });

    res.json({ message: 'Response updated successfully', data: response });
  } catch (error) {
    console.error('Error saving response:', error.message);
    res.status(500).json({ error: 'Failed to save dispatch response' });
  }
};

// Delete a response
exports.deleteResponse = async (req, res) => {
  try {
    const { orderNumber } = req.params;

    const response = await DispatchResponse.findOne({ where: { orderNumber } });

    if (!response) {
      return res.status(404).json({ error: 'Response not found' });
    }

    await response.destroy();
    res.json({ message: 'Response deleted successfully' });
  } catch (error) {
    console.error('Error deleting response:', error);
    res.status(500).json({
      error: 'Failed to delete dispatch response',
      details: error.message,
    });
  }
};
