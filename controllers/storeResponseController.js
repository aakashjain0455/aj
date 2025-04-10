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

// Get a single response by orderNumber
exports.getResponseByOrderNumber = async (req, res) => {
  const { orderNumber } = req.params;

  try {
    const response = await StoreResponse.findOne({ where: { orderNumber } });

    if (!response) {
      return res.status(404).json({ error: `Response not found for Order Number: ${orderNumber}` });
    }

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching response:', error.message);
    res.status(500).json({
      error: 'Failed to fetch store response',
      details: error.message,
    });
  }
};

// Create a new response
exports.createResponse = async (req, res) => {
  try {
    const { orderNumber, oldPowercord, wireAvailable, howMuchWireAvailable, storeRemarks, balanceWireRequired, wireIssued } = req.body;

    const newResponse = await StoreResponse.create({
      orderNumber,
      oldPowercord,
      wireAvailable,
      howMuchWireAvailable,
      storeRemarks,
      balanceWireRequired,
      wireIssued, // ✅ Include this field
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


exports.updateResponse = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      oldPowercord,
      wireAvailable,
      howMuchWireAvailable,
      storeRemarks,
      balanceWireRequired,
      wireIssued,
    } = req.body;

    console.log(`🟡 Starting upsert for Order Number: ${id}`);
    console.log(`🧾 wireIssued size: ${JSON.stringify(wireIssued).length} characters`);

    // 🔁 UPSERT = create or update in one go
    const [response, created] = await StoreResponse.upsert({
      orderNumber: id,
      oldPowercord,
      wireAvailable,
      howMuchWireAvailable,
      storeRemarks,
      balanceWireRequired,
      wireIssued,
    });

    console.log(`✅ Upsert ${created ? 'created' : 'updated'} record for Order ${id}`);

    const message = created
      ? 'New record created successfully'
      : 'Response updated successfully';

    res.status(created ? 201 : 200).json({ message, data: response });

  } catch (error) {
    console.error('❌ Full Error:', error); // ✅ Full stack log
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
