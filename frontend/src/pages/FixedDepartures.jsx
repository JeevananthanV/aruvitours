import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ScrollReveal from '../components/common/ScrollReveal';
import './FixedDepartures.css';

const MOCK_DEPARTURES = [
  {
    id: "kashmir-winter",
    title: "Kashmir Winter Wonderland Group Tour",
    image: "/kashmir/kashmir-dal-lake-srinagar.jpg",
    dates: "Dec 15 - Dec 21, 2026",
    duration: "6 Days / 5 Nights",
    startingPrice: "24,500",
    slotsBadge: "Only 4 Seats Left!",
    isLimited: false,
    highlights: [
      "Classic Dal Lake Houseboat stay",
      "Gulmarg Gondola Ride (Phase 1 & 2)",
      "Pahalgam scenic valley horse rides",
      "Traditional Kashmiri Wazwan Feast"
    ]
  },
  {
    id: "ladakh-expedition",
    title: "Ladakh Road Expedition Group Tour",
    image: "/ladakh/ladakh-pangong-lake.jpg",
    dates: "Sep 12 - Sep 20, 2026",
    duration: "9 Days / 8 Nights",
    startingPrice: "38,000",
    slotsBadge: "Fast Filling",
    isLimited: true,
    highlights: [
      "Drive through Khardung La (Highest motorable road)",
      "Lakeside luxury camp stay at Pangong Tso",
      "Nubra Valley sand dunes & camel safari",
      "Professional backup vehicle & mechanic team support"
    ]
  },
  {
    id: "singapore-malaysia",
    title: "Singapore & Malaysia Mega Group Tour",
    image: "/singapore/singapore-marina-bay-sands.jpg",
    dates: "Oct 10 - Oct 16, 2026",
    duration: "7 Days / 6 Nights",
    startingPrice: "74,999",
    slotsBadge: "Only 2 Slots Left!",
    isLimited: false,
    highlights: [
      "Gardens by the Bay Light Show & Cloud Dome",
      "Petronas Twin Towers observation deck entrance",
      "Universal Studios Singapore full day pass",
      "Genting Highlands cable car and theme parks"
    ]
  },
  {
    id: "bali-serene",
    title: "Bali Serene Escape Group Tour",
    image: "/home/home-hero-travel-adventure.jpg",
    dates: "Nov 05 - Nov 11, 2026",
    duration: "6 Days / 5 Nights",
    startingPrice: "45,999",
    slotsBadge: "Selling Out",
    isLimited: true,
    highlights: [
      "Sacred Ubud Monkey Forest exploration",
      "Uluwatu Sunset Kecak fire dance showcase",
      "Day tour to Nusa Penida (Kelingking beach)",
      "Balinese spa treatment & luxury dinners"
    ]
  }
];

const FixedDepartures = () => {
  return (
    <Layout>
      <div className="fixed-departures-wrapper light-section" style={{ padding: '6rem 0 4rem 0' }}>
        <div className="departures-container">
          <ScrollReveal>
            <div className="departures-intro">
              <span className="section-subtitle" style={{ letterSpacing: '0.25em', textTransform: 'uppercase', fontSize: '0.85rem' }}>Fixed Departures</span>
              <h1 className="section-title-editorial" style={{ fontFamily: 'Cinzel', fontSize: '2.5rem', fontWeight: '400', margin: '0.5rem 0 1.5rem 0' }}>Scheduled Group Departures</h1>
              <p className="departures-desc">
                Join our curated, premium group departures to elite domestic and international holiday hubs. Benefit from group pricing, fully managed premium itineraries, shared experiences, and dedicated tour captains.
              </p>
              <div className="section-title-separator" style={{ width: '60px', height: '2px', margin: '1.5rem auto 0 auto' }}></div>
            </div>
          </ScrollReveal>
          
          <div className="departures-grid">
            {MOCK_DEPARTURES.map((dep, idx) => (
              <ScrollReveal key={dep.id} delay={(idx % 2) * 0.15}>
                <div className="departure-card">
                  <div className="departure-img-wrapper">
                    <img src={dep.image} alt={dep.title} />
                    <div className="departure-img-overlay"></div>
                    <span className={`slots-badge ${dep.isLimited ? 'limited' : ''}`}>{dep.slotsBadge}</span>
                  </div>
                  
                  <div className="departure-info">
                    <div className="departure-date-row">
                      <svg className="departure-date-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span>{dep.dates}</span>
                    </div>
                    
                    <h3 className="departure-title">{dep.title}</h3>
                    
                    <div className="departure-meta">
                      <div className="departure-meta-item">
                        <span className="dep-meta-label">Duration</span>
                        <span className="dep-meta-val">{dep.duration}</span>
                      </div>
                      <div className="departure-meta-item">
                        <span className="dep-meta-label">Type</span>
                        <span className="dep-meta-val">Premium Group</span>
                      </div>
                    </div>
                    
                    <ul className="departure-highlights-list">
                      {dep.highlights.map((h, i) => (
                        <li key={i} className="dep-highlight-item">
                          <span className="dep-highlight-dot"></span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="departure-footer">
                      <div className="departure-price">
                        <span className="dep-meta-label">All Inclusive Price</span>
                        <span className="dep-price-val">₹{dep.startingPrice}</span>
                      </div>
                      <Link to={`/contact?subject=Inquiry for ${encodeURIComponent(dep.title)}`} className="join-btn">
                        Join Group
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FixedDepartures;
