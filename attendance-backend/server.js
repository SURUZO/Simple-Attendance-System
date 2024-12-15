const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const cors = require('cors');
const authMiddleware = require('./middlewares/authMiddleware'); // Import your auth middleware

dotenv.config();
connectDB();

const app = express();

// Use cors middleware to enable CORS
const allowedOrigins = ['http://localhost:3000']; // replace with your frontend's URL
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/attendance', attendanceRoutes);

// Apply auth middleware for secure routes
app.use('/api/attendance', authMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
