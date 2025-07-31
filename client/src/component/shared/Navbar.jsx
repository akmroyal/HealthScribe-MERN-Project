import React from "react";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-4 px-6 md:px-16 bg-teal-900/20 backdrop-blur-lg border border-white/10 rounded-full mx-4 md:mx-12 mt-4 sticky top-4 z-50 shadow-lg shadow-teal-900/20 hover:bg-teal-900/25 transition-all duration-300 backdrop-saturate-150 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-b before:from-white/10 before:to-transparent before:z-[-1]">
      {/* Logo */}
      <Logo />
      {/* Navigation Menu */}
      <div className="hidden md:flex items-center gap-8 mx-4 relative z-10">
        <a href="#" className="text-white/90 font-medium hover:text-lime-400 transition-colors duration-300 hover:shadow-sm hover:shadow-lime-400/20 px-2 py-1">Home</a>
        <a href="#how-it-works" className="text-white/90 font-medium hover:text-lime-400 transition-colors duration-300 hover:shadow-sm hover:shadow-lime-400/20 px-2 py-1">How It Works</a>
        <a href="#features" className="text-white/90 font-medium hover:text-lime-400 transition-colors duration-300 hover:shadow-sm hover:shadow-lime-400/20 px-2 py-1">Features</a>
        <a href="#testimonials" className="text-white/90 font-medium hover:text-lime-400 transition-colors duration-300 hover:shadow-sm hover:shadow-lime-400/20 px-2 py-1">Testimonials</a>
        <a href="#" className="text-white/90 font-medium hover:text-lime-400 transition-colors duration-300 flex items-center hover:shadow-sm hover:shadow-lime-400/20 px-2 py-1">
          Resources
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 relative z-10">
        <div className="relative hidden md:block">
          <input type="text" placeholder="Search" className="bg-teal-800/20 text-white/90 pl-10 pr-4 py-2 rounded-full text-sm outline-none border border-teal-700/20 backdrop-blur-lg hover:bg-teal-800/30 focus:bg-teal-800/30 transition-all duration-300 shadow-inner shadow-teal-950/20 focus:shadow-teal-950/30" />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-2.5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
        <button className="p-2 rounded-full bg-teal-800/20 text-gray-300 hidden md:block border border-teal-700/20 hover:bg-teal-800/30 transition-all duration-300 shadow-inner shadow-teal-950/10 hover:shadow-teal-950/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
        </button>
        <a href="#cta" className="bg-gradient-to-r from-teal-500 to-lime-500 text-white font-medium px-6 py-2 rounded-full hover:shadow-md hover:shadow-lime-500/30 transition-all duration-300 border border-white/20 backdrop-blur-md hover:translate-y-[-1px]">
          Get Started
        </a>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden relative z-10">
        <button className="text-white hover:text-lime-400 transition-colors duration-300 p-2 rounded-full bg-teal-800/20 border border-teal-700/20 hover:bg-teal-800/30">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
