import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../component/shared/Navbar';
import Sidebar from '../../component/Sidebar';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const sidebarRef = useRef(null);

  // Collapse sidebar when clicking outside
  useEffect(() => {
    if (sidebarCollapsed) return;
    function handleClick(e) {
      
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        
        setSidebarCollapsed(true);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [sidebarCollapsed]);

  // Doctor profile info for sidebar
  const doctor = {
    name: 'Dr. Aman Tiwari',
    photo: '/doctor-profile.jpg', // Place this image in your public folder or use a real URL
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-teal-700 via-teal-600 to-teal-400  text-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <Navbar />
      </motion.div>
      <div className="flex flex-1 overflow-hidden mt-4 backdrop-blur-xl">
        {/* Collapsible Sidebar */}
        <motion.div
          ref={sidebarRef}
          className={`relative transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'} h-full flex flex-col`}
          style={{ cursor: sidebarCollapsed ? 'pointer' : 'default' }}
          onClick={e => {
            if (sidebarCollapsed) {
              setSidebarCollapsed(false);
            } else {
              // Prevent click from bubbling to document when expanded
              e.stopPropagation();
            }
          }}
          initial={{ x: -250, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Sidebar collapsed={sidebarCollapsed} doctor={doctor} />
        </motion.div>
        {/* Main Content */}
        <main className="flex-1 overflow-auto p-8 ">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Start Recording Button - Top Right */}
            <motion.div
              className="flex justify-end mb-2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6, type: 'spring', stiffness: 80 }}
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0px 4px 16px rgba(0,0,0,0.12)' }}
                whileTap={{ scale: 0.97 }}
                className="bg-teal-700 text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:bg-teal-800 transition-colors duration-200 flex items-center space-x-2"
              >
                <span className="text-2xl">➕</span>
                <span className="text-lg">Start new recording</span>
              </motion.button>
            </motion.div>

            {/* Quick Stats Section */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Today's Recordings Card */}
                <motion.div
                  className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center"
                  whileHover={{ scale: 1.04, boxShadow: '0px 8px 24px rgba(0,0,0,0.10)' }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5, type: 'spring', stiffness: 80 }}
                >
                  <div>
                    <h3 className="text-gray-500 font-medium">Today's recordings</h3>
                    <p className="text-3xl font-bold text-teal-700 mt-1">15</p>
                  </div>
                  <span className="text-4xl text-teal-400">📝</span>
                </motion.div>
                {/* Total Patients Card */}
                <motion.div
                  className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center"
                  whileHover={{ scale: 1.04, boxShadow: '0px 8px 24px rgba(0,0,0,0.10)' }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5, type: 'spring', stiffness: 80 }}
                >
                  <div>
                    <h3 className="text-gray-500 font-medium">Total patients</h3>
                    <p className="text-3xl font-bold text-teal-700 mt-1">2,420</p>
                  </div>
                  <span className="text-4xl text-teal-400">👥</span>
                </motion.div>
                {/* Time Saved Card */}
                <motion.div
                  className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center"
                  whileHover={{ scale: 1.04, boxShadow: '0px 8px 24px rgba(0,0,0,0.10)' }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5, type: 'spring', stiffness: 80 }}
                >
                  <div>
                    <h3 className="text-gray-500 font-medium">Time saved</h3>
                    <p className="text-3xl font-bold text-teal-700 mt-1">8h 30m</p>
                  </div>
                  <span className="text-4xl text-teal-400">⏱️</span>
                </motion.div>
              </div>
            </section>

            {/* Recent Activity Section */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7, type: 'spring', stiffness: 70 }}
            >
              <motion.div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Latest SOAP notes and recordings</h3>
                <ul className="space-y-4">
                  {/* Sample Activity Item */}
                  <motion.li
                    className="flex items-center space-x-4 p-4 border-b last:border-b-0"
                    whileHover={{ scale: 1.02, backgroundColor: '#f0fdfa' }}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                  >
                    <span className="text-2xl text-teal-500">📝</span>
                    <div>
                      <p className="font-medium text-gray-800">SOAP Note for Jane Doe</p>
                      <p className="text-sm text-gray-500">Recorded on July 31, 2025 by Dr. Smith</p>
                    </div>
                    <div className="ml-auto text-sm text-gray-400">10 mins ago</div>
                  </motion.li>
                  {/* Add more list items as needed */}
                  <motion.li
                    className="flex items-center space-x-4 p-4 border-b last:border-b-0"
                    whileHover={{ scale: 1.02, backgroundColor: '#f0fdfa' }}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                  >
                    <span className="text-2xl text-teal-500">🎤</span>
                    <div>
                      <p className="font-medium text-gray-800">New recording for John Doe</p>
                      <p className="text-sm text-gray-500">Uploaded on July 31, 2025</p>
                    </div>
                    <div className="ml-auto text-sm text-gray-400">25 mins ago</div>
                  </motion.li>
                </ul>
              </motion.div>
            </motion.section>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;