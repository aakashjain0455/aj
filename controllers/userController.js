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

exports.changePassword = async (req, res) => {
  try {
    const { username, oldPassword, newPassword } = req.body;
    const user = await User.findOne({ where: { username } });

    if (user && user.password === oldPassword) {
      user.password = newPassword;
      await user.save();
      res.json({ message: 'Password has been changed successfully.' });
    } else {
      res.status(400).json({ error: 'Old password is incorrect or user does not exist.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to change password', details: error.message });
  }
};

let sessionVersion = Date.now(); // global session marker

exports.logoutAllUsers = async (req, res) => {
  try {
    sessionVersion = Date.now(); // update version
    res.status(200).json({ message: 'All users have been logged out', version: sessionVersion });
  } catch (err) {
    res.status(500).json({ error: 'Failed to logout all users' });
  }
};

exports.getSessionVersion = async (req, res) => {
  res.status(200).json({ version: sessionVersion });
};
