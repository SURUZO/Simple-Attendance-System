import axios from 'axios';

const API_URL = 'https://simple-attendance-system.onrender.com/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const authService = {
  login: (username, password) => 
    api.post('/users/login', { username, password }),
  
  register: (username, password, role) => 
    api.post('/users/register', { username, password, role }),
  
  getAllUsers: () => 
    api.get('/users/all')
};

export const attendanceService = {
  markAttendance: (status) => 
    api.post('/attendance', { status }),
  
  getUserAttendance: () => 
    api.get('/attendance'),
  
  getSpecificUserAttendance: (userId) => 
    api.get(`/attendance/${userId}`)
};

export default api;