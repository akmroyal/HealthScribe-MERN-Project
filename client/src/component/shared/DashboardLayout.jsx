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

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-teal-700 via-teal-600 to-teal-400 text-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <DashboardNavbar userType={userType} />
      </motion.div>
      <div className="flex flex-1 overflow-hidden mt-4 backdrop-blur-xl relative">
        {/* Mobile Sidebar Toggle Button */}
        <AnimatePresence>
          {sidebarCollapsed && (
            <motion.button
              className="md:hidden absolute top-2 left-2 z-50 bg-teal-800/30 backdrop-blur-md p-2 rounded-full border border-teal-500/20 text-white"
              onClick={toggleSidebar}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Collapsible Sidebar */}
        <motion.div
          ref={sidebarRef}
          className={`sidebar fixed md:relative transition-all duration-300 ${sidebarCollapsed ? 'w-0 md:w-16 -translate-x-full md:translate-x-0' : 'w-64'} h-full flex flex-col z-40`}
          style={{ cursor: sidebarCollapsed ? 'pointer' : 'default' }}
          initial={{ x: -250, opacity: 0 }}
          animate={{ 
            x: 0, 
            opacity: 1,
            width: sidebarCollapsed ? (window.innerWidth < 768 ? 0 : '4rem') : '16rem'
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {userType === 'doctor' ? (
            <Sidebar 
              collapsed={sidebarCollapsed} 
              doctor={currentUser} 
              toggleSidebar={toggleSidebar}
              onLogout={logout}
            />
          ) : (
            <PatSidebar 
              collapsed={sidebarCollapsed} 
              patient={currentUser} 
              toggleSidebar={toggleSidebar}
              onLogout={logout}
            />
          )}
        </motion.div>

        {/* Overlay for mobile when sidebar is open */}
        <AnimatePresence>
          {!sidebarCollapsed && window.innerWidth < 768 && (
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSidebarCollapsed(true)}
            />
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 md:p-8 pt-12 md:pt-8">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
