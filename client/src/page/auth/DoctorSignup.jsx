import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../component/shared/AuthLayout';
import DoctorVerificationWizard from './DoctorVerificationWizard';

const DoctorSignup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleVerificationComplete = (verificationData) => {
        setIsLoading(true);
        
        // For now, just simulate a registration process
        setTimeout(() => {
            // Store user data in localStorage for authentication
            const userData = {
                id: 'd123',
                name: verificationData.fullName,
                email: verificationData.email,
                mobile: verificationData.mobile,
                specialty: verificationData.specialty,
                licenseNumber: verificationData.licenseNumber,
                yearsOfExperience: verificationData.yearsOfExperience,
                boardCertification: verificationData.boardCertification,
                hospitalAffiliation: verificationData.hospitalAffiliation,
                medicalSchool: verificationData.medicalSchool,
                graduationYear: verificationData.graduationYear,
                address: `${verificationData.address || ''}, ${verificationData.city || ''}, ${verificationData.state || ''} ${verificationData.zipCode || ''}`.trim(),
                bio: verificationData.bio,
                userType: 'doctor',
                verified: true
            };

            localStorage.setItem('user', JSON.stringify(userData));

            setIsLoading(false);
            navigate('/dashboard');
        }, 1000);
    };

    return (
        <AuthLayout
            title="Doctor Verification"
            subtitle="Complete the verification process to start using HealthScribe"
            formType="signup"
            userType="doctor"
        >
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
