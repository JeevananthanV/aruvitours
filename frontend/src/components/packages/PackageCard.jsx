import React from 'react';
import { Link } from 'react-router-dom';
import './PackageCard.css';

const PackageCard = ({ packageItem }) => {
  const { name, slug, category, image, shortDescription, duration, startingPrice } = packageItem;

  return (
    <div className="package-card">
      <div className="package-card-image-wrapper">
        <img src={image} alt={name} className="package-card-image" loading="lazy" />
        <span className="package-card-category-badge">{category}</span>
      </div>
      <div className="package-card-content">
        <h3 className="package-card-title">{name}</h3>
        <p className="package-card-description">{shortDescription}</p>
        
        <div className="package-card-meta">
          <div className="package-card-duration">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="meta-icon">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>{duration}</span>
          </div>
          <div className="package-card-price">
            <span className="price-label">Starting from</span>
            <span className="price-value">₹{startingPrice}</span>
          </div>
        </div>
        
        <Link to={`/packages/${slug}`} className="package-card-button">
          <span>View Package</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="btn-arrow">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default PackageCard;
