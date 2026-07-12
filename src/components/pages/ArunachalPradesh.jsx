import { motion } from 'motion/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import WhatsAppFloat from '../Shared/Whatsappfloat';

export default function ArunachalPradesh() {

  useEffect(() => {
    document.title = "Arunachal Pradesh | Aruvi Tours";
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
      lightboxImg.src = src.startsWith('http') || src.startsWith('/') ? src : `/Arunachal Pradesh/${src}`;
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
      <img src="/Arunachal Pradesh/hero.jpg" alt="Arunachal Pradesh mountains" className="hero-img" id="heroImg" />
      <div className="hero-overlay"></div>
      <div className="hero-grain"></div>
    </div>

    <div className="hero-content">
      <motion.div className="hero-badge" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <span className="badge-dot"></span>
        5 Nights · 6 Days · Arunachal Pradesh, India
      </motion.div>
      <motion.h1 className="hero-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <em>Arunachal Pradesh</em><br />Explorer
      </motion.h1>
      <motion.p className="hero-tagline" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
        Where emerald valleys meet misty Himalayan horizons
      </motion.p>
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
      <span className="weather-icon">☀️</span>
      <span>28°C · Sunny</span>
    </div>
  </motion.section>

  {/* ░░░ QUICK INFO BAR ░░░ */}
  <div className="infobar" id="infobar">
    <div className="infobar-inner">
      <div className="info-item">
        <span className="info-icon">🗓</span>
        <div>
          <span className="info-label">Duration</span>
          <span className="info-val">3N / 4D</span>
        </div>
      </div>
      <div className="info-divider"></div>
      <div className="info-item">
        <span className="info-icon">ðŸ“</span>
        <div>
          <span className="info-label">Location</span>
          <span className="info-val">Arunachal Pradesh, India</span>
        </div>
      </div>
      <div className="info-divider"></div>
      <div className="info-item">
        <span className="info-icon">💰</span>
        <div>
          <span className="info-label">Starting From</span>
          <span className="info-val">₹31,999<small>/person</small></span>
        </div>
      </div>
      <div className="info-divider"></div>
      <div className="info-item">
        <span className="info-icon">⭐</span>
        <div>
          <span className="info-label">Rating</span>
          <span className="info-val">4.8 / 5.0</span>
        </div>
      </div>
      <div className="info-divider"></div>
      <div className="info-item">
        <span className="info-icon">🌤</span>
        <div>
          <span className="info-label">Best Time</span>
          <span className="info-val">Oct – Apr</span>
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
          <h2>Monasteries, Valleys &amp; Clouds<br /><em>Arunachal Grandeur</em></h2>
          <p>Immerse yourself in Arunachal Pradesh's quiet beauty — where snow-dusted peaks, prayer flags, sacred monasteries, and alpine roads shape a journey that feels untouched and unforgettable. This curated 5N/6D package is designed for travellers who want the Northeast at its most serene.</p>
          <p>From sunrise over Tawang to the calm waters of Sela Pass and the cultural rhythm of Ziro or Dirang, every moment is choreographed to reveal the best of the state. Handpicked stays, local cuisine, and guided excursions await.</p>
          <a href="#itinerary" className="link-arrow">Explore the Journey <span>→</span></a>
        </motion.div>
        <motion.div className="about-highlights" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
          <div className="highlight-card">
            <div className="hc-icon">ðŸ–</div>
            <div>
              <strong>Mountain View Stays</strong>
              <p>Curated stays with valley and ridge views</p>
            </div>
          </div>
          <div className="highlight-card">
            <div className="hc-icon">ðŸ·</div>
            <div>
              <strong>Curated Dining</strong>
              <p>Handpicked local restaurants &amp; warm dinners</p>
            </div>
          </div>
          <div className="highlight-card">
            <div className="hc-icon">🛥</div>
            <div>
              <strong>Scenic Road Journeys</strong>
              <p>High-altitude drives with photo stops and viewpoints</p>
            </div>
          </div>
          <div className="highlight-card">
            <div className="hc-icon">ðŸ›</div>
            <div>
              <strong>Heritage &amp; Monasteries</strong>
              <p>Ancient monasteries, temples and local heritage trails</p>
            </div>
          </div>
          <div className="highlight-card">
            <div className="hc-icon">🧘</div>
            <div>
              <strong>Wellness Ritual</strong>
              <p>Quiet mornings, fresh mountain air and restorative stays</p>
            </div>
          </div>
          <div className="highlight-card">
            <div className="hc-icon">🎭</div>
            <div>
              <strong>Tea &amp; Craft Experiences</strong>
              <p>Tea gardens, weaving villages and local craft visits</p>
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
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Frames of <em>Arunachal</em></motion.h2>
    </div>
    <div className="gallery-grid" id="galleryGrid">
      <motion.div className="gallery-item" data-src="/Arunachal Pradesh/1.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <img src="/Arunachal Pradesh/1.jpg" alt="Arunachal valley" />
        <div className="gallery-caption">Arunachal Valley</div>
      </motion.div>
      <motion.div className="gallery-item" data-src="/Arunachal Pradesh/2.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <img src="/Arunachal Pradesh/2.jpg" alt="Sela Pass" />
        <div className="gallery-caption">Sela Pass</div>
      </motion.div>
      <motion.div className="gallery-item" data-src="/Arunachal Pradesh/3.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <img src="/Arunachal Pradesh/3.jpg" alt="Mountain river" />
        <div className="gallery-caption">Mountain River</div>
      </motion.div>
      <motion.div className="gallery-item" data-src="/Arunachal Pradesh/4.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <img src="/Arunachal Pradesh/4.jpg" alt="Tawang monastery" />
        <div className="gallery-caption">Tawang Monastery</div>
      </motion.div>
      <motion.div className="gallery-item" data-src="/Arunachal Pradesh/5.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <img src="/Arunachal Pradesh/5.jpg" alt="Ziro valley" />
        <div className="gallery-caption">Ziro Valley</div>
      </motion.div>
      <motion.div className="gallery-item" data-src="/Arunachal Pradesh/6.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
        <img src="/Arunachal Pradesh/6.jpg" alt="Mountain sunrise" />
        <div className="gallery-caption">Mountain Sunrise</div>
      </motion.div>
    </div>

    {/* Lightbox */}
    <div className="lightbox" id="lightbox">
      <button className="lb-close" id="lbClose">✕</button>
      <button className="lb-arrow lb-prev" id="lbPrev">‹</button>
      <img src="" alt="Lightbox gallery image for Arunachal Pradesh" className="lb-img" id="lbImg" />
      <button className="lb-arrow lb-next" id="lbNext">›</button>
    </div>
  </motion.section>

  {/* ░░░ ITINERARY ░░░ */}
  <motion.section className="itinerary" id="itinerary" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Day by Day</motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Your <em>Journey</em> Unfolds</motion.h2>

      <div className="timeline">

        <motion.div className="tl-item" data-day="1" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <div className="tl-marker">
            <span className="tl-day">Day 1</span>
            <div className="tl-dot"></div>
          </div>
          <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
            <div className="tl-header">
              <div>
                <h3>Arrival in Guwahati / Itanagar</h3>
                <span className="tl-sub">Gateway arrival → scenic check-in</span>
              </div>
              <div className="tl-chevron">▾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>🚗 Private transfer from the gateway airport or station to your hotel</li>
                <li>ðŸµ Welcome drink &amp; briefing with your travel curator</li>
                <li>🌄 Leisure walk with first views of the hills</li>
                <li>ðŸ½ Dinner with local Assamese / tribal flavours</li>
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
                <h3>Tawang Valley Drive</h3>
                <span className="tl-sub">High passes · Lakes · Monasteries</span>
              </div>
              <div className="tl-chevron">▾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>🛕 Scenic drive via Sela Pass with photo stops</li>
                <li>📸 Stop at Sela Lake and memorial viewpoints</li>
                <li>ðŸ” Visit Tawang Monastery and local market</li>
                <li>ðŸµ Warm dinner at the mountain lodge</li>
              </ul>
              <div className="tl-note">Meals: Breakfast &amp; Dinner included</div>
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
                <h3>Ziro / Dirang Experience</h3>
                <span className="tl-sub">Valleys · Culture · Village life</span>
              </div>
              <div className="tl-chevron">▾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>ðŸž Explore the Ziro plateau or Dirang valley</li>
                <li>🧵 Visit Apatani / Monpa craft villages and local homes</li>
                <li>ðŸ² Enjoy a traditional lunch with regional flavours</li>
                <li>🌇 Sunset viewpoints with tranquil mountain views</li>
              </ul>
              <div className="tl-note">Meals: Breakfast &amp; Lunch included</div>
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
                <h3>Guwahati Heritage &amp; Departure</h3>
                <span className="tl-sub">Temples · Riverfront · Transfer</span>
              </div>
              <div className="tl-chevron">▾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>☕ Leisurely breakfast at the hotel</li>
                <li>🛕 Optional visit to a temple or local market</li>
                <li>ðŸ› Last-minute shopping for textiles and handicrafts</li>
                <li>🚗 Private transfer to airport / station with farewell assistance</li>
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
          <motion.h2 className="" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Arunachal <em>Inclusions</em></motion.h2>
          <div className="inc-cards">
            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
              <div className="ic-icon">ðŸ¨</div>
              <div>
                <strong>Mountain Stay</strong>
                <p>5 nights in curated stays with valley or ridge views</p>
              </div>
            </motion.div>
            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
              <div className="ic-icon">🚗</div>
              <div>
                <strong>Private Transfers</strong>
                <p>All airport, inter-city &amp; excursion transfers included</p>
              </div>
            </motion.div>
            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
              <div className="ic-icon">ðŸ½</div>
              <div>
                <strong>Curated Meals</strong>
                <p>Daily breakfast + local dinners and regional tasting experiences</p>
              </div>
            </motion.div>
            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
              <div className="ic-icon">🗺</div>
              <div>
                <strong>Private Guided Tours</strong>
                <p>Tawang, Ziro / Dirang and heritage sites with local guides</p>
              </div>
            </motion.div>
            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
              <div className="ic-icon">🛥</div>
              <div>
                <strong>Scenic Pass Experience</strong>
                <p>High-altitude drives with stops at lakes and viewpoints</p>
              </div>
            </motion.div>
            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
              <div className="ic-icon">🧘</div>
              <div>
                <strong>Culture &amp; Wellness</strong>
                <p>Village visits, tea stops and restorative mountain downtime</p>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div className="exc-col" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
          <div className="section-label">What's Excluded</div>
          <h2>Exclusions</h2>
          <ul className="exc-list">
            <li>✈ Airfare / Train tickets to and from Arunachal gateway cities</li>
            <li>📋 Travel Insurance (we recommend purchasing separately)</li>
            <li>🧾 GST / Service taxes (applied at checkout)</li>
            <li>ðŸº Alcohol &amp; beverages beyond package meals</li>
            <li>ðŸ› Personal shopping &amp; laundry</li>
            <li>📸 Optional photography session (add-on available)</li>
            <li>💊 Medical expenses or emergency costs</li>
          </ul>
        </motion.div>

      </div>
    </div>
  </motion.section>

  {/* ░░░ PRICING ░░░ */}
  <motion.section className="pricing" id="pricing" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Transparent Pricing</motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Reserve Your <em>Arunachal Escape</em></motion.h2>

      <div className="price-cards">

        <motion.div className="price-card" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <div className="pc-label">Solo Traveller</div>
          <div className="pc-old">₹39,999</div>
          <div className="pc-price">₹29,999</div>
          <div className="pc-badge">24% OFF</div>
          <ul className="pc-perks">
            <li>Mountain-view room (single occupancy)</li>
            <li>All inclusions above</li>
            <li>Personalised concierge</li>
          </ul>
          <a href="#contact" className="btn-primary full-btn">Reserve Solo</a>
        </motion.div>

        <motion.div className="price-card featured" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
          <div className="pc-popular">Most Popular</div>
          <div className="pc-label">Couple Package</div>
          <div className="pc-old">₹69,999</div>
          <div className="pc-price">₹52,999</div>
          <div className="pc-badge">27% OFF</div>
          <ul className="pc-perks">
            <li>Romantic mountain-view suite</li>
            <li>Couples dinner + curated private experience</li>
            <li>All inclusions above</li>
            <li>Anniversary / honeymoon décor</li>
            <li>24/7 dedicated concierge</li>
          </ul>
          <a href="#contact" className="btn-primary full-btn">Reserve for Two</a>
        </motion.div>

        <motion.div className="price-card" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
          <div className="pc-label">Family / Group (4 pax)</div>
          <div className="pc-old">₹1,09,999</div>
          <div className="pc-price">₹82,999</div>
          <div className="pc-badge">26% OFF</div>
          <ul className="pc-perks">
            <li>Family rooms / connected stays</li>
            <li>Kids' nature activities + family sightseeing</li>
            <li>All inclusions above</li>
            <li>Group transfers &amp; guided tours</li>
          </ul>
          <a href="#contact" className="btn-primary full-btn">Reserve for Group</a>
        </motion.div>

      </div>

      <motion.p className="price-note" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>💳 EMI available · 100% refund if cancelled 10 days before · No hidden charges</motion.p>
    </div>
  </motion.section>

  {/* ░░░ TESTIMONIALS ░░░ */}
  <motion.section className="testimonials" id="testimonials" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Voices of Delight</motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Stories That <em>Stay</em></motion.h2>

      <div className="testi-slider">
        <div className="testi-track" id="testiTrack">

          <div className="testi-card">
            <div className="testi-stars">★★★★★</div>
            <p>"The mountain drives and monastery visits were beyond anything I imagined. Every detail felt intentional — from the early departures to the warm dinners in the hills. Arunachal through Lumière's lens is pure magic."</p>
            <div className="testi-author">
              <img src="https://i.pravatar.cc/60?img=47" alt="Ananya S." />
              <div>
                <strong>Ananya Sharma</strong>
                <span>Mumbai · Solo Traveller</span>
              </div>
            </div>
          </div>

          <div className="testi-card">
            <div className="testi-stars">★★★★★</div>
            <p>"Our honeymoon package exceeded every expectation. The misty lakes, the mountain-view dinners, and the calm pace of the journey made it effortlessly romantic. Already planning our anniversary trip."</p>
            <div className="testi-author">
              <img src="https://i.pravatar.cc/60?img=32" alt="Rohit &amp; Priya" />
              <div>
                <strong>Rohit &amp; Priya Menon</strong>
                <span>Bangalore · Honeymoon Package</span>
              </div>
            </div>
          </div>

          <div className="testi-card">
            <div className="testi-stars">★★★★★</div>
            <p>"As someone who travels frequently for work, I needed a vacation that truly recharged me. The monastery visits, the high-altitude roads, and the cultural stops — each experience was soulful and unhurried."</p>
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
            <p>"Took the family package for our daughter's graduation. The stays had space for everyone, the kids loved the scenic drives, and the parents got the cultural stops. A rare win for all ages."</p>
            <div className="testi-author">
              <img src="https://i.pravatar.cc/60?img=25" alt="Kavita R." />
              <div>
                <strong>Kavita &amp; Suresh Rao</strong>
                <span>Hyderabad · Family Group</span>
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
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Enhance Your Journey</motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Optional <em>Add-Ons</em></motion.h2>
      <div className="addon-grid">
        <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <span>📸</span>
          <strong>Professional Photoshoot</strong>
          <p>2-hour mountain sunrise session</p>
          <em>+₹3,999</em>
        </motion.div>
        <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
          <span>🛵</span>
          <strong>Private 4x4 Upgrade</strong>
          <p>Extra comfort on mountain routes</p>
          <em>+₹1,499</em>
        </motion.div>
        <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
          <span>🎂</span>
          <strong>Celebration Décor</strong>
          <p>Flowers, cake &amp; personalised setup</p>
          <em>+₹2,499</em>
        </motion.div>
        <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
          <span>🤿</span>
          <strong>Cultural Evening</strong>
          <p>Traditional performance and dinner</p>
          <em>+₹2,999</em>
        </motion.div>
      </div>
    </div>
  </motion.section>

  {/* ░░░ FINAL CTA ░░░ */}
  <motion.section className="final-cta" id="cta" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="fcta-bg">
      <img src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1800&amp;q=85" alt="Arunachal Mountains" />
      <div className="fcta-overlay"></div>
    </div>
    <motion.div className="fcta-content" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
      <div className="section-label light">The Time Is Now</div>
      <h2>Life is Short.<br /><em>Arunachal is Calling.</em></h2>
      <p>Every great journey begins with a single, unhesitating step. Let us take care of every detail that follows.</p>
      <a href="#pricing" className="btn-primary large-btn">Start Your Journey</a>
    </motion.div>
  </motion.section>

  {/* ░░░ CONTACT STRIP ░░░ */}
  <motion.section className="contact-strip" id="contact" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <div className="cs-grid">
        <motion.div className="cs-col" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <h3>Have Questions?</h3>
          <p>Our travel curators are available 9AM–9PM, 7 days a week.</p>
          <div className="cs-actions">
            <a href="tel:+919494141475" className="cs-btn">📞 +91 94941 41475</a>
            <a href="mailto:hello@lumierevoyage.in" className="cs-btn">✉ hello@lumierevoyage.in</a>
          </div>
        </motion.div>
        <motion.div className="cs-col" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
          <h3>Quick Enquiry</h3>
          <div className="cs-form">
            <input type="text" placeholder="Your Name" className="cs-input" id="formName" />
            <input type="tel" placeholder="Phone Number" className="cs-input" id="formPhone" />
            <select className="cs-input" id="formPkg">
              <option value="">Select Package</option>
              <option>Solo Traveller</option>
              <option>Couple Package</option>
              <option>Family / Group</option>
            </select>
            <button className="btn-primary" onClick={() => window.submitEnquiry && window.submitEnquiry()}>Send Enquiry</button>
          </div>
        </motion.div>
      </div>
    </div>
  </motion.section>

  {/* ░░░ FOOTER ░░░ */}
  

  {/* Toast notification */}
  <div className="toast" id="toast"></div>
      </div>
      <Footer />
      <WhatsAppFloat />
    </>
  );
};
