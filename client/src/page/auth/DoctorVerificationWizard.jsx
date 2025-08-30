import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

const DoctorVerificationWizard = ({ onComplete, initialData = {} }) => {
  const [formData, setFormData] = useState({
    // Minimal initial signup fields
    fullName: initialData.fullName || '',
    email: initialData.email || '',
    password: '',
    confirmPassword: '',
    mobile: '',
    agreeTerms: false
  });
  
  const [errors, setErrors] = useState({});
  
  const validateCurrentStep = () => {
    const newErrors = {};
    
    // Only one step for minimal signup
    if (!formData.fullName?.trim()) newErrors.fullName = "Full name is required";
    if (!formData.mobile?.trim()) newErrors.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = "Please enter a valid 10-digit mobile number";
    if (!formData.email?.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email";
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters long';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms and conditions';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Clear the error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const handleNext = () => {
    if (validateCurrentStep()) {
      // Only one step, so submit directly
      onComplete(formData);
    }
  };
  
  const getStepTitle = () => {
    return "Create Your Doctor Account";
  };
  
  const renderCurrentStep = () => {
    return (
      <div className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName || ''}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-lg border text-gray-900 ${errors.fullName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-teal-500`}
            placeholder="Dr. John Smith"
          />
          {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ''}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-lg border text-gray-900 ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-teal-500`}
            placeholder="doctor@example.com"
            readOnly={!!initialData.email}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>
        
        <div>
          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile || ''}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-lg border text-gray-900 ${errors.mobile ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-teal-500`}
            placeholder="1234567890"
          />
          {errors.mobile && <p className="mt-1 text-sm text-red-500">{errors.mobile}</p>}
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password || ''}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-lg border text-gray-900 ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-teal-500`}
            placeholder="••••••••"
          />
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword || ''}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-lg border text-gray-900 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-teal-500`}
            placeholder="••••••••"
          />
          {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="agreeTerms"
              name="agreeTerms"
              type="checkbox"
              checked={formData.agreeTerms}
              onChange={handleInputChange}
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3">
            <label htmlFor="agreeTerms" className="text-sm text-gray-700">
              I agree to the <a href="#" className="text-teal-600 hover:text-teal-800">Terms of Service</a> and <a href="#" className="text-teal-600 hover:text-teal-800">Privacy Policy</a>
            </label>
            {errors.agreeTerms && <p className="mt-1 text-sm text-red-500">{errors.agreeTerms}</p>}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div
      className="bg-white rounded-xl shadow-lg p-6 md:p-8"
    >
      <h2 className="text-2xl font-bold text-teal-700 mb-2 text-center">{getStepTitle()}</h2>
      <p className="text-gray-500 mb-6 text-center">
        Please complete all required information to create your account
      </p>
      
      <AnimatePresence mode="wait">
        <div>
          {renderCurrentStep()}
        </div>
      </AnimatePresence>
      
      <div className="flex justify-center mt-8">
        <button
          type="button"
          onClick={handleNext}
          className="px-8 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default DoctorVerificationWizard;
