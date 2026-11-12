import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ScrollReveal from '../components/common/ScrollReveal';
import './HniLuxuryTours.css';

const BESPOKE_PILLARS = [
  {
    icon: (
      <svg className="pillar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
    ),
    title: "Private Jet Charters",
    desc: "Seamless, skip-the-terminal travel coordinated worldwide. Fly on your schedule in executive cabins."
  },
  {
    icon: (
      <svg className="pillar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    ),
    title: "Sanctuary Retreats",
    desc: "Exclusivity guaranteed. Stay at private islands, presidential estates, and ultra-luxury boutique villas."
  },
  {
    icon: (
      <svg className="pillar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    ),
    title: "Personal Concierge",
    desc: "A dedicated 24/7 travel specialist manages your adjustments, reservations, and security detail on-site."
  },
  {
    icon: (
      <svg className="pillar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
      </svg>
    ),
    title: "Elite Fleet Access",
    desc: "Private superyachts, customized bulletproof SUVs, and vintage sports car charters at your disposal."
  }
];

const LUXURY_EXPERIENCES = [
  {
    id: "maldives-island",
    tag: "Ocean Sanctuary",
    title: "Maldives Private Island Escape",
    desc: "An entire overwater residence cluster configured with personal butler service, deep-sea exploration vessels, and customized culinary arrangements by Michelin chefs.",
    image: "/maldives/maldives-luxury-resort-view.jpg",
    perk: "Private Seaplane Transfers"
  },
  {
    id: "rajasthan-palace",
    tag: "Royal Heritage",
    title: "The Royal Rajasthan Experience",
    desc: "Reside in majestic heritage palace suites in Jaipur and Udaipur. Includes private helicopter transfers, custom durbar banquets, and exclusive polo club access.",
    image: "/rajasthan/rajasthan-udaipur-lake-palace.jpg",
    perk: "Personalized Security Detail"
  },
  {
    id: "kenya-safari",
    tag: "Wilderness Reserve",
    title: "Ultra-Luxury Kenya Safari",
    desc: "Exclusive booking of high-end savannah lodges in Maasai Mara. Private conservationist guides, personal helicopter fly-overs, and romantic bush-camp candlelit banquets.",
    image: "/kenya/kenya-luxury-safari-lodge.jpg",
    perk: "Exclusive Game Drive Vehicles"
  }
];

const HniLuxuryTours = () => {
  return (
    <Layout>
      <div className="luxury-tours-wrapper light-section" style={{ padding: '6rem 0 4rem 0' }}>
        <div className="luxury-container">
          
          {/* Header */}
          <ScrollReveal>
            <div className="luxury-hero-section">
              <span className="luxury-subtitle section-subtitle">HNI Bespoke Services</span>
              <h1 className="luxury-title">Unrivaled Luxury Travel</h1>
              <p className="luxury-intro-desc">
                Aruvi Tours designs customized ultra-premium journeys for High Net Worth Individuals. Every route, flight, charter, and accommodation is tailored precisely to assure complete privacy, safety, and uncompromising luxury.
              </p>
              <div className="luxury-gold-divider"></div>
            </div>
          </ScrollReveal>
          
          {/* Pillars */}
          <div className="luxury-pillars-grid">
            {BESPOKE_PILLARS.map((pillar, i) => (
              <ScrollReveal key={i} delay={(i % 4) * 0.12}>
                <div className="luxury-pillar-card">
                  <div className="pillar-icon-wrapper">
                    {pillar.icon}
                  </div>
                  <h3 className="pillar-title">{pillar.title}</h3>
                  <p className="pillar-desc">{pillar.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          
          {/* Experiences */}
          <ScrollReveal>
            <h2 className="showcase-heading">Curated Bespoke Showcases</h2>
          </ScrollReveal>
          
          <div className="showcase-grid">
            {LUXURY_EXPERIENCES.map((exp, idx) => (
              <ScrollReveal key={exp.id} delay={(idx % 3) * 0.15}>
                <div className="showcase-card">
                  <div className="showcase-img-wrapper">
                    <img src={exp.image} alt={exp.title} />
                    <div className="showcase-overlay"></div>
                    <span className="showcase-tag">{exp.tag}</span>
                  </div>
                  
                  <div className="showcase-info">
                    <h3 className="showcase-title">{exp.title}</h3>
                    <p className="showcase-desc">{exp.desc}</p>
                    <span className="showcase-perk-badge">{exp.perk}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          
          {/* Inquiry Section */}
          <ScrollReveal duration={1.0}>
            <div className="luxury-inquiry-box">
              <h3 className="inquiry-box-title">Initiate Your Journey Planning</h3>
              <p className="inquiry-box-desc">
                Ready to choreograph your next grand itinerary? Speak directly with our dedicated HNI Travel Architect. Complete confidentiality is maintained at all times.
              </p>
              <Link to="/contact?subject=HNI Luxury Bespoke Inquiry" className="luxury-connect-btn">
                Connect with Private Concierge
              </Link>
            </div>
          </ScrollReveal>
          
        </div>
      </div>
    </Layout>
  );
};

export default HniLuxuryTours;
