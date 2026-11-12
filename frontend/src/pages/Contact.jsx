import React from 'react';
import Layout from '../components/layout/Layout';
import ScrollReveal from '../components/common/ScrollReveal';
import './Contact.css';

const Contact = () => {
  return (
    <Layout>
      <div className="contact-page-wrapper">
        <div className="section-container">
          <ScrollReveal>
            <span className="section-subtitle font-gold" style={{ display: 'block', textAlign: 'center' }}>Get In Touch</span>
            <h1 className="section-title-editorial" style={{ margin: '0.5rem 0 1.5rem 0', textAlign: 'center' }}>Contact Our Specialists</h1>
          </ScrollReveal>
          
          <div className="contact-split-grid">
            
            {/* Form Column */}
            <div className="contact-form-column">
              <ScrollReveal direction="left" delay={0.2}>
                <form className="contact-form-card">
                  <div className="form-group">
                    <label className="contact-label">Full Name</label>
                    <input type="text" placeholder="John Doe" className="contact-input" required />
                  </div>
                  
                  <div className="form-group">
                    <label className="contact-label">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="contact-input" required />
                  </div>

                  <div className="form-group">
                    <label className="contact-label">Phone Number</label>
                    <input type="tel" placeholder="+91 98765 43210" className="contact-input" />
                  </div>
                  
                  <div className="form-group">
                    <label className="contact-label">Your Sanctuary Request</label>
                    <textarea placeholder="Tell us about your dream destination, dates, and package preferences..." rows="5" className="contact-textarea" required></textarea>
                  </div>
                  
                  <button type="submit" className="submit-btn-premium">
                    Send Inquiry
                  </button>
                </form>
              </ScrollReveal>
            </div>

            {/* Info Column */}
            <div className="contact-info-column">
              <ScrollReveal direction="right" delay={0.35}>
                <div className="contact-visual-card">
                  <img 
                    src="/contact/contact-hero1.jpg" 
                    alt="Aruvi Tours Contact Visual" 
                    className="contact-img" 
                  />
                </div>

                <div className="contact-details-list">
                  <div className="detail-item">
                    <div className="detail-icon-wrapper">
                      <svg className="detail-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="detail-content">
                      <span className="detail-title">Address</span>
                      <span className="detail-value">Aruvi Tours HQ, Luxury Suites, Suite 402, Bangalore, India</span>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-icon-wrapper">
                      <svg className="detail-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="detail-content">
                      <span className="detail-title">Contact Line</span>
                      <span className="detail-value">+91 80 4321 8765</span>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-icon-wrapper">
                      <svg className="detail-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="detail-content">
                      <span className="detail-title">Email Enquiries</span>
                      <span className="detail-value">concierge@aruvitours.com</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
