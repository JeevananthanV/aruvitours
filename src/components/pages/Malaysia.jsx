import { motion } from 'motion/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import WhatsAppFloat from '../Shared/Whatsappfloat';

export default function Malaysia() {

  useEffect(() => {
    document.title = "malaysia | Aruvi Tours";
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
      lightboxImg.src = src.startsWith('http') || src.startsWith('/') ? src : `/malaysia/${src}`;
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
    
  {/* Floating weather pill */}
    <div className="hero-weather">
        <span className="weather-icon">🌴</span>
        <span>30°C · Tropical Paradise</span>
    </div>

<motion.section className="hero" id="hero" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="hero-bg">
      <img src="/malaysia/malaysia-kuala-lumpur-petronas.jpg" alt="Lakshadweep lagoon landscape" className="hero-img" id="heroImg" />
      <div className="hero-overlay"></div>
      <div className="hero-grain"></div>
    </div>

    <div className="hero-content">
      <motion.div className="hero-badge" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <span className="badge-dot"></span>
        3 Nights · 4 Days · Malaysia,India
      </motion.div>
      <motion.h1 className="hero-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <em>Malaysia</em><br />Lagoon Escape
      </motion.h1>
      <motion.p className="hero-tagline" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
        Turquoise lagoons and coral atolls — an island paradise
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
      <span>32°C · Sunny</span>
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
        <span className="info-val">Kuala Lumpur · Langkawi · Penang</span>
    </div>
    </div>

    <div className="info-divider"></div>

    <div className="info-item">
    <span className="info-icon">💰</span>
    <div>
        <span className="info-label">Starting From</span>
        <span className="info-val">₹29,999 <small>/person</small></span>
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
        <span className="info-val">November – April</span>
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
        <span className="pkg-tab-duration">3N / 4D</span>
        <span className="pkg-tab-name">Kuala Lumpur Explorer</span>
        </button>
        <button className="pkg-tab" data-pkg="4n5d" onClick={() => window.switchPackage && window.switchPackage('4n5d', this)}>
        <span className="pkg-tab-duration">4N / 5D</span>
        <span className="pkg-tab-name">Malaysia Grand Escape</span>
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
        <h2>Malaysia<br /><em>Tropical Luxury Escape</em></h2>

        <p>Discover the vibrant beauty of Malaysia with Aruvi Tours, where futuristic skylines, tropical islands, and rich cultural heritage come together across Kuala Lumpur ðŸ™️, Langkawi ðŸ️, and Penang 🎨. Experience the iconic Petronas Twin Towers 🌆, serene beaches, and colorful street art scenes.</p>

        <p>Our curated Malaysia packages offer a seamless blend of luxury stays, island hopping adventures, skybridge experiences, and cultural exploration. Whether it's a short city escape or a full tropical journey, Aruvi Tours ensures a memorable and premium travel experience ✨.</p>

        <a href="#itinerary" className="link-arrow">Explore the Journey <span>→</span></a>
        </motion.div>

        <motion.div className="about-highlights" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>

        <div className="highlight-card">
            <div className="hc-icon">ðŸ™️</div>
            <div>
            <strong>Kuala Lumpur</strong>
            <p>Modern capital city with Petronas Towers, Bukit Bintang shopping, and vibrant nightlife.</p>
            </div>
        </div>

        <div className="highlight-card">
            <div className="hc-icon">🌆</div>
            <div>
            <strong>Petronas Twin Towers</strong>
            <p>Iconic skyline landmark offering breathtaking city views and luxury surroundings.</p>
            </div>
        </div>

        <div className="highlight-card">
            <div className="hc-icon">ðŸ️</div>
            <div>
            <strong>Langkawi Islands</strong>
            <p>Crystal-clear beaches, island hopping tours, and relaxing tropical escapes.</p>
            </div>
        </div>

        <div className="highlight-card">
            <div className="hc-icon">🌉</div>
            <div>
            <strong>Sky Bridge</strong>
            <p>Suspended bridge offering panoramic views of Langkawi’s lush landscape and sea.</p>
            </div>
        </div>

        <div className="highlight-card">
            <div className="hc-icon">🎨</div>
            <div>
            <strong>Penang Heritage</strong>
            <p>Historic streets, street art, and cultural fusion of Malay, Chinese &amp; Indian influences.</p>
            </div>
        </div>

        <div className="highlight-card">
            <div className="hc-icon">ðŸœ</div>
            <div>
            <strong>Local Cuisine</strong>
            <p>Experience Malaysia’s famous street food like Nasi Lemak, Satay, and Laksa.</p>
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
    <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Frames of <em>Malaysia Escape</em></motion.h2>
  </div>

  <div className="gallery-grid" id="galleryGrid">

    <motion.div className="gallery-item" data-src="/malaysia/malaysia-kuala-lumpur-city.webp" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
      <img src="/malaysia/malaysia-kuala-lumpur-city.webp" alt="Kuala Lumpur City" />
      <div className="gallery-caption">Kuala Lumpur · Skyline</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="/malaysia/malaysia-petronas-twin-towers.webp" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
      <img src="/malaysia/malaysia-petronas-twin-towers.webp" alt="Petronas Towers" />
      <div className="gallery-caption">Petronas Twin Towers · KL</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="/malaysia/malaysia-langkawi-beach-resort.webp" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
      <img src="/malaysia/malaysia-langkawi-beach-resort.webp" alt="Langkawi Island" />
      <div className="gallery-caption">Langkawi · Beaches</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="/malaysia/malaysia-langkawi-sky-bridge.webp" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
      <img src="/malaysia/malaysia-langkawi-sky-bridge.webp" alt="Langkawi Sky Bridge" />
      <div className="gallery-caption">Sky Bridge · Langkawi</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="/malaysia/malaysia-georgetown-street-art.webp" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
      <img src="/malaysia/malaysia-kuala-lumpur-petronas.jpg" alt="Penang Street Art" />
      <div className="gallery-caption">George Town · Penang</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="/malaysia/malaysia-georgetown-street-art.webp" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
      <img src="/malaysia/malaysia-georgetown-street-art.webp" alt="Malaysian Street Food" />
      <div className="gallery-caption">Malaysia · Street Food Culture</div>
    </motion.div>

  </div>

  {/* Lightbox */}
  <div className="lightbox" id="lightbox">
    <button className="lb-close" id="lbClose">✕</button>
    <button className="lb-arrow lb-prev" id="lbPrev">‹</button>
    <img src="" alt="Lightbox gallery image for Malaysia" className="lb-img" id="lbImg" />
    <button className="lb-arrow lb-next" id="lbNext">›</button>
  </div>
</motion.section>

{/* ░░░ ITINERARY — 3N/4D ░░░ */}
<motion.section className="itinerary pkg-itinerary active" id="itinerary" data-pkg-section="2n3d" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
  <div className="container">
    <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>3N / 4D · Malaysia Escape</motion.div>
    <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Your <em>Journey</em> Unfolds</motion.h2>
    <motion.div className="pkg-route-pills" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
      <span className="route-pill">✈ Arrival</span>
      <span className="route-arrow">→</span>
      <span className="route-pill">Kuala Lumpur</span>
      <span className="route-arrow">→</span>
      <span className="route-pill">Langkawi</span>
      <span className="route-arrow">→</span>
      <span className="route-pill">Penang</span>
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
              <h3>Arrival in Kuala Lumpur</h3>
              <span className="tl-sub">Airport → City Hotel</span>
            </div>
            <div className="tl-chevron">▾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>🚗 Private airport transfer</li>
              <li>ðŸ¨ Check-in at luxury hotel</li>
              <li>🌆 Visit KLCC &amp; Petronas Towers</li>
              <li>ðŸ› Evening Bukit Bintang walk</li>
              <li>ðŸ½ Dinner at hotel</li>
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
              <h3>Kuala Lumpur → Langkawi</h3>
              <span className="tl-sub">Island Transfer</span>
            </div>
            <div className="tl-chevron">▾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>ðŸ½ Breakfast at hotel</li>
              <li>✈ Flight to Langkawi</li>
              <li>ðŸ Check-in beach resort</li>
              <li>🌊 Pantai Cenang beach visit</li>
              <li>ðŸ½ Dinner by the beach</li>
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
              <h3>Langkawi Exploration</h3>
              <span className="tl-sub">Island · Sky Bridge · Nature</span>
            </div>
            <div className="tl-chevron">▾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>🚡 Langkawi Sky Bridge</li>
              <li>ðŸ Island hopping tour</li>
              <li>🌿 Eagle Square visit</li>
              <li>ðŸ› Local shopping</li>
              <li>ðŸ½ Dinner at resort</li>
            </ul>
            <div className="tl-note">Meals: Breakfast &amp; Dinner included</div>
          </div>
        </div>
      </motion.div>

    </div>
  </div>
</motion.section>

{/* ░░░ ITINERARY — 4N/5D ░░░ */}
<motion.section className="itinerary pkg-itinerary" id="itinerary-4n5d" data-pkg-section="4n5d" style={{"display":"none"}} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
  <div className="container">
    <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>4N / 5D · Malaysia Grand Escape</motion.div>
    <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Your <em>Journey</em> Unfolds</motion.h2>
    <motion.div className="pkg-route-pills" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
      <span className="route-pill">✈ Arrival</span>
      <span className="route-arrow">→</span>
      <span className="route-pill">Kuala Lumpur</span>
      <span className="route-arrow">→</span>
      <span className="route-pill">Langkawi</span>
      <span className="route-arrow">→</span>
      <span className="route-pill">Penang</span>
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
              <h3>Arrival in Kuala Lumpur</h3>
              <span className="tl-sub">City Orientation</span>
            </div>
            <div className="tl-chevron">▾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>🚗 Airport transfer</li>
              <li>ðŸ¨ Hotel check-in</li>
              <li>🌆 KL Tower &amp; Twin Towers visit</li>
              <li>ðŸ› Shopping at Suria KLCC</li>
              <li>ðŸ½ Dinner at hotel</li>
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
              <h3>Kuala Lumpur → Langkawi</h3>
              <span className="tl-sub">Island Transfer</span>
            </div>
            <div className="tl-chevron">▾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>ðŸ½ Breakfast at hotel</li>
              <li>✈ Flight to Langkawi</li>
              <li>ðŸ Beach resort check-in</li>
              <li>🌊 Sunset beach walk</li>
              <li>ðŸ½ Dinner by seaside</li>
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
              <h3>Langkawi Adventure</h3>
              <span className="tl-sub">Nature · Sky Bridge</span>
            </div>
            <div className="tl-chevron">▾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>🚡 Sky Bridge cable car</li>
              <li>ðŸ Island hopping tour</li>
              <li>ðŸŠ Mangrove forest cruise</li>
              <li>ðŸ› Local market visit</li>
              <li>ðŸ½ Dinner at resort</li>
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
              <h3>Langkawi → Penang</h3>
              <span className="tl-sub">Cultural Heritage</span>
            </div>
            <div className="tl-chevron">▾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>✈ Travel to Penang</li>
              <li>ðŸ› George Town heritage walk</li>
              <li>🎨 Street art exploration</li>
              <li>ðŸ› Local shopping</li>
              <li>ðŸ½ Dinner at hotel</li>
            </ul>
            <div className="tl-note">Meals: Breakfast &amp; Dinner included</div>
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
              <span className="tl-sub">Return Journey</span>
            </div>
            <div className="tl-chevron">▾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>☕ Breakfast</li>
              <li>🚗 Transfer to airport</li>
              <li>✈ Departure from Malaysia</li>
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
              <strong>4-Star / 5-Star Hotel Stay</strong>
              <p>Premium stays in Kuala Lumpur, Langkawi &amp; Penang</p>
            </div>
          </motion.div>

          <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
            <div className="ic-icon">🚗</div>
            <div>
              <strong>Private Transfers</strong>
              <p>Airport pickups, intercity travel &amp; island transfers</p>
            </div>
          </motion.div>

          <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
            <div className="ic-icon">ðŸ½</div>
            <div>
              <strong>Curated Meals</strong>
              <p>Daily breakfast + selected dinners with Malaysian cuisine</p>
            </div>
          </motion.div>

          <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
            <div className="ic-icon">ðŸ</div>
            <div>
              <strong>Island Tours</strong>
              <p>Langkawi island hopping, beaches &amp; sunset cruises</p>
            </div>
          </motion.div>

          <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
            <div className="ic-icon">🚡</div>
            <div>
              <strong>Sky Bridge Access</strong>
              <p>Langkawi Sky Bridge cable car experience included</p>
            </div>
          </motion.div>

          <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
            <div className="ic-icon">🎭</div>
            <div>
              <strong>Cultural Experiences</strong>
              <p>Penang heritage walks, street art tours &amp; KL city tours</p>
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
          <li>🧾 Optional activity charges</li>
          <li>ðŸ¹ Personal expenses &amp; beverages</li>
          <li>ðŸ› Shopping &amp; souvenirs</li>
          <li>📸 Camera / video permits (if applicable)</li>
          <li>💊 Medical expenses</li>
        </ul>
      </motion.div>

    </div>
  </div>
</motion.section>
{/* ░░░ PRICING ░░░ */}
<motion.section className="pricing" id="pricing" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
  <div className="container">
    <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>3N/4D · Malaysia Escape</motion.div>
    <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Reserve Your <em>Journey</em></motion.h2>

    <div className="price-cards">

      {/* Card 1 — Solo */}
      <motion.div className="price-card" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
        <div className="pc-label">3N / 4D · Solo Traveller</div>
        <div className="pc-old">₹34,999</div>
        <div className="pc-price">₹24,999</div>
        <div className="pc-badge">28% OFF</div>
        <ul className="pc-perks">
          <li>Kuala Lumpur 2 nights + Langkawi 1 night</li>
          <li>Airport transfers &amp; intercity travel</li>
          <li>KL city tour &amp; Petronas Towers visit</li>
          <li>Langkawi beach &amp; Sky Bridge access</li>
        </ul>
        <a href="#contact" className="btn-primary full-btn" onClick={() => window.selectPackage && window.selectPackage('3N/4D Malaysia – Solo')}>Reserve 3N/4D Solo</a>
      </motion.div>

      {/* Card 2 — Couple (featured) */}
      <motion.div className="price-card featured" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <div className="pc-popular">Most Popular</div>
        <div className="pc-label">3N / 4D · Couple</div>
        <div className="pc-old">₹64,999</div>
        <div className="pc-price">₹44,999</div>
        <div className="pc-badge">31% OFF</div>
        <ul className="pc-perks">
          <li>Kuala Lumpur luxury stay + Langkawi resort stay</li>
          <li>Private transfers &amp; guided sightseeing</li>
          <li>Sunset cruise &amp; island hopping</li>
          <li>Daily breakfast &amp; romantic dinners</li>
        </ul>
        <a href="#contact" className="btn-primary full-btn" onClick={() => window.selectPackage && window.selectPackage('3N/4D Malaysia – Couple')}>Reserve 3N/4D Couple</a>
      </motion.div>

      {/* Card 3 — Group */}
      <motion.div className="price-card" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <div className="pc-popular" style={{"display":"none"}}>Most Popular</div>
        <div className="pc-label">4N / 5D · Group (4+)</div>
        <div className="pc-old">₹89,999</div>
        <div className="pc-price">₹69,999</div>
        <div className="pc-badge">22% OFF</div>
        <ul className="pc-perks">
          <li>Kuala Lumpur + Langkawi + Penang extended stay</li>
          <li>Private transfers &amp; full guided tours</li>
          <li>Island hopping, Sky Bridge &amp; heritage walk</li>
          <li>Daily breakfast &amp; curated dinners</li>
        </ul>
        <a href="#contact" className="btn-primary full-btn" onClick={() => window.selectPackage && window.selectPackage('4N/5D Malaysia – Group')}>Reserve 4N/5D Group</a>
      </motion.div>

    </div>

    {/* Per-person note */}
    <motion.div className="price-perperson-note" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
      <div className="ppn-grid">
        <div className="ppn-item">
          <span className="ppn-icon">👤</span>
          <span className="ppn-label">Solo Traveller</span>
          <span className="ppn-val">₹24,999+</span>
        </div>
        <div className="ppn-item">
          <span className="ppn-icon">💑</span>
          <span className="ppn-label">Couple (per person)</span>
          <span className="ppn-val">₹44,999+</span>
        </div>
        <div className="ppn-item">
          <span className="ppn-icon">👨â€👩â€👧â€👦</span>
          <span className="ppn-label">Group 4+ (per person)</span>
          <span className="ppn-val">₹69,999+</span>
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
          <p>"The Malaysia journey was absolutely unforgettable. Watching the skyline of Kuala Lumpur at night was breathtaking, and Langkawi’s beaches felt like paradise. The 4N/5D package was perfectly curated — every moment was smooth and luxurious."</p>
          <div className="testi-author">
            <img src="https://i.pravatar.cc/60?img=47" alt="Priya S." />
            <div>
              <strong>Venkatachalam</strong>
              <span>Chennai · 4N/5D Malaysia Premium Journey</span>
            </div>
          </div>
        </div>

        <div className="testi-card">
          <div className="testi-stars">★★★★★</div>
          <p>"A perfect mix of culture, modern city life, and comfort. Kuala Lumpur’s skyline, Penang’s heritage streets, and Malaysia’s natural beauty made this trip special. The guides were excellent and everything was well organized."</p>
          <div className="testi-author">
            <img src="https://i.pravatar.cc/60?img=32" alt="Arjun &amp; Meera" />
            <div>
              <strong>Arjun &amp; Meera Krishnan</strong>
              <span>Bangalore · 3N/4D Couple Malaysia Trip</span>
            </div>
          </div>
        </div>

        <div className="testi-card">
          <div className="testi-stars">★★★★★</div>
          <p>"We had limited time and chose the 3N/4D Malaysia Explorer package — it covered everything perfectly. Kuala Lumpur, Batu Caves, and city highlights were all amazing. Truly a hassle-free and premium experience."</p>
          <div className="testi-author">
            <img src="https://i.pravatar.cc/60?img=12" alt="Ravi N." />
            <div>
              <strong>Ravi Nambiar</strong>
              <span>Mumbai · 3N/4D Malaysia Quick Escape</span>
            </div>
          </div>
        </div>

        <div className="testi-card">
          <div className="testi-stars">★★★★☆</div>
          <p>"The 4N/5D family Malaysia trip was amazing. Our kids loved exploring theme parks and cable car rides in Langkawi. Kuala Lumpur sightseeing and Penang food tour were highlights. Great service throughout the journey."</p>
          <div className="testi-author">
            <img src="https://i.pravatar.cc/60?img=25" alt="Kavitha R." />
            <div>
              <strong>Kavitha &amp; Suresh Rao</strong>
              <span>Hyderabad · 4N/5D Malaysia Family Trip</span>
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
        <strong>Petronas Towers Night Photoshoot</strong>
        <p>Professional photoshoot with Kuala Lumpur skyline backdrop</p>
        <em>+₹3,999</em>
      </motion.div>

      <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <span>🚡</span>
        <strong>Langkawi Sky Bridge Experience</strong>
        <p>Walk above the rainforest with stunning island views</p>
        <em>+₹2,999</em>
      </motion.div>

      <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <span>🌆</span>
        <strong>Kuala Lumpur Night Tour</strong>
        <p>Explore illuminated city landmarks &amp; vibrant street life</p>
        <em>+₹2,499</em>
      </motion.div>

      <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
        <span>ðŸ½</span>
        <strong>Malaysian Cultural Dinner</strong>
        <p>Traditional cuisine experience with cultural performances</p>
        <em>+₹3,499</em>
      </motion.div>

    </div>
  </div>
</motion.section>

{/* ░░░ FINAL CTA ░░░ */}
<motion.section className="final-cta" id="cta" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
  <div className="fcta-bg">
    <img src="/malaysia/malaysia-georgetown-street-art.webp" alt="George Town street art in Penang, Malaysia" />
    <div className="fcta-overlay"></div>
  </div>
  <motion.div className="fcta-content" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="section-label light">The Time Is Now</div>
    <h2>Explore Malaysia<br /><em>Your Adventure Awaits.</em></h2>
    <p>From the iconic skyline of Kuala Lumpur to the beaches of Langkawi and the cultural charm of Penang, your unforgettable Malaysia journey begins here.</p>
    <a href="#packages" className="btn-primary large-btn">Choose Your Package</a>
  </motion.div>
</motion.section>
  {/* ░░░ CONTACT STRIP ░░░ */}
  <motion.section className="contact-strip" id="contact" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <div className="cs-grid">
        <motion.div className="cs-col" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <h3>Have Questions?</h3>
          <p>Our travel curators are available 9AM–9PM, 7 days a week for your malaysia journey.</p>
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
              <option>3N/4D Quick Escape – Solo</option>
              <option>3N/4D Quick Escape – Couple</option>
              <option>3N/4D Quick Escape – Group</option>
              <option>4N/5D Classic Journey – Solo</option>
              <option>4N/5D Classic Journey – Couple</option>
              <option>4N/5D Classic Journey – Group</option>
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


