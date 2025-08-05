import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useAuth } from '../../contexts/useAuth';

const DashboardNavbar = ({ userType = 'doctor' }) => {
  const { currentUser, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Handle clicking outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);
  
  // Handle logout function
  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
  };
  
  return (
    <nav className="flex items-center justify-between py-3 px-4 md:px-8 bg-teal-900/20 backdrop-blur-lg border border-white/10 rounded-full mx-4 md:mx-8 mt-4 sticky top-4 z-50 shadow-lg shadow-teal-900/20 hover:bg-teal-900/25 transition-all duration-300 backdrop-saturate-150 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-b before:from-white/10 before:to-transparent before:z-[-1]">
      {/* Logo */}
      <div className="flex items-center">
        <Logo />
        <span className="text-white font-medium ml-3 hidden md:block">
          {userType === 'doctor' ? 'Doctor Dashboard' : 'Patient Portal'}
        </span>
      </div>
      
      {/* Right side user info and actions */}
      <div className="flex items-center gap-4">
        {/* User info */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white">
            {currentUser?.name ? currentUser.name.charAt(0) : (userType === 'doctor' ? 'D' : 'P')}
          </div>
          <span className="text-white hidden md:block">{currentUser?.name || (userType === 'doctor' ? 'Doctor' : 'Patient')}</span>
        </div>
        
        {/* Dashboard link and logout */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/" className="text-white/90 hover:text-lime-400 transition-colors duration-300 text-sm">
            Home
          </Link>
          <button
            onClick={handleLogout}
            className="text-white bg-red-500/20 hover:bg-red-500/30 px-3 py-1 rounded-full transition-colors duration-300 text-sm"
          >
            Logout
          </button>
        </div>
        
        {/* Mobile dropdown menu */}
        <div className="md:hidden relative" ref={dropdownRef}>
          <div className="dropdown dropdown-end">
            <button 
              className="text-white hover:text-lime-400 transition-colors duration-300 p-2 rounded-full bg-teal-800/20 border border-teal-700/20 hover:bg-teal-800/30"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
            <div 
              className={`${dropdownOpen ? 'block' : 'hidden'} absolute right-0 mt-2 w-36 bg-teal-900/95 backdrop-blur-lg rounded-xl overflow-hidden shadow-xl z-50 border border-white/10`}
            >
              <ul className="py-2">
                <li>
                  <Link to="/" className="block px-4 py-2 text-white hover:bg-teal-800/50 text-sm">
                    Home
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-red-800/30 text-sm"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
