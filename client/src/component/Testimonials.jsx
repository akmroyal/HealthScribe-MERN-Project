import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "HealthScribe helps me focus on patients — not paperwork. My clinic workflow has improved dramatically.",
      name: "Dr. Neha Gupta",
      title: "General Physician",
      image: "https://randomuser.me/api/portraits/women/76.jpg"
    },
    {
      quote: "I've reduced documentation time by 65%. Now I can see more patients and provide better care.",
      name: "Dr. Rajesh Kumar",
      title: "Cardiologist",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "The accuracy of the AI is impressive. It understands medical terminology better than any other solution I've used.",
      name: "Dr. Sarah Patel",
      title: "Pediatrician",
      image: "https://randomuser.me/api/portraits/women/45.jpg"
    }
  ];

  const partners = [
    { name: "HealthCarePlus", logo: "🌐" },
    { name: "MedAssist Pro", logo: "🩺" },
    { name: "Nova Diagnostics", logo: "🏥" },
    { name: "VitalCare Systems", logo: "💊" },
    { name: "PrecisionMed", logo: "🔬" }
  ];

  return (
    <section id="testimonials" className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-900 mb-4">
            Built for Modern Healthcare Professionals
          </h2>
          <div className="h-1 w-20 sm:w-24 bg-lime-400 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Join hundreds of healthcare providers already using HealthScribe
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-teal-50 p-6 sm:p-8 rounded-xl shadow-lg border border-teal-100">
              <div className="flex items-center mb-3 sm:mb-4">
                <img src={testimonial.image} alt={testimonial.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4" />
                <div>
                  <h4 className="font-semibold text-teal-900 text-sm sm:text-base">{testimonial.name}</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">{testimonial.title}</p>
                </div>
              </div>
              <div className="text-teal-900">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-teal-200 mb-3 sm:mb-4" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8c-2.209 0-4 1.791-4 4v10h8V12h-4c0-1.103 0.897-2 2-2h2V8h-4zm12 0c-2.209 0-4 1.791-4 4v10h8V12h-4c0-1.103 0.897-2 2-2h2V8h-4z" />
                </svg>
                <p className="italic text-gray-700 text-sm sm:text-base">{testimonial.quote}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Partner logos */}
        <div className="mt-12 sm:mt-16">
          <h3 className="text-lg sm:text-xl font-semibold text-center text-teal-900 mb-6 sm:mb-8">Trusted by Leading Healthcare Institutions</h3>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 lg:gap-16">
            {partners.map((partner, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl bg-teal-50 rounded-full w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center shadow-md">
                  {partner.logo}
                </div>
                <span className="mt-2 text-xs sm:text-sm font-medium text-teal-900">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;