// cuttingVsPackingController.js (Controller)
const CuttingVsPacking = require('../models/CuttingVsPacking');

exports.getCuttingVsPacking = async (req, res) => {
    try {
        console.log("📡 Fetching Cutting vs Packing Data...");

        const { orderNumber } = req.query;
        let queryOptions = {};

        if (orderNumber) {
            queryOptions.where = { orderNumber };  // ✅ Fetch only data for this order
        }

        let records = await CuttingVsPacking.findAll(queryOptions);

        if (!records || records.length === 0) {
            console.warn(`⚠️ No Cutting vs Packing data found for orderNumber: ${orderNumber || "All Orders"}`);
            return res.status(404).json({ message: "No records found." });
        }

        // ✅ Ensure `data` field is parsed into JSON before sending it to frontend
        records = records.map(record => ({
            ...record.toJSON(),
            data: JSON.parse(record.data)  // ✅ Fixing the issue by parsing `data`
        }));

        console.log("✅ Cutting vs Packing Data Sent to Frontend:", JSON.stringify(records, null, 2));
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
    const { data } = req.body;
    const record = await CuttingVsPacking.findByPk(id);
    if (!record) return res.status(404).json({ error: 'Record not found' });

    await record.update({ data: JSON.stringify(data) });
    res.json(record);
  } catch (error) {
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
