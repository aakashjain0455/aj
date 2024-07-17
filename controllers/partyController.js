const Party = require('../models/Party');

exports.getParties = async (req, res) => {
  try {
    const parties = await Party.findAll();
    res.json(parties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createParty = async (req, res) => {
  try {
    const party = await Party.create(req.body);
    res.json(party);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateParty = async (req, res) => {
  try {
    const { id } = req.params;
    await Party.update(req.body, { where: { id } });
    const updatedParty = await Party.findByPk(id);
    res.json(updatedParty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteParty = async (req, res) => {
  try {
    const { id } = req.params;
    await Party.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
