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
    <section id="testimonials" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-teal-900 mb-4">
            Built for Modern Healthcare Professionals
          </h2>
          <div className="h-1 w-24 bg-lime-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join hundreds of healthcare providers already using HealthScribe
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-teal-50 p-8 rounded-xl shadow-lg border border-teal-100">
              <div className="flex items-center mb-4">
                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold text-teal-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.title}</p>
                </div>
              </div>
              <div className="text-teal-900">
                <svg className="w-8 h-8 text-teal-200 mb-4" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8c-2.209 0-4 1.791-4 4v10h8V12h-4c0-1.103 0.897-2 2-2h2V8h-4zm12 0c-2.209 0-4 1.791-4 4v10h8V12h-4c0-1.103 0.897-2 2-2h2V8h-4z" />
                </svg>
                <p className="italic text-gray-700">{testimonial.quote}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Partner logos */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold text-center text-teal-900 mb-8">Trusted by Leading Healthcare Institutions</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {partners.map((partner, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-4xl bg-teal-50 rounded-full w-16 h-16 flex items-center justify-center shadow-md">
                  {partner.logo}
                </div>
                <span className="mt-2 text-sm font-medium text-teal-900">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;