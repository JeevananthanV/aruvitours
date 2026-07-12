import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logos/aruvi_logo.avif";

export default function Navbar({ onBookNow }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [packagesOpen, setPackagesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMobileNav = () => setMobileOpen(false);
  const toggleMobileNav = () => setMobileOpen((v) => !v);
  const togglePackages = () => setPackagesOpen((v) => !v);
  const closeAllMenus = () => {
    setMobileOpen(false);
    setPackagesOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ============================================
         NAVBAR
      ============================================ */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`} id="nav" role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          <Link className="nav-logo" to="/" aria-label="Aruvi Tours Home">
            <div className="nav-logo-mark">
              <img
                src={logo}
                alt="Aruvi Tours Logo"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            {/* <div>
              <div className="nav-logo-text">ARUVI TOURS</div>
              <span className="nav-logo-tagline">Handcrafted Journeys Since 2012</span>
            </div> */}
          </Link>

          <ul className="nav-links" role="list">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className={`nav-item${packagesOpen ? " open" : ""}`} style={{ position: "relative" }}>
              <button
                type="button"
                className="nav-link nav-link--toggle"
                onClick={togglePackages}
                aria-expanded={packagesOpen}
                aria-haspopup="true"
              >
                Packages
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 3.5l3.5 4 3.5-4"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="nav-dropdown">
                <div className="dd-col">
                  <h4>Domestic I</h4>
                  <Link to="/domestic/kerala" onClick={closeAllMenus}>Kerala</Link>
                  <Link to="/domestic/goa" onClick={closeAllMenus}>Goa</Link>
                  <Link to="/domestic/andaman" onClick={closeAllMenus}>Andaman</Link>
                  <Link to="/domestic/golden-triangle" onClick={closeAllMenus}>Golden Triangle</Link>
                  <Link to="/domestic/himachal" onClick={closeAllMenus}>Himachal</Link>
                  <Link to="/domestic/kashmir" onClick={closeAllMenus}>Kashmir</Link>
                  <Link to="/domestic/rajasthan" onClick={closeAllMenus}>Rajasthan</Link>
                  <Link to="/domestic/sikkim" onClick={closeAllMenus}>Sikkim</Link>
                </div>
                <div className="dd-col">
                  <h4>Domestic II</h4>
                  <Link to="/domestic/assam" onClick={closeAllMenus}>Assam</Link>
                  <Link to="/domestic/gujarat" onClick={closeAllMenus}>Gujarat</Link>
                  <Link to="/domestic/ladakh" onClick={closeAllMenus}>Ladakh</Link>
                  <Link to="/domestic/lakshadweep" onClick={closeAllMenus}>Lakshadweep</Link>
                  <Link to="/domestic/odisha" onClick={closeAllMenus}>Odisha</Link>
                  <Link to="/domestic/meghalaya" onClick={closeAllMenus}>Meghalaya</Link>
                  <Link to="/domestic/arunachal-pradesh" onClick={closeAllMenus}>Arunachal Pradesh</Link>
                </div>
                <div className="dd-col">
                  <h4>International I</h4>
                  <Link to="/international/malaysia" onClick={closeAllMenus}>Malaysia</Link>
                  <Link to="/international/singapore" onClick={closeAllMenus}>Singapore</Link>
                  <Link to="/international/thailand" onClick={closeAllMenus}>Thailand</Link>
                  <Link to="/international/sri-lanka" onClick={closeAllMenus}>Sri Lanka</Link>
                  <Link to="/international/bali" onClick={closeAllMenus}>Bali</Link>
                  <Link to="/international/dubai" onClick={closeAllMenus}>Dubai</Link>
                  <Link to="/international/maldives" onClick={closeAllMenus}>Maldives</Link>
                  <Link to="/international/nepal" onClick={closeAllMenus}>Nepal</Link>
                  <Link to="/international/bhutan" onClick={closeAllMenus}>Bhutan</Link>
                  <Link to="/international/philippines" onClick={closeAllMenus}>Philippines</Link>
                </div>
                <div className="dd-col">
                  <h4>International II</h4>
                  <Link to="/international/vietnam" onClick={closeAllMenus}>Vietnam</Link>
                  <Link to="/international/cambodia" onClick={closeAllMenus}>Cambodia</Link>
                  <Link to="/international/japan" onClick={closeAllMenus}>Japan</Link>
                  <Link to="/international/china" onClick={closeAllMenus}>China</Link>
                  <Link to="/international/kenya" onClick={closeAllMenus}>Kenya</Link>
                  <Link to="/international/brunei" onClick={closeAllMenus}>Brunei</Link>
                  <Link to="/international/hong-kong-macau" onClick={closeAllMenus}>Hong Kong & Macau</Link>
                  <Link to="/international/russia" onClick={closeAllMenus}>Russia</Link>
                  <Link to="/international/turkey" onClick={closeAllMenus}>Turkey</Link>
                  <Link to="/international/egypt" onClick={closeAllMenus}>Egypt</Link>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/fixed-departures">
                Fixed Departures
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/hni-luxury-tours">
                HNI Luxury Tours
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>

          <div className="nav-actions">
            <Link
              className="nav-cta btn-primary"
              to="/#booking"
              onClick={(e) => {
                if (onBookNow) {
                  e.preventDefault();
                  onBookNow();
                }
                closeAllMenus();
              }}
            >
              Book Now
            </Link>
          </div>
          <button
            className={`burger${mobileOpen ? " open" : ""}`}
            id="burger"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
            onClick={() => {
              toggleMobileNav();
              setPackagesOpen(false);
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile nav */}
      <nav
        className={`mobile-nav${mobileOpen ? " open" : ""}`}
        id="mobileNav"
        aria-label="Mobile navigation"
      >
        <Link className="mobile-nav-link" to="/" onClick={closeMobileNav}>
          Home
        </Link>
        <Link className="mobile-nav-link" to="/about" onClick={closeMobileNav}>
          About Us
        </Link>
        <button
          type="button"
          className={`mobile-nav-link mobile-nav-link--toggle${packagesOpen ? " open" : ""}`}
          onClick={togglePackages}
          aria-expanded={packagesOpen}
        >
          Packages <span>35+ Destinations</span>
        </button>
        <div className={`mobile-nav-submenu${packagesOpen ? " open" : ""}`}>
          <Link to="/domestic/kerala" onClick={closeAllMenus}>Kerala</Link>
          <Link to="/domestic/goa" onClick={closeAllMenus}>Goa</Link>
          <Link to="/domestic/andaman" onClick={closeAllMenus}>Andaman</Link>
          <Link to="/international/malaysia" onClick={closeAllMenus}>Malaysia</Link>
          <Link to="/international/singapore" onClick={closeAllMenus}>Singapore</Link>
        </div>
        {/* <Link className="mobile-nav-link" to="/#testimonials" onClick={closeMobileNav}>
          Reviews <span>4.9 ★</span>
        </Link> */}
        {/* <Link className="mobile-nav-link" to="/#faq" onClick={closeMobileNav}>
          FAQ
        </Link> */}
        <Link className="mobile-nav-link" to="/contact" onClick={closeMobileNav}>
          Contact Us
        </Link>
        <Link className="mobile-nav-link" to="/fixed-departures" onClick={closeMobileNav}>
        Fixed Departures
        </Link>
        <Link className="mobile-nav-link" to="/hni-luxury-tours" onClick={closeMobileNav}>
          HNI Luxury Tours <span>Elite Limitless</span>
        </Link>
        <div className="mobile-nav-contact">
          <a href="tel:+919494141475">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path
                d="M11.5 9.2c-.2-.2-2-1-2.3-.9-.3.1-.5.4-.7.6-.1.1-.3.2-.5.1C7.2 8.6 6 7.9 5 6.8c-.9-.9-1.5-2-.9-2.3.2-.1.5-.3.6-.6.1-.3-.6-2.1-.9-2.3C3.5 1.4 3.3 1.4 3 1.5 2 2.1 1.3 3.3 1.6 4.5c.4 1.7 1.6 3.3 3 4.7 1.4 1.4 3 2.6 4.7 3 1.2.3 2.4-.4 3-1.4.1-.3.1-.5-.8-1.6z"
                stroke="currentColor"
                strokeWidth="1.2"
                fill="none"
              />
            </svg>
            +91-9494141475
          </a>
          <a href="mailto:aruvitours@gmail.com">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <rect x="1.5" y="3" width="10" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
              <path d="M1.5 4.5l5 3.2 5-3.2" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            aruvitours@gmail.com
          </a>
        </div>
      </nav>
    </>
  );
}
