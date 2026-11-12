import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const domesticList = [
    { name: "Kerala", slug: "kerala" },
    { name: "Goa", slug: "goa" },
    { name: "Andaman", slug: "andaman" },
    { name: "Golden Triangle", slug: "golden-triangle" },
    { name: "Himachal", slug: "himachal" },
    { name: "Kashmir", slug: "kashmir" },
    { name: "Rajasthan", slug: "rajasthan" },
    { name: "Sikkim", slug: "sikkim" },
    { name: "Assam", slug: "assam" },
    { name: "Gujarat", slug: "gujarat" },
    { name: "Ladakh", slug: "ladakh" },
    { name: "Lakshadweep", slug: "lakshadweep" },
    { name: "Odisha", slug: "odisha" },
    { name: "Meghalaya", slug: "meghalaya" },
    { name: "Arunachal Pradesh", slug: "arunachal-pradesh" }
  ];

  const internationalList = [
    { name: "Malaysia", slug: "malaysia" },
    { name: "Singapore", slug: "singapore" },
    { name: "Thailand", slug: "thailand" },
    { name: "Sri Lanka", slug: "sri-lanka" },
    { name: "Bali", slug: "bali" },
    { name: "Dubai", slug: "dubai" },
    { name: "Maldives", slug: "maldives" },
    { name: "Nepal", slug: "nepal" },
    { name: "Bhutan", slug: "bhutan" },
    { name: "Philippines", slug: "philippines" },
    { name: "Vietnam", slug: "vietnam" },
    { name: "Cambodia", slug: "cambodia" },
    { name: "Japan", slug: "japan" },
    { name: "China", slug: "china" },
    { name: "Kenya", slug: "kenya" },
    { name: "Brunei", slug: "brunei" },
    { name: "Hong Kong & Macau", slug: "hong-kong-macau" },
    { name: "Russia", slug: "russia" },
    { name: "Turkey", slug: "turkey" },
    { name: "Egypt", slug: "egypt" }
  ];

  const handleMouseEnter = () => {
    setDropdownActive(true);
  };

  const handleMouseLeave = () => {
    setDropdownActive(false);
  };

  const handleDropdownToggle = (e) => {
    if (window.innerWidth <= 991) {
      e.preventDefault();
      setDropdownActive(!dropdownActive);
    }
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    setDropdownActive(false);
  };

  const handleDestinationClick = (slug) => {
    handleLinkClick();
    navigate(`/packages/${slug}`);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : 'transparent'}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={handleLinkClick}>
          <img 
            src="/logo/aruvi-tours-symbol.svg" 
            alt="Aruvi Tours Symbol" 
            className="navbar-logo-symbol" 
          />
          <span className="navbar-logo-text">
            ARUVI<span className="gold-text">TOURS</span>
          </span>
        </Link>
        
        <div className={`navbar-toggle ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        
        <div className={`navbar-menu-wrapper ${isOpen ? 'active' : ''}`}>
          <ul className="navbar-menu">
            <li className="navbar-item">
              <Link to="/" className="navbar-link" onClick={handleLinkClick}>Home</Link>
            </li>
            <li className="navbar-item">
              <Link to="/about" className="navbar-link" onClick={handleLinkClick}>About</Link>
            </li>
            
            <li 
              className={`navbar-item has-dropdown ${dropdownActive ? 'dropdown-active' : ''}`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className="navbar-link dropdown-toggle-span" onClick={handleDropdownToggle}>
                Packages
                <svg className="dropdown-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </span>
              
              <div className="mega-dropdown">
                <div className="mega-dropdown-grid">
                  <div className="mega-dropdown-column">
                    <h4 className="column-title">Domestic Packages</h4>
                    <div className="destination-subgrid">
                      {domesticList.map((dest) => (
                        <span 
                          key={dest.slug} 
                          className="dropdown-destination-item"
                          onClick={() => handleDestinationClick(dest.slug)}
                        >
                          {dest.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mega-dropdown-column">
                    <h4 className="column-title">International Packages</h4>
                    <div className="destination-subgrid">
                      {internationalList.map((dest) => (
                        <span 
                          key={dest.slug} 
                          className="dropdown-destination-item"
                          onClick={() => handleDestinationClick(dest.slug)}
                        >
                          {dest.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </li>
            
            <li className="navbar-item">
              <Link to="/fixed-departures" className="navbar-link" onClick={handleLinkClick}>Fixed Departures</Link>
            </li>
            <li className="navbar-item">
              <Link to="/luxury-tours" className="navbar-link" onClick={handleLinkClick}>Luxury Tours</Link>
            </li>
            <li className="navbar-item">
              <Link to="/contact" className="navbar-link" onClick={handleLinkClick}>Contact</Link>
            </li>
          </ul>
          
          <div className="navbar-cta">
            <Link to="/booking" className="navbar-book-btn" onClick={handleLinkClick}>Book Now</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
