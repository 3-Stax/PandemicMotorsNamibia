import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CarGrid from './components/CarGrid';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CarGrid />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
