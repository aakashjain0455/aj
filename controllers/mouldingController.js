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

exports.saveMouldingData = async (req, res) => {
  try {
      let data = req.body;

      if (!Array.isArray(data)) {
          data = [data]; // Convert single object to array if needed
      }

      console.log("Received Data:", JSON.stringify(data, null, 2)); // Debugging

      // Loop through each row and insert separately
      for (let entry of data) {
          await MouldingData.create({
              orderNumber: entry.orderNumber,
              lotNo: entry.lotNo,
              tableType: entry.tableType,
              date: entry.date,
              totalPcs: entry.totalPcs || 0,
              billNo: entry.billNo || null,
          });

          console.log("Inserted Entry:", entry);
      }

      res.json({ message: "Data saved successfully" });
  } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Internal server error. Check backend logs for details." });
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
