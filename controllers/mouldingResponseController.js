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
  
      res.json({
        ...response.dataValues,
        cutting: JSON.parse(response.cutting || '[]'), // Parse JSON string
        packing: JSON.parse(response.packing || '[]'), // Parse JSON string
      });
    } catch (error) {
      console.error('Error fetching response:', error.message);
      res.status(500).json({ error: 'Failed to fetch moulding response' });
    }
  };
  

// Create or update a response
exports.saveResponse = async (req, res) => {
    try {
      const { orderNumber, cutting, packing } = req.body;
  
      const response = await MouldingResponse.findOne({ where: { orderNumber } });
      if (!response) {
        // Create a new response
        const newResponse = await MouldingResponse.create({
          orderNumber,
          cutting: JSON.stringify(cutting), // Convert to JSON string
          packing: JSON.stringify(packing), // Convert to JSON string
        });
        return res.status(201).json({ message: 'Response created successfully', data: newResponse });
      }
  
      // Update existing response
      await response.update({
        cutting: JSON.stringify(cutting), // Convert to JSON string
        packing: JSON.stringify(packing), // Convert to JSON string
      });
  
      res.json({ message: 'Response updated successfully', data: response });
    } catch (error) {
      console.error('Error saving response:', error.message);
      res.status(500).json({ error: 'Failed to save moulding response' });
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
