const IssueMaterial = require('../models/IssueMaterial');

exports.getIssueMaterials = async (req, res) => {
  try {
    const materials = await IssueMaterial.findAll();
    const parsedMaterials = materials.map(material => ({
      ...material.toJSON(),
      data: JSON.parse(material.data)
    }));
    res.json(parsedMaterials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createIssueMaterial = async (req, res) => {
  try {
    const { data, ...rest } = req.body;
    const material = await IssueMaterial.create({
      ...rest,
      data: JSON.stringify(data) // Ensure JSON stringification
    });
    res.json(material);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateIssueMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, ...rest } = req.body;
    await IssueMaterial.update({
      ...rest,
      data: JSON.stringify(data) // Ensure JSON stringification
    }, { where: { id } });
    const updatedMaterial = await IssueMaterial.findByPk(id);
    res.json(updatedMaterial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteIssueMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    await IssueMaterial.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
