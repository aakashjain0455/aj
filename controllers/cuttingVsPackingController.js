// cuttingVsPackingController.js (Controller)
const CuttingVsPacking = require('../models/CuttingVsPacking');

// ✅ Logging function to track requests
const logRequest = (req) => {
    console.log("\n=======================================");
    console.log(`🔄 API Request: ${req.method} ${req.originalUrl}`);
    console.log("📦 Request Body:", JSON.stringify(req.body, null, 2));
    console.log("📋 Request Params:", req.params);
    console.log("=======================================\n");
};

// ✅ Fetch Cutting Vs Packing data
exports.getCuttingVsPacking = async (req, res) => {
    try {
        logRequest(req);
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

        // ✅ Convert `data` from JSON string to JSON object
        records = records.map(record => ({
            ...record.toJSON(),
            data: JSON.parse(record.data) 
        }));

        console.log("✅ Fixed Cutting vs Packing Data Sent to Frontend:", JSON.stringify(records, null, 2));
        res.json(records);
    } catch (error) {
        console.error("❌ Error Fetching Cutting vs Packing Data:", error);
        res.status(500).json({ error: error.message });
    }
};

// ✅ Create a new Cutting Vs Packing entry
exports.createCuttingVsPacking = async (req, res) => {
    try {
        logRequest(req);

        const { orderNumber, lotNo, data } = req.body;

        if (!orderNumber || !lotNo || !data) {
            console.error(`🚨 Error: Missing Required Fields:
                orderNumber: ${orderNumber}, 
                lotNo: ${lotNo}, 
                data: ${JSON.stringify(data, null, 2)}`);
            return res.status(400).json({ error: "Missing required fields (orderNumber, lotNo, or data)" });
        }

        console.log(`📌 Checking for existing Lot ${lotNo} in Order ${orderNumber} before creating.`);

        // 🔥 Fix: Prevent duplicate lot creation
        const existingLot = await CuttingVsPacking.findOne({ where: { orderNumber, lotNo } });

        if (existingLot) {
            console.warn(`⚠️ Lot ${lotNo} already exists for Order ${orderNumber}. Redirecting to update.`);
            return res.status(409).json({ message: "Lot already exists. Use update API instead." });
        }

        const newRecord = await CuttingVsPacking.create({
            orderNumber,
            lotNo, 
            data: JSON.stringify(data) // ✅ Ensure data is stored as JSON
        });

        console.log("✅ New Cutting Vs Packing Record Created:", JSON.stringify(newRecord, null, 2));
        res.json(newRecord);
    } catch (error) {
        console.error("❌ Error Creating Cutting Vs Packing Data:", error);
        res.status(500).json({ error: error.message });
    }
};

// ✅ Update existing Cutting Vs Packing entry
exports.updateCuttingVsPacking = async (req, res) => {
    try {
        logRequest(req);

        const { id } = req.params;
        const { orderNumber, lotNo, data } = req.body;

        console.log(`🔍 Searching for Lot ${lotNo} in Order ${orderNumber} with ID ${id}`);

        // 🔥 Fix: Ensure the correct record is found by orderNumber + lotNo
        let record = await CuttingVsPacking.findOne({ 
            where: { id, orderNumber, lotNo }
        });

        if (!record) {
            console.warn(`⚠️ No record found for ID: ${id} | Order: ${orderNumber} | Lot: ${lotNo}`);
            return res.status(404).json({ error: "Lot not found for update." });
        }

        console.log("✅ Found Record for Update:", JSON.stringify(record, null, 2));

        await record.update({ 
            data: JSON.stringify(data), // ✅ Ensure data is stored correctly
            updatedAt: new Date()
        });

        console.log(`✅ Successfully updated Lot ${lotNo} for Order ${orderNumber}`);
        res.json(record);
    } catch (error) {
        console.error("❌ Error Updating Cutting Vs Packing Data:", error);
        res.status(500).json({ error: error.message });
    }
};

// ✅ Delete a Cutting Vs Packing record
exports.deleteCuttingVsPacking = async (req, res) => {
    try {
        logRequest(req);

        const { id } = req.params;
        console.log(`🗑️ Deleting Cutting Vs Packing Record ID: ${id}`);

        const deletedCount = await CuttingVsPacking.destroy({ where: { id } });

        if (deletedCount === 0) {
            console.warn(`⚠️ No record found with ID: ${id}`);
            return res.status(404).json({ error: "Record not found for deletion." });
        }

        console.log("✅ Successfully Deleted.");
        res.status(204).send();
    } catch (error) {
        console.error("❌ Error Deleting Cutting Vs Packing Data:", error);
        res.status(500).json({ error: error.message });
    }
};
