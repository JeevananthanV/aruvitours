import { motion } from 'motion/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import WhatsAppFloat from '../Shared/Whatsappfloat';

export default function GoldenTriangle() {

  useEffect(() => {
    document.title = "golden_triangle | Aruvi Tours";
    window.scrollTo(0, 0);

    const preloader = document.getElementById('preloader');
    const heroImg = document.getElementById('heroImg');
    const toast = document.getElementById('toast');
    const revealItems = document.querySelectorAll('.reveal-up, .reveal-scale');

    const showToast = (message) => {
      if (!toast) return;
      toast.textContent = message;
      toast.classList.add('show');
      window.clearTimeout(showToast.hideTimer);
      showToast.hideTimer = window.setTimeout(() => {
        toast.classList.remove('show');
      }, 2600);
    };

    const hidePreloader = () => {
      if (preloader) preloader.classList.add('done');
    };
    window.setTimeout(hidePreloader, 1000);

    // Custom Cursor (Only on Desktop)
    let dot, ring, frameId;
    if (!window.matchMedia('(pointer: coarse)').matches) {
      dot = document.createElement('div');
      dot.className = 'cursor-dot';
      ring = document.createElement('div');
      ring.className = 'cursor-ring';
      document.body.append(dot, ring);

      let targetX = window.innerWidth / 2;
      let targetY = window.innerHeight / 2;
      let currentX = targetX;
      let currentY = targetY;

      const updatePosition = () => {
        currentX += (targetX - currentX) * 0.18;
        currentY += (targetY - currentY) * 0.18;
        dot.style.left = `${targetX}px`;
        dot.style.top = `${targetY}px`;
        ring.style.left = `${currentX}px`;
        ring.style.top = `${currentY}px`;
        frameId = window.requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (event) => {
        targetX = event.clientX;
        targetY = event.clientY;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      };

      const onMouseLeave = () => {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseleave', onMouseLeave);
      
      const interactiveEls = document.querySelectorAll('a, button, input, select, .gallery-item, .tl-card');
      interactiveEls.forEach((element) => {
        element.addEventListener('mouseenter', () => ring.classList.add('hover'));
        element.addEventListener('mouseleave', () => ring.classList.remove('hover'));
      });
      
      updatePosition();
    }

    // Zoom Hero image on scroll
    const onScroll = () => {
      if (heroImg) {
        heroImg.classList.toggle('zoomed', window.scrollY > 30);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Scroll Reveal Intersection Observer
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealItems.forEach((item) => revealObserver.observe(item));

    // Accordion Toggle
    window.toggleDay = (card) => {
      const item = card.closest('.tl-item');
      if (item) item.classList.toggle('open');
    };

    // Enquiry submit handler
    window.submitEnquiry = () => {
      const name = document.getElementById('formName');
      const phone = document.getElementById('formPhone');
      const pkg = document.getElementById('formPkg');

      const cleanName = name ? name.value.trim() : '';
      const cleanPhone = phone ? phone.value.trim() : '';
      const cleanPkg = pkg ? pkg.value.trim() : '';

      if (!cleanName || !cleanPhone || !cleanPkg) {
        showToast('Please fill in your name, phone number, and package.');
        return;
      }

      showToast(`Thanks ${cleanName}. We will contact you shortly about ${cleanPkg}.`);

      if (name) name.value = '';
      if (phone) phone.value = '';
      if (pkg) pkg.value = '';
    };

    // Gallery Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lbImg');
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item[data-src]'));
    let activeGalleryIndex = 0;

    const updateLightbox = () => {
      if (!lightboxImg || !galleryItems[activeGalleryIndex]) return;
      const src = galleryItems[activeGalleryIndex].getAttribute('data-src');
      lightboxImg.src = src.startsWith('http') || src.startsWith('/') ? src : `/golden_triangle/${src}`;
      const cap = galleryItems[activeGalleryIndex].querySelector('.gi-title')?.textContent || '';
      const captionEl = document.getElementById('lbCaption');
      if (captionEl) captionEl.textContent = cap;
    };

    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        if (!lightbox) return;
        activeGalleryIndex = index;
        updateLightbox();
        lightbox.classList.add('open');
      });
    });

    window.lightboxClose = () => {
      if (lightbox) lightbox.classList.remove('open');
    };

    window.lightboxPrev = () => {
      activeGalleryIndex = (activeGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
      updateLightbox();
    };

    window.lightboxNext = () => {
      activeGalleryIndex = (activeGalleryIndex + 1) % galleryItems.length;
      updateLightbox();
    };

    // Itinerary days tab state selector
    window.selectItineraryDays = (days) => {
      document.querySelectorAll('.itinerary-tab').forEach(tab => {
        const isActive = Number(tab.dataset.days) === days;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      document.querySelectorAll('.itinerary-list').forEach(list => {
        list.classList.toggle('active', Number(list.dataset.days) === days);
      });

      // Update slider bar position
      const tabs = Array.from(document.querySelectorAll('.itinerary-tab'));
      const slider = document.getElementById('itinerarySlider');
      const bar = document.querySelector('.itinerary-switch-inner');
      const activeTab = tabs.find(tab => Number(tab.dataset.days) === days);

      if (activeTab && slider && bar) {
        const barRect = bar.getBoundingClientRect();
        const tabRect = activeTab.getBoundingClientRect();
        slider.style.left = `${tabRect.left - barRect.left}px`;
        slider.style.width = `${tabRect.width}px`;
      }
    };

    window.jumpToItinerary = (days) => {
      window.selectItineraryDays && window.selectItineraryDays(days);
      document.getElementById('itinerary')?.scrollIntoView({ behavior: 'smooth' });
    };

    // Testimonial Carousel Slider
    const testiTrack = document.getElementById('testiTrack');
    const testiDots = document.getElementById('testiDots');
    let testiIndex = 0;
    let testiTotal = 0;
    let testiPerView = 3;
    let testiAutoTimer;

    const getTestiPerView = () => {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    };

    const updateTesti = () => {
      if (!testiTrack) return;
      const cards = testiTrack.querySelectorAll('.testi-card');
      if (cards.length === 0) return;
      testiPerView = getTestiPerView();
      const cardWidth = cards[0].offsetWidth + 32; // gap = 2rem = 32px
      testiTrack.style.transform = `translateX(-${testiIndex * cardWidth}px)`;

      const dots = document.querySelectorAll('.testi-dot');
      const activeDot = Math.floor(testiIndex / testiPerView);
      dots.forEach((d, i) => d.classList.toggle('active', i === activeDot));
    };

    const goTesti = (idx) => {
      if (!testiTrack) return;
      testiTotal = testiTrack.querySelectorAll('.testi-card').length;
      testiPerView = getTestiPerView();
      const maxIdx = Math.max(0, testiTotal - testiPerView);
      testiIndex = Math.max(0, Math.min(idx, maxIdx));
      updateTesti();
      resetTestiAuto();
    };

    const resetTestiAuto = () => {
      window.clearInterval(testiAutoTimer);
      startTestiAuto();
    };

    const startTestiAuto = () => {
      window.clearInterval(testiAutoTimer);
      testiAutoTimer = window.setInterval(() => {
        if (!testiTrack) return;
        testiTotal = testiTrack.querySelectorAll('.testi-card').length;
        testiPerView = getTestiPerView();
        const maxIdx = Math.max(0, testiTotal - testiPerView);
        if (testiIndex >= maxIdx) {
          testiIndex = 0;
        } else {
          testiIndex += testiPerView;
        }
        updateTesti();
      }, 5000);
    };

    window.testiNext = () => {
      testiPerView = getTestiPerView();
      if (!testiTrack) return;
      testiTotal = testiTrack.querySelectorAll('.testi-card').length;
      const maxIdx = Math.max(0, testiTotal - testiPerView);
      testiIndex = Math.min(testiIndex + testiPerView, maxIdx);
      updateTesti();
      resetTestiAuto();
    };

    window.testiPrev = () => {
      testiPerView = getTestiPerView();
      testiIndex = Math.max(0, testiIndex - testiPerView);
      updateTesti();
      resetTestiAuto();
    };

    if (testiTrack && testiDots) {
      const cards = testiTrack.querySelectorAll('.testi-card');
      testiTotal = cards.length;
      testiPerView = getTestiPerView();
      testiIndex = 0;

      testiDots.innerHTML = '';
      const numDots = Math.ceil(testiTotal / testiPerView);
      for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goTesti(i * testiPerView));
        testiDots.appendChild(dot);
      }

      updateTesti();
      startTestiAuto();
      window.addEventListener('resize', updateTesti);
    }

    

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      if (dot) dot.remove();
      if (ring) ring.remove();
      window.removeEventListener('scroll', onScroll);
      revealObserver.disconnect();
      window.toggleDay = null;
      window.submitEnquiry = null;
      window.lightboxClose = null;
      window.lightboxPrev = null;
      window.lightboxNext = null;
      window.selectItineraryDays = null;
      window.jumpToItinerary = null;
      window.clearInterval(testiAutoTimer);
      window.removeEventListener('resize', updateTesti);
      window.testiNext = null;
      window.testiPrev = null;
      
    };
  }, []);
  

  return (
    <>
      <Navbar />
      <div className="package-page-wrapper">

  {/* Mobile Menu */}
  

  <motion.section className="hero" id="hero" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="hero-bg">
      <img src="/golden_triangle/golden-triangle-taj-mahal-agra.jpg" alt="Taj Mahal" className="hero-img" id="heroImg" />
      <div className="hero-overlay"></div>
      <div className="hero-grain"></div>
    </div>

    <div className="hero-content">
      <motion.div className="hero-badge" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <span className="badge-dot"></span>
        2 Packages · Golden Triangle · Heritage &amp; Royal Route
      </motion.div>

      <motion.h1 className="hero-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <em>Golden Triangle</em><br />Luxury Escape
      </motion.h1>

      <motion.p className="hero-tagline" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
        Explore Delhi’s historic alleys, Agra’s timeless Taj Mahal, and Jaipur’s royal forts — three cities, one unforgettable journey.
      </motion.p>

      <motion.div className="hero-actions" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.4 }}>
        <a href="#packages" className="btn-primary">Choose Package</a>
        <a href="#itinerary" className="btn-ghost">View Itinerary</a>
      </motion.div>
    </div>

    <div className="hero-scroll" id="scrollIndicator">
      <div className="scroll-line"></div>
      <span>Scroll</span>
    </div>
  </motion.section>

  <div className="infobar" id="infobar">
    <div className="infobar-inner">
      <div className="info-item">
        <span className="info-icon">🗓</span>
        <div>
          <span className="info-label">Packages</span>
          <span className="info-val">3N/4D · 4N/5D</span>
        </div>
      </div>

      <div className="info-divider"></div>

      <div className="info-item">
        <span className="info-icon">ðŸ“</span>
        <div>
          <span className="info-label">Destinations</span>
          <span className="info-val">Delhi · Agra · Jaipur</span>
        </div>
      </div>

      <div className="info-divider"></div>

      <div className="info-item">
        <span className="info-icon">💰</span>
        <div>
          <span className="info-label">Starting From</span>
          <span className="info-val">₹18,999 <small>/person</small></span>
        </div>
      </div>

      <div className="info-divider"></div>

      <div className="info-item">
        <span className="info-icon">⭐</span>
        <div>
          <span className="info-label">Rating</span>
          <span className="info-val">4.9 / 5.0</span>
        </div>
      </div>

      <div className="info-divider"></div>

      <div className="info-item">
        <span className="info-icon">🌿</span>
        <div>
          <span className="info-label">Best Time</span>
          <span className="info-val">October – March</span>
        </div>
      </div>
    </div>
  </div>

  <motion.section className="packages" id="packages" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Choose Your Journey</motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Select Your <em>Package</em></motion.h2>

      <motion.div className="pkg-tabs" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
        <button className="pkg-tab active" data-pkg="3n4d" onClick={() => window.switchPackage && window.switchPackage('3n4d', this)}>
          <span className="pkg-tab-duration">3N / 4D</span>
          <span className="pkg-tab-name">Delhi · Agra · Jaipur</span>
        </button>
        <button className="pkg-tab" data-pkg="4n5d" onClick={() => window.switchPackage && window.switchPackage('4n5d', this)}>
          <span className="pkg-tab-duration">4N / 5D</span>
          <span className="pkg-tab-name">Royal Rajasthan Extension</span>
        </button>
      </motion.div>
    </div>
  </motion.section>

  <motion.section className="about" id="about" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>The Experience</motion.div>
      <div className="about-grid">
        <motion.div className="about-text" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <h2>Golden Triangle<br /><em>Heritage &amp; Royalty</em></h2>
          <p>Journey through India’s most celebrated cultural corridor: historic Delhi, magnificent Agra with the Taj Mahal, and Jaipur — the Pink City of palaces and forts. This curated itinerary blends iconic monuments, private guides, and comfortable stays.</p>
          <a href="#itinerary" className="link-arrow">Explore the Journey <span>→</span></a>
        </motion.div>

        <motion.div className="about-highlights" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
          <div className="highlight-card">
            <div className="hc-icon">ðŸ›️</div>
            <div>
              <strong>Taj Mahal · Agra</strong>
              <p>World‑famous ivory‑white marble mausoleum at sunrise.</p>
            </div>
          </div>

          <div className="highlight-card">
            <div className="hc-icon">ðŸ°</div>
            <div>
              <strong>Amber Fort · Jaipur</strong>
              <p>Majestic hilltop fort with royal courtyards and ramparts.</p>
            </div>
          </div>

          <div className="highlight-card">
            <div className="hc-icon">🕌</div>
            <div>
              <strong>Qutub Minar · Delhi</strong>
              <p>Architectural marvel marking Delhi’s ancient heritage.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </motion.section>

  <motion.section className="gallery-section" id="gallery" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Visual Journey</motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Frames of <em>Golden Triangle</em></motion.h2>
    </div>

    <div className="gallery-grid" id="galleryGrid">
      <motion.div className="gallery-item" data-src="/golden_triangle/golden-triangle-taj-mahal-agra.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <img src="/golden_triangle/golden-triangle-taj-mahal-agra.jpg" alt="Taj Mahal" />
        <div className="gallery-caption">Taj Mahal · Agra</div>
      </motion.div>

      <motion.div className="gallery-item" data-src="/golden_triangle/golden-triangle-qutub-minar-delhi.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <img src="/golden_triangle/golden-triangle-qutub-minar-delhi.jpg" alt="Qutub Minar" />
        <div className="gallery-caption">Qutub Minar · Delhi</div>
      </motion.div>

      <motion.div className="gallery-item" data-src="/golden_triangle/golden-triangle-amber-fort-jaipur.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <img src="/golden_triangle/golden-triangle-amber-fort-jaipur.jpg" alt="Amber Fort" />
        <div className="gallery-caption">Amber Fort · Jaipur</div>
      </motion.div>

      <motion.div className="gallery-item" data-src="/golden_triangle/golden-triangle-city-palace-udaipur.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <img src="/golden_triangle/golden-triangle-city-palace-udaipur.jpg" alt="City Palace" />
        <div className="gallery-caption">City Palace · Jaipur</div>
      </motion.div>

      <motion.div className="gallery-item" data-src="/golden_triangle/golden-triangle-india-gate-delhi.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <img src="/golden_triangle/golden-triangle-india-gate-delhi.jpg" alt="Historic Gate" />
        <div className="gallery-caption">Historic Gates &amp; Streets</div>
      </motion.div>

      <motion.div className="gallery-item" data-src="/golden_triangle/golden-triangle-hawa-mahal-jaipur.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
        <img src="/golden_triangle/golden-triangle-hawa-mahal-jaipur.jpg" alt="Hawa Mahal" />
        <div className="gallery-caption">Hawa Mahal · Jaipur</div>
      </motion.div>
    </div>

    <div className="lightbox" id="lightbox">
      <button className="lb-close" id="lbClose">✕</button>
      <button className="lb-arrow lb-prev" id="lbPrev">‹</button>
      <img src="" alt="Lightbox gallery image for Golden Triangle" className="lb-img" id="lbImg" />
      <button className="lb-arrow lb-next" id="lbNext">›</button>
    </div>
  </motion.section>

  <motion.section className="itinerary pkg-itinerary active" id="itinerary" data-pkg-section="3n4d" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>3N / 4D · Golden Triangle</motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Your <em>Journey</em> Unfolds</motion.h2>
      <motion.div className="pkg-route-pills" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
        <span className="route-pill">✈ Arrival</span>
        <span className="route-arrow">→</span>
        <span className="route-pill">Delhi</span>
        <span className="route-arrow">→</span>
        <span className="route-pill">Agra</span>
        <span className="route-arrow">→</span>
        <span className="route-pill">Jaipur</span>
        <span className="route-arrow">→</span>
        <span className="route-pill">✈ Departure</span>
      </motion.div>

      <div className="timeline">
        <motion.div className="tl-item" data-day="1" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <div className="tl-marker"><span className="tl-day">Day 1</span><div className="tl-dot"></div></div>
          <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
            <div className="tl-header">
              <div>
                <h3>Arrival in Delhi</h3>
                <span className="tl-sub">Airport → Hotel · City Orientation</span>
              </div>
              <div className="tl-chevron">▾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>🚗 Private airport transfer &amp; hotel check-in</li>
                <li>ðŸ› Qutub Minar &amp; Humayun's Tomb (photo stops)</li>
                <li>ðŸ› Evening market walk in Connaught Place</li>
              </ul>
              <div className="tl-note">Meals: Dinner included</div>
            </div>
          </div>
        </motion.div>

        <motion.div className="tl-item" data-day="2" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
          <div className="tl-marker"><span className="tl-day">Day 2</span><div className="tl-dot"></div></div>
          <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
            <div className="tl-header">
              <div>
                <h3>Delhi → Agra</h3>
                <span className="tl-sub">Taj Mahal Sunrise · Agra Fort</span>
              </div>
              <div className="tl-chevron">▾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>✈/🚆 Private transfer to Agra</li>
                <li>🌅 Sunrise visit to Taj Mahal (priority access)</li>
                <li>ðŸ¯ Agra Fort guided tour</li>
              </ul>
              <div className="tl-note">Meals: Breakfast &amp; Dinner included</div>
            </div>
          </div>
        </motion.div>

        <motion.div className="tl-item" data-day="3" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
          <div className="tl-marker"><span className="tl-day">Day 3</span><div className="tl-dot"></div></div>
          <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
            <div className="tl-header">
              <div>
                <h3>Agra → Jaipur</h3>
                <span className="tl-sub">Amber Fort · City Palace</span>
              </div>
              <div className="tl-chevron">▾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>🚗 Transfer to Jaipur with comfort breaks</li>
                <li>ðŸ° Visit Amber Fort &amp; Sheesh Mahal</li>
                <li>🎨 Walkthrough City Palace and bazaars</li>
              </ul>
              <div className="tl-note">Meals: Breakfast &amp; Dinner included</div>
            </div>
          </div>
        </motion.div>

        <motion.div className="tl-item" data-day="4" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
          <div className="tl-marker"><span className="tl-day">Day 4</span><div className="tl-dot"></div></div>
          <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
            <div className="tl-header">
              <div>
                <h3>Departure from Jaipur</h3>
                <span className="tl-sub">Return Journey</span>
              </div>
              <div className="tl-chevron">▾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>☕ Breakfast and hotel check-out</li>
                <li>🚗 Transfer to airport / station</li>
              </ul>
              <div className="tl-note">Meals: Breakfast included</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </motion.section>

  <motion.section className="inclusions" id="inclusions" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <div className="inc-grid">
        <div className="inc-col">
          <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>What's Included</motion.div>
          <motion.h2 className="" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Comfort <em>Inclusions</em></motion.h2>
          <div className="inc-cards">
            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
              <div className="ic-icon">ðŸ¨</div>
              <div>
                <strong>3/4-Star Boutique Hotels</strong>
                <p>Handpicked stays close to city centers.</p>
              </div>
            </motion.div>
            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
              <div className="ic-icon">🚗</div>
              <div>
                <strong>Private Transfers</strong>
                <p>All transfers, intercity travel &amp; local guides.</p>
              </div>
            </motion.div>
            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
              <div className="ic-icon">🎟️</div>
              <div>
                <strong>Priority Tickets</strong>
                <p>Skip-the-line access to Taj Mahal &amp; major monuments.</p>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div className="exc-col" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
          <div className="section-label">What's Excluded</div>
          <h2>Exclusions</h2>
          <ul className="exc-list">
            <li>✈ International airfare</li>
            <li>📋 Travel Insurance</li>
            <li>ðŸ¹ Personal expenses &amp; gratuities</li>
            <li>ðŸ› Shopping &amp; optional activities</li>
          </ul>
        </motion.div>
      </div>
    </div>
  </motion.section>

  <motion.section className="pricing" id="pricing" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>3N/4D · Golden Triangle</motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Reserve Your <em>Journey</em></motion.h2>

      <div className="price-cards">
        <motion.div className="price-card" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <div className="pc-label">3N / 4D · Per Person</div>
          <div className="pc-price">₹18,999</div>
          <ul className="pc-perks">
            <li>Delhi → Agra → Jaipur</li>
            <li>Private transfers &amp; guided sightseeing</li>
            <li>Priority Taj Mahal sunrise access</li>
          </ul>
          <a href="#contact" className="btn-primary full-btn" onClick={() => window.selectPackage && window.selectPackage('3N/4D Golden Triangle')}>Reserve</a>
        </motion.div>

        <motion.div className="price-card featured" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
          <div className="pc-popular">Most Popular</div>
          <div className="pc-label">4N / 5D · Couple</div>
          <div className="pc-price">₹24,999</div>
          <ul className="pc-perks">
            <li>Extended Rajasthan experiences</li>
            <li>Heritage stays &amp; guided tours</li>
          </ul>
          <a href="#contact" className="btn-primary full-btn" onClick={() => window.selectPackage && window.selectPackage('4N/5D Golden Triangle')}>Reserve</a>
        </motion.div>
      </div>
    </div>
  </motion.section>

  <motion.section className="testimonials" id="testimonials" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Voices of Delight</motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Stories That <em>Stay</em></motion.h2>
      <div className="testi-slider">
        <div className="testi-track" id="testiTrack">
          <div className="testi-card">
            <div className="testi-stars">★★★★★</div>
            <p>"Taj at sunrise was the highlight. Smooth transfers and great local guides — highly recommended."</p>
            <div className="testi-author">
              <img src="https://i.pravatar.cc/60?img=47" alt="Guest" />
              <div><strong>Anita R.</strong><span>Delhi · Golden Triangle</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.section>

  <motion.section className="addons" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Enhance Your Stay</motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Optional <em>Add-Ons</em></motion.h2>
      <div className="addon-grid">
        <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <span>📸</span>
          <strong>Sunrise Taj Photoshoot</strong>
          <p>Private photoshoot with photographer.</p>
          <em>+₹3,499</em>
        </motion.div>
        <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
          <span>🧑â€ðŸ³</span>
          <strong>Rajasthani Cultural Dinner</strong>
          <p>Traditional thali with live folk performance.</p>
          <em>+₹2,499</em>
        </motion.div>
      </div>
    </div>
  </motion.section>

  <motion.section className="final-cta" id="cta" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="fcta-bg">
      <img src="/golden_triangle/golden-triangle-taj-mahal-sunset-view.jpg" alt="Taj Mahal at sunset in Agra" />
      <div className="fcta-overlay"></div>
    </div>
    <motion.div className="fcta-content" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
      <div className="section-label light">Book Your Heritage Escape</div>
      <h2>Golden Triangle<br /><em>Begin Your Journey</em></h2>
      <p>From Delhi’s monuments to the Taj’s timeless beauty and Jaipur’s royal palaces — experience India’s most celebrated route with comfort and care.</p>
      <a href="#packages" className="btn-primary large-btn">Choose Your Package</a>
    </motion.div>
  </motion.section>

  <motion.section className="contact-strip" id="contact" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <div className="cs-grid">
        <motion.div className="cs-col" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <h3>Have Questions?</h3>
          <p>Our travel curators are available 9AM–9PM, 7 days a week.</p>
          <div className="cs-actions">
            <a href="tel:+919494141475" className="cs-btn">📞 +91 94941 41475</a>
            <a href="mailto:hello@aruvi.tours" className="cs-btn">✉ hello@aruvi.tours</a>
          </div>
        </motion.div>
        <motion.div className="cs-col" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
          <h3>Quick Enquiry</h3>
          <div className="cs-form">
            <input type="text" placeholder="Your Name" className="cs-input" id="formName" />
            <input type="tel" placeholder="Phone Number" className="cs-input" id="formPhone" />
            <select className="cs-input" id="formPkg">
              <option value="">Select Package</option>
              <option>3N/4D Golden Triangle – Solo</option>
              <option>3N/4D Golden Triangle – Couple</option>
              <option>4N/5D Royal Rajasthan – Couple</option>
            </select>
            <button className="btn-primary" onClick={() => window.submitEnquiry && window.submitEnquiry()}>Send Enquiry</button>
          </div>
        </motion.div>
      </div>
    </div>
  </motion.section>

  

  <div className="toast" id="toast"></div>
      </div>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

