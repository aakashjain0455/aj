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
      const { id } = req.params; // The orderNumber sent from the frontend
      const { oldPowercord, wireAvailable, howMuchWireAvailable, storeRemarks } = req.body;
  
      // Search for the record by orderNumber
      let response = await StoreResponse.findOne({ where: { orderNumber: id } });
  
      if (!response) {
        console.log(`Order Number ${id} not found. Creating a new record.`);
        // Create a new record if not found
        response = await StoreResponse.create({
          orderNumber: id,
          oldPowercord,
          wireAvailable,
          howMuchWireAvailable,
          storeRemarks,
        });
        return res.status(201).json({ message: 'New record created successfully', data: response });
      }
  
      // Update the record if it exists
      await response.update({ oldPowercord, wireAvailable, howMuchWireAvailable, storeRemarks });
  
      res.json({ message: 'Response updated successfully', data: response });
    } catch (error) {
      console.error('Error saving response:', error.message);
      res.status(500).json({
        error: 'Failed to save store response',
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
