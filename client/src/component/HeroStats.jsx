import React from "react";

const stats = [
  { 
    value: "15K+", 
    label: "Happy Patients",
    icon: (
      <svg className="w-6 h-6 text-blue-500 mb-2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    )
  },
  { 
    value: "500+", 
    label: "Expert Doctors",
    icon: (
      <svg className="w-6 h-6 text-green-500 mb-2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5V9C15 11.8 12.8 14 10 14S5 11.8 5 14V16L3 16V14C3 10.7 5.7 8 9 8H15C18.3 8 21 10.7 21 14V16L19 16V14C19 11.2 16.8 9 14 9H12V7.5L18 7V9H21Z"/>
      </svg>
    )
  },
  { 
    value: "98%", 
    label: "Success Rate",
    icon: (
      <svg className="w-6 h-6 text-purple-500 mb-2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 12L11 14L15 10M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12Z"/>
      </svg>
    )
  }
];

const HeroStats = () => (
  <div className="hero-stats">
    {stats.map((item, idx) => (
      <div className="stat" key={idx}>
        <div className="flex justify-center">{item.icon}</div>
        <div className="stat-value">{item.value}</div>
        <div className="stat-label">{item.label}</div>
      </div>
    ))}
  </div>
);

export default HeroStats;