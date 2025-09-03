import React, { useContext, useState } from 'react';
import { 
  FiHome, FiUsers, FiCalendar, FiFileText, FiSettings, 
  FiMic, FiClock, FiBarChart2, FiUser, FiMoon, FiSun,
  FiBell, FiSearch, FiMenu, FiX, FiLogOut,
  FiChevronDown, FiEdit3
} from 'react-icons/fi';
import { AuthContext } from '../../contexts/AuthContext.js'


const ModernDashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default closed on mobile
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // For mobile search toggle

  // Static user data
  const currentUser = {
    fullName: 'Dr. John Smith',
    email: 'doctor@example.com',
    avatar: '/Doctor.png',
    userType: 'doctor'
  };

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
    { icon: FiCalendar, label: 'History', color: 'bg-orange-500', action: () => console.log('History') }
  ];

  const { logout } = useContext(AuthContext);
  const handleLogout = async() => {
    console.log('Logout clicked');
    try{
      await logout();
    } catch(err){
      console.error('Logout failed:', err);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-900'
    }`}>
      {/* Top Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 h-16 border-b transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gray-800/95 border-gray-700 backdrop-blur-md' 
          : 'bg-white/95 border-gray-200 backdrop-blur-md'
      }`}>
        <div className="flex items-center justify-between h-full px-3 sm:px-4 lg:px-6">
          {/* Left side - Logo and Menu Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? 'hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-300'
              }`}
            >
              {isSidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">HS</span>
              </div>
              <span className={`font-semibold text-sm sm:text-lg hidden xs:block ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                HealthScribe
              </span>
            </div>
          </div>

          {/* Center - Search Bar (Hidden on mobile, shown on tablet+) */}
          <div className="hidden md:block flex-1 max-w-md mx-4 lg:mx-8">
            <div className="relative">
              <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Search patients, appointments..."
                className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
              />
            </div>
          </div>

          {/* Right side - Mobile Search Toggle, Notifications and Profile */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile Search Toggle Button */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isDarkMode ? 'hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-300'
              }`}
            >
              <FiSearch size={20} />
            </button>

            {/* Notifications */}
            <button className={`p-2 rounded-lg transition-colors relative ${
              isDarkMode ? 'hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-300'
            }`}>
              <FiBell size={20}/>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className={`flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg transition-colors ${
                  isDarkMode ? 'hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-300'
                }`}
              >
                <img
                  src={currentUser.avatar}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border-2 border-gray-400"
                />
                <div className="hidden lg:block text-left">
                  <p className={`text-sm font-medium ${
                    isDarkMode ? 'text-white-700' : 'text-gray-900'
                  }`}>
                    {currentUser.fullName}
                  </p>
                  <p className={`text-xs ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-600'
                  }`}>
                    Doctor
                  </p>
                </div>
                <FiChevronDown size={16} className="hidden sm:block" />
              </button>

              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                <div className={`absolute right-0 mt-2 w-56 sm:w-64 rounded-lg shadow-lg border ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                } overflow-hidden z-50`}
                >
                  <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <img
                        src={currentUser.avatar}
                        alt="Profile"
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className={`font-medium text-sm sm:text-base truncate ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {currentUser.fullName}
                        </p>
                        <p className={`text-xs sm:text-sm truncate ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {currentUser.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-2">
                    <button className={`flex items-center space-x-3 w-full px-4 py-2 text-left transition-colors ${
                      isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
                    }`}>
                      <FiUser size={16} />
                      <span>Profile Settings</span>
                    </button>
                    
                    <button 
                      onClick={toggleTheme}
                      className={`flex items-center space-x-3 w-full px-4 py-2 text-left transition-colors ${
                        isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      {isDarkMode ? <FiSun size={16} /> : <FiMoon size={16} />}
                      <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                    </button>
                    
                    <button className={`flex items-center space-x-3 w-full px-4 py-2 text-left transition-colors ${
                      isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
                    }`}>
                      <FiSettings size={16} />
                      <span>Settings</span>
                    </button>
                    
                    <hr className={`my-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`} />
                    
                    <button 
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full px-4 py-2 text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <FiLogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Search Dropdown */}
      {isSearchOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 mt-16 fixed top-0 left-0 right-0 z-30">
          <div className="relative">
            <input
              type="text"
              placeholder="Search patients, reports..."
              className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
              } focus:ring-1 focus:ring-blue-500 focus:outline-none`}
            />
            <FiSearch className={`absolute left-3 top-2.5 w-4 h-4 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
          </div>
        </div>
      )}

      {/* Sidebar */}
      {isSidebarOpen && (
        <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 border-r z-40 ${
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
                <button
                  key={index}
                  onClick={action.action}
                  className={`${action.color} text-white p-3 rounded-lg flex flex-col items-center space-y-1 shadow-sm hover:shadow-md transition-shadow hover:scale-105 transform duration-200`}
                >
                  <action.icon size={20} />
                  <span className="text-xs font-medium">{action.label}</span>
                </button>
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
              <button
                key={index}
                className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-all duration-200 hover:translate-x-2 ${
                  item.active
                    ? 'bg-teal-500 text-white shadow-md'
                    : isDarkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>
      )}

      {/* Main Content */}
      <main className={`transition-all duration-300 pt-16 ${
        isSidebarOpen ? 'ml-80' : 'ml-0'
      }`}>
        <div className="p-6">
          {children}
        </div>
      </main>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default ModernDashboardLayout;
