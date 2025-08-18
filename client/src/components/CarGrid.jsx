import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarCard from './CarCard';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function CarGrid() {
  const [cars, setCars] = useState([]);
  const [q, setQ] = useState('');
  const [type, setType] = useState('all');

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get(`${API}/api/cars`, { params: { q, type } });
        // Corrected line: Access the 'cars' key from the response data
        setCars(res.data.cars);
      } catch (err) {
        console.error('Error loading cars', err);
      }
    }
    load();
  }, [q, type]);

  const tagList = ['All', 'SUVs', 'Sedans', 'Trucks', 'Luxury'];

  return (
    <section className="inventory" id="cars" aria-labelledby="cars-heading">
      <div className="container">
        <h2 id="cars-heading">Available Cars</h2>
        <div className="search-container">
          <div className="search-bar">
            <input id="searchInput" placeholder="Search for a car by make, model, or year..." value={q} onChange={e => setQ(e.target.value)} />
            <button id="searchBtn" className="search-btn" aria-label="Search cars" onClick={() => { /* search uses q */ }}>
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div className="filter-tags" role="group" aria-label="Car categories filter">
            {tagList.map(t => {
              const lower = t.toLowerCase().replace('s',''); // quick normalize
              const active = (type === 'all' && t === 'All') || type === lower;
              return (
                <span key={t} className={`filter-tag ${active ? 'active' : ''}`} onClick={() => setType(t === 'All' ? 'all' : lower)}>{t}</span>
              );
            })}
          </div>
        </div>

        <div className="car-grid" id="carGrid">
          {cars.length > 0 ? cars.map(car => <CarCard key={car._id || car._id} car={car} />)
            : <div className="no-results text-center" style={{ gridColumn: '1 / -1' }}>No vehicles found.</div>}
        </div>
      </div>
    </section>
  );
}