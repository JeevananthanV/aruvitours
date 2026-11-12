import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import FeaturedPackages from '../components/packages/FeaturedPackages';
import PackageFilters from '../components/packages/PackageFilters';
import PackageGrid from '../components/packages/PackageGrid';
import Gallery from '../components/home/Gallery';
import ScrollReveal from '../components/common/ScrollReveal';
import packagesData from '../data/packagesData';
import './Home.css';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');

  // Filter packages based on category
  const filteredPackages = packagesData.filter((pkg) => {
    if (activeCategory === 'ALL') return true;
    return pkg.category.toUpperCase() === activeCategory;
  });

  return (
    <Layout>
      <div className="home-page-container">
        {/* 1. Hero Area */}
        <Hero />

        {/* 2. About Section */}
        <section id="about-section" className="about-section-home light-section">
          <div className="section-container">
            <div className="about-home-grid">
              <div className="about-home-left">
                <ScrollReveal direction="left">
                  <span className="section-subtitle">Since 2012</span>
                  <h2 className="section-title-editorial">Redefining The Art of Travel</h2>
                  <div className="title-gold-line"></div>
                </ScrollReveal>
              </div>
              <div className="about-home-right">
                <ScrollReveal direction="right" delay={0.2}>
                  <p className="premium-paragraph">
                    At Aruvi Tours, we believe travel is not just about visiting new places; it is about creating unforgettable lifetime memories. Our expert guides curate every detail of your vacation with passion, commitment, and uncompromising standards.
                  </p>
                  <p className="premium-paragraph text-muted">
                    From the serene backwaters of Kerala and regal forts of Rajasthan to the stunning white sands of Maldives and historic marvels of Japan, we open doors to the world's most breathtaking sanctuaries.
                  </p>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Featured Packages Spotlight */}
        <div className="section-container">
          <FeaturedPackages packages={packagesData} />
        </div>

        {/* 4. All Destinations / Packages Directory */}
        <section id="packages-section" className="packages-directory-section light-section">
          <div className="section-container">
            <ScrollReveal>
              <div className="section-header-centered">
                <span className="section-subtitle font-gold">Select Your Sanctuary</span>
                <h2 className="section-title-editorial">Explore Destinations</h2>
                <div className="section-title-separator"></div>
              </div>
            </ScrollReveal>

            {/* Filter Tabs */}
            <PackageFilters activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

            {/* Grid of destinations */}
            <PackageGrid packages={filteredPackages} />
          </div>
        </section>

        {/* 4.5. Immersive Photo Gallery */}
        <Gallery />

        {/* 5. Contact CTA */}
        <section className="home-contact-cta">
          <div className="cta-overlay"></div>
          <div className="cta-content">
            <ScrollReveal duration={1.0}>
              <span className="cta-subtitle">Begin Your Journey</span>
              <h2 className="cta-title">Ready to Design Your Dream Vacation?</h2>
              <p className="cta-desc">
                Connect with our destination experts to craft a fully customized tour tailored to your unique preferences.
              </p>
              <a href="/contact" className="cta-button">
                Consult A Travel Expert
              </a>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
