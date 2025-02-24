// cuttingVsPackingController.js (Controller)
const CuttingVsPacking = require('../models/CuttingVsPacking');

exports.getCuttingVsPacking = async (req, res) => {
  try {
    const records = await CuttingVsPacking.findAll();
    const parsedRecords = records.map(record => ({
      ...record.toJSON(),
      data: JSON.parse(record.data)
    }));
    res.json(parsedRecords);
  } catch (error) {
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
