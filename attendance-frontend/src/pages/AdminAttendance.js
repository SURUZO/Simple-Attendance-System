import React, { useState, useEffect } from 'react';
import { authService, attendanceService } from '../services/api';

const AdminAttendance = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await authService.getAllUsers();
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users');
      }
    };
    fetchUsers();
  }, []);

  const handleUserSelect = async (userId) => {
    setSelectedUser(userId);
    setLoading(true);
    setError(null);

    try {
      const response = await attendanceService.getSpecificUserAttendance(userId);
      setAttendance(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch attendance records');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">User Attendance Management</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <div className="mb-6">
          <select
            value={selectedUser}
            onChange={(e) => handleUserSelect(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username} (ID: {user._id})
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-center py-6">Loading...</div>
        ) : attendance.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 border text-left">Date</th>
                  <th className="p-3 border text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record, index) => (
                  <tr 
                    key={index} 
                    className={`${
                      record.status === 'Present' 
                        ? 'bg-green-50 hover:bg-green-100' 
                        : 'bg-red-50 hover:bg-red-100'
                    }`}
                  >
                    <td className="p-3 border">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="p-3 border">
                      {record.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            {selectedUser ? 'No attendance records found for this user.' : 'Please select a user'}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAttendance;