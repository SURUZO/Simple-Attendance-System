import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-gray-800">
                Attendance System
              </span>
            </div>
            <div className="ml-10 flex items-baseline space-x-4">
              {user.role === 'user' && (
                <>
                  <Link 
                    to="/user/dashboard" 
                    className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md"
                  >
                    Mark Attendance
                  </Link>
                  <Link 
                    to="/user/attendance" 
                    className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md"
                  >
                    My Attendance
                  </Link>
                </>
              )}
              {user.role === 'admin' && (
                <Link 
                  to="/admin/attendance" 
                  className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md"
                >
                  User Attendance
                </Link>
              )}
            </div>
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;