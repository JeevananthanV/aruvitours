import React from 'react';
import Layout from '../components/layout/Layout';
import ScrollReveal from '../components/common/ScrollReveal';
import './About.css';

const About = () => {
  // Handler to scroll down from hero section
  const handleScrollDown = () => {
    const historySection = document.getElementById('history-section');
    if (historySection) {
      historySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Layout>
      <div className="about-page-wrapper">

        {/* 1. Hero Section */}
        <section
          className="about-hero-section"
          style={{ backgroundImage: `url('/home/home-hero-maldives-villas.jpg')` }}
        >
          <div className="about-hero-overlay"></div>
          <div className="about-hero-content">
            <ScrollReveal direction="up" delay={0.1}>
              <span className="about-hero-overline">aruvi Tours</span>
              <h1 className="about-hero-title">
                About <em>Us</em>
              </h1>
              <p className="about-hero-subtitle">
                Asia's Premier Luxury DMC — Discover a World of Pure Bliss
              </p>
            </ScrollReveal>
          </div>

          <div className="about-scroll-indicator" onClick={handleScrollDown}>
            <span>Scroll</span>
            <div className="scroll-line-container">
              <div className="scroll-line-fill"></div>
            </div>
          </div>
        </section>

        {/* 2. History Section (Light Section) */}
        <section id="history-section" className="about-section light-bg">
          <div className="section-container">
            <div className="about-grid-2col">
              <div>
                <ScrollReveal direction="left">
                  <span className="about-overline">History</span>
                  <h2 className="about-heading about-heading-accent-light">
                    Aaruvi Tours<br />
                    Asia's Premier Luxury DMC
                  </h2>
                  <p className="about-desc-paragraph">
                    Aaruvi Tours is a premier Destination Management Company (DMC) operating across 35 countries, specializing in curated luxury experiences, bespoke leisure travel, and customized incentives.
                  </p>
                  <p className="about-desc-paragraph">
                    We design journeys that feed the soul, executing complex global itineraries with local expertise, 24/7 on-the-ground support, and meticulous attention to detail. Every trip we plan is a bespoke masterpiece.
                  </p>

                  <div className="about-stats-container">
                    <div className="about-stat-item">
                      <span className="about-stat-number">15+</span>
                      <span className="about-stat-label">Years of Excellence</span>
                    </div>
                    <div className="about-stat-item">
                      <span className="about-stat-number">35+</span>
                      <span className="about-stat-label">Global Destinations</span>
                    </div>
                  </div>

                  <a href="/packages" className="about-gold-btn">
                    Explore Our Destinations
                  </a>
                </ScrollReveal>
              </div>

              <div>
                <ScrollReveal direction="right" delay={0.2}>
                  <div className="about-image-frame rafting-frame">
                    <img
                      src="/home/adventure1.jpg"
                      alt="Premium Rafting Adventure"
                    />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Story Section (Dark Section) */}
        <section className="about-section dark-bg">
          <div className="section-container">
            <div className="about-grid-2col reverse">
              <div>
                <ScrollReveal direction="left" delay={0.2}>
                  <div className="about-image-frame kerala-frame">
                    <div className="kerala-frame-inner">
                      <div className="badge-years">
                        <span>15+</span> Years
                      </div>
                      <img
                        src="/home/home-hero-kerala-backwaters.jpg"
                        alt="Kerala Houseboat Backwaters"
                      />
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              <div>
                <ScrollReveal direction="right">
                  <span className="about-overline">Story</span>
                  <h2 className="about-heading about-heading-accent">
                    Nearly Two Decades of<br />
                    Experiential Adventure
                  </h2>
                  <p className="about-desc-paragraph">
                    Established with a vision to redefine experiential luxury travel, Aaruvi Tours curates journeys that feed the soul. We operate premium customized itineraries across 35 grand destinations globally.
                  </p>
                  <p className="about-desc-paragraph">
                    Whether you seek private villas in the Maldives, heritage trails in the Golden Triangle, or cherry blossom cruises through Japan, our specialists organize your stays, bookings, and VIP experiences with impeccable execution.
                  </p>
                  <div className="about-quote-box">
                    "Aaruvi Tours was born out of a passion to share the world's most beautiful destinations through personalized service and attention to detail."
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Founder & Leadership Section */}
        <section className="about-section darker-bg">
          <div className="section-container">
            <div className="about-grid-2col">
              <div>
                <ScrollReveal direction="left">
                  <span className="about-overline">Owner & Key Leadership Figure</span>
                  <h2 className="about-heading about-heading-accent" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
                    Mr. Samson Sundar
                  </h2>
                  <span className="about-overline" style={{ fontSize: '0.85rem', color: '#b28d26', textTransform: 'none', letterSpacing: '0.05em', display: 'block', marginBottom: '2rem' }}>
                    Treasurer of the Salem Tour Operators Association (STOA)
                  </span>

                  <div style={{ marginTop: '2rem' }}>
                    <p className="about-desc-paragraph" style={{ marginTop: '1rem' }}>
                      Mr. Samson Sundar plays a pivotal role in shaping the regional travel sector in Salem through both his business operations and his institutional leadership. Under his management, Aruvi Tours has scaled its operations over nearly two decades since its inception in 2007, shifting from localized travel planning to managing high-value global private itineraries and international outbound group packages.
                    </p>
                    <p className="about-desc-paragraph">
                      His core philosophy centers on making global travel accessible, deeply engaging, and stress-free for families and groups. By overseeing complex logistics including flight bookings, cross-border visa procurement, tailored meals, and local transport, he ensures that ambitious holiday dreams are transformed into well-executed, cost-effective, and time-optimized realities.
                    </p>

                    <div className="founder-quote-container">
                      <p className="founder-quote-text">
                        "Travel is more than a geographic move; it is an experience that enriches the soul and creates lifelong memories. We ensure that every detail is seamlessly managed so you can travel stress-free."
                      </p>
                      <div className="founder-quote-author">— MR. SAMSON SUNDAR</div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              <div>
                <ScrollReveal direction="right" delay={0.25}>
                  <div className="founder-frame">
                    <img
                      src="/about/about-hero2.jpeg"
                      alt="Mr. Samson Sundar - Owner"
                    />
                    <div className="founder-meta-card">
                      <h4>Mr. Samson Sundar</h4>
                      <span>OWNER, ARUVI TOURS</span>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* 4b. Our Milestones / Timeline Section */}
        <section className="about-section dark-bg">
          <div className="section-container">
            <div className="about-section-header">
              <ScrollReveal>
                <span className="about-overline">Milestones</span>
                <h2 className="about-heading about-heading-accent">Our Journey</h2>
                <p className="about-section-subtitle">A timeline of excellence, growth, and unforgettable journeys.</p>
              </ScrollReveal>
            </div>

            <div className="timeline-container">
              <div className="timeline-line"></div>
              
              <div className="timeline-item">
                <div className="timeline-badge">2007</div>
                <div className="timeline-content">
                  <ScrollReveal direction="left">
                    <h3 className="timeline-title">The Inception</h3>
                    <p className="timeline-desc">
                      Founded by Mr. Samson Sundar, Aruvi Tours began its journey in Salem, focusing on personalized local and regional tour coordination with meticulous planning.
                    </p>
                  </ScrollReveal>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-badge">2015</div>
                <div className="timeline-content">
                  <ScrollReveal direction="right">
                    <h3 className="timeline-title">National Reach</h3>
                    <p className="timeline-desc">
                      Expanded operations to handle bespoke leisure travel across India, integrating flight bookings, visas, and tailored travel packages.
                    </p>
                  </ScrollReveal>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-badge">2020</div>
                <div className="timeline-content">
                  <ScrollReveal direction="left">
                    <h3 className="timeline-title">Global Outbound</h3>
                    <p className="timeline-desc">
                      Transitioned into a key regional operator for international outbound group tours, managing complex logistics for families and corporate groups.
                    </p>
                  </ScrollReveal>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-badge">2025</div>
                <div className="timeline-content">
                  <ScrollReveal direction="right">
                    <h3 className="timeline-title">Salem STOA Leadership</h3>
                    <p className="timeline-desc">
                      Under the leadership of Mr. Samson Sundar (STOA Treasurer), Aruvi Tours is recognized as a trusted premier tour agency managing high-value private itineraries globally.
                    </p>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* 5. Values Section / Core Pillars */}
        <section className="about-section dark-bg">
          <div className="section-container">
            <div className="about-section-header">
              <ScrollReveal>
                <span className="about-overline">Values</span>
                <h2 className="about-heading about-heading-accent">Our Core Pillars</h2>
                <p className="about-section-subtitle">The guiding principles behind our bespoke hospitality and experiences.</p>
              </ScrollReveal>
            </div>

            <div className="about-cards-grid">
              <div className="about-premium-card">
                <ScrollReveal delay={0.1}>
                  <div className="card-icon-container">
                    <svg className="card-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="card-title">Exclusivity</h3>
                  <p className="card-desc">Hand-picked premium hotels, private charters, and fast-track access designed exclusively for you.</p>
                </ScrollReveal>
              </div>

              <div className="about-premium-card">
                <ScrollReveal delay={0.25}>
                  <div className="card-icon-container">
                    <svg className="card-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="card-title">Personalized Service</h3>
                  <p className="card-desc">Our travel architects put endless care and local expertise into crafting every customized itinerary.</p>
                </ScrollReveal>
              </div>

              <div className="about-premium-card">
                <ScrollReveal delay={0.4}>
                  <div className="card-icon-container">
                    <svg className="card-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="card-title">Global Network</h3>
                  <p className="card-desc">With trusted representatives and deep-rooted local suppliers across dozens of global gateways.</p>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Core Offerings Section */}
        <section className="about-section darker-bg">
          <div className="section-container">
            <div className="about-section-header">
              <ScrollReveal>
                <span className="about-overline">Services</span>
                <h2 className="about-heading about-heading-accent">Our Core Offerings</h2>
                <p className="about-section-subtitle">Exquisite itineraries tailored to the dreams of the refined traveler.</p>
              </ScrollReveal>
            </div>

            <div className="about-cards-grid">
              <div className="about-premium-card">
                <ScrollReveal delay={0.1}>
                  <div className="card-icon-container">
                    <svg className="card-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.243.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.907a1 1 0 00.95-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <h3 className="card-title">Customized Tours</h3>
                  <p className="card-desc">Bespoke itineraries curated around your specific visual, culinary, and architectural preferences.</p>
                </ScrollReveal>
              </div>

              <div className="about-premium-card">
                <ScrollReveal delay={0.25}>
                  <div className="card-icon-container">
                    <svg className="card-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="card-title">Luxury Stays</h3>
                  <p className="card-desc">Exclusive partnerships with top ultra-luxury boutique brands, private island resorts, and historic villas.</p>
                </ScrollReveal>
              </div>

              <div className="about-premium-card">
                <ScrollReveal delay={0.4}>
                  <div className="card-icon-container">
                    <svg className="card-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="card-title">Corporate Incentives</h3>
                  <p className="card-desc">Impeccably managed MICE events, retreat getaways, and team alignment initiatives globally.</p>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* 7. The Aaruvi Difference Section */}
        <section className="about-section light-bg">
          <div className="section-container">
            <div className="about-section-header">
              <ScrollReveal>
                <span className="about-overline">Features</span>
                <h2 className="about-heading about-heading-accent-light">The Aaruvi Difference</h2>
                <p className="about-section-subtitle">What sets our services apart in a competitive travel landscape.</p>
              </ScrollReveal>
            </div>

            <div className="difference-grid">
              <div className="difference-card">
                <svg className="difference-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <div className="difference-content">
                  <h4>Tailor-Made Itineraries</h4>
                  <p>Every single travel blueprint is drawn from scratch to perfectly align with your aspirations.</p>
                </div>
              </div>

              <div className="difference-card">
                <svg className="difference-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <div className="difference-content">
                  <h4>24/7 On-Ground Support</h4>
                  <p>Our global concierge representatives are always available to resolve contingencies dynamically.</p>
                </div>
              </div>

              <div className="difference-card">
                <svg className="difference-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <div className="difference-content">
                  <h4>Handpicked Premium Hotels</h4>
                  <p>We personally vet and experience properties before extending recommendations to our guests.</p>
                </div>
              </div>

              <div className="difference-card">
                <svg className="difference-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div className="difference-content">
                  <h4>Exclusivity Guaranteed</h4>
                  <p>Gain access to private galleries, closed-door viewings, and VIP services unavailable online.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Mission & Vision Section */}
        <section className="about-section dark-bg">
          <div className="section-container">
            <div className="about-section-header">
              <ScrollReveal>
                <span className="about-overline">Overview</span>
                <h2 className="about-heading about-heading-accent">Our Mission & Vision</h2>
                <p className="about-section-subtitle">Pioneering standard-setting luxury travel with ethics and innovation.</p>
              </ScrollReveal>
            </div>

            <div className="mission-vision-grid">
              <div className="mv-card">
                <ScrollReveal direction="left" delay={0.1}>
                  <div className="mv-header">
                    <div className="mv-icon-box">
                      <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="mv-title">Our Mission</h3>
                  </div>

                  <ul className="mv-list">
                    <li className="mv-list-item">
                      <strong>Deliver Unrivaled Quality</strong>
                      Ensuring every booking meets our strict quality checks and safety guidelines.
                    </li>
                    <li className="mv-list-item">
                      <strong>Cultivate Connections</strong>
                      Connecting travelers deeply with local traditions, architecture, and environments.
                    </li>
                    <li className="mv-list-item">
                      <strong>Foster Trust & Safety</strong>
                      Providing reliable assistance, verified suppliers, and transparent communication.
                    </li>
                  </ul>
                </ScrollReveal>
              </div>

              <div className="mv-card">
                <ScrollReveal direction="right" delay={0.25}>
                  <div className="mv-header">
                    <div className="mv-icon-box">
                      <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <h3 className="mv-title">Our Vision</h3>
                  </div>

                  <ul className="mv-list">
                    <li className="mv-list-item">
                      <strong>The Benchmark of Luxury</strong>
                      To be globally recognized as the gold standard of customized travel and tour execution.
                    </li>
                    <li className="mv-list-item">
                      <strong>Global Expansion</strong>
                      Broadening our horizons to cover hidden, offbeat luxury trails in all seven continents.
                    </li>
                    <li className="mv-list-item">
                      <strong>Sustainable Travel</strong>
                      Promoting carbon-offsetting stays and supporting local communities directly.
                    </li>
                  </ul>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Trust & Confidence Section */}
        <section className="about-section darker-bg">
          <div className="section-container">
            <div className="trust-grid">
              <div>
                <ScrollReveal direction="left">
                  <span className="about-overline">Security</span>
                  <h2 className="about-heading about-heading-accent">
                    Travel With<br />
                    Confidence & Trust
                  </h2>
                  <p className="about-desc-paragraph">
                    Your safety and peace of mind are non-negotiable. We build comprehensive protection protocols into every booking, from partner selection to financial transaction security.
                  </p>
                  <p className="about-desc-paragraph">
                    With experienced destination managers monitoring weather conditions, local events, and travel advisory updates daily, your journey is always in safe hands.
                  </p>
                </ScrollReveal>
              </div>

              <div>
                <ScrollReveal direction="right" delay={0.25}>
                  <div className="trust-badges-grid">
                    <div className="trust-badge-card">
                      <svg className="trust-badge-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <h4 className="trust-badge-title">Secure Payments</h4>
                    </div>

                    <div className="trust-badge-card">
                      <svg className="trust-badge-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <h4 className="trust-badge-title">Verified Hotels</h4>
                    </div>

                    <div className="trust-badge-card">
                      <svg className="trust-badge-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <h4 className="trust-badge-title">Expert Guides</h4>
                    </div>

                    <div className="trust-badge-card">
                      <svg className="trust-badge-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <h4 className="trust-badge-title">24/7 Assistance</h4>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Call To Action Section */}
        <section
          className="about-cta-section"
          style={{ backgroundImage: `url('/home/home-hero-dubai-skyline.jpg')` }}
        >
          <div className="about-cta-overlay"></div>
          <div className="about-cta-content">
            <ScrollReveal direction="up">
              <span className="about-overline" style={{ color: '#b28d26' }}>Start Your Journey</span>
              <h2 className="about-heading about-heading-accent">
                Let's Plan Your<br />
                Next Journey
              </h2>
              <p className="about-desc-paragraph" style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '2rem' }}>
                Speak to our custom travel architects today to outline your upcoming luxury retreat or corporate incentive package.
              </p>
              <a href="/contact" className="about-gold-btn">
                Get in Touch
              </a>
            </ScrollReveal>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default About;
