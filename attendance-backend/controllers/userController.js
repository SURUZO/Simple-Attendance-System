const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register User (Plain Password)
exports.registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Validate role input
    if (role && !['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role specified' });
    }

    // Create user with plain password
    const user = await User.create({
      username,
      password,
      role: role || 'user',
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    console.error('Error registering user:', err.message);
    res.status(500).json({ error: 'Server error during user registration' });
  }
};

// Login User (Plain Password)
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare plain text passwords
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ token });
  } catch (err) {
    console.error('Error logging in user:', err.message);
    res.status(500).json({ error: 'Server error during login' });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('_id username');
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).json({ error: 'Server error while fetching users' });
  }
};
