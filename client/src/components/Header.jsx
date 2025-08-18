import React from 'react';

export default function Header() {
  return (
    <header>
      <div className="container header-container">
        <div className="logo">
          <a href="#home" aria-label="Pandemic Motors Home">
            <img src="/images/logo/logo_pmn.jpg" alt="Pandemic Motors Logo" />
            <div className="logo-text">
              <span className="logo-main">Pandemic</span>
              <span className="logo-sub">Motors</span>
            </div>
          </a>
        </div>

        <button id="mobile-menu-btn" className="mobile-menu-btn" aria-expanded="false" aria-controls="main-nav" aria-label="Toggle mobile menu">
          <span className="menu-icon"></span>
        </button>

        <nav id="main-nav" aria-label="Main navigation">
          <ul>
            <li><a href="#home" className="nav-link active">Home</a></li>
            <li><a href="#cars" className="nav-link">Inventory</a></li>
            <li><a href="#services" className="nav-link">Services</a></li>
            <li><a href="#testimonials" className="nav-link">Testimonials</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
