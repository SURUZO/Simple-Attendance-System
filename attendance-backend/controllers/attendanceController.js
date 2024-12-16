const Attendance = require('../models/Attendance');

// Mark Attendance
exports.markAttendance = async (req, res) => {
  const { status } = req.body;
  const userId = req.user.id;
  const date = new Date().toISOString().split('T')[0]; // Format date as YYYY-MM-DD

  try {
    // Directly create the attendance record without any checks
    await Attendance.create({ userId, date, status });
    res.json({ message: 'Attendance marked successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Attendance Records
exports.getAttendance = async (req, res) => {
  const userId = req.user.role === 'admin' ? req.params.id : req.user.id;

  try {
    const records = await Attendance.find({ userId });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
