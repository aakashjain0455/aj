const StoreResponse = require('../models/StoreResponse');

// Get all responses
exports.getAllResponses = async (req, res) => {
  try {
    const responses = await StoreResponse.findAll();
    res.json(responses);
  } catch (error) {
    console.error('Error fetching responses:', error);
    res.status(500).json({ error: 'Failed to fetch store responses' });
  }
};

// Create a new response
exports.createResponse = async (req, res) => {
  try {
    const { orderNumber, oldPowercord, wireAvailable, howMuchWireAvailable, storeRemarks } = req.body;

    const newResponse = await StoreResponse.create({
      orderNumber,
      oldPowercord,
      wireAvailable,
      howMuchWireAvailable,
      storeRemarks,
    });

    res.json({ message: 'Response created successfully', data: newResponse });
  } catch (error) {
    console.error('Error creating response:', error);
    res.status(500).json({
      error: 'Failed to create store response',
      details: error.message,
    });
  }
};

// Update an existing response
exports.updateResponse = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPowercord, wireAvailable, howMuchWireAvailable, storeRemarks } = req.body;

    const response = await StoreResponse.findByPk(id);

    if (!response) {
      return res.status(404).json({ error: 'Response not found' });
    }

    await response.update({ oldPowercord, wireAvailable, howMuchWireAvailable, storeRemarks });

    res.json({ message: 'Response updated successfully', data: response });
  } catch (error) {
    console.error('Error updating response:', error);
    res.status(500).json({
      error: 'Failed to update store response',
      details: error.message,
    });
  }
};

// Delete a response
exports.deleteResponse = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await StoreResponse.findByPk(id);

    if (!response) {
      return res.status(404).json({ error: 'Response not found' });
    }

    await response.destroy();
    res.json({ message: 'Response deleted successfully' });
  } catch (error) {
    console.error('Error deleting response:', error);
    res.status(500).json({
      error: 'Failed to delete store response',
      details: error.message,
    });
  }
};
