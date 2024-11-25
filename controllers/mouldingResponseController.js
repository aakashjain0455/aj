const MouldingResponse = require('../models/MouldingResponse');

// Get all responses
exports.getAllResponses = async (req, res) => {
  try {
    const responses = await MouldingResponse.findAll();
    res.json(responses);
  } catch (error) {
    console.error('Error fetching responses:', error);
    res.status(500).json({ error: 'Failed to fetch moulding responses' });
  }
};

// Get a single response by orderNumber
exports.getResponseByOrderNumber = async (req, res) => {
  const { orderNumber } = req.params;

  try {
    const response = await MouldingResponse.findOne({ where: { orderNumber } });

    if (!response) {
      return res.status(404).json({ error: `Response not found for Order Number: ${orderNumber}` });
    }

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching response:', error.message);
    res.status(500).json({
      error: 'Failed to fetch moulding response',
      details: error.message,
    });
  }
};

// Create or update a response
exports.saveResponse = async (req, res) => {
  try {
    const { orderNumber, cutting, packing } = req.body;

    let response = await MouldingResponse.findOne({ where: { orderNumber } });

    if (!response) {
      response = await MouldingResponse.create({
        orderNumber,
        cutting,
        packing,
      });
      return res.status(201).json({ message: 'Response created successfully', data: response });
    }

    await response.update({ cutting, packing });

    res.json({ message: 'Response updated successfully', data: response });
  } catch (error) {
    console.error('Error saving response:', error.message);
    res.status(500).json({
      error: 'Failed to save moulding response',
      details: error.message,
    });
  }
};

// Delete a response
exports.deleteResponse = async (req, res) => {
  try {
    const { orderNumber } = req.params;

    const response = await MouldingResponse.findOne({ where: { orderNumber } });

    if (!response) {
      return res.status(404).json({ error: 'Response not found' });
    }

    await response.destroy();
    res.json({ message: 'Response deleted successfully' });
  } catch (error) {
    console.error('Error deleting response:', error);
    res.status(500).json({
      error: 'Failed to delete moulding response',
      details: error.message,
    });
  }
};
