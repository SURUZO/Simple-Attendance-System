const express = require('express');
const { registerUser, loginUser, getAllUsers } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/all', getAllUsers); // Endpoint to list all users with IDs and usernames

module.exports = router;
