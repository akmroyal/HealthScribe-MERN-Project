import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from './Logo';
import BacktoHome from './BacktoHome';

const AuthLayout = ({ children, title, subtitle, formType, userType }) => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Left Side - Brand/Info Section */}
            <motion.div
                className="hidden lg:flex flex-col w-1/2 bg-gradient-to-br from-teal-700 via-teal-600 to-teal-400 text-white p-12"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <div className="mb-12 flex items-center justify-between">
                    <div>
                        <Logo variant="light" />
                    </div>
                    <div>
                        <BacktoHome route={'/auth-options'} />
                    </div>
                </div>
                <div className="flex-grow flex flex-col justify-center">
                    <motion.h1
                        className="text-4xl font-bold mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        {userType === 'doctor'
                            ? "Streamline Your Practice with HealthScribe"
                            : "Your Health Journey, Simplified"}
                    </motion.h1>
                    <motion.p
                        className="text-xl mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        {userType === 'doctor'
                            ? "Focus more on patients and less on paperwork with our AI-powered medical transcription."
                            : "Take control of your healthcare experience with easy appointment booking and secure access to your medical records."}
                    </motion.p>
                    <motion.div
                        className="text-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        {formType === 'login' ? (
                            <p>
                                Don't have an account?{" "}
                                <Link
                                    to={userType === 'doctor' ? '/doctor/signup' : '/patient/signup'}
                                    className="text-lime-300 underline hover:text-white transition-colors"
                                >
                                    Sign up
                                </Link>
                            </p>
                        ) : (
                            <p>
                                Already have an account?{" "}
                                <Link
                                    to={userType === 'doctor' ? '/doctor/login' : '/patient/login'}
                                    className="text-lime-300 underline hover:text-white transition-colors"
                                >
                                    Log in
                                </Link>
                            </p>
                        )}
                    </motion.div>
                </div>
            </motion.div>

            {/* Right Side - Form Section */}
            <motion.div
                className="w-full lg:w-1/2 flex items-center justify-center p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className="w-full max-w-md">
                    <div className="lg:hidden mb-8">
                        <Logo />
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
                        <p className="text-gray-600 mb-8">{subtitle}</p>
                        {/* Mobile version of login/signup links */}
                        <div className="mb-8 lg:hidden">
                            {formType === 'login' ? (
                                <p>
                                    Don't have an account?{" "}
                                    <Link
                                        to={userType === 'doctor' ? '/doctor/signup' : '/patient/signup'}
                                        className="text-teal-600 hover:text-teal-800 transition-colors"
                                    >
                                        Sign up
                                    </Link>
                                </p>
                            ) : (
                                <p>
                                    Already have an account?{" "}
                                    <Link
                                        to={userType === 'doctor' ? '/doctor/login' : '/patient/login'}
                                        className="text-teal-600 hover:text-teal-800 transition-colors"
                                    >
                                        Log in
                                    </Link>
                                </p>
                            )}
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        {children}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthLayout;
