// controllers/attendanceController.js
const Attendance = require('../models/Attendance');

// Mark Attendance
exports.markAttendance = async (req, res) => {
  const { status } = req.body;
  const userId = req.user.id;
  const date = new Date().toISOString().split('T')[0]; // Format date as YYYY-MM-DD

  try {
    const existingRecord = await Attendance.findOne({ userId, date });
    if (existingRecord) {
      return res.status(400).json({ message: 'Attendance already marked for today' });
    }

    await Attendance.create({ userId, date, status });
    res.json({ message: 'Attendance marked successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Attendance Records (Admin view)
exports.getAttendance = async (req, res) => {
  const userId = req.user.role === 'admin' ? req.params.id : req.user.id;

  try {
    const records = await Attendance.find({ userId });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};