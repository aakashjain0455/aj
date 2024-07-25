const MaterialReceipt = require('../models/MaterialReceipt');

exports.getMaterialReceipts = async (req, res) => {
  try {
    const receipts = await MaterialReceipt.findAll();
    // Parse JSON data field before sending to the client
    const parsedReceipts = receipts.map(receipt => {
      return {
        ...receipt.toJSON(),
        data: JSON.parse(receipt.data)
      };
    });
    res.json(parsedReceipts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createMaterialReceipt = async (req, res) => {
  try {
    const { data, ...rest } = req.body;
    const receipt = await MaterialReceipt.create({
      ...rest,
      data: JSON.stringify(data) // Stringify JSON data field before saving
    });
    res.json(receipt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMaterialReceipt = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, ...rest } = req.body;
    const existingReceipt = await MaterialReceipt.findByPk(id);

    if (!existingReceipt) {
      return res.status(404).json({ error: 'Material receipt not found' });
    }

    await existingReceipt.update({
      ...rest,
      data: JSON.stringify(data) // Stringify JSON data field before updating
    });

    res.json(existingReceipt);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      res.status(400).json({ error: 'Validation error', details: error.errors });
    } else {
      res.status(500).json({ error: error.message });
    }
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
