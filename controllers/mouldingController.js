const MouldingData = require('../models/MouldingData');

// ✅ Get all moulding data for a specific order
exports.getMouldingDataByOrder = async (req, res) => {
  try {
    const { orderNumber } = req.params;
    const data = await MouldingData.findAll({ where: { orderNumber } });

    res.json(data.map(entry => ({
      orderNumber: entry.orderNumber,
      lotNo: entry.lotNo,
      storeData: entry.storeData  // ✅ JSON response
    })));

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Save Moulding Data (Cutting, Packing, Dispatch as JSON)
exports.saveMouldingData = async (req, res) => {
  try {
    let data = req.body;
    if (!Array.isArray(data)) {
      data = [data]; // Ensure it's an array
    }

    console.log("🔍 Received Data from Frontend:", JSON.stringify(data, null, 2));

    const insertedEntries = [];

    for (let entry of data) {
      console.log("🚀 Inserting Entry:", entry);

      const newEntry = await MouldingData.create({
        orderNumber: entry.orderNumber,
        lotNo: entry.lotNo,
        storeData: {  
          cuttingRows: entry.cuttingRows || [],
          packingRows: entry.packingRows || [],
          deliveryRows: entry.deliveryRows || []
        }
      });

      insertedEntries.push(newEntry);
      console.log("✅ Inserted Entry:", newEntry.toJSON());
    }

    res.json({ message: "Data saved successfully", insertedEntries });
  } catch (error) {
    console.error("❌ Database error:", error);
    res.status(500).json({ error: "Internal server error. Check backend logs for details." });
  }
};

// ✅ Delete all records for a specific order
exports.deleteMouldingByOrder = async (req, res) => {
  try {
    const { orderNumber } = req.params;

    console.log(`🛠️ Attempting DELETE for Order: ${orderNumber}`);

    const deletedRows = await MouldingData.destroy({ where: { orderNumber } });

    if (deletedRows === 0) {
      return res.status(404).json({ message: `No records found for order ${orderNumber}` });
    }

    res.status(200).json({ message: `Deleted records for order ${orderNumber}.` });
  } catch (error) {
    console.error("❌ Error deleting data:", error);
    res.status(500).json({ error: "Internal server error while deleting data." });
  }
};
