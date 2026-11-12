import React from 'react';
import './PackageFilters.css';

const PackageFilters = ({ activeCategory, setActiveCategory }) => {
  const categories = ['ALL', 'DOMESTIC', 'INTERNATIONAL'];

  return (
    <div className="package-filters-container">
      <div className="filter-tabs">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-tab-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PackageFilters;
