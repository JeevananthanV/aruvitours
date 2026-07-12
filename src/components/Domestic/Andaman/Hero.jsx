import { useEffect, useRef, useState } from "react";
import { heroSlides } from "../../data/andamanData";

export default function Hero({ onExplore }) {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timerRef.current);
  }, []);

  const goTo = (index) => {
    clearInterval(timerRef.current);
    setActive((index + heroSlides.length) % heroSlides.length);
  };

  return (
    <section id="hero" className="aruvi-hero">
      <div className="aruvi-hero-split">
        {heroSlides.map((slide, i) => (
          <div
            key={slide.id}
            className={`aruvi-hero-panel${i === active ? " is-active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="aruvi-hero-overlay" />
            <div className="aruvi-hero-content">
              <span className="aruvi-hero-badge">{slide.badge}</span>
              <h2>
                {slide.titleLine1}
                <br />
                <em>{slide.titleEm}</em>
              </h2>
              <p>{slide.tagline}</p>
              <button
                className="aruvi-hero-cta"
                onClick={() => onExplore?.(slide.days)}
              >
                Explore itinerary
              </button>
            </div>
            <div className="aruvi-hero-number">{String(i + 1).padStart(2, "0")}</div>
          </div>
        ))}
      </div>

      <div className="aruvi-hero-brand">
        <span>Aruvi Tours</span>
        <span className="aruvi-hero-brand-sep">·</span>
        <span>Andaman Luxury Escapes</span>
      </div>

      <div className="aruvi-hero-controls">
        <button aria-label="Previous slide" onClick={() => goTo(active - 1)}>
          &#10094;
        </button>
        <div className="aruvi-hero-dots">
          {heroSlides.map((slide, i) => (
            <button
              key={slide.id}
              className={`aruvi-hero-dot${i === active ? " is-active" : ""}`}
              aria-label={`Show ${slide.titleLine1} ${slide.titleEm}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <button aria-label="Next slide" onClick={() => goTo(active + 1)}>
          &#10095;
        </button>
      </div>

      <div className="aruvi-hero-scroll-hint">
        <span>Scroll</span>
        <div className="aruvi-hero-scroll-line" />
      </div>
    </section>
  );
}
