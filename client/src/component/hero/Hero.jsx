import React, { useEffect } from "react";
import Navbar from "../shared/Navbar.jsx";
import HeroStats from "../HeroStats.jsx";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const HeroSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-teal-900 to-teal-800">
      {/* Background patterns */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-20">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-20 left-20 w-40 h-40 rounded-full bg-teal-600 filter blur-3xl"
        ></motion.div>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
          className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-teal-500 filter blur-3xl"
        ></motion.div>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.6 }}
          className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-lime-500 filter blur-3xl"
        ></motion.div>
      </div>

      <Navbar />

      <main className="relative z-10 px-4 sm:px-6 md:px-12 pt-8 sm:pt-10 md:pt-16">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between max-w-7xl mx-auto gap-8 lg:gap-4"
        >
          {/* Left Content */}
          <div className="w-full lg:w-1/2 mt-6 sm:mt-10 lg:mt-0 lg:pt-10">
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center px-3 sm:px-4 py-2 bg-teal-800/40 rounded-full border border-teal-700/40 text-xs sm:text-sm text-white mb-4 sm:mb-6"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-lime-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Online Platforms offers Transcriptions
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 sm:mb-8"
            >
              Smarter AI <br />
              Documentation Starts <br />
              With <span className="text-lime-400">HealthScribe</span>.
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg text-gray-300 mb-8 sm:mb-10 max-w-lg"
            >
              HealthScribe is an AI-powered medical assistant that transforms doctor-patient conversations into structured clinical notes, saving 60% of documentation time.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-lime-400 hover:bg-lime-500 text-teal-900 font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-lime-400/30 text-sm sm:text-base"
              >
                Get Started
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-teal-700/50 hover:bg-teal-700/70 text-white font-medium rounded-full border border-teal-600/50 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Watch a Demo
              </motion.button>
            </motion.div>
          </div>

          {/* Right Content - Doctor Image & Dashboard */}
          <motion.div 
            variants={itemVariants}
            className="w-full lg:w-1/2 relative flex justify-center lg:justify-end"
          >
            <motion.img
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              src="/Doctor.png"
              alt="Doctor"
              className="w-3/4 sm:w-2/3 lg:w-full max-w-md relative"
            />

            {/* Dashboard elements - Hidden on mobile and small tablets, visible on larger screens */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute top-6 sm:top-10 right-0 xl:-right-10 bg-teal-800/40 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-teal-700/40 shadow-lg w-40 sm:w-48 lg:w-56 xl:w-64 hidden lg:block"
            >
              <div className="text-white text-xs mb-2">Dashboard Report</div>
              <div className="bg-teal-900/50 p-2 rounded-lg">
                <div className="h-20 w-full flex items-end justify-between gap-1">
                  <div className="w-1/12 h-1/4 bg-teal-400 rounded-t"></div>
                  <div className="w-1/12 h-2/5 bg-teal-400 rounded-t"></div>
                  <div className="w-1/12 h-1/3 bg-teal-400 rounded-t"></div>
                  <div className="w-1/12 h-3/5 bg-green-400 rounded-t"></div>
                  <div className="w-1/12 h-2/6 bg-teal-400 rounded-t"></div>
                  <div className="w-1/12 h-2/3 bg-green-400 rounded-t"></div>
                  <div className="w-1/12 h-1/2 bg-teal-400 rounded-t"></div>
                  <div className="w-1/12 h-3/4 bg-green-400 rounded-t"></div>
                  <div className="w-1/12 h-3/5 bg-teal-400 rounded-t"></div>
                  <div className="w-1/12 h-full bg-green-400 rounded-t"></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                  <span>Jan</span>
                  <span>Mar</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="absolute bottom-2 sm:bottom-5 right-10 sm:right-20 xl:-right-10 bg-teal-800/40 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-teal-700/40 shadow-lg w-40 sm:w-48 lg:w-56 xl:w-64 hidden lg:block"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="text-white text-xs">Your daily progress</div>
                <div className="text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="relative w-20 h-20">
                  <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      className="text-teal-900"
                      strokeWidth="10"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className="text-purple-500"
                      strokeWidth="10"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                      strokeDasharray="251.2"
                      strokeDashoffset="100"
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
                    <div className="text-lg font-semibold">65</div>
                    <div className="text-xs text-gray-400">10,310</div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="bg-purple-400/20 p-2 rounded-lg flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">
                      🔄
                    </div>
                    <div>
                      <div className="text-white text-lg">120</div>
                      <div className="text-xs text-gray-400">Latest hits</div>
                    </div>
                  </div>

                  <div className="bg-yellow-400/20 p-2 rounded-lg flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs">
                      ⚡
                    </div>
                    <div>
                      <div className="text-white text-lg">3,570</div>
                      <div className="text-xs text-gray-400">Steps</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Partner logos */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12 sm:mt-20 lg:mt-40 border-t border-teal-700/50 pt-6 sm:pt-8 pb-8 sm:pb-10"
        >
          <div className="max-w-7xl mx-auto flex flex-wrap justify-center sm:justify-between items-center gap-4 sm:gap-8 lg:gap-12">
            {/* Using emoji placeholders for logo examples */}
            {["🏥", "🩺", "💊", "🔬", "🧬", "💉"].map((logo, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center text-xl sm:text-2xl bg-teal-800/30 rounded-full p-2 opacity-70 hover:opacity-100 transition-opacity duration-300"
              >
                {logo}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default HeroSection;