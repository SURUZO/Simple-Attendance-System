const express = require('express');
const { markAttendance, getAttendance } = require('../controllers/attendanceController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', auth, markAttendance);
router.get('/', auth, getAttendance);
router.get('/:id', auth, getAttendance); // Admin can view any user's attendance

module.exports = router;
