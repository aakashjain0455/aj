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

      // Check if data is an array or single object
      if (!Array.isArray(data)) {
          data = [data]; // Convert single object to an array
      }

      console.log("Received Data Array:", data);

      for (let entry of data) {
          const { orderNumber, lotNo, tableType, date, totalPcs, billNo } = entry;

          if (!orderNumber || !lotNo || !tableType || !date) {
              console.error("Missing required fields:", entry);
              return res.status(400).json({ error: "Missing required fields. Ensure orderNumber, lotNo, tableType, and date are provided." });
          }

          await MouldingData.upsert({
              orderNumber,
              lotNo,
              tableType,
              date,
              totalPcs: totalPcs || 0,  // Ensure totalPcs is always a number
              billNo: billNo || null,
          }, {
              conflictFields: ['orderNumber', 'lotNo', 'tableType'] // Ensure conflict resolution on these fields
          });
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
