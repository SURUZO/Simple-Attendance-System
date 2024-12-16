const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
const allowedOrigins = process.env.FRONTEND_URL || 'http://localhost:3000';

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/attendance', attendanceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
