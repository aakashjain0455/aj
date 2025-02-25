// cuttingVsPackingController.js (Controller)
const CuttingVsPacking = require('../models/CuttingVsPacking');

exports.getCuttingVsPacking = async (req, res) => {
    try {
        console.log("📡 Fetching Cutting vs Packing Data...");

        const { orderNumber } = req.query;
        let queryOptions = {};

        if (orderNumber) {
            queryOptions.where = { orderNumber };
        }

        let records = await CuttingVsPacking.findAll(queryOptions);

        if (!records || records.length === 0) {
            console.warn(`⚠️ No Cutting vs Packing data found for orderNumber: ${orderNumber || "All Orders"}`);
            return res.status(404).json({ message: "No records found." });
        }

        // ✅ Parse the `data` field from string to JSON
        records = records.map(record => ({
            ...record.toJSON(),
            data: JSON.parse(record.data)  // ✅ Convert `data` from string to JSON object
        }));

        console.log("✅ Fixed Cutting vs Packing Data Sent to Frontend:", JSON.stringify(records, null, 2));
        res.json(records);
    } catch (error) {
        console.error("❌ Error Fetching Cutting vs Packing Data:", error);
        res.status(500).json({ error: error.message });
    }
};



exports.createCuttingVsPacking = async (req, res) => {
  try {
    const { orderNumber, lotNo, data } = req.body;
    const newRecord = await CuttingVsPacking.create({
      orderNumber,
      lotNo,
      data: JSON.stringify(data)
    });
    res.json(newRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCuttingVsPacking = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderNumber, lotNo, data } = req.body;

    // Check if an existing record matches both `orderNumber` and `lotNo`
    let record = await CuttingVsPacking.findOne({ 
      where: { id } // Ensure correct ID is used
    });

    if (!record) {
      return res.status(404).json({ error: "Record not found for update." });
    }

    // Update the existing record
    await record.update({ 
      data: JSON.stringify(data),
      updatedAt: new Date() // Ensure updated timestamp
    });

    console.log(`✅ Successfully updated Lot ${lotNo} for Order ${orderNumber}`);
    res.json(record);
  } catch (error) {
    console.error("❌ Error Updating Cutting Vs Packing Data:", error);
    res.status(500).json({ error: error.message });
  }
};



exports.deleteCuttingVsPacking = async (req, res) => {
  try {
    const { id } = req.params;
    await CuttingVsPacking.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
