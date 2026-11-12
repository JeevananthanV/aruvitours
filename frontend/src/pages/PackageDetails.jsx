import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import packagesData from '../data/packagesData';
import './PackageDetails.css';

const PackageDetails = () => {
  const { slug } = useParams(); // URL parameter mapped from /packages/:slug
  
  // Find package by slug
  const pkg = packagesData.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase()
  );

  const [lightbox, setLightbox] = useState({
    isOpen: false,
    currentIndex: 0
  });

  if (!pkg) {
    return (
      <Layout>
        <div className="package-not-found">
          <div className="container-small text-center">
            <h2 className="error-title">Destination Sanctuary Not Found</h2>
            <p className="error-desc">
              We couldn't find the travel package you are looking for. It may have been relocated or updated.
            </p>
            <Link to="/" className="back-home-btn">
              Return to Catalog
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const { name, category, image, shortDescription, duration, startingPrice, highlights, images } = pkg;

  // Filter out the main opening image and unwanted system files (e.g. ji.png) from the secondary gallery
  const galleryImages = (images || []).filter(
    (img) => img !== image && !img.toLowerCase().endsWith('ji.png')
  );

  const openLightbox = (index) => {
    setLightbox({
      isOpen: true,
      currentIndex: index
    });
  };

  const closeLightbox = () => {
    setLightbox({
      ...lightbox,
      isOpen: false
    });
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setLightbox((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % galleryImages.length
    }));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setLightbox((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + galleryImages.length) % galleryImages.length
    }));
  };

  return (
    <Layout>
      <div className="details-page-wrapper light-section">
        {/* 1. Destination Header Hero */}
        <div className="details-hero" style={{ backgroundImage: `url(${image})` }}>
          <div className="details-hero-overlay"></div>
          <div className="details-hero-content">
            <span className="details-category-tag">{category} Tour</span>
            <h1 className="details-title">{name}</h1>
            <div className="details-hero-divider"></div>
          </div>
        </div>

        {/* 2. Main Details Content */}
        <div className="details-container">
          <div className="details-grid">
            <div className="details-info-column">
              <section className="details-section">
                <h3 className="section-title-premium">About the Sanctuary</h3>
                <p className="details-long-desc">{shortDescription}</p>
                <p className="details-extra-text">
                  Indulge in a premium travel experience carefully crafted by Aruvi Tours. From luxury accommodations and gourmet dining options to private transfers and priority entry sightseeing, we ensure every detail aligns with perfection.
                </p>
              </section>

              {highlights && highlights.length > 0 && (
                <section className="details-section">
                  <h3 className="section-title-premium">Journey Highlights</h3>
                  <ul className="highlights-list">
                    {highlights.map((highlight, index) => (
                      <li key={index} className="highlight-item">
                        <svg className="highlight-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* 3. Photo Gallery Section */}
              {galleryImages.length > 0 && (
                <section className="details-section gallery-section">
                  <h3 className="section-title-premium">Explore the Sanctuary</h3>
                  <p className="gallery-subtitle">Take a visual tour through some of the breathtaking views awaiting you.</p>
                  <div className="gallery-grid-layout">
                    {galleryImages.map((imgUrl, idx) => {
                      // Extract a readable spot title from image filename
                      const filename = imgUrl.split('/').pop().split('.')[0];
                      const spotTitle = filename
                        .replace(/[-_]/g, ' ')
                        .replace(/^(kerala|goa|andaman|sri lanka|singapore|malaysia|nepal|vietnam|thailand|dubai|egypt|japan|china|russia|turkey|kenya|gujarat|ladakh|lakshadweep|meghalaya|sikkim|assam|himachal)\s*/i, '')
                        .trim();
                      const displayTitle = spotTitle 
                        ? spotTitle.charAt(0).toUpperCase() + spotTitle.slice(1) 
                        : 'Scenic Spot';

                      return (
                        <div key={idx} className="gallery-card" onClick={() => openLightbox(idx)}>
                          <div className="gallery-card-img-wrapper">
                            <img src={imgUrl} alt={displayTitle} loading="lazy" />
                            <div className="gallery-card-overlay">
                              <span className="gallery-zoom-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <circle cx="11" cy="11" r="8"></circle>
                                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                  <line x1="11" y1="8" x2="11" y2="14"></line>
                                  <line x1="8" y1="11" x2="14" y2="11"></line>
                                </svg>
                              </span>
                              <span className="gallery-card-title">{displayTitle}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>

            {/* 4. Booking / Inquiry Sidebar */}
            <div className="details-sidebar-column">
              <div className="inquiry-card">
                <div className="inquiry-card-header">
                  <span className="inquiry-price-label">Starting Price</span>
                  <span className="inquiry-price-value">₹{startingPrice}</span>
                  <span className="inquiry-tax-info">per person, all inclusive</span>
                </div>
                
                <div className="inquiry-meta-row">
                  <div className="inquiry-meta-item">
                    <span className="meta-label">Duration</span>
                    <span className="meta-value">{duration}</span>
                  </div>
                  <div className="inquiry-meta-item">
                    <span className="meta-label">Category</span>
                    <span className="meta-value">{category}</span>
                  </div>
                </div>

                <div className="inquiry-actions">
                  <Link to="/booking" className="book-btn-primary">
                    Book This Journey
                  </Link>
                  <Link to="/contact" className="inquire-btn-secondary">
                    Talk to a Specialist
                  </Link>
                </div>

                <div className="inquiry-trust-banner">
                  <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  <span>100% Tailor-made & Safe travel booking guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lightbox Modal */}
        {lightbox.isOpen && galleryImages.length > 0 && (
          <div className="lightbox-overlay" onClick={closeLightbox}>
            <button className="lightbox-close-btn" onClick={closeLightbox}>&times;</button>
            
            {galleryImages.length > 1 && (
              <button className="lightbox-nav-btn prev" onClick={prevImage}>
                &#10094;
              </button>
            )}

            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <img 
                src={galleryImages[lightbox.currentIndex]} 
                alt="Selected Sanctuary View" 
                className="lightbox-main-img" 
              />
              <div className="lightbox-caption">
                {lightbox.currentIndex + 1} / {galleryImages.length}
              </div>
            </div>

            {galleryImages.length > 1 && (
              <button className="lightbox-nav-btn next" onClick={nextImage}>
                &#10095;
              </button>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PackageDetails;
