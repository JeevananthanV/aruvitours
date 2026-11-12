import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo">
              ARUVI<span>TOURS</span>
            </Link>
            <p className="footer-about-text">
              Aruvi Tours is a premier luxury travel agency dedicating its expertise to orchestrating bespoke domestic and international journeys. Experience unmatched personalized luxury travel.
            </p>
            <div className="footer-socials">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Facebook">
                <svg viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Instagram">
                <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.636-1.023-5.115-2.884-6.978C16.59 1.9 14.113.876 11.479.876c-5.442 0-9.87 4.429-9.874 9.875-.001 1.902.5 3.754 1.453 5.385L1.936 21.05l5.056-1.326c.319.122.639.243.987.354-.002.003-.002.005.002-.279z"/></svg>
              </a>
            </div>
          </div>
          
          <div className="footer-links-col">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/packages">Our Packages</Link></li>
              <li><Link to="/fixed-departures">Fixed Departures</Link></li>
              <li><Link to="/luxury-tours">HNI Luxury Tours</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-contact-col">
            <h4 className="footer-title">Contact Us</h4>
            <p className="footer-contact-info">
              <strong>Address:</strong> <a href="https://www.google.com/maps/search/?api=1&query=124,+Luxury+Plaza,+Salem,+Tamil+Nadu,+India" target="_blank" rel="noopener noreferrer" className="footer-contact-link">124, Luxury Plaza, Salem, Tamil Nadu, India</a>
            </p>
            <p className="footer-contact-info">
              <strong>Email:</strong> <a href="mailto:info@aruvitours.com" className="footer-contact-link">info@aruvitours.com</a>
            </p>
            <p className="footer-contact-info">
              <strong>Phone:</strong> <a href="tel:+919876543210" className="footer-contact-link">+91 98765 43210</a>
            </p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Aruvi Tours. All rights reserved. Handcrafted for premium travel enthusiasts.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
