import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useAnimation } from "motion/react";

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  return (
    <footer className="footer" itemScope itemType="https://schema.org/TravelAgency">
      <meta itemProp="name" content="Aruvi Tours" />
      <div className="footer-top">
        <motion.div
          className="footer-brand"
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.div
            className="footer-logo-wrap"
            variants={itemVariants}
          >
            <div className="footer-logo-mark" aria-hidden="true">
              A
            </div>
            <div>
              <div className="footer-logo-text">ARUVI TOURS</div>
              <span className="footer-logo-tag">Handcrafted Journeys Since 2012</span>
            </div>
          </motion.div>
          <motion.p
            className="footer-desc"
            variants={itemVariants}
          >
            For over 12 years, Aruvi Tours has been planning personal travel across India and the
            world - handled by a small team who actually answer the phone.
          </motion.p>
          <motion.address
            className="footer-contact"
            style={{ fontStyle: "normal" }}
            variants={itemVariants}
          >
            <motion.a
              className="footer-contact-item"
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 5 }}
            >
              <svg className="footer-contact-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 1.5C5.51 1.5 3.5 3.51 3.5 6c0 3.75 4.5 8.5 4.5 8.5s4.5-4.75 4.5-8.5c0-2.49-2.01-4.5-4.5-4.5zm0 6a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
              </svg>
              1/272/4, Krishnammal Nagar, Fairlands, Salem, Tamilnadu, India - 636016
            </motion.a>
            <motion.a
              className="footer-contact-item"
              href="tel:+919494141475"
              whileHover={{ x: 5 }}
            >
              <svg className="footer-contact-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M13.3 10.7c-.24-.24-2.36-1.2-2.72-1.08-.36.12-.6.48-.84.72-.12.12-.36.24-.6.12-.84-.36-2.4-1.44-3.36-2.4-1.08-1.08-1.92-2.52-1.08-2.88.24-.12.6-.36.72-.72.12-.36-.72-2.52-1.08-2.76C3.96 1.2 3.72 1.2 3.36 1.44 2.4 2.52 1.56 4.08 1.92 5.52c.48 2.04 1.92 3.96 3.6 5.64 1.68 1.68 3.6 3.12 5.64 3.6 1.44.36 2.88-.48 3.6-1.44.24-.36.24-.6-.96-1.92-.48-.6-.36-.48-.5-.7z" />
              </svg>
              +91-9494141475
            </motion.a>
            <motion.a
              className="footer-contact-item"
              href="mailto:aruvitours@gmail.com"
              whileHover={{ x: 5 }}
            >
              <svg className="footer-contact-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" />
                <path d="M1.5 5l6.5 4 6.5-4" />
              </svg>
              aruvitours@gmail.com
            </motion.a>
          </motion.address>
          <motion.div
            className="footer-social"
            role="list"
            aria-label="Social media"
            variants={containerVariants}
          >
            <motion.a
              className="footer-social-link"
              href="https://www.instagram.com/aruvitours/"
              role="listitem"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.2 4.358 2.618 6.78 6.98 6.98 1.281.057 1.645.069 4.849.069 3.259 0 3.667-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
              </svg>
            </motion.a>
            <motion.a
              className="footer-social-link"
              href="https://www.facebook.com/aruvitours/"
              role="listitem"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </motion.a>
            <motion.a
              className="footer-social-link"
              href="https://www.youtube.com/@aruvitours"
              role="listitem"
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.75 15.02V8.408l6.264 3.602z" />
              </svg>
            </motion.a>
            <motion.a
              className="footer-social-link"
              href="https://x.com/aruvitours"
              role="listitem"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>

        <nav className="footer-nav-col" aria-label="Quick links">
          <h3 className="footer-nav-heading">Quick Links</h3>
          <ul className="footer-nav-list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/#packages">Packages</Link>
            </li>
            <li>
              <Link to="/#testimonials">Testimonials</Link>
            </li>
            <li>
              <Link to="/#faq">FAQ</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/fixed-departures">Fixed Departures</Link>
            </li>
          </ul>
        </nav>

        <nav className="footer-nav-col" aria-label="Popular destinations">
          <h3 className="footer-nav-heading">Popular Destinations</h3>
          <ul className="footer-nav-list">
            <li>
              <Link to="/domestic/kerala">Kerala</Link>
            </li>
            <li>
              <Link to="/domestic/kashmir">Kashmir</Link>
            </li>
            <li>
              <Link to="/domestic/ladakh">Ladakh</Link>
            </li>
            <li>
              <Link to="/international/dubai">Dubai</Link>
            </li>
            <li>
              <Link to="/international/maldives">Maldives</Link>
            </li>
            <li>
              <Link to="/international/japan">Japan</Link>
            </li>
            <li>
              <Link to="/international/bali">Bali</Link>
            </li>
            <li>
              <Link to="/international/turkey">Turkey</Link>
            </li>
          </ul>
        </nav>

        <div>
          <h3 className="footer-nav-heading">Recognition</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="proof-strip-item">
              <div className="proof-strip-icon" aria-hidden="true">
                🏆
              </div>
              <div className="proof-strip-text">
                <h5>Best Boutique Agency</h5>
                <p>T+L India, 2024</p>
              </div>
            </div>
            <div className="proof-strip-item">
              <div className="proof-strip-icon" aria-hidden="true">
                ✦
              </div>
              <div className="proof-strip-text">
                <h5>Travellers' Choice</h5>
                <p>TripAdvisor 2024</p>
              </div>
            </div>
            <div className="proof-strip-item">
              <div className="proof-strip-icon" aria-hidden="true">
                ✈
              </div>
              <div className="proof-strip-text">
                <h5>IATA Certified</h5>
                <p>Ministry of Tourism</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-divider" aria-hidden="true"></div>
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p className="footer-copy">
            © 2025 <Link to="/">Aruvi Tours</Link>. All rights reserved. Based in Salem, Tamilnadu, India.
          </p>
          <nav className="footer-legal" aria-label="Legal links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cancellation">Cancellation Policy</Link>
            <Link to="/sitemap">Sitemap</Link>
          </nav>
          <div className="footer-certs" aria-label="Certifications">
            <span className="cert-badge">SSL</span>
            <span className="cert-badge">PCI DSS</span>
            <span className="cert-badge">IATA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}