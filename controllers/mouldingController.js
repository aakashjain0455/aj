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

    // Check if entry already exists
    const existingEntry = await MouldingData.findOne({
      where: { orderNumber, lotNo, tableType, date },
    });

    if (existingEntry) {
      // Update existing entry
      await existingEntry.update({ totalPcs, billNo });
      return res.json({ message: 'Data updated successfully' });
    }

    // Create new entry
    const newData = await MouldingData.create({
      orderNumber,
      lotNo,
      tableType,
      date,
      totalPcs,
      billNo,
    });

    res.status(201).json(newData);
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
