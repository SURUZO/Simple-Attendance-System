import React, { useState, useEffect } from 'react';
import { attendanceService } from '../services/api';

const UserAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await attendanceService.getUserAttendance();
        setAttendance(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch attendance');
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  if (loading) return <div className="text-center py-6">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-6">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">My Attendance Records</h2>
        
        {attendance.length === 0 ? (
          <div className="text-center text-gray-500">No attendance records found.</div>
        ) : (
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
                  <tr key={index} className={`${
                    record.status === 'Present' 
                      ? 'bg-green-50 hover:bg-green-100' 
                      : 'bg-red-50 hover:bg-red-100'
                  }`}>
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
        )}
      </div>
    </div>
  );
};

export default UserAttendance;