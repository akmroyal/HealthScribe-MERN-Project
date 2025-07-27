import React from "react";
import Navbar from "../shared/Navbar.jsx";
import HeroStats from "../HeroStats.jsx";

const HeroSection = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-teal-900 to-teal-800">
      {/* Background patterns */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-20">
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-teal-600 filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-teal-500 filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-lime-500 filter blur-3xl"></div>
      </div>

      <Navbar />

      <main className="relative z-10 px-6 md:px-12 pt-10 md:pt-16">
        <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between max-w-7xl mx-auto gap-8 md:gap-4">
          {/* Left Content */}
          <div className="w-full md:w-1/2 mt-10 md:mt-0 md:pt-10">
            <div className="inline-flex items-center px-4 py-2 bg-teal-800/40 rounded-full border border-teal-700/40 text-sm text-white mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-lime-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Online Platforms offers Transcriptions
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-8">
              Smarter AI <br />
              Documentations Starts <br />
              With <span className="text-lime-400">HealthScribe</span>.
            </h1>

            <p className="text-lg text-gray-300 mb-10 max-w-lg">
              HealthScribe is an AI-powered medical platform built to transform complex healthcare data into clear, actionable insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-lime-400 hover:bg-lime-500 text-teal-900 font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-lime-400/30">
                Get Started
              </button>
              <button className="px-8 py-4 bg-teal-700/50 hover:bg-teal-700/70 text-white font-medium rounded-full border border-teal-600/50 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Watch a Demo
              </button>
            </div>
          </div>

          {/* Right Content - Doctor Image & Dashboard */}
          <div className="w-full md:w-1/2 relative">
            <img
              src="/Doctor.png"
              alt="Doctor"
              className="w-2/3 mx-auto relative"
            />

            {/* Dashboard elements */}
            <div className="absolute top-10 right-0 md:-right-10 bg-teal-800/40 backdrop-blur-md p-4 rounded-xl border border-teal-700/40 shadow-lg w-48 md:w-64 hidden md:block">
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
            </div>

            <div className="absolute bottom-5 right-20 md:-right-10 bg-teal-800/40 backdrop-blur-md p-4 rounded-xl border border-teal-700/40 shadow-lg w-48 md:w-64 hidden md:block">
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
            </div>
          </div>
        </div>

        {/* Partner logos */}
        <div className="mt-20 md:mt-40 border-t border-teal-700/50 pt-8 pb-10">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-8 md:gap-12">
            <img src="#" alt="Ansell" className="h-6 opacity-70 hover:opacity-100 transition-opacity duration-300" />
            <img src="#" alt="Infinitum" className="h-6 opacity-70 hover:opacity-100 transition-opacity duration-300" />
            <img src="#" alt="Dräger" className="h-6 opacity-70 hover:opacity-100 transition-opacity duration-300" />
            <img src="#" alt="IKA" className="h-6 opacity-70 hover:opacity-100 transition-opacity duration-300" />
            <img src="#" alt="MOLDEX" className="h-6 opacity-70 hover:opacity-100 transition-opacity duration-300" />
            <img src="#" alt="ABX" className="h-6 opacity-70 hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HeroSection;