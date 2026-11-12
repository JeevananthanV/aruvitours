import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import PackageFilters from '../components/packages/PackageFilters';
import PackageGrid from '../components/packages/PackageGrid';
import ScrollReveal from '../components/common/ScrollReveal';
import packagesData from '../data/packagesData';

const Packages = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const filteredPackages = packagesData.filter((pkg) => {
    if (activeCategory === 'ALL') return true;
    return pkg.category.toUpperCase() === activeCategory;
  });

  return (
    <Layout>
      <div className="packages-page-wrapper light-section" style={{ minHeight: '100vh', padding: '6rem 0 4rem 0' }}>
        <div className="section-container">
          <ScrollReveal>
            <div className="section-header-centered" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="section-subtitle" style={{ letterSpacing: '0.25em', textTransform: 'uppercase', fontSize: '0.85rem' }}>Sanctuaries Portfolio</span>
              <h1 className="section-title-editorial" style={{ fontFamily: 'Cinzel, serif', fontSize: '2.5rem', fontWeight: '400', margin: '0.5rem 0 0 0' }}>Our Tour Packages</h1>
              <div className="section-title-separator" style={{ width: '60px', height: '2px', margin: '1rem auto' }}></div>
            </div>
          </ScrollReveal>
          
          <PackageFilters activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
          <PackageGrid packages={filteredPackages} />
        </div>
      </div>
    </Layout>
  );
};

export default Packages;
