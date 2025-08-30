import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const HowItWorks = () => {
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
  const steps = [
    {
      icon: "🎤",
      title: "Real-Time Audio Capture",
      description: "HealthScribe securely listens to doctor-patient conversations using live audio streaming.",
    },
    {
      icon: "✍️",
      title: "Accurate Transcription with Medical Focus",
      description: "OpenAI Whisper converts speech into accurate medical text with advanced terminology handling.",
    },
    {
      icon: "🧠",
      title: "AI-Powered Understanding",
      description: "GPT-4 understands context using prompts + vector search from medical knowledge graphs.",
    },
    {
      icon: "📄",
      title: "Structured Clinical Documentation",
      description: "Generates SOAP notes, prescriptions, and follow-up summaries in seconds — ready for EHRs.",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="how-it-works" className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 md:px-12 relative bg-gradient-to-b from-teal-800 to-teal-900">
      {/* Background image */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 w-full h-full z-0"
      >
        <img src="/LandScapeBG.png" alt="Background" className="w-full h-full object-cover" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">How HealthScribe Works</h2>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-lime-400 mx-auto"
          ></motion.div>
        </motion.div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
              }}
              className="bg-teal-800/40 backdrop-blur-md p-6 sm:p-8 rounded-xl border border-teal-700/40 shadow-lg"
            >
              <motion.div 
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-3xl sm:text-4xl mb-3 sm:mb-4"
              >
                {step.icon}
              </motion.div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{step.title}</h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 left-full transform -translate-y-1/2 -translate-x-4 text-lime-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;