import React from 'react';

export default function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-overlay"></div>
      <div className="container">
        <div className="hero-content">
          <h1 id="hero-title">Premium Pre-Owned Vehicles in Namibia</h1>
          <p className="hero-subtitle">At Pandemic Motors, we offer the finest selection of quality pre-owned vehicles with transparent pricing and exceptional customer service.</p>
          <div className="hero-btns">
            <a href="#cars" className="btn btn-primary"><i className="fas fa-car"></i> Browse Inventory</a>
            <a href="#contact" className="btn btn-secondary"><i className="fas fa-phone-alt"></i> Get In Touch</a>
          </div>
        </div>
      </div>
    </section>
  );
}
