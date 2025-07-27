import React from "react";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-4 px-6 md:px-16 bg-teal-900/30 backdrop-blur-md border border-teal-800/30 rounded-full mx-4 md:mx-12 mt-4 sticky top-4 z-50">
      {/* Logo */}
      <Logo />
      {/* Navigation Menu */}
      <div className="hidden md:flex items-center gap-8 mx-4">
        <a href="#home" className="text-white font-medium hover:text-lime-400 transition-colors duration-300">Home</a>
        <a href="#services" className="text-white font-medium hover:text-lime-400 transition-colors duration-300 flex items-center">
          Services
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
        <a href="#about" className="text-white font-medium hover:text-lime-400 transition-colors duration-300">About us</a>
        <a href="#products" className="text-white font-medium hover:text-lime-400 transition-colors duration-300">Products</a>
        <a href="#blog" className="text-white font-medium hover:text-lime-400 transition-colors duration-300">Blog</a>
        <a href="#careers" className="text-white font-medium hover:text-lime-400 transition-colors duration-300">Careers</a>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <input type="text" placeholder="Search" className="bg-teal-800/30 text-white pl-10 pr-4 py-2 rounded-full text-sm outline-none border border-teal-700/30" />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-2.5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
        <button className="p-2 rounded-full bg-teal-800/30 text-gray-300 hidden md:block">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
        </button>
        <a href="#contact" className="bg-gradient-to-r from-teal-500 to-lime-500 text-white font-medium px-6 py-2 rounded-full hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-300">
          Contact Us
        </a>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button className="text-white hover:text-lime-400 transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
