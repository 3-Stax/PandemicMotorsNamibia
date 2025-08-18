import React, { useState } from 'react';
import axios from 'axios';
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: '', message: '' });
  const [loading, setLoading] = useState(false);

  const submit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert('Please fill required fields');
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/api/contact`, form);
      alert('Success! We will be in touch.');
      setForm({ name: '', email: '', phone: '', interest: '', message: '' });
    } catch (err) {
      console.error(err);
      alert('Error sending message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact" id="contact" aria-labelledby="contact-heading">
      <div className="container">
        <h2 id="contact-heading">Contact Us</h2>
        <p className="section-intro">Have questions or want to schedule a test drive? Get in touch with our team today.</p>
        <div className="contact-container">
          <address className="contact-info">
            <h3>Visit Our Showroom</h3>
            <div className="contact-detail">
              <div className="contact-icon"><i className="fas fa-map-marker-alt" aria-hidden="true"></i></div>
              <div><p>123 Independence Avenue</p><p>Windhoek, Namibia</p></div>
            </div>
            <div className="contact-detail">
              <div className="contact-icon"><i className="fas fa-phone" aria-hidden="true"></i></div>
              <div><p><a href="tel:+264611234567">+264 61 123 4567</a></p><p>Mon-Fri: 8:30AM - 5:30PM</p></div>
            </div>
            <div className="contact-detail">
              <div className="contact-icon"><i className="fas fa-envelope" aria-hidden="true"></i></div>
              <div><p><a href="mailto:info@pandemicmotors.na">info@pandemicmotors.na</a></p></div>
            </div>
          </address>

          <div className="contact-form">
            <form onSubmit={submit} aria-label="Contact form">
              <div className="form-group"><label htmlFor="name">Your Name</label><input id="name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required /></div>
              <div className="form-group"><label htmlFor="email">Email Address</label><input id="email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required /></div>
              <div className="form-group"><label htmlFor="phone">Phone Number</label><input id="phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} /></div>
              <div className="form-group"><label htmlFor="interest">Vehicle Interest (Optional)</label>
                <select id="interest" value={form.interest} onChange={e=>setForm({...form, interest:e.target.value})}>
                  <option value="">Select a vehicle</option>
                  {/* you can populate with /api/cars if you want dynamic list */}
                </select>
              </div>
              <div className="form-group"><label htmlFor="message">Your Message</label><textarea id="message" value={form.message} onChange={e=>setForm({...form, message:e.target.value})} required /></div>
              <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
