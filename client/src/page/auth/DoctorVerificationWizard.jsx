import React, { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';

// Step indicators component
const StepIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex justify-center mb-6 space-x-2">
      {[...Array(totalSteps)].map((_, index) => (
        <div 
          key={index} 
          className={`w-3 h-3 rounded-full ${
            index < currentStep 
              ? 'bg-teal-600' 
              : index === currentStep 
                ? 'bg-teal-500 ring-4 ring-teal-200 animate-pulse' 
                : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

const DoctorVerificationWizard = ({ onComplete, initialData = {} }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    // Initial basic information from signup form
    ...initialData,
    // Additional verification fields
    mobile: '',
    password: '',
    confirmPassword: '',
    yearsOfExperience: '',
    hospitalAffiliation: '',
    boardCertification: '',
    degreeFile: null,
    licenseFile: null,
    profileImage: null,
    address: '',
    city: '',
    state: '',
    zipCode: '',
    bio: '',
    graduationYear: '',
    medicalSchool: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const validateCurrentStep = () => {
    const newErrors = {};
    
    switch(currentStep) {
      case 0: // Personal & Contact Information
        if (!formData.fullName?.trim()) newErrors.fullName = "Full name is required";
        if (!formData.mobile?.trim()) newErrors.mobile = "Mobile number is required";
        else if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = "Please enter a valid 10-digit mobile number";
        if (!formData.email?.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email";
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters long';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        break;
        
      case 1: // Professional Information
        if (!formData.specialty?.trim()) newErrors.specialty = "Specialty is required";
        if (!formData.yearsOfExperience?.toString()?.trim()) newErrors.yearsOfExperience = "Years of experience is required";
        else if (isNaN(formData.yearsOfExperience) || formData.yearsOfExperience < 0) 
          newErrors.yearsOfExperience = "Please enter a valid number";
        if (!formData.medicalSchool?.trim()) newErrors.medicalSchool = "Medical school is required";
        if (!formData.graduationYear?.toString()?.trim()) newErrors.graduationYear = "Graduation year is required";
        else if (isNaN(formData.graduationYear) || 
                formData.graduationYear < 1950 || 
                formData.graduationYear > new Date().getFullYear()) 
          newErrors.graduationYear = "Please enter a valid graduation year";
        break;
        
      case 2: // Degree & License Verification
        if (!formData.degreeFile) newErrors.degreeFile = "Medical degree document is required";
        if (!formData.licenseFile) newErrors.licenseFile = "Medical license document is required";
        if (!formData.licenseNumber?.trim()) newErrors.licenseNumber = "License number is required";
        if (!formData.boardCertification?.trim()) newErrors.boardCertification = "Board certification is required";
        break;
        
      case 3: // Profile & Bio
        if (!formData.address?.trim()) newErrors.address = "Address is required";
        if (!formData.city?.trim()) newErrors.city = "City is required";
        if (!formData.state?.trim()) newErrors.state = "State is required";
        if (!formData.zipCode?.trim()) newErrors.zipCode = "ZIP code is required";
        if (!formData.bio?.trim()) newErrors.bio = "Professional bio is required";
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0]
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
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        // Final step - submit all data
        onComplete(formData);
      }
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleFileSelect = (fieldName) => {
    if (fileInputRef.current) {
      fileInputRef.current.name = fieldName;
      fileInputRef.current.click();
    }
  };

  const getStepTitle = () => {
    switch(currentStep) {
      case 0: return "Personal Information";
      case 1: return "Professional Experience";
      case 2: return "Credentials Verification";
      case 3: return "Complete Your Profile";
      default: return "Doctor Verification";
    }
  };
  
  const renderCurrentStep = () => {
    switch(currentStep) {
      case 0:
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
          </div>
        );
        
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
                Medical Specialty
              </label>
              <input
                type="text"
                id="specialty"
                name="specialty"
                value={formData.specialty || ''}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.specialty ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-teal-500`}
                placeholder="Cardiology"
                readOnly={!!initialData.specialty}
              />
              {errors.specialty && <p className="mt-1 text-sm text-red-500">{errors.specialty}</p>}
            </div>
            
            <div>
              <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-1">
                Years of Experience
              </label>
              <input
                type="number"
                id="yearsOfExperience"
                name="yearsOfExperience"
                value={formData.yearsOfExperience || ''}
                onChange={handleInputChange}
                min="0"
                max="70"
                className={`w-full px-4 py-3 rounded-lg border ${errors.yearsOfExperience ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-teal-500`}
                placeholder="10"
              />
              {errors.yearsOfExperience && <p className="mt-1 text-sm text-red-500">{errors.yearsOfExperience}</p>}
            </div>
            
            <div>
              <label htmlFor="hospitalAffiliation" className="block text-sm font-medium text-gray-700 mb-1">
                Hospital Affiliation
              </label>
              <input
                type="text"
                id="hospitalAffiliation"
                name="hospitalAffiliation"
                value={formData.hospitalAffiliation || ''}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.hospitalAffiliation ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-teal-500`}
                placeholder="Mayo Clinic"
              />
              {errors.hospitalAffiliation && <p className="mt-1 text-sm text-red-500">{errors.hospitalAffiliation}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="medicalSchool" className="block text-sm font-medium text-gray-700 mb-1">
                  Medical School
                </label>
                <input
                  type="text"
                  id="medicalSchool"
                  name="medicalSchool"
                  value={formData.medicalSchool || ''}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.medicalSchool ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-teal-500`}
                  placeholder="Harvard Medical School"
                />
                {errors.medicalSchool && <p className="mt-1 text-sm text-red-500">{errors.medicalSchool}</p>}
              </div>
              
              <div>
                <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 mb-1">
                  Graduation Year
                </label>
                <input
                  type="number"
                  id="graduationYear"
                  name="graduationYear"
                  value={formData.graduationYear || ''}
                  onChange={handleInputChange}
                  min="1950"
                  max={new Date().getFullYear()}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.graduationYear ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-teal-500`}
                  placeholder="2010"
                />
                {errors.graduationYear && <p className="mt-1 text-sm text-red-500">{errors.graduationYear}</p>}
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Medical License Number
              </label>
              <input
                type="text"
                id="licenseNumber"
                name="licenseNumber"
                value={formData.licenseNumber || ''}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.licenseNumber ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-teal-500`}
                placeholder="ML-123456"
                readOnly={!!initialData.licenseNumber}
              />
              {errors.licenseNumber && <p className="mt-1 text-sm text-red-500">{errors.licenseNumber}</p>}
            </div>
            
            <div>
              <label htmlFor="boardCertification" className="block text-sm font-medium text-gray-700 mb-1">
                Board Certification
              </label>
              <input
                type="text"
                id="boardCertification"
                name="boardCertification"
                value={formData.boardCertification || ''}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.boardCertification ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-teal-500`}
                placeholder="American Board of Internal Medicine"
              />
              {errors.boardCertification && <p className="mt-1 text-sm text-red-500">{errors.boardCertification}</p>}
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Upload Medical Degree</label>
              <div 
                onClick={() => handleFileSelect('degreeFile')}
                className={`flex items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer ${
                  errors.degreeFile ? 'border-red-400 bg-red-50' : 'border-teal-300 hover:border-teal-500 bg-teal-50'
                }`}
              >
                <div className="text-center">
                  <svg className="mx-auto h-10 w-10 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">
                    {formData.degreeFile ? formData.degreeFile.name : 'Click to upload your medical degree (PDF, JPG, PNG)'}
                  </p>
                </div>
              </div>
              {errors.degreeFile && <p className="mt-1 text-sm text-red-500">{errors.degreeFile}</p>}
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Upload Medical License</label>
              <div 
                onClick={() => handleFileSelect('licenseFile')}
                className={`flex items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer ${
                  errors.licenseFile ? 'border-red-400 bg-red-50' : 'border-teal-300 hover:border-teal-500 bg-teal-50'
                }`}
              >
                <div className="text-center">
                  <svg className="mx-auto h-10 w-10 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">
                    {formData.licenseFile ? formData.licenseFile.name : 'Click to upload your medical license (PDF, JPG, PNG)'}
                  </p>
                </div>
              </div>
              {errors.licenseFile && <p className="mt-1 text-sm text-red-500">{errors.licenseFile}</p>}
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => {
                if (e.target.files.length > 0) {
                  handleInputChange({
                    target: {
                      name: e.target.name,
                      type: 'file',
                      files: e.target.files
                    }
                  });
                }
              }}
            />
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
              <div 
                onClick={() => handleFileSelect('profileImage')}
                className={`flex items-center justify-center border-2 border-dashed rounded-full h-32 w-32 mx-auto cursor-pointer ${
                  formData.profileImage ? 'border-none' : 'border-teal-300 hover:border-teal-500 bg-teal-50'
                }`}
              >
                {formData.profileImage ? (
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img 
                      src={URL.createObjectURL(formData.profileImage)} 
                      alt="Profile preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <svg className="mx-auto h-10 w-10 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <p className="mt-1 text-sm text-gray-600">Add photo</p>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address || ''}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.address ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-teal-500`}
                placeholder="123 Main St"
              />
              {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city || ''}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.city ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-teal-500`}
                  placeholder="New York"
                />
                {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
              </div>
              
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state || ''}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.state ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-teal-500`}
                  placeholder="NY"
                />
                {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
              </div>
            </div>
            
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode || ''}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.zipCode ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-teal-500`}
                placeholder="10001"
              />
              {errors.zipCode && <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>}
            </div>
            
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Professional Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio || ''}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-4 py-3 rounded-lg border ${errors.bio ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-teal-500`}
                placeholder="Write a short professional bio that will be visible to patients..."
              />
              {errors.bio && <p className="mt-1 text-sm text-red-500">{errors.bio}</p>}
            </div>
          </div>
        );
        
      default:
        return <div>Unknown Step</div>;
    }
  };
  
  return (
    <div
      className="bg-white rounded-xl shadow-lg p-6 md:p-8"
    >
      <h2 className="text-2xl font-bold text-teal-700 mb-2 text-center">{getStepTitle()}</h2>
      <p className="text-gray-500 mb-6 text-center">
        Please complete all required information to verify your medical credentials
      </p>
      
      <StepIndicator currentStep={currentStep} totalSteps={4} />
      
      <AnimatePresence mode="wait">
        <div
          key={currentStep}
        >
          {renderCurrentStep()}
        </div>
      </AnimatePresence>
      
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            currentStep === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Previous
        </button>
        
        <button
          type="button"
          onClick={handleNext}
          className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          {currentStep === 3 ? 'Complete Verification' : 'Next Step'}
        </button>
      </div>
    </div>
  );
};

export default DoctorVerificationWizard;
