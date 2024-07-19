// controllers/userController.js
const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, password, groupName, activeStatus } = req.body;
    const user = await User.create({ username, password, groupName, activeStatus });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user', details: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, groupName, activeStatus } = req.body;
    const user = await User.findByPk(id);
    if (user && user.username !== 'admin') {
      await user.update({ username, password, groupName, activeStatus });
      res.json(user);
    } else {
      res.status(403).json({ error: 'Cannot edit admin user' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user', details: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user && user.username !== 'admin') {
      await user.destroy();
      res.sendStatus(204);
    } else {
      res.status(403).json({ error: 'Cannot delete admin user' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user', details: error.message });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username, password } });

    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to sign in', details: error.message });
  }
};
