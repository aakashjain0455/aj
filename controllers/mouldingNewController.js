const MouldingNew = require('../models/MouldingNew');

exports.getMouldingNew = async (req, res) => {
  try {
    const records = await MouldingNew.findAll();
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createMouldingNew = async (req, res) => {
  try {
    const { orderNumber, lotData } = req.body;
    const newRecord = await MouldingNew.create({ orderNumber, lotData });
    res.json(newRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMouldingNew = async (req, res) => {
  try {
    const { id } = req.params;
    const { lotData } = req.body;
    const record = await MouldingNew.findByPk(id);
    if (!record) return res.status(404).json({ error: 'Record not found' });
    await record.update({ lotData });
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMouldingNew = async (req, res) => {
  try {
    const { id } = req.params;
    await MouldingNew.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
