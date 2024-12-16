import React, { useState } from 'react';
import { attendanceService } from '../services/api';

const UserDashboard = () => {
  const [status, setStatus] = useState(null);

  const handleAttendance = async (attendanceStatus) => {
    try {
      await attendanceService.markAttendance(attendanceStatus);
      setStatus(`Marked as ${attendanceStatus}`);
    } catch (err) {
      setStatus(err.response?.data?.message || 'Failed to mark attendance');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Mark Your Attendance</h2>
        
        {status && (
          <div className={`mb-4 p-4 rounded-lg text-center ${
            status.includes('Failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {status}
          </div>
        )}
        
        <div className="flex justify-center space-x-6">
          <button
            onClick={() => handleAttendance('Present')}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition duration-300 transform hover:scale-105"
          >
            Present
          </button>
          <button
            onClick={() => handleAttendance('Absent')}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition duration-300 transform hover:scale-105"
          >
            Absent
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;