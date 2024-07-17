const IssueMaterial = require('../models/IssueMaterial');

exports.getMaterialIssues = async (req, res) => {
  try {
    const issues = await IssueMaterial.findAll();
    const parsedIssues = issues.map(issue => {
      return {
        ...issue.toJSON(),
        data: JSON.parse(issue.data)
      };
    });
    res.json(parsedIssues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createMaterialIssue = async (req, res) => {
  try {
    const { data, ...rest } = req.body;
    const issue = await IssueMaterial.create({
      ...rest,
      data: JSON.stringify(data)
    });
    res.json(issue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMaterialIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, ...rest } = req.body;
    await IssueMaterial.update({
      ...rest,
      data: JSON.stringify(data)
    }, { where: { id } });
    const updatedIssue = await IssueMaterial.findByPk(id);
    res.json(updatedIssue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMaterialIssue = async (req, res) => {
  try {
    const { id } = req.params;
    await IssueMaterial.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
