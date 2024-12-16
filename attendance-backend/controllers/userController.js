const User = require('../models/User');
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for token generation

// Register User
exports.registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Validate role input
    if (role && !['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role specified' });
    }

    // Hash password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
      role: role || 'user', // Default to 'user' if no role is specified
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Compare provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate token with user ID and role
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users with their IDs and usernames
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('_id username'); // Select only the _id and username fields
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
