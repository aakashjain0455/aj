const { Op } = require('sequelize');
const MaterialReceipt = require('../models/MaterialReceipt');

exports.getMaterialReceipts = async (req, res) => {
  try {
    const { itemCode, startDate, endDate } = req.query;
    const whereClause = {};

    if (startDate && endDate) {
      whereClause.date = { [Op.between]: [startDate, endDate] };
    } else if (startDate) {
      whereClause.date = { [Op.gte]: startDate };
    } else if (endDate) {
      whereClause.date = { [Op.lte]: endDate };
    }

    const receipts = await MaterialReceipt.findAll({ where: whereClause });
    
    const filteredReceipts = receipts.map(receipt => {
      const parsedData = JSON.parse(receipt.data).filter(item => item.code === itemCode);
      return parsedData.length > 0 ? { ...receipt.toJSON(), data: parsedData } : null;
    }).filter(receipt => receipt !== null);

    res.json(filteredReceipts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.createMaterialReceipt = async (req, res) => {
  try {
    const { data, ...rest } = req.body;
    const receipt = await MaterialReceipt.create({
      ...rest,
      data: JSON.stringify(data)
    });
    res.json(receipt);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      res.status(400).json({ error: 'Validation error', details: error.errors });
    } else {
      res.status(500).json({ error: error.message });
    }
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
      data: JSON.stringify(data)
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
