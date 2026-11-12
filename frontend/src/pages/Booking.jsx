import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { bookingService } from '../services/api';
import packagesData from '../data/packagesData';
import ScrollReveal from '../components/common/ScrollReveal';
import './Booking.css';

const Booking = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  // Get initial package selection from state or query string
  const getInitialPackage = () => {
    if (location.state && location.state.packageSlug) {
      return location.state.packageSlug;
    }
    const queryPkg = searchParams.get('package');
    if (queryPkg) {
      return queryPkg;
    }
    return packagesData[0]?.slug || '';
  };

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    travelDate: '',
    numberOfGuests: 2,
    packageSlug: getInitialPackage(),
    pickupPoint: 'Bangalore City Hub (Madiwala)',
    specialRequests: ''
  });

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successData, setSuccessData] = useState(null);

  // Update selected package details whenever packageSlug changes
  useEffect(() => {
    const pkg = packagesData.find(
      (p) => p.slug.toLowerCase() === formData.packageSlug.toLowerCase()
    );
    setSelectedPackage(pkg || null);
  }, [formData.packageSlug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'numberOfGuests' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await bookingService.create(formData);
      if (response.success) {
        setSuccessData({
          bookingId: response.data._id,
          bookingRef: response.data.bookingRef || `AT-${response.data._id.slice(-6).toUpperCase()}`,
          fullName: formData.fullName,
          email: formData.email,
          pickupPoint: formData.pickupPoint,
          packageName: selectedPackage?.name || formData.packageSlug,
          travelDate: formData.travelDate,
          numberOfGuests: formData.numberOfGuests,
          totalEstimated: selectedPackage 
            ? (Number(selectedPackage.startingPrice.replace(/[^0-9]/g, '')) * formData.numberOfGuests).toLocaleString('en-IN') 
            : 'TBD'
        });
      } else {
        setError(response.error || 'Failed to complete booking. Please try again.');
      }
    } catch (err) {
      console.error('Booking submission error:', err);
      setError(
        err.response?.data?.error || 
        'Could not connect to the booking server. Please verify the backend is running.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="booking-page-wrapper light-section">
        <div className="section-container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="section-subtitle font-gold" style={{ letterSpacing: '0.25em', textTransform: 'uppercase', fontSize: '0.85rem', display: 'block' }}>
                Reservation Request
              </span>
              <h1 className="section-title-editorial" style={{ fontFamily: 'Cinzel, serif', fontSize: '2.5rem', fontWeight: '400', margin: '0.5rem 0 1.5rem 0' }}>
                {successData ? 'Booking Confirmed' : 'Book Your Sanctuary Journey'}
              </h1>
              <div className="section-title-separator" style={{ width: '60px', height: '2px', margin: '1rem auto' }}></div>
            </div>
          </ScrollReveal>

          {successData ? (
            /* Success confirmation message view */
            <div className="booking-form-card success-mode" style={{ maxWidth: '650px', margin: '0 auto' }}>
              <div className="booking-success-container">
                <div className="success-icon-shield">
                  <svg className="success-icon-checkmark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h2 className="booking-success-title">Reservation Success</h2>
                <p className="booking-success-desc">
                  Your premium travel request has been logged in our databases. A dedicated Aruvi Tours travel specialist will contact you within 24 hours to personalize your itinerary and complete your checkout.
                </p>

                <div className="booking-details-receipt">
                  <div className="receipt-header">
                    <span className="receipt-title">Reservation Summary</span>
                    <span className="receipt-id" style={{ color: '#d4af37', fontWeight: '700' }}>REF: {successData.bookingRef}</span>
                  </div>
                  
                  <div className="receipt-row">
                    <span className="receipt-label">Guest Name</span>
                    <span className="receipt-value">{successData.fullName}</span>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">Email Address</span>
                    <span className="receipt-value">{successData.email}</span>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">Boarding / Pickup</span>
                    <span className="receipt-value">{successData.pickupPoint || 'Bangalore City Hub'}</span>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">Sanctuary</span>
                    <span className="receipt-value">{successData.packageName}</span>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">Departure Date</span>
                    <span className="receipt-value">{new Date(successData.travelDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">Guests</span>
                    <span className="receipt-value">{successData.numberOfGuests} Guests</span>
                  </div>
                  <div className="receipt-row" style={{ borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '0.8rem', marginTop: '0.8rem' }}>
                    <span className="receipt-label" style={{ color: '#d4af37', fontWeight: '600' }}>Estimated Total</span>
                    <span className="receipt-value" style={{ color: '#d4af37', fontSize: '1.1rem', fontWeight: '600' }}>₹{successData.totalEstimated}</span>
                  </div>
                </div>

                <div className="booking-action-buttons">
                  <Link to="/" className="back-btn-secondary">
                    Back to Home
                  </Link>
                  <Link to="/packages" className="catalog-btn-primary">
                    Explore More
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            /* Interactive Booking Form split layout */
            <div className="booking-split-grid">
              {/* Form Section */}
              <ScrollReveal direction="left" delay={0.2}>
                <div className="booking-form-card">
                  {error && (
                    <div style={{ backgroundColor: 'rgba(235, 77, 75, 0.1)', border: '1px solid rgba(235, 77, 75, 0.4)', color: '#ff7979', padding: '1rem', marginBottom: '1.5rem', borderRadius: '4px', fontSize: '0.9rem' }}>
                      {error}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                      <label className="booking-label">Select Destination</label>
                      <select 
                        name="packageSlug" 
                        value={formData.packageSlug} 
                        onChange={handleChange}
                        className="booking-select"
                        required
                      >
                        {packagesData.map((pkg) => (
                          <option key={pkg.slug} value={pkg.slug}>
                            {pkg.name} ({pkg.category})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="booking-label">Full Name</label>
                      <input 
                        type="text" 
                        name="fullName"
                        placeholder="e.g. Eleanor Vance"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="booking-input"
                        required
                      />
                    </div>

                    <div className="form-group-row">
                      <div>
                        <label className="booking-label">Email Address</label>
                        <input 
                          type="email" 
                          name="email"
                          placeholder="e.g. eleanor@luxury.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="booking-input"
                          required
                        />
                      </div>
                      <div>
                        <label className="booking-label">Phone Number</label>
                        <input 
                          type="tel" 
                          name="phone"
                          placeholder="e.g. +91 98765 43210"
                          value={formData.phone}
                          onChange={handleChange}
                          className="booking-input"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group-row">
                      <div>
                        <label className="booking-label">Travel Date</label>
                        <input 
                          type="date" 
                          name="travelDate"
                          value={formData.travelDate}
                          onChange={handleChange}
                          className="booking-input"
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                      <div>
                        <label className="booking-label">Number of Guests</label>
                        <input 
                          type="number" 
                          name="numberOfGuests"
                          min="1" 
                          max="20"
                          value={formData.numberOfGuests}
                          onChange={handleChange}
                          className="booking-input"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="booking-label">Preferred Boarding / Departure Hub</label>
                      <input 
                        type="text" 
                        name="pickupPoint"
                        placeholder="e.g. Bangalore Silk Board, Kempegowda Intl Airport, Chennai Central"
                        value={formData.pickupPoint}
                        onChange={handleChange}
                        className="booking-input"
                      />
                    </div>

                    <div>
                      <label className="booking-label">Special Requests / Preferences</label>
                      <textarea 
                        name="specialRequests"
                        placeholder="Specify diet preferences, room style, luxury transfers, or flight coordination..."
                        value={formData.specialRequests}
                        onChange={handleChange}
                        className="booking-textarea"
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="booking-submit-btn"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span style={{ display: 'inline-block', width: '1rem', height: '1rem', border: '2px solid rgba(18,18,18,0.3)', borderTopColor: '#121212', borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginRight: '0.5rem' }}></span>
                          Securing Reservation...
                        </>
                      ) : (
                        'Confirm Booking Request'
                      )}
                    </button>
                  </form>
                </div>
              </ScrollReveal>

              {/* Package Details / Preview Sidebar */}
              <ScrollReveal direction="right" delay={0.35}>
                <div className="booking-info-column">
                  {selectedPackage ? (
                    <>
                      <div className="booking-visual-card">
                        <img 
                          src={selectedPackage.image} 
                          alt={selectedPackage.name} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                        <div className="booking-img-overlay">
                          <span style={{ color: '#d4af37', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: '600' }}>
                            Selected Journey
                          </span>
                          <h3 className="booking-img-title">{selectedPackage.name}</h3>
                          <p className="booking-img-desc">{selectedPackage.shortDescription}</p>
                        </div>
                      </div>

                      <div className="booking-features-box">
                        <h4 className="booking-inclusions-title" style={{ fontFamily: 'Cinzel, serif', fontSize: '1.2rem', fontWeight: '400', marginTop: 0, marginBottom: '1.5rem', borderBottom: '1px solid rgba(212,175,55,0.15)', paddingBottom: '0.5rem' }}>
                          Inclusions & Rates
                        </h4>
                        <div className="feature-row">
                          <div className="feature-icon-wrapper">
                            <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <div className="feature-text-title">Premium Pricing</div>
                            <div className="feature-text-desc">Starting at ₹{selectedPackage.startingPrice} per person. Final rates subject to guest count and customized options.</div>
                          </div>
                        </div>

                        <div className="feature-row">
                          <div className="feature-icon-wrapper">
                            <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <div className="feature-text-title">Duration</div>
                            <div className="feature-text-desc">{selectedPackage.duration} of crafted experiences and premium leisure.</div>
                          </div>
                        </div>

                        {selectedPackage.highlights && selectedPackage.highlights.length > 0 && (
                          <div className="feature-row">
                            <div className="feature-icon-wrapper">
                              <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                              </svg>
                            </div>
                            <div>
                              <div className="feature-text-title">Key Highlights Included</div>
                              <div className="feature-text-desc">
                                {selectedPackage.highlights.slice(0, 3).join(' • ')}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="booking-features-box" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                      <div style={{ color: '#d4af37', marginBottom: '1rem' }}>
                        <svg style={{ width: '48px', height: '48px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                      </div>
                      <div className="feature-text-title" style={{ fontSize: '1.1rem' }}>Select a Destination Sanctuary</div>
                      <div className="feature-text-desc">Browse our portfolio of curated domestic and international destinations to reveal exclusive pricing and itinerary inclusions.</div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Booking;
