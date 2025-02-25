const MouldingNew = require('../models/MouldingNew');

// Fetch Cutting vs Packing data for a specific order
exports.getMouldingData = async (req, res) => {
  try {
    const { orderNumber } = req.query; // Fetching via order number
    const data = await MouldingNew.findAll({ where: { orderNumber } });

    if (!data.length) {
      return res.json([]);
    }

    const parsedData = data.map(entry => ({
      ...entry.toJSON(),
      data: JSON.parse(entry.data)
    }));

    res.json(parsedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create or Update Cutting vs Packing Data
exports.saveMouldingData = async (req, res) => {
  try {
    const { orderNumber, data } = req.body;

    if (!orderNumber || !data) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingEntry = await MouldingNew.findOne({ where: { orderNumber } });

    if (existingEntry) {
      // Update all lots for the order
      await existingEntry.update({ data: JSON.stringify(data) });
      res.json({ message: "Updated successfully", data: existingEntry });
    } else {
      // Create new entry
      const newEntry = await MouldingNew.create({
        orderNumber,
        data: JSON.stringify(data)
      });
      res.json({ message: "Saved successfully", data: newEntry });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Cutting vs Packing data for an order
exports.deleteMouldingData = async (req, res) => {
  try {
    const { orderNumber } = req.params;

    await MouldingNew.destroy({ where: { orderNumber } });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
