import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../component/shared/Logo';
import BacktoHome from '../component/shared/BacktoHome';

const AuthOptions = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-700 via-teal-600 to-teal-400 flex flex-col items-center py-12 px-4">
            {/* Back button */}
            {/* <div className="w-full max-w-4xl">
                <Link
                    to="/"
                    className="inline-flex items-center text-white/90 hover:text-white mb-8"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Home
                </Link>
            </div> */}
            <BacktoHome route={'/'} />

            {/* Logo */}
            <motion.div
                className="mb-12"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Logo variant="light" />
            </motion.div>

            <motion.h1
                className="text-4xl font-bold text-white text-center mb-8"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                Choose how to continue
            </motion.h1>

            <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8 px-4">
                {/* Doctor Option */}
                <motion.div
                    className="flex-1"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-lg hover:shadow-xl transition-all hover:bg-white/15 group">
                        <div className="p-8 flex flex-col h-full">
                            <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4">I'm a Doctor</h2>
                            <p className="text-white/80 mb-6 flex-grow">
                                Access your practice dashboard to manage patients, recordings, and medical transcriptions.
                            </p>
                            <div className="space-y-4">
                                <Link
                                    to="/doctor/login"
                                    className="block w-full py-3 bg-white/20 hover:bg-white/30 text-white text-center rounded-lg transition-colors font-medium"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/doctor/signup"
                                    className="block w-full py-3 bg-teal-600 hover:bg-teal-700 text-white text-center rounded-lg transition-colors font-medium"
                                >
                                    Create Account
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Patient Option */}
                <motion.div
                    className="flex-1"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-lg hover:shadow-xl transition-all hover:bg-white/15 group">
                        <div className="p-8 flex flex-col h-full">
                            <div className="w-16 h-16 bg-lime-500/20 rounded-full flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4">I'm a Patient</h2>
                            <p className="text-white/80 mb-6 flex-grow">
                                Access your health records, book appointments, and communicate with healthcare providers.
                            </p>
                            <div className="space-y-4">
                                <Link
                                    to="/patient/login"
                                    className="block w-full py-3 bg-white/20 hover:bg-white/30 text-white text-center rounded-lg transition-colors font-medium"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/patient/signup"
                                    className="block w-full py-3 bg-lime-600 hover:bg-lime-700 text-white text-center rounded-lg transition-colors font-medium"
                                >
                                    Create Account
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AuthOptions;
