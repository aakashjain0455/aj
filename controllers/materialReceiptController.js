const MaterialReceipt = require('../models/MaterialReceipt');

exports.getMaterialReceipts = async (req, res) => {
  try {
    const receipts = await MaterialReceipt.findAll();
    res.json(receipts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createMaterialReceipt = async (req, res) => {
  try {
    const receipt = await MaterialReceipt.create(req.body);
    res.json(receipt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMaterialReceipt = async (req, res) => {
  try {
    const { id } = req.params;
    await MaterialReceipt.update(req.body, { where: { id } });
    const updatedReceipt = await MaterialReceipt.findByPk(id);
    res.json(updatedReceipt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMaterialReceipt = async (req, res) => {
  try {
    const { id } = req.params;
    await MaterialReceipt.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
