import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../common/ScrollReveal';
import './FeaturedPackages.css';

const FeaturedPackages = ({ packages }) => {
  // Get 3 featured packages for home page spotlight
  const featured = packages.filter((pkg) => pkg.featured).slice(0, 3);

  return (
    <section className="featured-section">
      <ScrollReveal>
        <div className="section-header-centered">
          <span className="section-subtitle">Exquisite Selection</span>
          <h2 className="section-title-editorial">Featured Curated Journeys</h2>
          <div className="section-title-separator"></div>
        </div>
      </ScrollReveal>
      
      <div className="featured-grid">
        {featured.map((pkg, idx) => (
          <ScrollReveal key={pkg.id} delay={idx * 0.15}>
            <div className="featured-card">
              <div className="featured-img-container">
                <img src={pkg.image} alt={pkg.name} className="featured-img" />
                <div className="featured-overlay"></div>
                <span className="featured-badge">Featured Signature</span>
              </div>
              <div className="featured-details">
                <span className="featured-category">{pkg.category}</span>
                <h3 className="featured-name">{pkg.name}</h3>
                <p className="featured-desc">{pkg.shortDescription}</p>
                <div className="featured-bottom">
                  <span className="featured-duration">{pkg.duration}</span>
                  <span className="featured-price">From ₹{pkg.startingPrice}</span>
                </div>
                <Link to={`/packages/${pkg.slug}`} className="featured-link">
                  <span>Explore Journey</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="link-arrow">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPackages;
