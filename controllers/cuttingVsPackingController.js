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
      logRequest(req);

      const { orderNumber, lotNo, data } = req.body;

      console.log(`📌 Checking for existing Lot ${lotNo} in Order ${orderNumber} before creating.`);

      // 🔥 FIX: Prevent backend from assigning new sequential lot numbers
      if (!lotNo) {
          console.warn(`⚠️ No lotNo provided by frontend!`);
          return res.status(400).json({ error: "Lot number must be provided from frontend." });
      }

      // 🔥 FIX: Prevent duplicate lot creation
      const existingLot = await CuttingVsPacking.findOne({ where: { orderNumber, lotNo } });

      if (existingLot) {
          console.warn(`⚠️ Lot ${lotNo} already exists for Order ${orderNumber}. Redirecting to update.`);
          return res.status(409).json({ message: "Lot already exists. Use update API instead." });
      }

      const newRecord = await CuttingVsPacking.create({
          orderNumber,
          lotNo, // ✅ Use frontend-defined lot number
          data: JSON.stringify(data)
      });

      console.log("✅ New Cutting Vs Packing Record Created:", JSON.stringify(newRecord, null, 2));

      res.json(newRecord);
  } catch (error) {
      console.error("❌ Error Creating Cutting Vs Packing Data:", error);
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
