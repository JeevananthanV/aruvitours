import { motion } from 'motion/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import WhatsAppFloat from '../Shared/Whatsappfloat';

export default function SriLanka() {

  useEffect(() => {
    document.title = "srilanka | Aruvi Tours";
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
      lightboxImg.src = src.startsWith('http') || src.startsWith('/') ? src : `/srilanka/${src}`;
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
      <img src="/srilanka/sri-lanka-peaceful-tropical-view.webp" alt="Srilanka" className="hero-img" id="heroImg" />
      <div className="hero-overlay"></div>
      <div className="hero-grain"></div>
    </div>

    <div className="hero-content">
      <motion.div className="hero-badge" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <span className="badge-dot"></span>
        3 Packages · Sri lanka · Multiple Durations
      </motion.div>

      <motion.h1 className="hero-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <em>Sri lanka</em><br />Luxury Escape
      </motion.h1>

      <motion.p className="hero-tagline" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
        Discover the tropical beauty of Sri Lanka through a refined travel experience combining beaches, heritage, and lush landscapes.
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
      <span>28°C · Tropical</span>
    </div>
  </motion.section>

  {/* ░░░ QUICK INFO BAR ░░░ */}
  <div className="infobar" id="infobar">
    <div className="infobar-inner">

      <div className="info-item">
        <span className="info-icon">🗓</span>
        <div>
          <span className="info-label">Packages</span>
          <span className="info-val">2N/3D · 3N/4D · 4N/5D</span>
        </div>
      </div>

      <div className="info-divider"></div>

      <div className="info-item">
        <span className="info-icon">ðŸ“</span>
        <div>
          <span className="info-label">Destinations</span>
          <span className="info-val"> Bentota Beach</span>
        </div>
      </div>

      <div className="info-divider"></div>

      <div className="info-item">
        <span className="info-icon">💰</span>
        <div>
          <span className="info-label">Starting From</span>
          <span className="info-val">₹14,999 <small>/person</small></span>
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
          <span className="info-val">December – April· May – September</span>
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
          <h2>Cultural Heritagel<br /><em>Sri Lanka Grandeur</em></h2>

          <p>Discover the enchanting beauty of Sri Lanka with Aruvi Tours, where every journey is thoughtfully crafted to deliver comfort, culture, and unforgettable memories. From the golden shores of Bentota ðŸ️ to the lush green tea hills of Nuwara Eliya ðŸƒ and the iconic Sigiriya Rock Fortress ðŸ¯, Sri Lanka offers a perfect blend of relaxation and exploration.</p>

          <p>Our curated packages are designed to give you a seamless travel experience — combining premium stays, guided tours, and handpicked destinations. Whether you’re planning a short getaway or a deeper island exploration, Aruvi Tours ensures every moment of your trip feels effortless, immersive, and truly extraordinary ✨.</p>

          <a href="#itinerary" className="link-arrow">Explore the Journey <span>→</span></a>
        </motion.div>

        <motion.div className="about-highlights" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>

          <div className="highlight-card">
            <div className="hc-icon">ðŸ️</div>
            <div>
              <strong>Bentota Beach</strong>
              <p>Golden sands, calm waves, and luxury resorts — perfect for relaxation and water sports like jet skiing and boat rides.</p>
            </div>
          </div>

          <div className="highlight-card">
            <div className="hc-icon">ðŸ¯</div>
            <div>
              <strong>Sigiriya Rock Fortress</strong>
              <p>An ancient UNESCO heritage site known as the “Lion Rockâ€ ðŸ¦. Climb to the top for breathtaking views and historic frescoes.</p>
            </div>
          </div>

          <div className="highlight-card">
            <div className="hc-icon">ðŸƒ</div>
            <div>
              <strong>Nuwara Eliya</strong>
              <p>Cool climate, tea plantations, and colonial charm ☕ — ideal for a peaceful hill station experience.</p>
            </div>
          </div>

          <div className="highlight-card">
            <div className="hc-icon">🛕</div>
            <div>
              <strong>Temple of the Tooth</strong>
              <p>A sacred Buddhist temple 🪷 that houses a relic of Lord Buddha. A must-visit for culture and spirituality.</p>
            </div>
          </div>

          <div className="highlight-card">
            <div className="hc-icon">🌊</div>
            <div>
              <strong>Mirissa Beach</strong>
              <p>Famous for whale watching ðŸ‹ and stunning sunsets. A vibrant beach vibe with cafes and nightlife.</p>
            </div>
          </div>

          <div className="highlight-card">
            <div className="hc-icon">🌄</div>
            <div>
              <strong>Ella</strong>
              <p>A scenic mountain village with iconic spots like Nine Arches Bridge 🚂 and Little Adam’s Peak.</p>
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
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Frames of <em>Sri Lanka</em></motion.h2>
    </div>

    <div className="gallery-grid" id="galleryGrid">

      <motion.div className="gallery-item" data-src="/srilanka/sri-lanka-bentota-beach.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <img src="/srilanka/sri-lanka-bentota-beach.jpg" alt="Bentota Beach" />
        <div className="gallery-caption">Bentota Beach</div>
      </motion.div>

      <motion.div className="gallery-item" data-src="/srilanka/sri-lanka-sigiriya-rock-fortress.webp" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <img src="/srilanka/sri-lanka-sigiriya-rock-fortress.webp" alt="Sigiriya Rock Fortress" />
        <div className="gallery-caption">Sigiriya Rock Fortress</div>
      </motion.div>

      <motion.div className="gallery-item" data-src="/srilanka/sri-lanka-peaceful-tropical-view.webp" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <img src="/srilanka/sri-lanka-peaceful-tropical-view.webp" alt="Nuwara Eliya" />
        <div className="gallery-caption">Nuwara Eliya</div>
      </motion.div>

      <motion.div className="gallery-item" data-src="/srilanka/sri-lanka-mirissa-whale-watching.webp" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <img src="/srilanka/sri-lanka-mirissa-whale-watching.webp" alt="Mirissa Beach" />
        <div className="gallery-caption">Mirissa Beach</div>
      </motion.div>

      <motion.div className="gallery-item" data-src="/srilanka/sri-lanka-scenic-train-ride.webp" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <img src="/srilanka/sri-lanka-scenic-train-ride.webp" alt="Vietnamese Cuisine" />
        <div className="gallery-caption">Ella</div>
      </motion.div>

      <motion.div className="gallery-item" data-src="/srilanka/sri-lanka-galle-fort.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
        <img src="/srilanka/sri-lanka-galle-fort.jpg" alt="Yala National Park" />
        <div className="gallery-caption">Yala National Park</div>
      </motion.div>

    </div>

    {/* Lightbox */}
    <div className="lightbox" id="lightbox">
      <button className="lb-close" id="lbClose">✕</button>
      <button className="lb-arrow lb-prev" id="lbPrev">‹</button>
      <img src="" alt="Lightbox gallery image for Sri Lanka" className="lb-img" id="lbImg" />
      <button className="lb-arrow lb-next" id="lbNext">›</button>
    </div>
  </motion.section>

  {/* ░░░ ITINERARY — 2N/3D ░░░ */}
  <motion.section className="itinerary pkg-itinerary active" id="itinerary" data-pkg-section="2n3d" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>2N / 3D · Quick Escape</motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Your <em>Journey</em> Unfolds</motion.h2>
      <motion.div className="pkg-route-pills" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
        <span className="route-pill">✈ Arrival</span>
        <span className="route-arrow">→</span>
        <span className="route-pill">Kandy &amp; Sigiriya</span>
        <span className="route-arrow">→</span>
        <span className="route-pill">ðŸƒNuwara Eliya</span>
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
                <h3>Arrival in Colombo</h3>
                <span className="tl-sub">Airport → Luxury Hotel</span>
              </div>
              <div className="tl-chevron">▾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>🚗 Private transfer from Colombo </li>
                <li>ðŸ¨ Check-in at 5-star Old Quarter hotel</li>
                <li>ðŸ¹ Welcome drink &amp; orientation</li>
                <li>Evening: short city drive &amp; coastal sunset 🌅</li>
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
                <h3>Colombo City Exploration</h3>
                <span className="tl-sub">History · Culture · Street Food</span>
              </div>
              <div className="tl-chevron">▾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>ðŸ½ Breakfast at hotel</li>
                <li>🚗 Scenic drive to Kandy</li>
                <li>Visit Temple of the Tooth 🪷</li>
                <li>Explore local markets &amp; cultural spots</li>
                <li>Check-in to premium hill-view hotel in Kandy ðŸ¨</li>
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
                <h3>Nuwara Eliya</h3>
                <span className="tl-sub">Heritage Sites · Scenic Train</span>
              </div>
              <div className="tl-chevron">▾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>🚂 Morning scenic train ride to Nuwara Eliya</li>
                <li>Visit tea plantations &amp; factory tour ðŸƒ</li>
                <li>Check-in to colonial-style hotel</li>
                <li>Explore Gregory Lake &amp; local market</li>
                <li>ðŸ½️ Farewell dinner at hotel</li>
              </ul>
              <div className="tl-note">Meals: Lunch, Dinner &amp; Breakfast included</div>
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
        <span className="route-pill">Colombo ðŸ¨</span>
        <span className="route-arrow">→</span>
        <span className="route-pill">Nuwara Eliya</span>
        <span className="route-arrow">→</span>
        <span className="route-pill">Kandy 🚗</span>
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
                <h3>Arrival in Colombo</h3>
                <span className="tl-sub">Airport → Luxury Hotel</span>
              </div>
              <div className="tl-chevron">▾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>🚗 Private transfer from Colombo </li>
                <li>ðŸ¨ Check-in at 5-star Old Quarter hotel</li>
                <li>ðŸ¹ Welcome drink &amp; orientation</li>
                <li>Evening: short city drive &amp; coastal sunset 🌅</li>
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
                <h3>Kandy Full Day Tour</h3>
                <span className="tl-sub">City · tea plantations · Cultural Sites</span>
              </div>
              <div className="tl-chevron">▾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>ðŸ½ Breakfast at hotel</li>
                <li>Drive to Kandy 🚗</li>
                <li>Visit Temple of the Tooth 🪷</li>
                <li>Cultural show 🎭</li>
                <li>Stay at hill-view luxury hotel ðŸ¨</li>
                <li>ðŸ½️ Dinner &amp; overnight stay</li>
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
                <h3>Nuwara Eliya</h3>
                <span className="tl-sub">Tea Trails · Hill Retreat</span>
              </div>
              <div className="tl-chevron">▾</div>
            </div>
            <div className="tl-body">
              <ul>
                
                <li>🚂 Morning scenic train ride to Nuwara Eliya</li>
                <li>Visit tea plantations &amp; factory tour ðŸƒ</li>
                <li>Check-in to colonial-style hotel</li>
                <li>Explore Gregory Lake &amp; local market</li>
                <li>ðŸ½️ Dinner at hotel</li>
              </ul>
              <div className="tl-note">Meals: Full board on cruise</div>
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
                <h3>Hoi An Ancient Town</h3>
                <span className="tl-sub">Lanterns · Heritage · Culture</span>
              </div>
              <div className="tl-chevron">▾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>🌅 Bay sunrise &amp; brunch</li>
                <li>✈ Flight Hanoi → Da Nang</li>
                <li>🚗 Transfer to Hoi An boutique hotel</li>
                <li>ðŸ® Evening lantern walk through ancient town</li>
                <li>ðŸ½ Dinner by the Thu Bon River</li>
              </ul>
              <div className="tl-note">Meals: Brunch &amp; Dinner included</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </motion.section>

  {/* ░░░ ITINERARY — 4N/5D ░░░ */}
  <motion.section className="itinerary pkg-itinerary" id="itinerary-4n5d" data-pkg-section="4n5d" style={{"display":"none"}} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>4N / 5D · Grand Explorer</motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Your <em>Journey</em> Unfolds</motion.h2>
      <motion.div className="pkg-route-pills" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
        <span className="route-pill">✈ Arrival</span>
        <span className="route-arrow">→</span>
        <span className="route-pill">Colombo ðŸ¨</span>
        <span className="route-arrow">→</span>
        <span className="route-pill">Kandy &amp; Sigiriya</span>
        <span className="route-arrow">→</span>
        <span className="route-pill">Nuwara Eliya ðŸ¨</span>
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
                <h3>Arrival in Hanoi</h3>
                <span className="tl-sub">Airport → Heritage Hotel</span>
              </div>
              <div className="tl-chevron">▾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>🚗 Private transfer from airport</li>
                <li>ðŸ¨ Check-in at Old Quarter boutique hotel</li>
                <li>ðŸ¹ Welcome cocktail &amp; orientation</li>
                <li>Evening cyclo tour of Old Quarter &amp; Hoan Kiem Lake 🌅</li>
                <li>ðŸ½️ Dinner at local fine dining restaurant</li>
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
                <h3>Kandy &amp; Sigiriya</h3>
                <span className="tl-sub">Spiritual · Royal · Scenic</span>
              </div>
              <div className="tl-chevron">▾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>ðŸ½ Breakfast at hotel</li>
                <li>🚗 Drive to Kandy</li>
                <li>Visit Temple of the Tooth 🪷</li>
                <li>Cultural show 🎭</li>
                <li>Check-in to hill-view luxury hotel ðŸ¨</li>
                <li>ðŸ½️ Dinner &amp; overnight stay</li>
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
                <h3>Nuwara Eliya ðŸ¨</h3>
                <span className="tl-sub">Cool Climate · Tea Trails · Views</span>
              </div>
              <div className="tl-chevron">▾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>🚂 Morning scenic train ride to Nuwara Eliya</li>
                <li>Visit tea plantations &amp; factory tour ðŸƒ</li>
                <li>Check-in to colonial-style hotel</li>
                <li>Explore Gregory Lake &amp; local market</li>
                <li>ðŸ½️ Dinner at hotel</li>
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
                <h3>Benota</h3>
                <span className="tl-sub">Golden Beach · Coastal Stay</span>
              </div>
              <div className="tl-chevron">▾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>☕ Breakfast at hotel</li>
                <li>🚗 Transfer to Benota beach resort</li>
                <li>ðŸ– Afternoon at the beach &amp; resort pool</li>
                <li>ðŸ½️ Sunset seafood dinner by the shore</li>
              </ul>
              <div className="tl-note">Meals: Full board on cruise</div>
            </div>
          </div>
        </motion.div>

        {/* Day 5 */}
        <motion.div className="tl-item" data-day="5" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
          <div className="tl-marker">
            <span className="tl-day">Day 5</span>
            <div className="tl-dot"></div>
          </div>
          <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
            <div className="tl-header">
              <div>
                <h3>Departure</h3>
                <span className="tl-sub">Crafts · Culture · Heritage</span>
              </div>
              <div className="tl-chevron">▾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>☕ Breakfast at hotel</li>
                <li>ðŸ› Last-minute shopping for local crafts &amp; souvenirs</li>
                <li>🚗 Private transfer to airport for departure</li>
              </ul>
              <div className="tl-note">Meals: Brunch &amp; Dinner included</div>
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
                <strong>5-Star Hotel Stay</strong>
                <p>Luxury boutique hotels in all destinations</p>
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
                <strong>Colombo Sunset Cruisee</strong>
                <p>Luxury Beach Resort Stay with Full Board</p>
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
                <p>Traditional Ayurveda Spa Experience (Grand Package)</p>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div className="exc-col" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
          <div className="section-label">What's Excluded</div>
          <h2>Exclusions</h2>
          <ul className="exc-list">
            <li>✈ International airfare to/from Sri lanka</li>
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
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>2N/3D · Quick Escape</motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Reserve Your <em>Escape</em></motion.h2>

      <div className="price-cards">

        {/* Card 1 — Solo */}
        <motion.div className="price-card" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <div className="pc-label">3N / 4D · Solo Traveller</div>
          <div className="pc-old">₹22,999</div>
          <div className="pc-price">₹14,999</div>
          <div className="pc-badge">30% OFF</div>
          <ul className="pc-perks">
            <li>Colombo 1 night + Kandy 1 night + Bentota 1 night</li>
            <li>All transfers &amp; guided sightseeing tours</li>
            <li>Sigiriya Rock visit &amp; scenic train experience</li>
            <li>Meals as per itinerary</li>
          </ul>
          <a href="#contact" className="btn-primary full-btn" onClick={() => window.selectPackage && window.selectPackage('2N/3D Quick Escape – Solo')}>Reserve 2N/3D Solo</a>
        </motion.div>

        {/* Card 2 — Couple (featured) */}
        <motion.div className="price-card featured" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
          <div className="pc-popular">Most Popular</div>
          <div className="pc-label">3N / 4D · Couple</div>
          <div className="pc-old">₹38,999</div>
          <div className="pc-price">₹22,999</div>
          <div className="pc-badge">34% OFF</div>
          <ul className="pc-perks">
            <li>Colombo city stay + Kandy hill retreat + Bentota beach resort</li>
            <li>Private transfers &amp; guided cultural tours</li>
            <li>Sigiriya Fortress climb &amp; tea plantation experience</li>
            <li>Daily breakfast &amp; curated dinners</li>
          </ul>
          <a href="#contact" className="btn-primary full-btn" onClick={() => window.selectPackage && window.selectPackage('3N/4D Quick Escape – Couple')}>Reserve 3N/4D Couple</a>
        </motion.div>

        {/* Card 3 — Group */}
        <motion.div className="price-card" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
          <div className="pc-popular" style={{"display":"none"}}>Most Popular</div>
          <div className="pc-label">4N / 5D · Group (4+)</div>
          <div className="pc-old">₹49,999</div>
          <div className="pc-price">₹35,999</div>
          <div className="pc-badge">43% OFF</div>
          <ul className="pc-perks">
            <li>Colombo city stay + Kandy hill retreat + Bentota beach resort</li>
            <li>Private transfers &amp; guided cultural tours</li>
            <li>Sigiriya Fortress climb &amp; tea plantation experience</li>
            <li>Daily breakfast &amp; curated dinners</li>
          </ul>
          <a href="#contact" className="btn-primary full-btn" onClick={() => window.selectPackage && window.selectPackage('4N/5D Quick Escape – Group')}>Reserve 4N/5D Group</a>
        </motion.div>

      </div>

      {/* Per-person note */}
      <motion.div className="price-perperson-note" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
        <div className="ppn-grid">
          <div className="ppn-item">
            <span className="ppn-icon">👤</span>
            <span className="ppn-label">Solo Traveller</span>
            <span className="ppn-val">₹14,999+</span>
          </div>
          <div className="ppn-item">
            <span className="ppn-icon">💑</span>
            <span className="ppn-label">Couple (per person)</span>
            <span className="ppn-val">₹22,999+</span>
          </div>
          <div className="ppn-item">
            <span className="ppn-icon">👨â€👩â€👧â€👦</span>
            <span className="ppn-label">Group 4+ (per person)</span>
            <span className="ppn-val">₹35,999+</span>
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
            <p>"The Sri Lanka experience was absolutely magical. Waking up to misty tea plantations and cool mountain air in Nuwara Eliya was unforgettable — I've never seen anything like it. The 4N/5D package was perfectly curated, from the Sigiriya views to the Bentota beach stay. Every detail exceeded our expectations."</p>
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
            <p>"The Grand Explorer 6N/7D package was worth every rupee. Sapa highlands felt like another world — the rice terraces and village culture were breathtaking. Hoi An at night with the lanterns was pure magic."</p>
            <div className="testi-author">
              <img src="https://i.pravatar.cc/60?img=32" alt="Arjun &amp; Meera" />
              <div>
                <strong>Arjun &amp; Meera Krishnan</strong>
                <span>Bangalore · 6N/7D Grand Explorer</span>
              </div>
            </div>
          </div>

          <div className="testi-card">
            <div className="testi-stars">★★★★★</div>
            <p>"We only had a long weekend and the 3N/4D Quick Escape was perfect. Hanoi's energy and the Ha Long Bay cruise covered so much in so little time. I'm already planning the 6N/7D for next year!"</p>
            <div className="testi-author">
              <img src="https://i.pravatar.cc/60?img=12" alt="Ravi N." />
              <div>
                <strong>Ravi Nambiar</strong>
                <span>Mumbai · 3N/4D Quick Escape</span>
              </div>
            </div>
          </div>

          <div className="testi-card">
            <div className="testi-stars">★★★★☆</div>
            <p>"The family package for the 6N/7D was exceptional. Our kids loved the kayaking in Ha Long Bay and the cooking class on the cruise. The guides were knowledgeable and friendly throughout."</p>
            <div className="testi-author">
              <img src="https://i.pravatar.cc/60?img=25" alt="Kavitha R." />
              <div>
                <strong>Kavitha &amp; Suresh Rao</strong>
                <span>Hyderabad · 6N/7D Family Group</span>
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
          <strong>Nuwara Eliya Photoshoot</strong>
          <p>Professional shoot on tea plantations</p>
          <em>+₹3,999</em>
        </motion.div>

        <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
          <strong>Madu River Safari</strong>
          <p>Explore mangroves, islands &amp; serene backwaters</p>
          <em>+₹2,999</em>
        </motion.div>

        <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
          <span>🌴</span>
          <strong>Beachside Candlelight</strong>
          <p>Private seaside setup with candles, flowers &amp; ocean views</p>
          <em>+₹3,499</em>
        </motion.div>

        <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
          <span>🚶</span>
          <strong>Colombo Food Walk</strong>
          <p>Guided tour of local markets &amp; traditional dishes</p>
          <em>+₹2,999</em>
        </motion.div>

      </div>
    </div>
  </motion.section>

  {/* ░░░ FINAL CTA ░░░ */}
  <motion.section className="final-cta" id="cta" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="fcta-bg">
      <img src="/srilanka/sri-lanka-peaceful-tropical-view.webp" alt="Tropical landscape of Sri Lanka" />
      <div className="fcta-overlay"></div>
    </div>
    <motion.div className="fcta-content" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
      <div className="section-label light">The Time Is Now</div>
      <h2>Explore The World<br /><em>Sri Lanka is Calling.</em></h2>
      <p>From the emerald waters of Ha Long Bay to the golden lanterns of Hoi An, your unforgettable Vietnamese journey begins here.</p>
      <a href="#packages" className="btn-primary large-btn">Choose Your Package</a>
    </motion.div>
  </motion.section>

  {/* ░░░ CONTACT STRIP ░░░ */}
  <motion.section className="contact-strip" id="contact" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <div className="cs-grid">
        <motion.div className="cs-col" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <h3>Have Questions?</h3>
          <p>Our travel curators are available 9AM–9PM, 7 days a week for your Vietnam journey.</p>
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


