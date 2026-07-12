import { motion } from 'motion/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import WhatsAppFloat from '../Shared/Whatsappfloat';

export default function Nepal() {

  useEffect(() => {
    document.title = "nepal | Aruvi Tours";
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
      lightboxImg.src = src.startsWith('http') || src.startsWith('/') ? src : `/nepal/${src}`;
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
    <img src="/nepal/nepal-himalayas-mountain-view.webp" alt="Nepal" className="hero-img" id="heroImg" />
    <div className="hero-overlay"></div>
    <div className="hero-grain"></div>
  </div>

  <div className="hero-content">
    <motion.div className="hero-badge" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
      <span className="badge-dot"></span>
      3 Packages · Nepal · Multiple Durations
    </motion.div>

    <motion.h1 className="hero-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
      <em>Nepal</em><br />Himalayan Escape
    </motion.h1>

    <motion.p className="hero-tagline" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
      Discover the breathtaking beauty of Nepal through a refined travel experience combining mountains, temples, and serene landscapes.
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
    <span>18°C · Mountain Cool</span>
  </div>
</motion.section>

{/* ░░░ QUICK INFO BAR ░░░ */}
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
        <span className="info-val">Kathmandu · Pokhara</span>
      </div>
    </div>

    <div className="info-divider"></div>

    <div className="info-item">
      <span className="info-icon">💰</span>
      <div>
        <span className="info-label">Starting From</span>
        <span className="info-val">₹16,999 <small>/person</small></span>
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
        <span className="info-val">September – November · March – May</span>
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
      <button className="pkg-tab" data-pkg="6n7d" onClick={() => window.switchPackage && window.switchPackage('6n7d', this)}>
        <span className="pkg-tab-duration">4N / 5D</span>
        <span className="pkg-tab-name">Grand Explorer</span>
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
        <h2>Cultural Heritage<br /><em>Nepal Grandeur</em></h2>

        <p>Discover the breathtaking beauty of Nepal with Aruvi Tours, where every journey is thoughtfully crafted to deliver comfort, adventure, and unforgettable memories. From the vibrant streets of Kathmandu 🛕 to the serene lakes of Pokhara ðŸž️ and the majestic Himalayan views ðŸ”️, Nepal offers a perfect blend of spirituality and natural beauty.</p>

        <p>Our curated packages are designed to give you a seamless travel experience — combining premium stays, guided tours, and handpicked destinations. Whether you’re planning a short getaway or a deeper Himalayan exploration, Aruvi Tours ensures every moment of your trip feels effortless, immersive, and truly extraordinary ✨.</p>

        <a href="#itinerary" className="link-arrow">Explore the Journey <span>→</span></a>
      </motion.div>

      <motion.div className="about-highlights" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>

        <div className="highlight-card">
          <div className="hc-icon">ðŸ”️</div>
          <div>
            <strong>Himalayas View</strong>
            <p>Snow-capped peaks offering breathtaking sunrise and trekking experiences.</p>
          </div>
        </div>

        <div className="highlight-card">
          <div className="hc-icon">🛕</div>
          <div>
            <strong>Pashupatinath Temple</strong>
            <p>A sacred UNESCO site dedicated to Lord Shiva and a major spiritual landmark.</p>
          </div>
        </div>

        <div className="highlight-card">
          <div className="hc-icon">ðŸž️</div>
          <div>
            <strong>Pokhara Valley</strong>
            <p>Peaceful lakes, paragliding adventures, and stunning mountain reflections.</p>
          </div>
        </div>

        <div className="highlight-card">
          <div className="hc-icon">ðŸ¯</div>
          <div>
            <strong>Bhaktapur Durbar Square</strong>
            <p>Ancient architecture, temples, and rich Newari culture.</p>
          </div>
        </div>

        <div className="highlight-card">
          <div className="hc-icon">🌄</div>
          <div>
            <strong>Sarangkot Viewpoint</strong>
            <p>Famous sunrise point overlooking Annapurna range and Pokhara city.</p>
          </div>
        </div>

        <div className="highlight-card">
          <div className="hc-icon">🚶</div>
          <div>
            <strong>Thamel Street</strong>
            <p>Vibrant nightlife, cafes, shopping, and cultural experiences in Kathmandu.</p>
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
    <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Frames of <em>Nepal</em></motion.h2>
  </div>

  <div className="gallery-grid" id="galleryGrid">

    <motion.div className="gallery-item" data-src="/nepal/nepal-kathmandu-durbar-square.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
      <img src="/nepal/nepal-kathmandu-durbar-square.jpg" alt="Kathmandu City" />
      <div className="gallery-caption">Kathmandu City</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="/nepal/nepal-pokhara-lake-view.webp" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
      <img src="/nepal/nepal-pokhara-lake-view.webp" alt="Pokhara Lake" />
      <div className="gallery-caption">Pokhara Lake</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="/nepal/nepal-himalayas-mountain-view.webp" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
      <img src="/nepal/nepal-himalayas-mountain-view.webp" alt="Himalayas View" />
      <div className="gallery-caption">Himalayas View</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="/nepal/nepal-pashupatinath-temple.webp" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
      <img src="/nepal/nepal-pashupatinath-temple.webp" alt="Pashupatinath Temple" />
      <div className="gallery-caption">Pashupatinath Temple</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="/nepal/nepal-bhaktapur-durbar-square.webp" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
      <img src="/nepal/nepal-bhaktapur-durbar-square.webp" alt="Bhaktapur Durbar Square" />
      <div className="gallery-caption">Bhaktapur Durbar Square</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="/nepal/nepal-sarangkot-sunrise-view.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
      <img src="/nepal/nepal-sarangkot-sunrise-view.jpg" alt="Sarangkot Viewpoint" />
      <div className="gallery-caption">Sarangkot Viewpoint</div>
    </motion.div>

  </div>

  {/* Lightbox */}
  <div className="lightbox" id="lightbox">
    <button className="lb-close" id="lbClose">✕</button>
    <button className="lb-arrow lb-prev" id="lbPrev">‹</button>
    <img src="" alt="Lightbox gallery image for Nepal" className="lb-img" id="lbImg" />
    <button className="lb-arrow lb-next" id="lbNext">›</button>
  </div>
</motion.section>

{/* ░░░ ITINERARY — 3N/4D ░░░ */}
<motion.section className="itinerary pkg-itinerary active" id="itinerary" data-pkg-section="3n4d" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
  <div className="container">
    <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>3N / 4D · Quick Escape</motion.div>
    <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Your <em>Journey</em> Unfolds</motion.h2>
    <motion.div className="pkg-route-pills" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
      <span className="route-pill">✈ Arrival</span>
      <span className="route-arrow">→</span>
      <span className="route-pill">Kathmandu Valley</span>
      <span className="route-arrow">→</span>
      <span className="route-pill">Pokhara Lake City</span>
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
              <h3>Arrival in Kathmandu</h3>
              <span className="tl-sub">Airport → Heritage Hotel</span>
            </div>
            <div className="tl-chevron">▾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>🚗 Private transfer from Tribhuvan Airport</li>
              <li>ðŸ¨ Check-in at boutique Kathmandu hotel</li>
              <li>ðŸ¹ Welcome drink &amp; orientation</li>
              <li>🌆 Evening stroll around Thamel</li>
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
              <h3>Kathmandu Valley Exploration</h3>
              <span className="tl-sub">Temples · Culture · Heritage</span>
            </div>
            <div className="tl-chevron">▾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>ðŸ½ Breakfast at hotel</li>
              <li>🛕 Pashupatinath Temple visit</li>
              <li>🪷 Boudhanath Stupa exploration</li>
              <li>ðŸ¯ Swayambhunath (Monkey Temple)</li>
              <li>ðŸ› Explore local markets</li>
              <li>ðŸ½️ Dinner at hotel</li>
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
              <h3>Transfer to Pokhara</h3>
              <span className="tl-sub">Road Trip · Lakes · Mountains</span>
            </div>
            <div className="tl-chevron">▾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>🚗 Scenic drive to Pokhara</li>
              <li>ðŸ¨ Check-in at lakeside hotel</li>
              <li>🌅 Evening walk at Phewa Lake</li>
              <li>ðŸ½️ Dinner with lake view</li>
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
              <h3>Sunrise &amp; Departure</h3>
              <span className="tl-sub">Himalayas · Scenic Views</span>
            </div>
            <div className="tl-chevron">▾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>🌄 Sarangkot sunrise view</li>
              <li>ðŸ” Himalayan mountain panorama</li>
              <li>☕ Breakfast at hotel</li>
              <li>🚗 Return transfer to Kathmandu</li>
              <li>✈ Departure from airport</li>
            </ul>
            <div className="tl-note">Meals: Breakfast included</div>
          </div>
        </div>
      </motion.div>

    </div>
  </div>
</motion.section>

{/* ░░░ ITINERARY — 4N/5D ░░░ */}
<motion.section className="itinerary pkg-itinerary" id="itinerary-4n5d" data-pkg-section="4n5d" style={{"display":"none"}} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
  <div className="container">
    <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>4N / 5D · Classic Journey</motion.div>
    <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Your <em>Journey</em> Unfolds</motion.h2>
    <motion.div className="pkg-route-pills" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
      <span className="route-pill">✈ Arrival</span>
      <span className="route-arrow">→</span>
      <span className="route-pill">Kathmandu Valley</span>
      <span className="route-arrow">→</span>
      <span className="route-pill">Pokhara</span>
      <span className="route-arrow">→</span>
      <span className="route-pill">Chitwan Safari</span>
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
              <h3>Arrival in Kathmandu</h3>
              <span className="tl-sub">Airport → Heritage Hotel</span>
            </div>
            <div className="tl-chevron">▾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>🚗 Private transfer from Tribhuvan Airport</li>
              <li>ðŸ¨ Check-in at boutique Kathmandu hotel</li>
              <li>ðŸ¹ Welcome drink &amp; orientation</li>
              <li>🌆 Evening stroll in Thamel</li>
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
              <h3>Kathmandu Heritage Tour</h3>
              <span className="tl-sub">Culture · Temples · History</span>
            </div>
            <div className="tl-chevron">▾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>ðŸ½ Breakfast at hotel</li>
              <li>🛕 Pashupatinath Temple</li>
              <li>🪷 Boudhanath Stupa</li>
              <li>ðŸ¯ Bhaktapur Durbar Square</li>
              <li>ðŸ› Local handicraft shopping</li>
              <li>ðŸ½️ Dinner at hotel</li>
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
              <h3>Transfer to Pokhara</h3>
              <span className="tl-sub">Lakes · Mountains · Leisure</span>
            </div>
            <div className="tl-chevron">▾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>🚗 Scenic drive to Pokhara</li>
              <li>ðŸ¨ Check-in at lakeside resort</li>
              <li>🌅 Sunset at Phewa Lake</li>
              <li>ðŸ½️ Dinner with mountain view</li>
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
              <h3>Pokhara Exploration</h3>
              <span className="tl-sub">Nature · Adventure · Views</span>
            </div>
            <div className="tl-chevron">▾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>🌄 Sarangkot sunrise</li>
              <li>💦 Davis Falls visit</li>
              <li>🛕 Gupteshwor Cave exploration</li>
              <li>🛶 Boating at Phewa Lake</li>
              <li>ðŸ½️ Dinner at hotel</li>
            </ul>
            <div className="tl-note">Meals: Breakfast &amp; Dinner included</div>
          </div>
        </div>
      </motion.div>

      {/* Day 5 */}
      <motion.div className="tl-item" data-day="5" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
        <div className="tl-marker">
          <span className="tl-day">Day 5</span>
          <div className="tl-dot"></div>
        </div>
        <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
          <div className="tl-header">
            <div>
              <h3>Chitwan Safari &amp; Departure</h3>
              <span className="tl-sub">Wildlife · Nature · Farewell</span>
            </div>
            <div className="tl-chevron">▾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>🚗 Drive to Chitwan National Park</li>
              <li>ðŸ˜ Jungle safari experience</li>
              <li>🦌 Wildlife spotting</li>
              <li>🚗 Transfer back for departure</li>
              <li>✈ Flight home</li>
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
            <div className="ic-icon">ðŸ¨</div>
            <div>
              <strong>3/4 Star Hotel Stay</strong>
              <p>Comfortable boutique hotels across Nepal destinations</p>
            </div>
          </motion.div>

          <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
            <div className="ic-icon">🚗</div>
            <div>
              <strong>Private Transfers</strong>
              <p>Airport pickup &amp; intercity transfers included</p>
            </div>
          </motion.div>

          <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
            <div className="ic-icon">ðŸ½</div>
            <div>
              <strong>Curated Meals</strong>
              <p>Daily breakfast + selected dinners as per itinerary</p>
            </div>
          </motion.div>

          <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
            <div className="ic-icon">🚢</div>
            <div>
              <strong>Scenic Lake Experience</strong>
              <p>Pokhara Phewa Lake boating experience</p>
            </div>
          </motion.div>

          <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
            <div className="ic-icon">🗺</div>
            <div>
              <strong>Guided Tours</strong>
              <p>Expert local guides for Kathmandu &amp; Pokhara sightseeing</p>
            </div>
          </motion.div>

          <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
            <div className="ic-icon">🧘</div>
            <div>
              <strong>Nature &amp; Wellness</strong>
              <p>Sunrise viewpoints, mountain experiences &amp; cultural walks</p>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div className="exc-col" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <div className="section-label">What's Excluded</div>
        <h2>Exclusions</h2>
        <ul className="exc-list">
          <li>✈ International airfare to/from Nepal</li>
          <li>📋 Travel Insurance</li>
          <li>🧾 Visa charges</li>
          <li>ðŸº Personal expenses</li>
          <li>ðŸ› Shopping &amp; souvenirs</li>
          <li>📸 Optional adventure activities</li>
          <li>💊 Medical expenses</li>
        </ul>
      </motion.div>

    </div>
  </div>
</motion.section>

{/* ░░░ PRICING ░░░ */}
<motion.section className="pricing" id="pricing" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
  <div className="container">
    <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Nepal · Multiple Packages</motion.div>
    <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Reserve Your <em>Himalayan Escape</em></motion.h2>

    <div className="price-cards">

      {/* Card 1 — Solo */}
      <motion.div className="price-card" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
        <div className="pc-label">3N / 4D · Solo Traveller</div>
        <div className="pc-old">₹24,999</div>
        <div className="pc-price">₹16,999</div>
        <div className="pc-badge">32% OFF</div>
        <ul className="pc-perks">
          <li>Kathmandu 2 nights + Nagarkot 1 night</li>
          <li>Airport transfers &amp; guided sightseeing</li>
          <li>Temple tours &amp; cultural exploration</li>
          <li>Daily breakfast included</li>
        </ul>
        <a href="#contact" className="btn-primary full-btn" onClick={() => window.selectPackage && window.selectPackage('3N/4D Nepal – Solo')}>Reserve 3N/4D Solo</a>
      </motion.div>

      {/* Card 2 — Couple */}
      <motion.div className="price-card featured" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <div className="pc-popular">Most Popular</div>
        <div className="pc-label">3N / 4D · Couple</div>
        <div className="pc-old">₹42,999</div>
        <div className="pc-price">₹29,999</div>
        <div className="pc-badge">30% OFF</div>
        <ul className="pc-perks">
          <li>Kathmandu + Pokhara romantic stay</li>
          <li>Private transfers &amp; scenic drives</li>
          <li>Phewa Lake boating &amp; mountain views</li>
          <li>Sunrise at Nagarkot</li>
        </ul>
        <a href="#contact" className="btn-primary full-btn" onClick={() => window.selectPackage && window.selectPackage('3N/4D Nepal – Couple')}>Reserve 3N/4D Couple</a>
      </motion.div>

      {/* Card 3 — Group */}
      <motion.div className="price-card" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <div className="pc-popular" style={{"display":"none"}}>Most Popular</div>
        <div className="pc-label">4N / 5D · Group (4+)</div>
        <div className="pc-old">₹59,999</div>
        <div className="pc-price">₹44,999</div>
        <div className="pc-badge">25% OFF</div>
        <ul className="pc-perks">
          <li>Kathmandu + Pokhara + Nagarkot full tour</li>
          <li>Private transport throughout trip</li>
          <li>Adventure + cultural sightseeing combo</li>
          <li>Daily breakfast &amp; selected meals</li>
        </ul>
        <a href="#contact" className="btn-primary full-btn" onClick={() => window.selectPackage && window.selectPackage('4N/5D Nepal – Group')}>Reserve 4N/5D Group</a>
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
          <span className="ppn-val">₹29,999+</span>
        </div>
        <div className="ppn-item">
          <span className="ppn-icon">👨â€👩â€👧â€👦</span>
          <span className="ppn-label">Group 4+ (per person)</span>
          <span className="ppn-val">₹44,999+</span>
        </div>
      </div>
    </motion.div>

    <motion.p className="price-note" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
      💳 EMI available · Flexible cancellation policy · No hidden charges
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
          <p>"The Nepal trip was beyond expectations. Watching sunrise over the Himalayas from Nagarkot and exploring Kathmandu’s ancient temples made the 3N/4D package feel so complete and peaceful. Everything was well organized and smooth."</p>
          <div className="testi-author">
            <img src="https://i.pravatar.cc/60?img=47" alt="Priya S." />
            <div>
              <strong>Venkatachalam</strong>
              <span>Chennai · 3N/4D Nepal Escape</span>
            </div>
          </div>
        </div>

        <div className="testi-card">
          <div className="testi-stars">★★★★★</div>
          <p>"The 4N/5D Nepal Grand Explorer was a dream. Pokhara’s lakes, mountain views, and peaceful vibe were unforgettable. The sunrise at Sarangkot was the highlight of our entire trip."</p>
          <div className="testi-author">
            <img src="https://i.pravatar.cc/60?img=32" alt="Arjun &amp; Meera" />
            <div>
              <strong>Arjun &amp; Meera Krishnan</strong>
              <span>Bangalore · 4N/5D Nepal Grand Explorer</span>
            </div>
          </div>
        </div>

        <div className="testi-card">
          <div className="testi-stars">★★★★★</div>
          <p>"We took the 3N/4D Nepal Quick Escape and it was perfectly planned. Kathmandu sightseeing and Nagarkot sunrise in such a short time felt like a complete refresh from city life."</p>
          <div className="testi-author">
            <img src="https://i.pravatar.cc/60?img=12" alt="Ravi N." />
            <div>
              <strong>Ravi Nambiar</strong>
              <span>Mumbai · 3N/4D Nepal Quick Escape</span>
            </div>
          </div>
        </div>

        <div className="testi-card">
          <div className="testi-stars">★★★★☆</div>
          <p>"Our 4N/5D Nepal family trip was amazing. The kids loved Pokhara boating and the mountain views were breathtaking. Everything from hotels to transport was well managed."</p>
          <div className="testi-author">
            <img src="https://i.pravatar.cc/60?img=25" alt="Kavitha R." />
            <div>
              <strong>Kavitha &amp; Suresh Rao</strong>
              <span>Hyderabad · 4N/5D Nepal Family Trip</span>
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
        <strong>Himalayan Photoshoot</strong>
        <p>Professional shoot with mountain &amp; sunrise views</p>
        <em>+₹3,999</em>
      </motion.div>

      <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <strong>Pokhara Boating Experience</strong>
        <p>Private boat ride on Phewa Lake with scenic views</p>
        <em>+₹2,999</em>
      </motion.div>

      <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <span>ðŸ”</span>
        <strong>Everest View Flight</strong>
        <p>Scenic mountain flight over the Himalayas</p>
        <em>+₹12,999</em>
      </motion.div>

      <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
        <span>🚶</span>
        <strong>Kathmandu Heritage Walk</strong>
        <p>Guided tour of temples, stupas &amp; local culture</p>
        <em>+₹2,999</em>
      </motion.div>

    </div>
  </div>
</motion.section>

{/* ░░░ FINAL CTA ░░░ */}
<motion.section className="final-cta" id="cta" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
  <div className="fcta-bg">
    <img src="/nepal/nepal-himalayas-mountain-view.webp" alt="Himalayan mountain view in Nepal" />
    <div className="fcta-overlay"></div>
  </div>
  <motion.div className="fcta-content" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="section-label light">The Time Is Now</div>
    <h2>Explore The Himalayas<br /><em>Nepal is Calling.</em></h2>
    <p>From the serene lakes of Pokhara to the majestic Himalayas and ancient temples of Kathmandu, your unforgettable Nepal journey begins here.</p>
    <a href="#packages" className="btn-primary large-btn">Choose Your Package</a>
  </motion.div>
</motion.section>
  {/* ░░░ CONTACT STRIP ░░░ */}
  <motion.section className="contact-strip" id="contact" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <div className="cs-grid">
        <motion.div className="cs-col" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <h3>Have Questions?</h3>
          <p>Our travel curators are available 9AM–9PM, 7 days a week for your Nepal journey.</p>
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
              <option>3N/4D Classic Journey – Solo</option>
              <option>3N/4D Classic Journey – Couple</option>
              <option>3N/4D Classic Journey – Group</option>
              <option>4N/5D Grand Explorer – Solo</option>
              <option>4N/5D Grand Explorer – Couple</option>
              <option>4N/5D Grand Explorer – Group</option>
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


