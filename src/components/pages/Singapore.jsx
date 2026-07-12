import { motion } from 'motion/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import WhatsAppFloat from '../Shared/Whatsappfloat';

export default function Singapore() {

  useEffect(() => {
    document.title = "singapore | Aruvi Tours";
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
      lightboxImg.src = src.startsWith('http') || src.startsWith('/') ? src : `/singapore/${src}`;
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
      <img src="/singapore/singapore-marina-bay-singapore.webp" alt="Singapore" className="hero-img" id="heroImg" />
      <div className="hero-overlay"></div>
      <div className="hero-grain"></div>
    </div>

    <div className="hero-content">
      <motion.div className="hero-badge" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <span className="badge-dot"></span>
        2 Packages · Singapore · Multiple Durations
      </motion.div>

      <motion.h1 className="hero-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <em>Singapore</em><br />Luxury Escape
      </motion.h1>

      <motion.p className="hero-tagline" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
        Discover the modern beauty of Singapore through a refined travel experience combining futuristic cityscapes, island vibes, and world-class attractions.
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
      <span>31°C · Tropical Urban Climate</span>
    </div>
  </motion.section>

  {/* ░░░ QUICK INFO BAR ░░░ */}
  <div className="infobar" id="infobar">
    <div className="infobar-inner">

      <div className="info-item">
        <span className="info-icon">🗓</span>
        <div>
          <span className="info-label">Packages</span>
          <span className="info-val">2N/3D · 3N/4D</span>
        </div>
      </div>

      <div className="info-divider"></div>

      <div className="info-item">
        <span className="info-icon">ðŸ“</span>
        <div>
          <span className="info-label">Destinations</span>
          <span className="info-val">Marina Bay · Sentosa Island · Gardens by the Bay</span>
        </div>
      </div>

      <div className="info-divider"></div>

      <div className="info-item">
        <span className="info-icon">💰</span>
        <div>
          <span className="info-label">Starting From</span>
          <span className="info-val">₹19,999 <small>/person</small></span>
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
          <span className="info-val">Year Round</span>
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
        <button className="pkg-tab active" data-pkg="3n4d" onClick={() => window.switchPackage && window.switchPackage('3n4d', this)}>
          <span className="pkg-tab-duration">2N / 3D</span>
          <span className="pkg-tab-name">Quick Escape</span>
        </button>
        <button className="pkg-tab" data-pkg="4n5d" onClick={() => window.switchPackage && window.switchPackage('4n5d', this)}>
          <span className="pkg-tab-duration">3N / 4D</span>
          <span className="pkg-tab-name">Classic Journey</span>
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
          <h2>Modern Heritage<br /><em>Singapore Grandeur</em></h2>

          <p>Discover the futuristic beauty of Singapore with Aruvi Tours, where every journey is thoughtfully crafted to deliver comfort, innovation, and unforgettable city experiences. From the iconic Marina Bay Sands 🌆 to the lush Gardens by the Bay 🌿 and the vibrant Sentosa Island ðŸ️, Singapore offers a perfect blend of modern architecture and leisure.</p>

          <p>Our curated packages are designed to give you a seamless travel experience — combining premium stays, guided city tours, and handpicked attractions. Whether you’re planning a short getaway or a deeper urban exploration, Aruvi Tours ensures every moment of your trip feels effortless, immersive, and truly extraordinary ✨.</p>

          <a href="#itinerary" className="link-arrow">Explore the Journey <span>→</span></a>
        </motion.div>

        <motion.div className="about-highlights" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>

          <div className="highlight-card">
            <div className="hc-icon">🌆</div>
            <div>
              <strong>Marina Bay Sands</strong>
              <p>Iconic skyline destination with infinity pool views, luxury shopping, and stunning night light shows.</p>
            </div>
          </div>

          <div className="highlight-card">
            <div className="hc-icon">🌿</div>
            <div>
              <strong>Gardens by the Bay</strong>
              <p>Futuristic nature park with Supertree Grove 🌳 and mesmerizing indoor cloud forest experience.</p>
            </div>
          </div>

          <div className="highlight-card">
            <div className="hc-icon">ðŸ️</div>
            <div>
              <strong>Sentosa Island</strong>
              <p>Entertainment paradise with beaches, Universal Studios 🎢, and adventure attractions.</p>
            </div>
          </div>

          <div className="highlight-card">
            <div className="hc-icon">ðŸ›️</div>
            <div>
              <strong>Orchard Road</strong>
              <p>Singapore’s famous shopping street with luxury brands, malls, and dining experiences.</p>
            </div>
          </div>

          <div className="highlight-card">
            <div className="hc-icon">ðŸ&nbsp;</div>
            <div>
              <strong>S.E.A Aquarium</strong>
              <p>One of the world’s largest aquariums featuring diverse marine life and underwater tunnels.</p>
            </div>
          </div>

          <div className="highlight-card">
            <div className="hc-icon">ðŸš&nbsp;</div>
            <div>
              <strong>Singapore Flyer</strong>
              <p>Giant observation wheel offering breathtaking panoramic views of the city skyline.</p>
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
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Frames of <em>Singapore</em></motion.h2>
    </div>

    <div className="gallery-grid" id="galleryGrid">

      <motion.div className="gallery-item" data-src="/singapore/singapore-marina-bay-sands.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <img src="/singapore/singapore-marina-bay-singapore.webp" alt="Marina Bay Sands" />
        <div className="gallery-caption">Marina Bay Sands</div>
      </motion.div>

      <motion.div className="gallery-item" data-src="/singapore/singapore-gardens-by-bay.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <img src="/singapore/singapore-supertree-garden-view.webp" alt="Gardens by the Bay" />
        <div className="gallery-caption">Gardens by the Bay</div>
      </motion.div>

      <motion.div className="gallery-item" data-src="/singapore/singapore-sentosa-island-resort.webp" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <img src="/singapore/singapore-sentosa-island-resort.webp" alt="Sentosa Island" />
        <div className="gallery-caption">Sentosa Island</div>
      </motion.div>

      <motion.div className="gallery-item" data-src="/singapore/singapore-marina-bay-singapore.webp" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <img src="/singapore/singapore-gardens-by-bay.jpg" alt="Orchard Road" />
        <div className="gallery-caption">Orchard Road</div>
      </motion.div>

      <motion.div className="gallery-item" data-src="/singapore/singapore-singapore-flyer-night-view.webp" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <img src="/singapore/singapore-singapore-flyer-night-view.webp" alt="Singapore Flyer" />
        <div className="gallery-caption">Singapore Flyer</div>
      </motion.div>

      <motion.div className="gallery-item" data-src="/singapore/singapore-sentosa-island-resort.webp" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
        <img src="/singapore/singapore-marina-bay-sands.jpg" alt="S.E.A Aquarium" />
        <div className="gallery-caption">S.E.A Aquarium</div>
      </motion.div>

    </div>

    {/* Lightbox */}
    <div className="lightbox" id="lightbox">
      <button className="lb-close" id="lbClose">✕</button>
      <button className="lb-arrow lb-prev" id="lbPrev">‹</button>
      <img src="" alt="Lightbox gallery image for Singapore" className="lb-img" id="lbImg" />
      <button className="lb-arrow lb-next" id="lbNext">›</button>
    </div>
  </motion.section>

  {/*  ITINERARY — 2N/3D  */}
<motion.section className="itinerary pkg-itinerary active" id="itinerary" data-pkg-section="2n3d" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
  <div className="container">
    <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>2N / 3D · Quick Escape</motion.div>
    <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Your <em>Journey</em> Unfolds</motion.h2>
    <motion.div className="pkg-route-pills" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
      <span className="route-pill">✈ Arrival</span>
      <span className="route-arrow">→</span>
      <span className="route-pill">Marina Bay</span>
      <span className="route-arrow">→</span>
      <span className="route-pill">Sentosa Island</span>
      <span className="route-arrow">→</span>
      <span className="route-pill">✈ Departure</span>
    </motion.div>

    <div className="timeline">

      {/* Day 1 */}
      <motion.div className="tl-item" data-day="1" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
        <div className="tl-marker">
          <span className="tl-day">Day 1</span>
          <div className="tl-dot"></div>
        </div>
        <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
          <div className="tl-header">
            <div>
              <h3>Arrival in Singapore</h3>
              <span className="tl-sub">Airport → Marina Bay Hotel</span>
            </div>
            <div className="tl-chevron">▾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>🚗 Private transfer from Changi Airport</li>
              <li>ðŸ¨ Check-in at luxury Marina Bay hotel</li>
              <li>ðŸ¹ Welcome drink &amp; orientation</li>
              <li>🌆 Evening visit to Gardens by the Bay</li>
              <li>🌉 Marina Bay Sands light show</li>
              <li>ðŸ½️ Dinner at hotel</li>
            </ul>
            <div className="tl-note">Meals: Dinner included</div>
          </div>
        </div>
      </motion.div>

      {/* Day 2 */}
      <motion.div className="tl-item" data-day="2" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <div className="tl-marker">
          <span className="tl-day">Day 2</span>
          <div className="tl-dot"></div>
        </div>
        <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
          <div className="tl-header">
            <div>
              <h3>Sentosa Adventure</h3>
              <span className="tl-sub">Theme Park · Beaches · Fun</span>
            </div>
            <div className="tl-chevron">▾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>ðŸ½ Breakfast at hotel</li>
              <li>🚗 Transfer to Sentosa Island</li>
              <li>🎢 Universal Studios Singapore visit</li>
              <li>ðŸ– Sentosa beach relaxation</li>
              <li>🚡 Cable car ride experience</li>
              <li>ðŸ½️ Dinner at Sentosa resort</li>
            </ul>
            <div className="tl-note">Meals: Breakfast &amp; Dinner included</div>
          </div>
        </div>
      </motion.div>

      {/* Day 3 */}
      <motion.div className="tl-item" data-day="3" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <div className="tl-marker">
          <span className="tl-day">Day 3</span>
          <div className="tl-dot"></div>
        </div>
        <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
          <div className="tl-header">
            <div>
              <h3>City Exploration &amp; Departure</h3>
              <span className="tl-sub">Culture · Shopping · Skyline</span>
            </div>
            <div className="tl-chevron">▾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>☕ Breakfast at hotel</li>
              <li>ðŸ¦ Visit Merlion Park &amp; Marina Bay walk</li>
              <li>ðŸ® Explore Chinatown &amp; Little India</li>
              <li>ðŸ› Shopping at Orchard Road</li>
              <li>🚗 Transfer to airport</li>
            </ul>
            <div className="tl-note">Meals: Breakfast included</div>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</motion.section>

{/* ░░░ ITINERARY — 3N/4D ░░░ */}
<motion.section className="itinerary pkg-itinerary" id="itinerary-4n5d" data-pkg-section="4n5d" style={{"display":"none"}} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
  <div className="container">
    <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>3N / 4D · Classic Journey</motion.div>
    <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Your <em>Journey</em> Unfolds</motion.h2>
    <motion.div className="pkg-route-pills" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
      <span className="route-pill">✈ Arrival</span>
      <span className="route-arrow">→</span>
      <span className="route-pill">Marina Bay</span>
      <span className="route-arrow">→</span>
      <span className="route-pill">Sentosa</span>
      <span className="route-arrow">→</span>
      <span className="route-pill">City Tour</span>
      <span className="route-arrow">→</span>
      <span className="route-pill">✈ Departure</span>
    </motion.div>

    <div className="timeline">

      {/* Day 1 */}
      <motion.div className="tl-item" data-day="1" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
        <div className="tl-marker">
          <span className="tl-day">Day 1</span>
          <div className="tl-dot"></div>
        </div>
        <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
          <div className="tl-header">
            <div>
              <h3>Arrival in Singapore</h3>
              <span className="tl-sub">Airport → Marina Bay Hotel</span>
            </div>
            <div className="tl-chevron">▾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>🚗 Private transfer from Changi Airport</li>
              <li>ðŸ¨ Check-in at Marina Bay luxury hotel</li>
              <li>🌆 Evening Marina Bay Sands SkyPark visit</li>
              <li>🌉 Spectra light &amp; water show</li>
              <li>ðŸ½️ Dinner at hotel</li>
            </ul>
            <div className="tl-note">Meals: Dinner included</div>
          </div>
        </div>
      </motion.div>

      {/* Day 2 */}
      <motion.div className="tl-item" data-day="2" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <div className="tl-marker">
          <span className="tl-day">Day 2</span>
          <div className="tl-dot"></div>
        </div>
        <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
          <div className="tl-header">
            <div>
              <h3>City Landmarks Tour</h3>
              <span className="tl-sub">Culture · Skyline · Heritage</span>
            </div>
            <div className="tl-chevron">▾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>ðŸ½ Breakfast at hotel</li>
              <li>ðŸ¦ Merlion Park visit</li>
              <li>ðŸ® Chinatown &amp; Little India exploration</li>
              <li>🌉 Clarke Quay river walk</li>
              <li>ðŸ½️ Dinner cruise experience</li>
            </ul>
            <div className="tl-note">Meals: Breakfast &amp; Dinner included</div>
          </div>
        </div>
      </motion.div>

      {/* Day 3 */}
      <motion.div className="tl-item" data-day="3" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <div className="tl-marker">
          <span className="tl-day">Day 3</span>
          <div className="tl-dot"></div>
        </div>
        <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
          <div className="tl-header">
            <div>
              <h3>Sentosa Experience</h3>
              <span className="tl-sub">Theme Park · Beaches · Adventure</span>
            </div>
            <div className="tl-chevron">▾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>🎢 Universal Studios Singapore</li>
              <li>ðŸ– Sentosa Island beaches</li>
              <li>🚡 Cable car sky ride</li>
              <li>🌅 Sunset at Siloso Beach</li>
              <li>ðŸ½️ Dinner at resort</li>
            </ul>
            <div className="tl-note">Meals: Breakfast &amp; Dinner included</div>
          </div>
        </div>
      </motion.div>

      {/* Day 4 */}
      <motion.div className="tl-item" data-day="4" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
        <div className="tl-marker">
          <span className="tl-day">Day 4</span>
          <div className="tl-dot"></div>
        </div>
        <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
          <div className="tl-header">
            <div>
              <h3>Departure &amp; Shopping</h3>
              <span className="tl-sub">Shopping · Leisure · Farewell</span>
            </div>
            <div className="tl-chevron">▾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>☕ Breakfast at hotel</li>
              <li>ðŸ› Orchard Road shopping spree</li>
              <li>🌿 Gardens by the Bay quick visit</li>
              <li>🚗 Transfer to airport</li>
            </ul>
            <div className="tl-note">Meals: Breakfast included</div>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</motion.section>
{/*  INCLUSIONS / EXCLUSIONS  */}

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
              <p>Luxury hotels in Marina Bay &amp; Sentosa</p>
            </div>
          </motion.div>

          <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
            <div className="ic-icon">🚗</div>
            <div>
              <strong>Private Transfers</strong>
              <p>Changi airport pickup &amp; intercity transfers included</p>
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
              <strong>Marina Bay Night Cruise</strong>
              <p>Luxury skyline cruise experience</p>
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
            <div className="ic-icon">🎢</div>
            <div>
              <strong>Sentosa Adventure Pass</strong>
              <p>Universal Studios &amp; Sentosa Island experiences</p>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div className="exc-col" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <div className="section-label">What's Excluded</div>
        <h2>Exclusions</h2>
        <ul className="exc-list">
          <li>✈ International airfare to/from Singapore</li>
          <li>📋 Travel Insurance</li>
          <li>🧾 Visa charges</li>
          <li>ðŸº Personal expenses &amp; alcohol</li>
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
    <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Singapore · 2N/3D · 3N/4D</motion.div>
    <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Reserve Your <em>Escape</em></motion.h2>

    <div className="price-cards">

      {/* Card 1 — Solo */}
      <motion.div className="price-card" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
        <div className="pc-label">2N / 3D · Solo Traveller</div>
        <div className="pc-old">₹24,999</div>
        <div className="pc-price">₹16,999</div>
        <div className="pc-badge">30% OFF</div>
        <ul className="pc-perks">
          <li>Marina Bay 1 night + Sentosa 1 night</li>
          <li>Changi airport transfers included</li>
          <li>Gardens by the Bay &amp; city tour</li>
          <li>Meals as per itinerary</li>
        </ul>
        <a href="#contact" className="btn-primary full-btn" onClick={() => window.selectPackage && window.selectPackage('2N/3D Singapore – Solo')}>Reserve 2N/3D Solo</a>
      </motion.div>

      {/* Card 2 — Couple (featured) */}
      <motion.div className="price-card featured" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <div className="pc-popular">Most Popular</div>
        <div className="pc-label">3N / 4D · Couple</div>
        <div className="pc-old">₹42,999</div>
        <div className="pc-price">₹27,999</div>
        <div className="pc-badge">35% OFF</div>
        <ul className="pc-perks">
          <li>Marina Bay luxury stay + Sentosa resort stay</li>
          <li>Private transfers &amp; guided city tours</li>
          <li>Universal Studios &amp; cable car experience</li>
          <li>Daily breakfast &amp; curated dinners</li>
        </ul>
        <a href="#contact" className="btn-primary full-btn" onClick={() => window.selectPackage && window.selectPackage('3N/4D Singapore – Couple')}>Reserve 3N/4D Couple</a>
      </motion.div>

      {/* Card 3 — Group */}
      <motion.div className="price-card" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <div className="pc-popular" style={{"display":"none"}}>Most Popular</div>
        <div className="pc-label">3N / 4D · Group (4+)</div>
        <div className="pc-old">₹54,999</div>
        <div className="pc-price">₹39,999</div>
        <div className="pc-badge">27% OFF</div>
        <ul className="pc-perks">
          <li>Marina Bay + Sentosa + city exploration</li>
          <li>Private transfers &amp; full guided experience</li>
          <li>Universal Studios &amp; Night Safari visit</li>
          <li>Daily breakfast &amp; curated dinners</li>
        </ul>
        <a href="#contact" className="btn-primary full-btn" onClick={() => window.selectPackage && window.selectPackage('3N/4D Singapore – Group')}>Reserve 3N/4D Group</a>
      </motion.div>

    </div>

    {/* Per-person note */}
    <motion.div className="price-perperson-note" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
      <div className="ppn-grid">
        <div className="ppn-item">
          <span className="ppn-icon">👤</span>
          <span className="ppn-label">Solo Traveller</span>
          <span className="ppn-val">₹16,999+</span>
        </div>
        <div className="ppn-item">
          <span className="ppn-icon">💑</span>
          <span className="ppn-label">Couple (per person)</span>
          <span className="ppn-val">₹27,999+</span>
        </div>
        <div className="ppn-item">
          <span className="ppn-icon">👨â€👩â€👧â€👦</span>
          <span className="ppn-label">Group 4+ (per person)</span>
          <span className="ppn-val">₹39,999+</span>
        </div>
      </div>
    </motion.div>

    <motion.p className="price-note" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
      💳 EMI available · Flexible cancellation · No hidden charges
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
          <p>"The Singapore trip was absolutely incredible. From the futuristic skyline of Marina Bay to the peaceful vibes of Gardens by the Bay, everything felt perfectly planned. The 3N/4D package gave us a perfect balance of luxury, shopping, and sightseeing."</p>
          <div className="testi-author">
            <img src="https://i.pravatar.cc/60?img=47" alt="Priya S." />
            <div>
              <strong>Venkatachalam</strong>
              <span>Chennai · 2N/3D Classic Journey</span>
            </div>
          </div>
        </div>

        <div className="testi-card">
          <div className="testi-stars">★★★★★</div>
          <p>"Our 3N/4D Singapore escape was unforgettable. Sentosa Island, Universal Studios, and night safari were the highlights. Everything was smooth and well-organized — perfect for couples looking for a premium experience."</p>
          <div className="testi-author">
            <img src="https://i.pravatar.cc/60?img=32" alt="Arjun &amp; Meera" />
            <div>
              <strong>Arjun &amp; Meera Krishnan</strong>
              <span>Bangalore · 3N/4D Couple Trip</span>
            </div>
          </div>
        </div>

        <div className="testi-card">
          <div className="testi-stars">★★★★★</div>
          <p>"We had a short break and chose the 2N/3D Singapore package. It covered Marina Bay Sands, Chinatown, and Sentosa efficiently. Perfectly curated for a quick international getaway."</p>
          <div className="testi-author">
            <img src="https://i.pravatar.cc/60?img=12" alt="Ravi N." />
            <div>
              <strong>Ravi Nambiar</strong>
              <span>Mumbai · 2N/3D Quick Escape</span>
            </div>
          </div>
        </div>

        <div className="testi-card">
          <div className="testi-stars">★★★★☆</div>
          <p>"The 3N/4D family trip to Singapore was amazing. Kids loved Universal Studios and the Night Safari. The city tour and cable car ride were unforgettable experiences for all of us."</p>
          <div className="testi-author">
            <img src="https://i.pravatar.cc/60?img=25" alt="Kavitha R." />
            <div>
              <strong>Kavitha &amp; Suresh Rao</strong>
              <span>Hyderabad · 3N/4D Family Trip</span>
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
        <strong>Marina Bay Night Photoshoot</strong>
        <p>Professional skyline shoot with Singapore’s iconic lights</p>
        <em>+₹3,999</em>
      </motion.div>

      <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <strong>Sentosa Island Adventure</strong>
        <p>Full access to beaches, cable car &amp; attractions</p>
        <em>+₹2,999</em>
      </motion.div>

      <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <span>🌴</span>
        <strong>Gardens by the Bay Experience</strong>
        <p>Supertree Grove light show &amp; Cloud Forest visit</p>
        <em>+₹3,499</em>
      </motion.div>

      <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
        <span>🚶</span>
        <strong>Singapore Food Walk</strong>
        <p>Explore Chinatown, Little India &amp; local hawker delights</p>
        <em>+₹2,999</em>
      </motion.div>

    </div>
  </div>
</motion.section>

{/* ░░░ FINAL CTA ░░░ */}
<motion.section className="final-cta" id="cta" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
  <div className="fcta-bg">
    <img src="/singapore/singapore-marina-bay-singapore.webp" alt="Marina Bay skyline in Singapore" />
    <div className="fcta-overlay"></div>
  </div>
  <motion.div className="fcta-content" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="section-label light">The Time Is Now</div>
    <h2>Explore The World<br /><em>Singapore Awaits You.</em></h2>
    <p>From the dazzling skyline of Marina Bay Sands to the magical nights of Sentosa and Gardens by the Bay, your unforgettable Singapore journey begins here.</p>
    <a href="#packages" className="btn-primary large-btn">Choose Your Package</a>
  </motion.div>
</motion.section>

  {/* ░░░ CONTACT STRIP ░░░ */}
  <motion.section className="contact-strip" id="contact" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <div className="cs-grid">
        <motion.div className="cs-col" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <h3>Have Questions?</h3>
          <p>Our travel curators are available 9AM–9PM, 7 days a week for your Singapore journey.</p>
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
              <option>2N/3D Quick Escape – Solo</option>
              <option>2N/3D Quick Escape – Couple</option>
              <option>2N/3D Quick Escape – Group</option>
              <option>3N/4D Classic Journey – Solo</option>
              <option>3N/4D Classic Journey – Couple</option>
              <option>3N/4D Classic Journey – Group</option>
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


