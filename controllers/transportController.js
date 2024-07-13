
const Transport = require('../models/Transport');

exports.getAllTransports = async (req, res) => {
  try {
    const transports = await Transport.findAll();
    res.json(transports);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transports' });
  }
};

exports.createTransport = async (req, res) => {
  try {
    const transport = await Transport.create(req.body);
    res.json(transport);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create transport' });
  }
};

exports.updateTransport = async (req, res) => {
  try {
    const { id } = req.params;
    const transport = await Transport.findByPk(id);
    if (transport) {
      await transport.update(req.body);
      res.json(transport);
    } else {
      res.status(404).json({ error: 'Transport not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update transport' });
  }
};

exports.deleteTransport = async (req, res) => {
  try {
    const { id } = req.params;
    const transport = await Transport.findByPk(id);
    if (transport) {
      await transport.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Transport not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete transport' });
  }
};
