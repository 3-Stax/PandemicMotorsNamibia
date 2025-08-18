import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Services() {
  const [services, setServices] = useState([]);

   useEffect(() => {
    // This line is corrected to access res.data.services
    axios.get(`${API}/api/services`)
      .then(res => setServices(res.data.services)) // <-- Change is here
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="services" id="services" aria-labelledby="services-heading">
      <div className="container">
        <h2 id="services-heading">Our Services</h2>
        <p className="section-intro">We go beyond just selling cars. Our comprehensive services ensure you have the best ownership experience.</p>
        <div className="services-grid">
          {services.map((s, idx) => (
            <div className="service-card" key={idx}>
              <div className="service-icon"><i className={s.icon}></i></div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
