import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="flex-1">
        <a className="logo-text flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="text-blue-600"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          HealthScribe
        </a>
      </div>

      {/* Navigation Menu */}
      <div className="navbar-menu hidden md:flex mx-4">
        <a href="#home">Home</a>
        <a href="#services">Services</a>
        <a href="#doctors">Doctors</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 ">
        <a href="#login" className="text-slate-600 hover:text-blue-600 font-medium">
          Sign In
        </a>
        <button className="btn-navbar">
          Get Started
        </button>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button className="text-slate-600 hover:text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
