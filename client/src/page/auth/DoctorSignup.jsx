import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../component/shared/AuthLayout';
import DoctorVerificationWizard from './DoctorVerificationWizard';
import { useAuth } from '../../contexts/useAuth';

const DoctorSignup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorDetail, setErrorDetail] = useState('');
    const navigate = useNavigate();
    const { register } = useAuth();
    
    const handleVerificationComplete = async (verificationData) => {
        setIsLoading(true);
        setError('');
    setSuccessMessage('');
    setErrorDetail('');

        try {
            // Transform data to match backend requirements
            const backendData = {
                email: verificationData.email,
                password: verificationData.password,
                full_name: verificationData.fullName,  // fullName → full_name
                mob_no: verificationData.mobile        // mobile → mob_no
            };

            console.log('Sending to backend:', backendData);

            const result = await register(backendData, 'doctor'); // Pass userType as 'doctor'

            if (result.success) {
                console.log('✅ Registration Successful!', result); // Issue 2: Success log
                setSuccessMessage('🎉 Registration successful! Welcome to HealthScribe!');
                setTimeout(() => {
                    navigate('/doctor'); // Redirect to /doctor as per your App.jsx
                }, 2000); // Increased delay to see success message
            } else {
                setError(result.error || 'Registration failed. Please try again.');
                const detail = result?.server?.error || result?.server?.message;
                if (typeof detail === 'string') setErrorDetail(detail);
                console.error('Registration failed:', result.error, detail ? `| details: ${detail}` : '');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setError('Network error. Please check your connection and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Doctor Verification"
            subtitle="Complete the verification process to start using HealthScribe"
            formType="signup"
            userType="doctor"
        >
            {/* Error Message */}
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-red-800">{error}</p>
                                                        {errorDetail && (
                                                            <p className="mt-1 text-xs text-red-600/80">Details: {errorDetail}</p>
                                                        )}
                        </div>
                    </div>
                </div>
            )}

            {/* Success Message */}
            {successMessage && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-green-800">{successMessage}</p>
                        </div>
                    </div>
                </div>
            )}

            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 border-t-4 border-b-4 border-teal-500 rounded-full animate-spin"></div>
                        <p className="mt-4 text-teal-600 text-lg font-medium">Processing your information...</p>
                    </div>
                </div>
            ) : (
                <DoctorVerificationWizard 
                    onComplete={handleVerificationComplete}
                    initialData={{}}
                />
            )}
        </AuthLayout>
    );
};

export default DoctorSignup;
