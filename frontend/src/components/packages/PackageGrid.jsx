import React, { useState } from 'react';
import PackageCard from './PackageCard';
import ScrollReveal from '../common/ScrollReveal';
import './PackageGrid.css';

const PackageGrid = ({ packages }) => {
  const [visibleCount, setVisibleCount] = useState(6);

  const showMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  const hasMore = packages.length > visibleCount;

  return (
    <div className="package-grid-wrapper">
      <div className="package-grid">
        {packages.slice(0, visibleCount).map((pkg, idx) => (
          <div key={pkg.id} className="grid-item">
            <ScrollReveal delay={(idx % 3) * 0.15}>
              <PackageCard packageItem={pkg} />
            </ScrollReveal>
          </div>
        ))}
      </div>
      
      {hasMore && (
        <div className="show-more-container">
          <button onClick={showMore} className="show-more-btn">
            <span>Explore More Destinations</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="down-arrow">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default PackageGrid;
