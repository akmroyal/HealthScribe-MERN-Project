import React from "react";

const HowItWorks = () => {
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

  return (
    <section id="how-it-works" className="py-24 px-6 md:px-12 relative bg-gradient-to-b from-teal-800 to-teal-900">
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-10">
        <img src="/LandScapeBG.png" alt="Background" className="w-full h-full object-cover" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">How HealthScribe Works</h2>
          <div className="h-1 w-24 bg-lime-400 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-teal-800/40 backdrop-blur-md p-8 rounded-xl border border-teal-700/40 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-gray-300 leading-relaxed">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 left-full transform -translate-y-1/2 -translate-x-4 text-lime-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
