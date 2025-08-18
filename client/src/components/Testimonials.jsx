import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Testimonials() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios.get(`${API}/api/testimonials`).then(res => setItems(res.data)).catch(err => console.error(err));
  }, []);

  return (
    <section className="testimonials" id="testimonials" aria-labelledby="testimonials-heading">
      <div className="container">
        <h2 id="testimonials-heading">What Our Customers Say</h2>
        <div className="testimonial-slider" id="testimonialSlider">
          {items.map((t, i) => (
            <div className="testimonial" key={i}>
              <div className="testimonial-content">"{t.content}"</div>
              <div className="testimonial-author">- {t.author}</div>
              <div className="testimonial-rating" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, j) => <i key={j} className="fas fa-star" aria-hidden="true"></i>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
