import React from 'react';
import { 
  FiHome, FiUsers, FiCalendar, FiFileText, FiSettings, 
  FiMic, FiClock, FiBarChart2, FiEdit3, FiHistory
} from 'react-icons/fi';

const Sidebar = ({ isOpen, isDarkMode, onNavigate }) => {
  const sidebarItems = [
    { icon: FiHome, label: 'Dashboard', path: '/dashboard', active: true },
    { icon: FiUsers, label: 'Patients', path: '/patients' },
    { icon: FiCalendar, label: 'Appointments', path: '/appointments' },
    { icon: FiMic, label: 'Recordings', path: '/recordings' },
    { icon: FiFileText, label: 'SOAP Notes', path: '/soap-notes' },
    { icon: FiBarChart2, label: 'Analytics', path: '/analytics' },
    { icon: FiClock, label: 'Schedule', path: '/schedule' },
    { icon: FiSettings, label: 'Settings', path: '/settings' }
  ];

  const quickActions = [
    { icon: FiMic, label: 'Start Recording', color: 'bg-teal-500', action: () => console.log('Start Recording') },
    { icon: FiEdit3, label: 'New Note', color: 'bg-blue-500', action: () => console.log('New Note') },
    { icon: FiCalendar, label: 'Schedule', color: 'bg-purple-500', action: () => console.log('Schedule') },
    { icon: FiHistory, label: 'History', color: 'bg-orange-500', action: () => console.log('History') }
  ];

  if (!isOpen) return null;

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      exit={{ x: -280 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-70 border-r z-40 ${
        isDarkMode 
          ? 'bg-gray-800/95 border-gray-700 backdrop-blur-md' 
          : 'bg-white/95 border-gray-200 backdrop-blur-md'
      }`}
    >
      {/* Quick Actions */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className={`text-sm font-medium mb-3 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={action.action}
              className={`${action.color} text-white p-3 rounded-lg flex flex-col items-center space-y-1 shadow-sm hover:shadow-md transition-shadow`}
            >
              <action.icon size={20} />
              <span className="text-xs font-medium">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-2">
        <h3 className={`text-sm font-medium mb-3 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Navigation
        </h3>
        {sidebarItems.map((item, index) => (
          <motion.button
            key={index}
            whileHover={{ x: 4 }}
            onClick={() => onNavigate(item.path)}
            className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
              item.active
                ? 'bg-teal-500 text-white shadow-md'
                : isDarkMode
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </motion.button>
        ))}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
