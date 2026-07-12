import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1800&q=85&fm=webp",
    alt: "Kerala backwaters at golden hour",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=80&fm=webp",
    alt: "Maldives overwater villas at dawn",
  },
  {
    src: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1800&q=80&fm=webp",
    alt: "Mount Fuji at twilight, Japan",
  },
  {
    src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1800&q=80&fm=webp",
    alt: "Dubai skyline at dusk",
  },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveSlide((s) => (s + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero" id="home" aria-label="Hero section">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-slides" id="heroSlides">
          <AnimatePresence mode="wait">
            <motion.div
              key={SLIDES[activeSlide].src}
              className="hero-slide active"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.06 }}
              transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <img
                src={SLIDES[activeSlide].src}
                alt={SLIDES[activeSlide].alt}
                loading="eager"
                fetchPriority="high"
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="hero-vignette"></div>
        <div className="hero-grain"></div>
        <div className="hero-progress">
          <motion.div
            className="hero-progress-fill"
            id="heroPF"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 6, ease: "linear", repeat: Infinity }}
          />
        </div>
      </div>
      <div className="hero-rule" aria-hidden="true"></div>

      <div className="hero-body">
        <motion.p
          className="hero-eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Handcrafted Journeys Since 2012
        </motion.p>
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.48 }}
        >
          <em id="heroWord">Thoughtfully</em>
          <br />
          <strong>Handcrafted</strong> Journeys
        </motion.h1>
        <motion.p
          className="hero-sub"
          id="heroSub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.64 }}
        >
          Premium domestic and international travel across 35+ destinations - every itinerary
          planned by a real travel specialist, not a template.
        </motion.p>
        <motion.div
          className="hero-btns"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <a href="#packages" className="btn-primary" aria-label="Explore travel packages">
            Explore Packages
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M1 7h12M8 3l5 4-5 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a href="tel:+919494141475" className="btn-ghost" aria-label="Speak to a travel expert">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path
                d="M11.5 9.2c-.2-.2-2-1-2.3-.9-.3.1-.5.4-.7.6-.1.1-.3.2-.5.1C7.2 8.6 6 7.9 5 6.8c-.9-.9-1.5-2-.9-2.3.2-.1.5-.3.6-.6.1-.3-.6-2.1-.9-2.3C3.5 1.4 3.3 1.4 3 1.5 2 2.1 1.3 3.3 1.6 4.5c.4 1.7 1.6 3.3 3 4.7 1.4 1.4 3 2.6 4.7 3 1.2.3 2.4-.4 3-1.4.1-.3.1-.5-.8-1.6z"
                stroke="currentColor"
                strokeWidth="1.2"
                fill="none"
              />
            </svg>
            Speak to a Travel Expert
          </a>
        </motion.div>
      </div>

      <nav className="hero-nav" id="heroNav" aria-label="Slide navigation">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            className={i === activeSlide ? "active" : ""}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setActiveSlide(i)}
          />
        ))}
      </nav>
      <div className="hero-scroll" aria-hidden="true">
        <div className="hero-scroll-line"></div>
        <span>Scroll</span>
      </div>
    </section>
  );
}