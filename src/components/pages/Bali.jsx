import { motion } from 'motion/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import WhatsAppFloat from '../Shared/Whatsappfloat';

export default function Bali() {

  useEffect(() => {
    document.title = "Bali | Aruvi Tours";
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
      lightboxImg.src = src.startsWith('http') || src.startsWith('/') ? src : `/Bali/${src}`;
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

    {/* ░░░ PRELOADER ░░░ */}
  

    {/* ░░░ NAV ░░░ */}
    
    {/* Mobile Menu */}
    
    {/* ░░░ HERO ░░░ */}
    <motion.section className="hero" id="hero" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="hero-bg">
      <img src="/Bali/bali-ubud-temple.jpg" alt="Bali" className="hero-img" id="heroImg" />
      <div className="hero-overlay"></div>
      <div className="hero-grain"></div>
    </div>

    <div className="hero-content">
      <motion.div className="hero-badge" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <span className="badge-dot"></span>
        4 Nights · 5 Days · Bali
      </motion.div>

      <h1 className="hero-title">
        <em>Bali</em><br />Tropical Paradise
      </h1>

      <p className="hero-tagline">
        Where ancient temples meet pristine beaches and emerald rice terraces
      </p>

      <motion.div className="hero-actions" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.4 }}>
        <a href="#pricing" className="btn-primary">Book Now</a>
        <a href="#itinerary" className="btn-ghost">View Itinerary</a>
      </motion.div>
    </div>

    <div className="hero-scroll" id="scrollIndicator">
      <div className="scroll-line"></div>
      <span>Scroll</span>
    </div>

    {/* Floating weather pill */}
    <div className="hero-weather">
      <span className="weather-icon">🌤️</span>
      <span>28°C · Tropical</span>
    </div>
  </motion.section>

    {/* ░░░ QUICK INFO BAR ░░░ */}
    <div className="infobar" id="infobar">
    <div className="infobar-inner">

      <div className="info-item">
        <span className="info-icon">🗓</span>
        <div>
          <span className="info-label">Duration</span>
          <span className="info-val">4N / 5D</span>
        </div>
      </div>

      <div className="info-divider"></div>

      <div className="info-item">
        <span className="info-icon">📍</span>
        <div>
          <span className="info-label">Location</span>
          <span className="info-val">Bali, Indonesia</span>
        </div>
      </div>

      <div className="info-divider"></div>

      <div className="info-item">
        <span className="info-icon">💰</span>
        <div>
          <span className="info-label">Starting From</span>
          <span className="info-val">₹32,999<small>/person</small></span>
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
        <span className="info-icon">🌤</span>
        <div>
          <span className="info-label">Best Time</span>
          <span className="info-val">Apr – Oct</span>
        </div>
      </div>

    </div>
  </div>
    {/* ░░░ ABOUT ░░░ */}
    <motion.section className="about" id="about" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>The Experience</motion.div>

      <div className="about-grid">

        <motion.div className="about-text" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <h2>Sacred Temples, Pristine Beaches & <br /><em>Bali Tropical Paradise</em></h2>

          <p>
            Experience the enchantment of Bali — where ancient temples rise from emerald rice terraces,
            pristine beaches stretch endlessly, and every moment feels like paradise found. This curated 4N/5D escape
            blends culture, adventure, and world-class relaxation.
          </p>

          <p>
            From Tanah Lot sunsets and Ubud's sacred forests to luxury beach resorts and traditional dance performances,
            every detail is designed to showcase Bali's iconic charm and natural beauty.
          </p>

          <a href="#itinerary" className="link-arrow">
            Explore the Journey <span>→</span>
          </a>
        </motion.div>

        <motion.div className="about-highlights" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>

          <div className="highlight-card">
            <div className="hc-icon">🛕</div>
            <div>
              <strong>Sacred Temples</strong>
              <p>Visit Tanah Lot, Uluwatu & Besakih</p>
            </div>
          </div>

          <div className="highlight-card">
            <div className="hc-icon">🏖️</div>
            <div>
              <strong>Beach Paradise</strong>
              <p>Seminyak, Nusa Dua & Uluwatu shores</p>
            </div>
          </div>

          <div className="highlight-card">
            <div className="hc-icon">🌾</div>
            <div>
              <strong>Rice Terraces</strong>
              <p>Tegallalang & Jatiluwih landscapes</p>
            </div>
          </div>

          <div className="highlight-card">
            <div className="hc-icon">🌅</div>
            <div>
              <strong>Sunset Views</strong>
              <p>Iconic Tanah Lot temple sunset</p>
            </div>
          </div>

          <div className="highlight-card">
            <div className="hc-icon">🐒</div>
            <div>
              <strong>Uluwatu Temple</strong>
              <p>Clifftop temple with monkey forest</p>
            </div>
          </div>

          <div className="highlight-card">
            <div className="hc-icon">🌊</div>
            <div>
              <strong>Island Hopping</strong>
              <p>Nusa Penida & day cruise adventures</p>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  </motion.section>
    {/* ░░░ GALLERY ░░░ */}
    <motion.section className="gallery-section" id="gallery" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Visual Journey</motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Frames of <em>Luxury Bali</em></motion.h2>
    </div>

    <div className="gallery-grid" id="galleryGrid">

      <motion.div className="gallery-item" data-src="/Bali/bali-ubud-temple.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <img src="/Bali/bali-ubud-temple.jpg" alt="Ubud Temple" />
        <div className="gallery-caption">Ubud Sacred Temple</div>
      </motion.div>

      <motion.div className="gallery-item" data-src="/Bali/bali-tanah-lot-sunset.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <img src="/Bali/bali-tanah-lot-sunset.jpg" alt="Tanah Lot Sunset" />
        <div className="gallery-caption">Tanah Lot Sunset</div>
      </motion.div>

      <motion.div className="gallery-item" data-src="/Bali/bali-seminyak-beach.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <img src="/Bali/bali-seminyak-beach.jpg" alt="Seminyak Beach" />
        <div className="gallery-caption">Seminyak Beach</div>
      </motion.div>

      <motion.div className="gallery-item" data-src="/Bali/bali-rice-terrace.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <img src="/Bali/bali-rice-terrace.jpg" alt="Rice Terraces" />
        <div className="gallery-caption">Tegallalang Rice Terraces</div>
      </motion.div>

      <motion.div className="gallery-item" data-src="/Bali/bali-ulawatu-temple.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <img src="/Bali/bali-ulawatu-temple.jpg" alt="Uluwatu Temple" />
        <div className="gallery-caption">Uluwatu Clifftop Temple</div>
      </motion.div>

      <motion.div className="gallery-item" data-src="/Bali/bali-nusa-penida-island.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
        <img src="/Bali/bali-nusa-penida-island.jpg" alt="Nusa Penida" />
        <div className="gallery-caption">Nusa Penida Island</div>
      </motion.div>

    </div>

    {/* Lightbox */}
    <div className="lightbox" id="lightbox">
      <button className="lb-close" id="lbClose">✕</button>
      <button className="lb-arrow lb-prev" id="lbPrev">‹</button>
      <img src="" alt="Lightbox gallery image for Bali" className="lb-img" id="lbImg" />
      <button className="lb-arrow lb-next" id="lbNext">›</button>
    </div>
  </motion.section>

    {/* ░░░ ITINERARY ░░░ */}
    <motion.section className="itinerary" id="itinerary" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Day by Day</motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Your <em>Bali Journey</em> Unfolds</motion.h2>

      <div className="timeline">

        <motion.div className="tl-item" data-day="1" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <div className="tl-marker">
            <span className="tl-day">Day 1</span>
            <div className="tl-dot"></div>
          </div>

          <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
            <div className="tl-header">
              <div>
                <h3>Arrival in Bali</h3>
                <span className="tl-sub">Airport → Luxury Resort</span>
              </div>
              <div className="tl-chevron">▾</div>
            </div>

            <div className="tl-body">
              <ul>
                <li>🚗 Private transfer from Ngurah Rai Airport</li>
                <li>🍹 Welcome drink & luxury check-in</li>
                <li>🌅 Sunset at Seminyak Beach</li>
                <li>🍽 Dinner with ocean view</li>
              </ul>
              <div className="tl-note">Meals: Dinner included</div>
            </div>
          </div>
        </motion.div>

        <motion.div className="tl-item" data-day="2" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
          <div className="tl-marker">
            <span className="tl-day">Day 2</span>
            <div className="tl-dot"></div>
          </div>

          <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
            <div className="tl-header">
              <div>
                <h3>Cultural Immersion</h3>
                <span className="tl-sub">Temples · Rice Terraces · Art</span>
              </div>
              <div className="tl-chevron">▾</div>
            </div>

            <div className="tl-body">
              <ul>
                <li>🛕 Visit Sacred Monkey Forest, Ubud</li>
                <li>🌾 Explore Tegallalang Rice Terraces</li>
                <li>🎨 Traditional art market tour</li>
                <li>🍽 Dinner at local warung</li>
              </ul>
              <div className="tl-note">Meals: Breakfast & Dinner included</div>
            </div>
          </div>
        </motion.div>

        <motion.div className="tl-item" data-day="3" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
          <div className="tl-marker">
            <span className="tl-day">Day 3</span>
            <div className="tl-dot"></div>
          </div>

          <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
            <div className="tl-header">
              <div>
                <h3>Temple & Beach Day</h3>
                <span className="tl-sub">Tanah Lot · Uluwatu · Kuta</span>
              </div>
              <div className="tl-chevron">▾</div>
            </div>

            <div className="tl-body">
              <ul>
                <li>🌅 Sunrise at Tanah Lot Temple</li>
                <li>🏖 Uluwatu Beach relaxation</li>
                <li>🐒 Uluwatu Temple monkey forest</li>
                <li>🎭 Traditional Kecak fire dance</li>
                <li>🍽 Seafood dinner by the beach</li>
              </ul>
              <div className="tl-note">Meals: Breakfast & Dinner included</div>
            </div>
          </div>
        </motion.div>

        <motion.div className="tl-item" data-day="4" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
          <div className="tl-marker">
            <span className="tl-day">Day 4</span>
            <div className="tl-dot"></div>
          </div>

          <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
            <div className="tl-header">
              <div>
                <h3>Nusa Penida Adventure</h3>
                <span className="tl-sub">Island · Beaches · Snorkeling</span>
              </div>
              <div className="tl-chevron">▾</div>
            </div>

            <div className="tl-body">
              <ul>
                <li>🛥 Fast boat to Nusa Penida</li>
                <li>📸 Kelingking Beach viewpoint</li>
                <li>🤿 Snorkeling at Crystal Bay</li>
                <li>🧘 Leisure time at resort</li>
              </ul>
              <div className="tl-note">Meals: Breakfast included</div>
            </div>
          </div>
        </motion.div>

        <motion.div className="tl-item" data-day="5" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
          <div className="tl-marker">
            <span className="tl-day">Day 5</span>
            <div className="tl-dot"></div>
          </div>

          <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
            <div className="tl-header">
              <div>
                <h3>Departure</h3>
                <span className="tl-sub">Farewell Bali</span>
              </div>
              <div className="tl-chevron">▾</div>
            </div>

            <div className="tl-body">
              <ul>
                <li>☕ Breakfast at hotel</li>
                <li>🚗 Airport transfer</li>
              </ul>
              <div className="tl-note">Meals: Breakfast included</div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  </motion.section>
    {/* ░░░ INCLUSIONS / EXCLUSIONS ░░░ */}
    <motion.section className="inclusions" id="inclusions" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <div className="inc-grid">

        <div className="inc-col">
          <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>What's Included</motion.div>
          <motion.h2 className="" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Luxury <em>Inclusions</em></motion.h2>

          <div className="inc-cards">

            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
              <div className="ic-icon">🏨</div>
              <div>
                <strong>5-Star Beach Resort</strong>
                <p>4 nights in premium Bali beachfront resorts</p>
              </div>
            </motion.div>

            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
              <div className="ic-icon">🚗</div>
              <div>
                <strong>Private Transfers</strong>
                <p>Airport pickup & all sightseeing transfers included</p>
              </div>
            </motion.div>

            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
              <div className="ic-icon">🍽</div>
              <div>
                <strong>Curated Dining</strong>
                <p>Daily breakfast + selected premium dinners</p>
              </div>
            </motion.div>

            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
              <div className="ic-icon">🗺</div>
              <div>
                <strong>Guided Experiences</strong>
                <p>Temple tours, cultural visits & island excursions</p>
              </div>
            </motion.div>

            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
              <div className="ic-icon">🛥</div>
              <div>
                <strong>Nusa Penida Cruise</strong>
                <p>Fast boat island hopping with snorkeling</p>
              </div>
            </motion.div>

            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
              <div className="ic-icon">🌅</div>
              <div>
                <strong>Sunset Experiences</strong>
                <p>Tanah Lot & Uluwatu sunset viewpoints</p>
              </div>
            </motion.div>

          </div>
        </div>

        <motion.div className="exc-col" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
          <div className="section-label">What's Excluded</div>
          <h2>Exclusions</h2>

          <ul className="exc-list">
            <li>✈ Airfare to and from Bali</li>
            <li>📋 Indonesia Visa charges</li>
            <li>🧾 Travel Insurance</li>
            <li>🍹 Personal expenses</li>
            <li>🛍 Shopping & souvenirs</li>
            <li>📸 Optional activities (Water sports, spa)</li>
            <li>💊 Medical expenses</li>
          </ul>
        </motion.div>

      </div>
    </div>
  </motion.section>

    {/* ░░░ PRICING ░░░ */}
    <motion.section className="pricing" id="pricing" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Transparent Pricing</motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Reserve Your <em>Bali Escape</em></motion.h2>

      <div className="price-cards">

        <motion.div className="price-card" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <div className="pc-label">Solo Traveller</div>
          <div className="pc-old">₹38,999</div>
          <div className="pc-price">₹32,999</div>
          <div className="pc-badge">15% OFF</div>

          <ul className="pc-perks">
            <li>Beachfront resort stay (single occupancy)</li>
            <li>All inclusions covered</li>
            <li>Private airport transfers</li>
            <li>Personal travel assistance</li>
          </ul>

          <a href="#contact" className="btn-primary full-btn">Reserve Solo</a>
        </motion.div>

        <motion.div className="price-card featured" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
          <div className="pc-popular">Most Popular</div>
          <div className="pc-label">Couple Package</div>
          <div className="pc-old">₹68,999</div>
          <div className="pc-price">₹49,999</div>
          <div className="pc-badge">28% OFF</div>

          <ul className="pc-perks">
            <li>Luxury beach resort stay</li>
            <li>Romantic sunset dinner cruise</li>
            <li>Nusa Penida island tour</li>
            <li>Temple visits & cultural experiences</li>
            <li>Couple concierge support</li>
          </ul>

          <a href="#contact" className="btn-primary full-btn">Reserve for Two</a>
        </motion.div>

        <motion.div className="price-card" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
          <div className="pc-label">Family / Group (4 pax)</div>
          <div className="pc-old">₹1,19,999</div>
          <div className="pc-price">₹89,999</div>
          <div className="pc-badge">25% OFF</div>

          <ul className="pc-perks">
            <li>Luxury 2BHK / 3BHK villa stay</li>
            <li>Private car transfers</li>
            <li>Family island tour experience</li>
            <li>Cultural tour + beach time</li>
            <li>Group assistance throughout trip</li>
          </ul>

          <a href="#contact" className="btn-primary full-btn">Reserve for Group</a>
        </motion.div>

      </div>

      <motion.p className="price-note" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
        💳 EMI available · 100% refund if cancelled 7 days before departure · No hidden charges
      </motion.p>

    </div>
  </motion.section>
    {/* ░░░ TESTIMONIALS ░░░ */}
    <motion.section className="testimonials" id="testimonials" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Voices of Delight</motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Stories That <em>Shine in Bali</em></motion.h2>

      <div className="testi-slider">
        <div className="testi-track" id="testiTrack">

          <div className="testi-card">
            <div className="testi-stars">★★★★★</div>
            <p>
              "Bali's temples and beaches were absolutely magical. The rice terrace views and sunset at Tanah Lot made our honeymoon unforgettable."
            </p>
            <div className="testi-author">
              <img src="https://i.pravatar.cc/60?img=47" alt="Ananya S." />
              <div>
                <strong>Ananya Sharma</strong>
                <span>Mumbai · Honeymoon</span>
              </div>
            </div>
          </div>

          <div className="testi-card">
            <div className="testi-stars">★★★★★</div>
            <p>
              "Our family loved every moment — from Ubud's cultural experiences to Nusa Penida's crystal clear waters. Perfect balance of fun and relaxation."
            </p>
            <div className="testi-author">
              <img src="https://i.pravatar.cc/60?img=32" alt="Rohit & Priya" />
              <div>
                <strong>Rohit & Priya Menon</strong>
                <span>Bangalore · Family Package</span>
              </div>
            </div>
          </div>

          <div className="testi-card">
            <div className="testi-stars">★★★★★</div>
            <p>
              "Bali gave me the perfect mix of culture and beach relaxation. The temple visits and island hopping were incredible experiences."
            </p>
            <div className="testi-author">
              <img src="https://i.pravatar.cc/60?img=12" alt="Vikram N." />
              <div>
                <strong>Vikram Nair</strong>
                <span>Delhi · Solo Luxury</span>
              </div>
            </div>
          </div>

          <div className="testi-card">
            <div className="testi-stars">★★★★☆</div>
            <p>
              "Our friends trip to Bali was amazing. The beach clubs, temple tours, and sunset views made it a perfect vacation."
            </p>
            <div className="testi-author">
              <img src="https://i.pravatar.cc/60?img=25" alt="Kavita R." />
              <div>
                <strong>Kavita & Suresh Rao</strong>
                <span>Hyderabad · Friends Group</span>
              </div>
            </div>
          </div>

        </div>

        <div className="testi-controls">
          <button className="tc-btn" id="tcPrev">‹</button>
          <div className="tc-dots" id="tcDots"></div>
          <button className="tc-btn" id="tcNext">›</button>
        </div>
      </div>
    </div>
  </motion.section>

    {/* ░░░ ADD-ONS ░░░ */}
    <motion.section className="addons" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Enhance Your Stay</motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Optional <em>Luxury Add-Ons</em></motion.h2>

      <div className="addon-grid">

        <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <span>📸</span>
          <strong>Professional Photoshoot</strong>
          <p>Photography session at iconic Bali locations</p>
          <em>+₹4,999</em>
        </motion.div>

        <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
          <span>🛥</span>
          <strong>Private Yacht Charter</strong>
          <p>Sunset cruise around Nusa Dua waters</p>
          <em>+₹9,999</em>
        </motion.div>

        <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
          <span>🎂</span>
          <strong>Romantic Beach Setup</strong>
          <p>Private dinner with flowers & cake on beach</p>
          <em>+₹5,499</em>
        </motion.div>

        <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
          <span>🪂</span>
          <strong>Paragliding at Uluwatu</strong>
          <p>Ultimate adrenaline experience over cliffs</p>
          <em>+₹29,999</em>
        </motion.div>

      </div>
    </div>
  </motion.section>

    {/* ░░░ FINAL CTA ░░░ */}
    <motion.section className="final-cta" id="cta" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="fcta-bg">
      <img src="/Bali/bali-tanah-lot-sunset.jpg" alt="Bali Temple" />
      <div className="fcta-overlay"></div>
    </div>

    <motion.div className="fcta-content" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
      <div className="section-label light">The Time Is Now</div>

      <h2>
        Paradise Awaits.<br /><em>Bali is Calling.</em>
      </h2>

      <p>
        From the sacred temples of Ubud to golden sunsets at Tanah Lot and pristine beaches of Seminyak,
        your unforgettable Bali escape begins here.
      </p>

      <a href="#pricing" className="btn-primary large-btn">Start Your Journey</a>
    </motion.div>
  </motion.section>

    {/* ░░░ CONTACT STRIP ░░░ */}
    <motion.section className="contact-strip" id="contact" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
      <div className="container">
        <div className="cs-grid">
          <motion.div className="cs-col" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
            <h3>Have Questions?</h3>
            <p>Our travel curators are available 9AM–9PM, 7 days a week for your Bali journey.</p>
            <div className="cs-actions">
              <a href="tel:+919494141475" className="cs-btn">📞 +91 94941 41475</a>
              <a href="mailto:hello@aruvitours.in" className="cs-btn">✉ hello@aruvitours.in</a>
            </div>
          </motion.div>
          <motion.div className="cs-col" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
            <h3>Quick Enquiry</h3>
            <form className="enquiry-form" onSubmit={(e) => { e.preventDefault(); window.submitEnquiry && window.submitEnquiry(); }}>
              <input type="text" id="formName" placeholder="Your Name" required />
              <input type="tel" id="formPhone" placeholder="Phone Number" required />
              <input type="hidden" id="formPkg" value="Bali Package" />
              <button type="submit" className="btn-primary">Send Enquiry</button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>

      </div>
      <WhatsAppFloat />
      <Footer />
    </>
  );
}