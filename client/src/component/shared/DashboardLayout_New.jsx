import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardLayout = ({ children, userType = 'doctor' }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  // Static user data for now
  const currentUser = {
    fullName: 'Dr. John Smith',
    email: 'doctor@example.com',
    userType: 'doctor'
  };

  const logout = () => {
    console.log('Logout clicked (Static mode)');
    navigate('/auth-options');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-700 via-teal-600 to-teal-400">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="text-white hover:text-teal-200 transition-colors md:hidden"
              >
                <span className="text-xl">☰</span>
              </button>
              <h1 className="text-white text-xl font-bold ml-4">
                HealthScribe - Doctor Dashboard
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-white/80 text-sm hidden sm:block">
                Welcome, {currentUser.fullName}
              </span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
