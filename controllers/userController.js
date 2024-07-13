const User = require('../models/User');

const createUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await User.create({ name, email });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
};
