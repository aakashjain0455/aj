const MouldingData = require('../models/MouldingData');

// Get all moulding data for a specific order
exports.getMouldingDataByOrder = async (req, res) => {
  try {
    const { orderNumber } = req.params;
    const data = await MouldingData.findAll({ where: { orderNumber } });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create or Update Cutting, Packing, Dispatch Data
exports.saveMouldingData = async (req, res) => {
    try {
      const { orderNumber, lotNo, tableType, date, totalPcs, billNo } = req.body;
  
      await MouldingData.upsert({
        orderNumber,
        lotNo,
        tableType,
        date,
        totalPcs,
        billNo,
      });
  
      res.json({ message: "Data saved successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

// Delete a record
exports.deleteMouldingData = async (req, res) => {
  try {
    const { id } = req.params;
    await MouldingData.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
