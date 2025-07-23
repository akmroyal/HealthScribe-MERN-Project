import React from "react";
import Navbar from "../../component/Navbar.jsx";
import HeroStats from "../../component/HeroStats";
import AppointmentForm from "../../component/AppoinmentForm.jsx";

const HeroSection = () => {
  return (
    <div className="hero-bg">
      <Navbar />
      <main className="hero-main">
        <section className="hero-content">
          <div className="hero-text">
            <h1>
              <span className="hero-bold">Find the best</span>
              <br />
              <span className="hero-bold">medical care</span>
              <br />
              for your health
            </h1>
            <p>
              Experience world-class healthcare with our network of certified doctors and 
              specialists. Book appointments instantly and get the care you deserve.
            </p>
            <div className="hero-btns">
              <button className="btn-primary">Book Appointment</button>
              <button className="btn-outline">Learn More</button>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-img-col">
              <div className="hero-img-placeholder">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                </svg>
              </div>
            </div>
            <HeroStats />
          </div>
        </section>
        <AppointmentForm />
      </main>
    </div>
  );
};

export default HeroSection;