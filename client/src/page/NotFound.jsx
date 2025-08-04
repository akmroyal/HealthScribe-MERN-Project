import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../component/shared/Navbar';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-teal-900">
      <Navbar />
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-6xl font-bold text-teal-400 mb-6">404</h1>
        <h2 className="text-3xl font-semibold text-white mb-8">Page Not Found</h2>
        <p className="text-xl text-gray-300 mb-10">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-lg font-medium transition-colors">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
