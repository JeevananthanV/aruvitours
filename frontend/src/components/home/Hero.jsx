import React, { useState, useEffect } from 'react';
import { MovingBorderButton } from '../common/MovingBorder';
import './Hero.css';

const Hero = () => {
  const images = [
    '/home/home-hero-travel-adventure.jpg',
    '/home/home-hero-maldives-villas.jpg',
    '/home/home-hero-japan-fuji.jpg',
    '/home/home-hero-kerala-backwaters.jpg',
    '/home/home-hero-dubai-skyline.jpg',
    '/home/home-hero-mountain-landscape.jpg',
    '/home/home-hero-beach-sunset.jpg',
    '/home/home-hero-cultural-heritage.jpg'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="hero-container">
      {images.map((image, index) => (
        <div
          key={image}
          className={`hero-slide ${index === currentIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
      
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <span className="hero-subtitle">Bespoke Travel Experiences</span>
        <h1 className="hero-title">
          Discover The Art of <br />
          <span>Luxury Travel</span>
        </h1>
        <p className="hero-description">
          Curating customized journeys, exclusive HNI luxury retreats, and unforgettable expeditions to the world's most spectacular destinations.
        </p>
        
        <div className="hero-actions" style={{ alignItems: 'center' }}>
          <MovingBorderButton
            borderRadius="0.25rem"
            containerClassName="w-48 h-12 cursor-pointer"
            className="bg-black/40 hover:bg-gold hover:text-black text-white font-semibold transition duration-200 cursor-pointer"
            onClick={() => {
              const el = document.getElementById('packages-section');
              if (el) {
                const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }}
          >
            Explore Journeys
          </MovingBorderButton>
          <a 
            href="#about-section" 
            className="hero-secondary-btn"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('about-section');
              if (el) {
                const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }}
          >
            Our Story
          </a>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div 
        className="hero-scroll-indicator"
        onClick={() => {
          const el = document.getElementById('about-section');
          if (el) {
            const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }}
      >
        <span className="scroll-text">Scroll to Discover</span>
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
