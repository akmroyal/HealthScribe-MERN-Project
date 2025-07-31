import React from "react";

const CTA = () => {
  return (
    <section id="cta" className="py-24 px-6 md:px-12 bg-gradient-to-r from-teal-800 to-teal-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-teal-600 filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-lime-500 filter blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Save Time with AI-Powered Documentation?
        </h2>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Join hundreds of doctors reducing their workload with HealthScribe. 
          Get started in under 2 minutes.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
          <button className="px-8 py-4 bg-lime-400 hover:bg-lime-500 text-teal-900 font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-lime-400/30">
            Request Early Access
          </button>
          <button className="px-8 py-4 bg-transparent hover:bg-teal-700/50 text-white font-medium rounded-full border border-teal-400 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Book a Demo
          </button>
        </div>

        {/* Optional badges for social proof */}
        <div className="flex flex-wrap justify-center items-center gap-4">
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
            <span className="text-white text-sm">⭐ 4.9/5 Satisfaction</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
            <span className="text-white text-sm">🔒 HIPAA Compliant</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
            <span className="text-white text-sm">⚡ Quick Setup</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
