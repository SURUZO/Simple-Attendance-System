const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Present', 'Absent'], required: true },
});

// Removed compound index that enforced unique records per user and date

module.exports = mongoose.model('Attendance', AttendanceSchema);
