import React from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../../component/shared/DashboardLayout';
import { useAuth } from '../../contexts/useAuth';

const Dashboard = () => {
  const { currentUser } = useAuth();
  // These stats will be used in the dashboard display
  const stats = {
    patients: 24,
    appointments: 12,
    pendingReports: 5,
    revenue: 4580
  };
  
  // Format last login time
  const formatLastLogin = (timestamp) => {
    if (!timestamp) return 'First login';
    return new Date(timestamp).toLocaleString();
  };

  return (
    <DashboardLayout userType="doctor">
      {/* Start Recording Button - Top Right */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <motion.div
          className="text-white/80"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <p className="text-sm">
            Welcome back, {currentUser?.name || 'Doctor'}! 
            <span className="ml-2 text-xs opacity-70">
              Last login: {formatLastLogin(currentUser?.lastLogin)}
            </span>
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6, type: 'spring', stiffness: 80 }}
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0px 4px 16px rgba(0,0,0,0.12)' }}
            whileTap={{ scale: 0.97 }}
            className="bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-teal-800 transition-colors duration-200 flex items-center space-x-2"
          >
            <span className="text-2xl">➕</span>
            <span className="text-lg">Start new recording</span>
          </motion.button>
        </motion.div>
      </div>

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
        className="mt-8"
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
    </DashboardLayout>
  );
};

export default Dashboard;