const AdditionalOrderInfo = require('../models/AdditionalOrderInfo');

exports.getAdditionalInfo = async (req, res) => {
  try {
    const { orderNumber } = req.query;

    if (orderNumber) {
      const data = await AdditionalOrderInfo.findOne({ where: { orderNumber } });
      if (!data) return res.json(null);
      const parsed = data.toJSON();
      parsed.actuals = JSON.parse(parsed.actuals || '[]');
      return res.json(parsed);
    } else {
      const all = await AdditionalOrderInfo.findAll();
      const parsed = all.map(entry => ({ ...entry.toJSON(), actuals: JSON.parse(entry.actuals || '[]') }));
      return res.json(parsed);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.saveAdditionalInfo = async (req, res) => {
  try {
    const { orderNumber, expectedDate, inPlanning, remarks, actuals } = req.body;

    if (!orderNumber) return res.status(400).json({ error: 'Missing orderNumber' });

    const entry = await AdditionalOrderInfo.findOne({ where: { orderNumber } });

    const data = {
      expectedDate,
      inPlanning,
      remarks,
      actuals: JSON.stringify(actuals || [])
    };

    let saved;
    if (entry) {
      await entry.update(data);
      saved = entry;
    } else {
      saved = await AdditionalOrderInfo.create({ orderNumber, ...data });
    }

    return res.json({ message: 'Saved successfully', data: saved });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAdditionalInfo = async (req, res) => {
  try {
    const { orderNumber } = req.params;
    await AdditionalOrderInfo.destroy({ where: { orderNumber } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};