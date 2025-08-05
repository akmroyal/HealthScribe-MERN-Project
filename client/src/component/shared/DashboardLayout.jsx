import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardNavbar from './DashboardNavbar';
import Sidebar from '../Sidebar';
import PatSidebar from '../PatSidebar';
import { useAuth } from '../../contexts/useAuth';

const DashboardLayout = ({ children, userType = 'doctor' }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth < 768);
  const [isLoading, setIsLoading] = useState(true);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    // Check if user is logged in
    if (!currentUser) {
      navigate('/auth-options');
      return;
    }
    
    setIsLoading(false);
    
    // Check if user type matches the required userType
    if (currentUser.userType !== userType) {
      navigate(currentUser.userType === 'doctor' ? '/dashboard' : '/patient');
      return;
    }
    
    // Handle window resize for sidebar collapse
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };

    // Close sidebar when clicking outside on mobile
    const handleClickOutside = (event) => {
      if (
        window.innerWidth < 768 && 
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) && 
        !sidebarCollapsed
      ) {
        setSidebarCollapsed(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navigate, sidebarCollapsed, userType, currentUser]);

  // Toggle sidebar collapse state
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-teal-700 via-teal-600 to-teal-400">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-t-4 border-b-4 border-teal-200 rounded-full animate-spin"></div>
          <p className="mt-4 text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

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
