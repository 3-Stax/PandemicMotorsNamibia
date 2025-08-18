import React from 'react';

export default function CarCard({ car }) {
  return (
    <div className="car-card" data-type={car.type}>
      <div className="car-images">
        <img src={car.images && car.images[0] ? car.images[0] : '/images/placeholder.jpg'} alt={`${car.make} ${car.model} Front View`} loading="lazy" />
        {(car.images && car.images[1]) ? <img src={car.images[1]} alt={`${car.make} ${car.model} Interior`} loading="lazy" /> : null}
      </div>
      <div className="car-info">
        <h3>{car.make} {car.model}</h3>
        <p className="car-specs">{car.year} • {car.fuel} • {car.transmission}</p>
        <p className="car-description">{car.description}</p>
        <p className="car-price"><strong>Price: {car.price}</strong></p>
        <a href="#contact" className="btn btn-primary inquire-btn"><i className="fas fa-car"></i> Inquire Now</a>
      </div>
    </div>
  );
}
