import { motion } from 'motion/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import WhatsAppFloat from '../Shared/Whatsappfloat';

export default function China() {

  useEffect(() => {
    document.title = "China | Aruvi Tours";
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
      lightboxImg.src = src.startsWith('http') || src.startsWith('/') ? src : `/China/${src}`;
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
    <img src="/China/view.webp" alt="China" className="hero-img" id="heroImg" />
    <div className="hero-overlay"></div>
    <div className="hero-grain"></div>
  </div>

  <div className="hero-content">
    <motion.div className="hero-badge" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
      <span className="badge-dot"></span>
      2 Packages · China · Multiple Durations
    </motion.div>

    <motion.h1 className="hero-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
      <em>China</em><br />Luxury Escape
    </motion.h1>

    <motion.p className="hero-tagline" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
      Explore the timeless beauty of China through a premium journey across modern skylines, ancient heritage, and breathtaking landscapes.
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

  {/* Floating weather pill */}
  <div className="hero-weather">
    <span className="weather-icon">☀️</span>
    <span>Varies · Continental Climate</span>
  </div>
</motion.section>

{/* ░░░ QUICK INFO BAR ░░░ */}
<div className="infobar" id="infobar">
  <div className="infobar-inner">

    <div className="info-item">
      <span className="info-icon">🗓</span>
      <div>
        <span className="info-label">Packages</span>
        <span className="info-val">6N/7D · 8N/9D</span>
      </div>
    </div>

    <div className="info-divider"></div>

    <div className="info-item">
      <span className="info-icon">ðŸ“</span>
      <div>
        <span className="info-label">Destinations</span>
        <span className="info-val"> Beijing · Shanghai · Xi’an</span>
      </div>
    </div>

    <div className="info-divider"></div>

    <div className="info-item">
      <span className="info-icon">💰</span>
      <div>
        <span className="info-label">Starting From</span>
        <span className="info-val">₹49,999 <small>/person</small></span>
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
      <span className="info-icon">🌿</span>
      <div>
        <span className="info-label">Best Time</span>
        <span className="info-val">March – May · September – November</span>
      </div>
    </div>

  </div>
</div>

{/* ░░░ PACKAGE SELECTOR ░░░ */}
<motion.section className="packages" id="packages" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
  <div className="container">
    <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Choose Your Journey</motion.div>
    <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Select Your <em>Package</em></motion.h2>

    <motion.div className="pkg-tabs" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
      <button className="pkg-tab active" data-pkg="6n7d" onClick={() => window.switchPackage && window.switchPackage('6n7d', this)}>
        <span className="pkg-tab-duration">6N / 7D</span>
        <span className="pkg-tab-name">Classic China Escape</span>
      </button>
      <button className="pkg-tab" data-pkg="8n9d" onClick={() => window.switchPackage && window.switchPackage('8n9d', this)}>
        <span className="pkg-tab-duration">8N / 9D</span>
        <span className="pkg-tab-name">Grand China Explorer</span>
      </button>
    </motion.div>
  </div>
</motion.section>

{/* ░░░ ABOUT ░░░ */}
<motion.section className="about" id="about" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
  <div className="container">
    <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>The Experience</motion.div>
    <div className="about-grid">

      <motion.div className="about-text" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
        <h2>Cultural Heritage<br /><em>China Grandeur</em></h2>

        <p>Discover the timeless beauty of China with Aruvi Tours, where every journey blends ancient heritage, futuristic cities, and breathtaking landscapes. From the Great Wall ðŸ¯ to the dazzling skyline of Shanghai 🌆 and the historic wonders of Beijing ðŸ®, China offers an unforgettable travel experience.</p>

        <p>Our curated packages are designed to give you a seamless journey — combining premium stays, guided cultural tours, and iconic destinations. Whether it’s a short discovery trip or a grand exploration, Aruvi Tours ensures every moment is immersive, comfortable, and extraordinary ✨.</p>

        <a href="#itinerary" className="link-arrow">Explore the Journey <span>→</span></a>
      </motion.div>

      <motion.div className="about-highlights" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>

        <div className="highlight-card">
          <div className="hc-icon">ðŸ¯</div>
          <div>
            <strong>Great Wall of China</strong>
            <p>An ancient wonder stretching across mountains — offering breathtaking views and historic significance.</p>
          </div>
        </div>

        <div className="highlight-card">
          <div className="hc-icon">🌆</div>
          <div>
            <strong>Shanghai Skyline</strong>
            <p>A futuristic cityscape featuring the Bund, skyscrapers, and vibrant night lights along the Huangpu River.</p>
          </div>
        </div>

        <div className="highlight-card">
          <div className="hc-icon">ðŸ®</div>
          <div>
            <strong>Beijing Heritage</strong>
            <p>Home to the Forbidden City and ancient temples showcasing China’s royal history and culture.</p>
          </div>
        </div>

        <div className="highlight-card">
          <div className="hc-icon">ðŸ¼</div>
          <div>
            <strong>Chengdu Panda Base</strong>
            <p>Meet the adorable giant pandas in their natural conservation habitat.</p>
          </div>
        </div>

        <div className="highlight-card">
          <div className="hc-icon">⛰️</div>
          <div>
            <strong>Zhangjiajie Mountains</strong>
            <p>Otherworldly pillar-like mountains that inspired floating landscapes in fantasy films.</p>
          </div>
        </div>

        <div className="highlight-card">
          <div className="hc-icon">🌊</div>
          <div>
            <strong>Guilin River Cruise</strong>
            <p>Scenic Li River cruises through limestone karsts and peaceful countryside views.</p>
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
    <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Frames of <em>China</em></motion.h2>
  </div>

  <div className="gallery-grid" id="galleryGrid">

    <motion.div className="gallery-item" data-src="/China/greatwall.webp" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
      <img src="/China/greatwall.webp" alt="Great Wall of China" />
      <div className="gallery-caption">Great Wall of China</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="/China/shanghai.webp" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
      <img src="/China/shanghai.webp" alt="Shanghai Skyline" />
      <div className="gallery-caption">Shanghai Skyline</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="/China/beijing.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
      <img src="/China/beijing.jpg" alt="Beijing City" />
      <div className="gallery-caption">Beijing Heritage</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="/China/chengdu.webp" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
      <img src="/China/chengdu.webp" alt="Chengdu Pandas" />
      <div className="gallery-caption">Chengdu Panda Base</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="/China/view.webp" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
      <img src="/China/view.webp" alt="Zhangjiajie Mountains" />
      <div className="gallery-caption">Zhangjiajie Mountains</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="/China/guilin.webp" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
      <img src="/China/guilin.webp" alt="Guilin River" />
      <div className="gallery-caption">Guilin River Cruise</div>
    </motion.div>

  </div>

  {/* Lightbox */}
  <div className="lightbox" id="lightbox">
    <button className="lb-close" id="lbClose">✕</button>
    <button className="lb-arrow lb-prev" id="lbPrev">‹</button>
    <img src="" alt="Lightbox gallery image for China" className="lb-img" id="lbImg" />
    <button className="lb-arrow lb-next" id="lbNext">›</button>
  </div>
</motion.section>

  {/* ░░░ ITINERARY — PACKAGES ░░░ */}
  <motion.section id="itinerary" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Itineraries</motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Your <em>Journey</em> Unfolds</motion.h2>
    </div>

    {/* 6N / 7D — Classic China Escape */}
    <motion.section className="itinerary pkg-itinerary active" data-pkg-section="6n7d" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
      <div className="container">
        <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>6N / 7D · Classic China Escape</motion.div>
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Your <em>Journey</em> Unfolds</motion.h2>

        <motion.div className="pkg-route-pills" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <span className="route-pill">✈ Arrival</span>
          <span className="route-arrow">→</span>
          <span className="route-pill">Beijing</span>
          <span className="route-arrow">→</span>
          <span className="route-pill">Great Wall</span>
          <span className="route-arrow">→</span>
          <span className="route-pill">Xi'an</span>
          <span className="route-arrow">→</span>
          <span className="route-pill">Shanghai</span>
          <span className="route-arrow">→</span>
          <span className="route-pill">✈ Departure</span>
        </motion.div>

        <div className="timeline">
          <motion.div className="tl-item" data-day="1" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
            <div className="tl-marker"><span className="tl-day">Day 1</span><div className="tl-dot"></div></div>
            <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
              <div className="tl-header">
                <div>
                  <h3>Arrival in Beijing</h3>
                  <span className="tl-sub">Airport → City Hotel</span>
                </div>
                <div className="tl-chevron">▾</div>
              </div>
              <div className="tl-body">
                <ul>
                  <li>🚗 Airport pickup</li>
                  <li>ðŸ¨ Hotel check-in</li>
                  <li>🌆 Evening Wangfujing walk</li>
                  <li>ðŸ½️ Dinner at hotel</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div className="tl-item" data-day="2" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
            <div className="tl-marker"><span className="tl-day">Day 2</span><div className="tl-dot"></div></div>
            <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
              <div className="tl-header">
                <div>
                  <h3>Great Wall Adventure</h3>
                  <span className="tl-sub">Heritage · Mountains</span>
                </div>
                <div className="tl-chevron">▾</div>
              </div>
              <div className="tl-body">
                <ul>
                  <li>🧱 Great Wall visit</li>
                  <li>📸 Scenic viewpoints</li>
                  <li>ðŸž Cable car ride</li>
                  <li>ðŸ½️ Dinner at hotel</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div className="tl-item" data-day="3" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
            <div className="tl-marker"><span className="tl-day">Day 3</span><div className="tl-dot"></div></div>
            <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
              <div className="tl-header">
                <div>
                  <h3>Beijing Heritage Tour</h3>
                  <span className="tl-sub">Culture · Temples</span>
                </div>
                <div className="tl-chevron">▾</div>
              </div>
              <div className="tl-body">
                <ul>
                  <li>ðŸ¯ Forbidden City</li>
                  <li>🛕 Temple of Heaven</li>
                  <li>ðŸ› Local markets</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div className="tl-item" data-day="4" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
            <div className="tl-marker"><span className="tl-day">Day 4</span><div className="tl-dot"></div></div>
            <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
              <div className="tl-header">
                <div>
                  <h3>Travel to Xi'an</h3>
                  <span className="tl-sub">Train · Ancient City</span>
                </div>
                <div className="tl-chevron">▾</div>
              </div>
              <div className="tl-body">
                <ul>
                  <li>🚄 High-speed train</li>
                  <li>ðŸ¨ Hotel check-in</li>
                  <li>🌃 Evening city wall walk</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div className="tl-item" data-day="5" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
            <div className="tl-marker"><span className="tl-day">Day 5</span><div className="tl-dot"></div></div>
            <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
              <div className="tl-header">
                <div>
                  <h3>Terracotta Warriors</h3>
                  <span className="tl-sub">History · UNESCO Site</span>
                </div>
                <div className="tl-chevron">▾</div>
              </div>
              <div className="tl-body">
                <ul>
                  <li>ðŸº Terracotta Army visit</li>
                  <li>📸 Museum exploration</li>
                  <li>ðŸ½️ Dinner at hotel</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div className="tl-item" data-day="6" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
            <div className="tl-marker"><span className="tl-day">Day 6</span><div className="tl-dot"></div></div>
            <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
              <div className="tl-header">
                <div>
                  <h3>Shanghai Arrival</h3>
                  <span className="tl-sub">Skyline · City Lights</span>
                </div>
                <div className="tl-chevron">▾</div>
              </div>
              <div className="tl-body">
                <ul>
                  <li>🚄 Transfer to Shanghai</li>
                  <li>🌉 The Bund walk</li>
                  <li>ðŸ™ Night skyline view</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>

    {/* 8N / 9D — Grand China Explorer */}
    <motion.section className="itinerary pkg-itinerary" data-pkg-section="8n9d" style={{"display":"none"}} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
      <div className="container">
        <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>8N / 9D · Grand China Explorer</motion.div>
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Your <em>Journey</em> Unfolds</motion.h2>

        <motion.div className="pkg-route-pills" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <span className="route-pill">✈ Arrival</span>
          <span className="route-arrow">→</span>
          <span className="route-pill">Beijing</span>
          <span className="route-arrow">→</span>
          <span className="route-pill">Great Wall</span>
          <span className="route-arrow">→</span>
          <span className="route-pill">Xi'an</span>
          <span className="route-arrow">→</span>
          <span className="route-pill">Guilin</span>
          <span className="route-arrow">→</span>
          <span className="route-pill">Shanghai</span>
          <span className="route-arrow">→</span>
          <span className="route-pill">✈ Departure</span>
        </motion.div>

        <div className="timeline">
          <motion.div className="tl-item" data-day="1" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
            <div className="tl-marker"><span className="tl-day">Day 1</span><div className="tl-dot"></div></div>
            <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
              <div className="tl-header">
                <div>
                  <h3>Arrival in Beijing</h3>
                  <span className="tl-sub">Airport → Hotel</span>
                </div>
                <div className="tl-chevron">▾</div>
              </div>
              <div className="tl-body">
                <ul>
                  <li>🚗 Airport transfer</li>
                  <li>ðŸ¨ Hotel check-in</li>
                  <li>🌆 Evening leisure walk</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div className="tl-item" data-day="2" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
            <div className="tl-marker"><span className="tl-day">Day 2</span><div className="tl-dot"></div></div>
            <div className="tl-card">
              <div className="tl-header"><div><h3>Great Wall</h3></div></div>
              <div className="tl-body">
                <ul>
                  <li>🧱 Great Wall exploration</li>
                  <li>📸 Scenic photography</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div className="tl-item" data-day="3" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
            <div className="tl-marker"><span className="tl-day">Day 3</span><div className="tl-dot"></div></div>
            <div className="tl-card">
              <div className="tl-header"><div><h3>Beijing Culture Tour</h3></div></div>
              <div className="tl-body">
                <ul>
                  <li>ðŸ¯ Forbidden City</li>
                  <li>🛕 Temple of Heaven</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div className="tl-item" data-day="4" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
            <div className="tl-marker"><span className="tl-day">Day 4</span><div className="tl-dot"></div></div>
            <div className="tl-card">
              <div className="tl-header"><div><h3>Xi'an Transfer</h3></div></div>
              <div className="tl-body">
                <ul>
                  <li>🚄 Train journey</li>
                  <li>ðŸ¨ Hotel check-in</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div className="tl-item" data-day="5" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
            <div className="tl-marker"><span className="tl-day">Day 5</span><div className="tl-dot"></div></div>
            <div className="tl-card">
              <div className="tl-header"><div><h3>Terracotta Army</h3></div></div>
              <div className="tl-body">
                <ul>
                  <li>ðŸº Museum visit</li>
                  <li>📸 Historical exploration</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div className="tl-item" data-day="6" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
            <div className="tl-marker"><span className="tl-day">Day 6</span><div className="tl-dot"></div></div>
            <div className="tl-card">
              <div className="tl-header"><div><h3>Guilin Scenic Tour</h3></div></div>
              <div className="tl-body">
                <ul>
                  <li>⛰ Li River cruise</li>
                  <li>🌄 Karst mountains</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div className="tl-item" data-day="7" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
            <div className="tl-marker"><span className="tl-day">Day 7</span><div className="tl-dot"></div></div>
            <div className="tl-card">
              <div className="tl-header"><div><h3>Shanghai Arrival</h3></div></div>
              <div className="tl-body">
                <ul>
                  <li>🚄 Transfer to Shanghai</li>
                  <li>🌉 The Bund night view</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div className="tl-item" data-day="8" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
            <div className="tl-marker"><span className="tl-day">Day 8</span><div className="tl-dot"></div></div>
            <div className="tl-card">
              <div className="tl-header"><div><h3>Shanghai City Tour</h3></div></div>
              <div className="tl-body">
                <ul>
                  <li>ðŸ™ Oriental Pearl Tower</li>
                  <li>ðŸ› Shopping streets</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
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
              <div className="ic-icon">ðŸ¨</div>
              <div>
                <strong>5-Star Hotel Stay</strong>
                <p>Luxury boutique hotels in all destinations across China</p>
              </div>
            </motion.div>

            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
              <div className="ic-icon">🚗</div>
              <div>
                <strong>Private Transfers</strong>
                <p>All airport and intercity transfers included</p>
              </div>
            </motion.div>

            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
              <div className="ic-icon">ðŸ½</div>
              <div>
                <strong>Curated Meals</strong>
                <p>Daily breakfast + premium dinners as per itinerary</p>
              </div>
            </motion.div>

            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
              <div className="ic-icon">🚢</div>
              <div>
                <strong>Yangtze River Cruise</strong>
                <p>Luxury cruise experience with scenic landscapes</p>
              </div>
            </motion.div>

            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
              <div className="ic-icon">🗺</div>
              <div>
                <strong>Guided Tours</strong>
                <p>Expert local guides at every destination</p>
              </div>
            </motion.div>

            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
              <div className="ic-icon">🧘</div>
              <div>
                <strong>Spa &amp; Wellness</strong>
                <p>Traditional wellness &amp; relaxation experiences (Premium Package)</p>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div className="exc-col" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
          <div className="section-label">What's Excluded</div>
          <h2>Exclusions</h2>
          <ul className="exc-list">
            <li>✈ International airfare to/from China</li>
            <li>📋 Travel Insurance</li>
            <li>🧾 Visa charges</li>
            <li>ðŸº Personal expenses</li>
            <li>ðŸ› Shopping &amp; souvenirs</li>
            <li>📸 Optional add-ons</li>
            <li>💊 Medical expenses</li>
          </ul>
        </motion.div>

      </div>
    </div>
  </motion.section>

  {/* ░░░ PRICING ░░░ */}
  <motion.section className="pricing" id="pricing" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>6N/7D · China Escape</motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Reserve Your <em>Journey</em></motion.h2>

      <div className="price-cards">

        {/* Card 1 — Solo */}
        <motion.div className="price-card" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <div className="pc-label">6N / 7D · Solo Traveller</div>
          <div className="pc-old">₹59,999</div>
          <div className="pc-price">₹44,999</div>
          <div className="pc-badge">25% OFF</div>
          <ul className="pc-perks">
            <li>Beijing 2 nights + Shanghai 2 nights + Xi’an 2 nights</li>
            <li>All transfers &amp; guided sightseeing tours</li>
            <li>Great Wall &amp; Forbidden City visit</li>
            <li>Meals as per itinerary</li>
          </ul>
          <a href="#contact" className="btn-primary full-btn" onClick={() => window.selectPackage && window.selectPackage('6N/7D China Escape – Solo')}>Reserve 6N/7D Solo</a>
        </motion.div>

        {/* Card 2 — Couple (featured) */}
        <motion.div className="price-card featured" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
          <div className="pc-popular">Most Popular</div>
          <div className="pc-label">6N / 7D · Couple</div>
          <div className="pc-old">₹1,10,999</div>
          <div className="pc-price">₹84,999</div>
          <div className="pc-badge">30% OFF</div>
          <ul className="pc-perks">
            <li>Beijing city stay + Shanghai skyline + Xi’an heritage tour</li>
            <li>Private transfers &amp; guided cultural tours</li>
            <li>Great Wall hike &amp; river cruise experience</li>
            <li>Daily breakfast &amp; curated dinners</li>
          </ul>
          <a href="#contact" className="btn-primary full-btn" onClick={() => window.selectPackage && window.selectPackage('6N/7D China Escape – Couple')}>Reserve 6N/7D Couple</a>
        </motion.div>

        {/* Card 3 — Group */}
        <motion.div className="price-card" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
          <div className="pc-popular" style={{"display":"none"}}>Most Popular</div>
          <div className="pc-label">8N / 9D · Group (4+)</div>
          <div className="pc-old">₹1,49,999</div>
          <div className="pc-price">₹1,19,999</div>
          <div className="pc-badge">20% OFF</div>
          <ul className="pc-perks">
            <li>Beijing + Shanghai + Xi’an + Guilin extended tour</li>
            <li>Private transfers &amp; guided cultural tours</li>
            <li>Yangtze River cruise experience</li>
            <li>Daily breakfast &amp; curated dinners</li>
          </ul>
          <a href="#contact" className="btn-primary full-btn" onClick={() => window.selectPackage && window.selectPackage('8N/9D China Escape – Group')}>Reserve 8N/9D Group</a>
        </motion.div>

      </div>

      {/* Per-person note */}
      <motion.div className="price-perperson-note" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
        <div className="ppn-grid">
          <div className="ppn-item">
            <span className="ppn-icon">👤</span>
            <span className="ppn-label">Solo Traveller</span>
            <span className="ppn-val">₹44,999+</span>
          </div>
          <div className="ppn-item">
            <span className="ppn-icon">💑</span>
            <span className="ppn-label">Couple (per person)</span>
            <span className="ppn-val">₹84,999+</span>
          </div>
          <div className="ppn-item">
            <span className="ppn-icon">👨â€👩â€👧â€👦</span>
            <span className="ppn-label">Group 4+ (per person)</span>
            <span className="ppn-val">₹1,19,999+</span>
          </div>
        </div>
      </motion.div>

      <motion.p className="price-note" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
        💳 EMI available · 100% refund if cancelled 7 days before · No hidden charges
      </motion.p>
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
            <p>"The China journey was absolutely incredible. Walking through the Great Wall and exploring Beijing’s historic streets felt surreal. The 6N/7D package was perfectly planned, from Shanghai skyline nights to Xi’an’s ancient warriors. Every moment felt rich and unforgettable."</p>
            <div className="testi-author">
              <img src="https://i.pravatar.cc/60?img=47" alt="Priya S." />
              <div>
                <strong>Venkatachalam</strong>
                <span>Chennai · 6N/7D China Explorer</span>
              </div>
            </div>
          </div>

          <div className="testi-card">
            <div className="testi-stars">★★★★★</div>
            <p>"The 8N/9D China Grand Explorer package exceeded expectations. The contrast between modern Shanghai and historic Beijing was amazing. Guilin’s landscapes and river cruise were absolutely breathtaking."</p>
            <div className="testi-author">
              <img src="https://i.pravatar.cc/60?img=32" alt="Arjun &amp; Meera" />
              <div>
                <strong>Arjun &amp; Meera Krishnan</strong>
                <span>Bangalore · 8N/9D Grand China Journey</span>
              </div>
            </div>
          </div>

          <div className="testi-card">
            <div className="testi-stars">★★★★★</div>
            <p>"We chose the 6N/7D China Quick Explorer and it was perfectly balanced. Beijing, Shanghai, and Xi’an were covered so well in a short time. I’m already planning the 8N/9D trip next year!"</p>
            <div className="testi-author">
              <img src="https://i.pravatar.cc/60?img=12" alt="Ravi N." />
              <div>
                <strong>Ravi Nambiar</strong>
                <span>Mumbai · 6N/7D China Quick Explorer</span>
              </div>
            </div>
          </div>

          <div className="testi-card">
            <div className="testi-stars">★★★★☆</div>
            <p>"Our 8N/9D China family trip was outstanding. The kids loved the Great Wall hike and river cruise in Guilin. The guides were very knowledgeable and made the history come alive."</p>
            <div className="testi-author">
              <img src="https://i.pravatar.cc/60?img=25" alt="Kavitha R." />
              <div>
                <strong>Kavitha &amp; Suresh Rao</strong>
                <span>Hyderabad · 8N/9D China Family Journey</span>
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
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Optional <em>Add-Ons</em></motion.h2>
      <div className="addon-grid">

        <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <span>📸</span>
          <strong>Beijing Great Wall Photoshoot</strong>
          <p>Professional photography at iconic landmarks</p>
          <em>+₹4,999</em>
        </motion.div>

        <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
          <strong>Yangtze River Cruise Upgrade</strong>
          <p>Luxury cabin with premium dining experience</p>
          <em>+₹9,999</em>
        </motion.div>

        <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
          <span>ðŸ¯</span>
          <strong>Forbidden City Night Tour</strong>
          <p>Exclusive guided evening heritage experience</p>
          <em>+₹3,999</em>
        </motion.div>

        <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
          <span>ðŸœ</span>
          <strong>China Food Walk</strong>
          <p>Explore authentic street food &amp; local cuisine</p>
          <em>+₹2,999</em>
        </motion.div>

      </div>
    </div>
  </motion.section>

  {/* ░░░ FINAL CTA ░░░ */}
  <motion.section className="final-cta" id="cta" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="fcta-bg">
      <img src="/China/view.webp" alt="Scenic landscape view of China" />
      <div className="fcta-overlay"></div>
    </div>
    <motion.div className="fcta-content" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
      <div className="section-label light">The Time Is Now</div>
      <h2>Explore The World<br /><em>China is Calling.</em></h2>
      <p>From the Great Wall of Beijing to the futuristic skyline of Shanghai and the landscapes of Guilin, your unforgettable China journey begins here.</p>
      <a href="#packages" className="btn-primary large-btn">Choose Your Package</a>
    </motion.div>
  </motion.section>

  {/* ░░░ CONTACT STRIP ░░░ */}
  <motion.section className="contact-strip" id="contact" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <div className="cs-grid">
        <motion.div className="cs-col" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <h3>Have Questions?</h3>
          <p>Our travel curators are available 9AM–9PM, 7 days a week for your China journey.</p>
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
              <option>6N/7D Quick Escape – Solo</option>
              <option>6N/7D Quick Escape – Couple</option>
              <option>6N/7D Quick Escape – Group</option>
              <option>8N/9D Classic Journey – Solo</option>
              <option>8N/9D Classic Journey – Couple</option>
              <option>8N/9D Classic Journey – Group</option>
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
}

