import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
  }, [location.pathname]); // Re-check when route changes

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  // Smooth scroll function with offset for header
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const section = document.querySelector(sectionId);
    if (section) {
      // Close menu when navigating
      setIsMenuOpen(false);
      
      // Get the height of the navbar for offset
      const navbarHeight = 100; // Approximate height, adjust as needed
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="flex items-center justify-between py-4 px-6 md:px-16 bg-teal-900/20 backdrop-blur-lg border border-white/10 rounded-full mx-4 md:mx-12 mt-4 sticky top-4 z-50 shadow-lg shadow-teal-900/20 hover:bg-teal-900/25 transition-all duration-300 backdrop-saturate-150 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-b before:from-white/10 before:to-transparent before:z-[-1]">
      {/* Logo */}
      <Logo />
      
      {/* Navigation Menu */}
      <div className="hidden md:flex items-center gap-8 mx-4 relative z-10">
        <a onClick={(e) => scrollToSection(e, '#')} href="#" className="text-white/90 font-medium hover:text-lime-400 transition-colors duration-300 hover:shadow-sm hover:shadow-lime-400/20 px-2 py-1">Home</a>
        <a onClick={(e) => scrollToSection(e, '#how-it-works')} href="#how-it-works" className="text-white/90 font-medium hover:text-lime-400 transition-colors duration-300 hover:shadow-sm hover:shadow-lime-400/20 px-2 py-1">How It Works</a>
        <a onClick={(e) => scrollToSection(e, '#features')} href="#features" className="text-white/90 font-medium hover:text-lime-400 transition-colors duration-300 hover:shadow-sm hover:shadow-lime-400/20 px-2 py-1">Features</a>
        <a onClick={(e) => scrollToSection(e, '#testimonials')} href="#testimonials" className="text-white/90 font-medium hover:text-lime-400 transition-colors duration-300 hover:shadow-sm hover:shadow-lime-400/20 px-2 py-1">Testimonials</a>
        <a onClick={(e) => scrollToSection(e, '#')} href="#" className="text-white/90 font-medium hover:text-lime-400 transition-colors duration-300 flex items-center hover:shadow-sm hover:shadow-lime-400/20 px-2 py-1">
          Resources
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 relative z-10">
        {!user ? (
          <>
            {/* Show these buttons when not logged in */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/auth-options" className="text-white hover:text-lime-400 transition-colors duration-300 border border-white/20 px-6 py-2 rounded-full">
                Sign In
              </Link>
              <Link to="/auth-options" className="bg-gradient-to-r from-teal-500 to-lime-500 text-white font-medium px-6 py-2 rounded-full hover:shadow-md hover:shadow-lime-500/30 transition-all duration-300 border border-white/20 backdrop-blur-md hover:translate-y-[-1px]">
                Get Started
              </Link>
            </div>
            {/* Mobile view */}
            <div className="md:hidden flex items-center gap-2">
              <Link to="/auth-options" className="text-white border border-white/20 px-4 py-1 rounded-full hover:bg-white/10 transition-colors">
                Sign In
              </Link>
              <Link to="/doctor/signup" className="bg-gradient-to-r from-teal-500 to-lime-500 text-white font-medium px-4 py-1 rounded-full hover:shadow-md hover:shadow-lime-500/30 transition-all duration-300 border border-white/20 backdrop-blur-md">
                Get Started
              </Link>
            </div>
          </>
        ) : (
          <>
            {/* Show these elements when logged in */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white">
                  {user.name ? user.name.charAt(0) : (user.userType === 'doctor' ? 'D' : 'P')}
                </div>
                <span className="text-white">{user.name}</span>
              </div>
              <Link to={user.userType === 'doctor' ? '/dashboard' : '/patient'} className="text-white hover:text-lime-400 transition-colors duration-300">
                Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="text-white bg-red-500/20 hover:bg-red-500/30 px-4 py-1 rounded-full transition-colors duration-300"
              >
                Logout
              </button>
            </div>
            {/* Mobile view */}
            <Link to={user.userType === 'doctor' ? '/dashboard' : '/patient'} className="md:hidden bg-teal-600 text-white font-medium px-4 py-1 rounded-full">
              Dashboard
            </Link>
          </>
        )}
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden relative z-50">
        <button 
          onClick={toggleMenu} 
          className="text-white hover:text-lime-400 transition-colors duration-300 p-2 rounded-full bg-teal-800/20 border border-teal-700/20 hover:bg-teal-800/30"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 bg-teal-900/95 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/10 z-40 md:hidden"
          >
            <div className="flex flex-col space-y-4">
              {location.pathname === '/' && (
                <>
                  {/* Home page menu items */}
                  <a onClick={(e) => scrollToSection(e, '#')} href="#" className="text-white/90 font-medium hover:text-lime-400 transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-teal-800/50">Home</a>
                  <a onClick={(e) => scrollToSection(e, '#how-it-works')} href="#how-it-works" className="text-white/90 font-medium hover:text-lime-400 transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-teal-800/50">How It Works</a>
                  <a onClick={(e) => scrollToSection(e, '#features')} href="#features" className="text-white/90 font-medium hover:text-lime-400 transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-teal-800/50">Features</a>
                  <a onClick={(e) => scrollToSection(e, '#testimonials')} href="#testimonials" className="text-white/90 font-medium hover:text-lime-400 transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-teal-800/50">Testimonials</a>
                </>
              )}
              
              {/* Authentication items */}
              {!user ? (
                <>
                  <Link to="/" className="text-white/90 font-medium hover:text-lime-400 transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-teal-800/50">Home</Link>
                  <Link to="/patient/login" className="text-white/90 font-medium hover:text-lime-400 transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-teal-800/50">Patient Login</Link>
                  <Link to="/doctor/login" className="text-white/90 font-medium hover:text-lime-400 transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-teal-800/50">Doctor Login</Link>
                  <Link to="/patient/signup" className="bg-gradient-to-r from-teal-500 to-lime-500 text-white font-medium py-3 px-6 rounded-lg text-center hover:shadow-md hover:shadow-lime-500/30">Sign Up</Link>
                </>
              ) : (
                <>
                  <Link to="/" className="text-white/90 font-medium hover:text-lime-400 transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-teal-800/50">Home</Link>
                  <Link to={user.userType === 'doctor' ? '/dashboard' : '/patient'} className="text-white/90 font-medium hover:text-lime-400 transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-teal-800/50">Dashboard</Link>
                  <button 
                    onClick={handleLogout}
                    className="text-white/90 font-medium hover:text-red-400 transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-red-800/30 text-left"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
