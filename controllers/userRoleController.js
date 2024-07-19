// controllers/userRoleController.js
const UserRole = require('../models/UserRole');

exports.getAllUserRoles = async (req, res) => {
  try {
    const userRoles = await UserRole.findAll();
    res.json(userRoles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user roles' });
  }
};

exports.createUserRole = async (req, res) => {
  try {
    const { groupName, selectedTabs } = req.body;
    const userRole = await UserRole.create({ groupName, selectedTabs });
    res.json(userRole);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user role', details: error.message });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { groupName, selectedTabs } = req.body;
    const userRole = await UserRole.findByPk(id);
    if (userRole) {
      await userRole.update({ groupName, selectedTabs });
      res.json(userRole);
    } else {
      res.status(404).json({ error: 'User role not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user role', details: error.message });
  }
};

exports.deleteUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const userRole = await UserRole.findByPk(id);
    if (userRole) {
      await userRole.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'User role not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user role', details: error.message });
  }
};
