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
      data = [data]; // Ensure it's an array
    }

    console.log("🔍 Received Data from Frontend:", JSON.stringify(data, null, 2));

    const insertedEntries = [];

    for (let entry of data) {
      console.log("🚀 Inserting Entry:", entry);

      const newEntry = await MouldingData.create({
        orderNumber: entry.orderNumber,
        lotNo: entry.lotNo,
        tableType: entry.tableType,
        date: entry.date,
        totalPcs: entry.totalPcs || 0,
        billNo: entry.billNo || null,
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

exports.deleteMouldingByOrder = async (req, res) => {
  try {
    let { orderNumber } = req.params;
    orderNumber = isNaN(orderNumber) ? orderNumber : parseInt(orderNumber);

    console.log(`🛠️ Attempting SQL DELETE for Order: ${orderNumber}`);

    // Use RAW SQL DELETE query for Microsoft SQL Server
    const [deletedRows] = await sequelize.query(
      `DELETE FROM MouldingData WHERE orderNumber = :orderNumber;`,
      {
        replacements: { orderNumber },
        type: QueryTypes.DELETE,
      }
    );

    console.log(`🗑️ SQL Deleted Rows Count: ${deletedRows}`);

    if (deletedRows === 0) {
      return res.status(404).json({ message: `No records found for order ${orderNumber}` });
    }

    res.status(200).json({ message: `Deleted records for order ${orderNumber}.` });
  } catch (error) {
    console.error("❌ SQL Server DELETE Error:", error);
    res.status(500).json({ error: "Internal server error while deleting data." });
  }
};