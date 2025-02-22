const MouldingNew = require('../models/MouldingNew');

exports.getMouldingRecords = async (req, res) => {
  try {
    const records = await MouldingNew.findAll();
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createMouldingRecord = async (req, res) => {
  try {
    const { orderNumber, storeData } = req.body;
    storeData.lotNo = storeData.lotNo || `Lot-${Date.now()}`; // Ensure lotNo is stored
    const record = await MouldingNew.create({
      orderNumber,
      storeData
    });
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMouldingRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderNumber, storeData } = req.body;
    const existingRecord = await MouldingNew.findByPk(id);

    if (!existingRecord) {
      return res.status(404).json({ error: 'Record not found' });
    }

    storeData.lotNo = storeData.lotNo || existingRecord.storeData.lotNo; // Ensure lotNo is retained
    await existingRecord.update({ orderNumber, storeData });
    res.json(existingRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMouldingRecord = async (req, res) => {
  try {
    const { id } = req.params;
    await MouldingNew.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};