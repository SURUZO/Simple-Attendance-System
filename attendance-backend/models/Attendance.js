// models/Attendance.js
const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true, unique: true },
  status: { type: String, enum: ['Present', 'Absent'], required: true },
});

module.exports = mongoose.model('Attendance', AttendanceSchema);