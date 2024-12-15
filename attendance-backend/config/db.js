// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
