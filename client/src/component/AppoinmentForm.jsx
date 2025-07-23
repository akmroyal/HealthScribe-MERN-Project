import React from "react";

const AppointmentForm = () => (
  <section className="appointment-form-container">
    <form className="appointment-form">
      <div className="form-group">
        <label htmlFor="date">Appointment Date</label>
        <input 
          id="date" 
          name="date" 
          type="date" 
          className="form-input"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input 
          id="location" 
          name="location" 
          type="text" 
          placeholder="Enter your city" 
          className="form-input"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="specialist">Specialist</label>
        <select id="specialist" name="specialist" className="form-input">
          <option value="">Select specialist</option>
          <option value="cardiologist">Cardiologist</option>
          <option value="dermatologist">Dermatologist</option>
          <option value="neurologist">Neurologist</option>
          <option value="pediatrician">Pediatrician</option>
          <option value="psychiatrist">Psychiatrist</option>
          <option value="orthopedic">Orthopedic</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="time">Preferred Time</label>
        <select id="time" name="time" className="form-input">
          <option value="">Select time</option>
          <option value="morning">Morning (9:00 - 12:00)</option>
          <option value="afternoon">Afternoon (12:00 - 17:00)</option>
          <option value="evening">Evening (17:00 - 20:00)</option>
        </select>
      </div>
      
      <button className="btn-form" type="submit">
        <span>Book Now</span>
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </form>
  </section>
);

export default AppointmentForm;