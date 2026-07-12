import { motion } from 'motion/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import WhatsAppFloat from '../Shared/Whatsappfloat';

export default function Thailand() {

  useEffect(() => {
    document.title = "Thailand | Aruvi Tours";
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
      lightboxImg.src = src.startsWith('http') || src.startsWith('/') ? src : `/Thailand/${src}`;
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

    {/* â–‘â–‘â–‘ PRELOADER â–‘â–‘â–‘ */}
  

    {/* â–‘â–‘â–‘ NAV â–‘â–‘â–‘ */}
    
    {/* Mobile Menu */}
    
    {/* â–‘â–‘â–‘ HERO â–‘â–‘â–‘ */}
    <motion.section className="hero" id="hero" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="hero-bg">
      <img src="/Thailand/thailand-bangkok-grand-palace.jpg" alt="Thailand" className="hero-img" id="heroImg" />
      <div className="hero-overlay"></div>
      <div className="hero-grain"></div>
    </div>

    <div className="hero-content">
      <motion.div className="hero-badge" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <span className="badge-dot"></span>
        2 Packages Â· Thailand Â· Multiple Durations
      </motion.div>

      <motion.h1 className="hero-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <em>Thailand</em><br />Tropical Paradise
      </motion.h1>

      <motion.p className="hero-tagline" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
        Golden temples, pristine beaches, and vibrant street life in the Land of Smiles
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
      <span className="weather-icon">ðŸŒ¤ï¸</span>
      <span>32Â°C Â· Tropical</span>
    </div>
  </motion.section>

    {/* â–‘â–‘â–‘ QUICK INFO BAR â–‘â–‘â–‘ */}
    <div className="infobar" id="infobar">
    <div className="infobar-inner">

      <div className="info-item">
        <span className="info-icon">ðŸ—“</span>
        <div>
          <span className="info-label">Packages</span>
          <span className="info-val">3N/4D Â· 4N/5D</span>
        </div>
      </div>

      <div className="info-divider"></div>

      <div className="info-item">
        <span className="info-icon">ðŸ“</span>
        <div>
          <span className="info-label">Destinations</span>
          <span className="info-val">Bangkok Â· Phuket Â· Chiang Mai</span>
        </div>
      </div>

      <div className="info-divider"></div>

      <div className="info-item">
        <span className="info-icon">ðŸ’°</span>
        <div>
          <span className="info-label">Starting From</span>
          <span className="info-val">â‚¹24,999 <small>/person</small></span>
        </div>
      </div>

      <div className="info-divider"></div>

      <div className="info-item">
        <span className="info-icon">â­</span>
        <div>
          <span className="info-label">Rating</span>
          <span className="info-val">4.8 / 5.0</span>
        </div>
      </div>

      <div className="info-divider"></div>

      <div className="info-item">
        <span className="info-icon">ðŸŒ¤</span>
        <div>
          <span className="info-label">Best Time</span>
          <span className="info-val">Nov â€“ Apr</span>
        </div>
      </div>

    </div>
  </div>
    {/* â–‘â–‘â–‘ PACKAGE SELECTOR â–‘â–‘â–‘ */}
    <motion.section className="packages" id="packages" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Choose Your Journey</motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Select Your <em>Package</em></motion.h2>

      <motion.div className="pkg-tabs" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
        <button className="pkg-tab active" data-pkg="3n4d" onClick={() => window.switchPackage && window.switchPackage('3n4d', this)}>
          <span className="pkg-tab-duration">3N / 4D</span>
          <span className="pkg-tab-name">Quick Escape</span>
        </button>
        <button className="pkg-tab" data-pkg="4n5d" onClick={() => window.switchPackage && window.switchPackage('4n5d', this)}>
          <span className="pkg-tab-duration">4N / 5D</span>
          <span className="pkg-tab-name">Classic Journey</span>
        </button>
      </motion.div>
    </div>
  </motion.section>

    {/* â–‘â–‘â–‘ ABOUT â–‘â–‘â–‘ */}
    <motion.section className="about" id="about" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>The Experience</motion.div>
      <div className="about-grid">

        <motion.div className="about-text" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <h2>Temples, Beaches & <br /><em>Thailand Grandeur</em></h2>

          <p>Discover the enchanting beauty of Thailand with Aruvi Tours, where golden temples rise against tropical skies, pristine beaches stretch endlessly, and vibrant street markets offer authentic experiences. This curated journey blends culture, adventure, and relaxation.</p>

          <p>From the bustling streets of Bangkok to the serene beaches of Phuket and the mountain temples of Chiang Mai, every moment is designed to showcase Thailand's iconic charm and natural beauty.</p>

          <a href="#itinerary" className="link-arrow">
            Explore the Journey <span>â†’</span>
          </a>
        </motion.div>

        <motion.div className="about-highlights" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>

          <div className="highlight-card">
            <div className="hc-icon">ðŸ›•</div>
            <div>
              <strong>Grand Palace Bangkok</strong>
              <p>Explore Thailand's most sacred temple complex</p>
            </div>
          </div>

          <div className="highlight-card">
            <div className="hc-icon">ðŸ–ï¸</div>
            <div>
              <strong>Phuket Beaches</strong>
              <p>Relax on Thailand's most beautiful shores</p>
            </div>
          </div>

          <div className="highlight-card">
            <div className="hc-icon">ðŸŒ¾</div>
            <div>
              <strong>Chiang Mai Temples</strong>
              <p>Historical temples and mountain culture</p>
            </div>
          </div>

          <div className="highlight-card">
            <div className="hc-icon">ðŸŒ…</div>
            <div>
              <strong>Phi Phi Islands</strong>
              <p>Island hopping with crystal clear waters</p>
            </div>
          </div>

          <div className="highlight-card">
            <div className="hc-icon">ðŸ’</div>
            <div>
              <strong>Floating Markets</strong>
              <p>Traditional Thai market experiences</p>
            </div>
          </div>

          <div className="highlight-card">
            <div className="hc-icon">ðŸŒŠ</div>
            <div>
              <strong>Thai Massage</strong>
              <p>Authentic wellness and relaxation</p>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  </motion.section>
    {/* â–‘â–‘â–‘ GALLERY â–‘â–‘â–‘ */}
    <motion.section className="gallery-section" id="gallery" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Visual Journey</motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Frames of <em>Thailand</em></motion.h2>
    </div>

    <div className="gallery-grid" id="galleryGrid">

      <motion.div className="gallery-item" data-src="/Thailand/thailand-bangkok-grand-palace.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <img src="/Thailand/thailand-bangkok-grand-palace.jpg" alt="Bangkok Grand Palace" />
        <div className="gallery-caption">Bangkok Grand Palace</div>
      </motion.div>

      <motion.div className="gallery-item" data-src="/Thailand/thailand-phuket-patong-beach.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <img src="/Thailand/thailand-phuket-patong-beach.jpg" alt="Phuket Beach" />
        <div className="gallery-caption">Phuket Patong Beach</div>
      </motion.div>

      <motion.div className="gallery-item" data-src="/Thailand/thailand-chiang-mai-temple.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <img src="/Thailand/thailand-chiang-mai-temple.jpg" alt="Chiang Mai Temple" />
        <div className="gallery-caption">Chiang Mai Temple</div>
      </motion.div>

      <motion.div className="gallery-item" data-src="/Thailand/thailand-phi-phi-island.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <img src="/Thailand/thailand-phi-phi-island.jpg" alt="Phi Phi Island" />
        <div className="gallery-caption">Phi Phi Island</div>
      </motion.div>

      <motion.div className="gallery-item" data-src="/Thailand/thailand-floating-market.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <img src="/Thailand/thailand-floating-market.jpg" alt="Floating Market" />
        <div className="gallery-caption">Floating Market</div>
      </motion.div>

      <motion.div className="gallery-item" data-src="/Thailand/thailand-wat-arun-temple.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
        <img src="/Thailand/thailand-wat-arun-temple.jpg" alt="Wat Arun Temple" />
        <div className="gallery-caption">Wat Arun Temple</div>
      </motion.div>

    </div>

    {/* Lightbox */}
    <div className="lightbox" id="lightbox">
      <button className="lb-close" id="lbClose">âœ•</button>
      <button className="lb-arrow lb-prev" id="lbPrev">â€¹</button>
      <img src="" alt="Lightbox gallery image for Thailand" className="lb-img" id="lbImg" />
      <button className="lb-arrow lb-next" id="lbNext">â€º</button>
    </div>
  </motion.section>

    {/* â–‘â–‘â–‘ ITINERARY â€” 3N/4D â–‘â–‘â–‘ */}
    <motion.section className="itinerary pkg-itinerary active" id="itinerary" data-pkg-section="3n4d" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>3N / 4D Â· Quick Escape</motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Your <em>Journey</em> Unfolds</motion.h2>
      <motion.div className="pkg-route-pills" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
        <span className="route-pill">âœˆ Arrival</span>
        <span className="route-arrow">â†’</span>
        <span className="route-pill">Bangkok</span>
        <span className="route-arrow">â†’</span>
        <span className="route-pill">Phuket</span>
        <span className="route-arrow">â†’</span>
        <span className="route-pill">âœˆ Departure</span>
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
                <h3>Arrival in Bangkok</h3>
                <span className="tl-sub">Airport â†’ Luxury Hotel</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>ðŸš— Private transfer from Suvarnabhumi Airport</li>
                <li>ðŸ¹ Welcome drink & luxury check-in</li>
                <li>ðŸ›• Visit Grand Palace & Wat Pho</li>
                <li>ðŸŒ† Evening at Bangkok skyline</li>
                <li>ðŸ½ Dinner at rooftop restaurant</li>
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
                <h3>Bangkok Exploration</h3>
                <span className="tl-sub">Temples Â· Markets Â· Culture</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>ðŸ½ Breakfast at hotel</li>
                <li>ðŸ›• Wat Arun temple visit</li>
                <li>ðŸš¤ Floating market tour</li>
                <li>ðŸ› Chatuchak market shopping</li>
                <li>ðŸ½ Dinner at local restaurant</li>
              </ul>
              <div className="tl-note">Meals: Breakfast & Dinner included</div>
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
                <h3>Phuket Beach Day</h3>
                <span className="tl-sub">Island Â· Beach Â· Relaxation</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>ðŸ›¥ Flight to Phuket</li>
                <li>ðŸ– Patong Beach relaxation</li>
                <li>ðŸŒ… Sunset at Promthep Cape</li>
                <li>ðŸ½ Seafood dinner by beach</li>
              </ul>
              <div className="tl-note">Meals: Breakfast & Dinner included</div>
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
                <h3>Phi Phi Island & Departure</h3>
                <span className="tl-sub">Island Hopping Â· Farewell</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>ðŸ›¥ Phi Phi Island tour</li>
                <li>ðŸ“¸ Maya Bay & Monkey Beach</li>
                <li>ðŸ¤¿ Snorkeling at Coral Island</li>
                <li>ðŸ½ Lunch on island</li>
                <li>ðŸš— Airport transfer</li>
              </ul>
              <div className="tl-note">Meals: Breakfast & Lunch included</div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  </motion.section>

    {/* â–‘â–‘â–‘ ITINERARY â€” 4N/5D â–‘â–‘â–‘ */}
    <motion.section className="itinerary pkg-itinerary" id="itinerary-4n5d" data-pkg-section="4n5d" style={{"display":"none"}} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>4N / 5D Â· Classic Journey</motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Your <em>Journey</em> Unfolds</motion.h2>
      <motion.div className="pkg-route-pills" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
        <span className="route-pill">âœˆ Arrival</span>
        <span className="route-arrow">â†’</span>
        <span className="route-pill">Bangkok</span>
        <span className="route-arrow">â†’</span>
        <span className="route-pill">Chiang Mai</span>
        <span className="route-arrow">â†’</span>
        <span className="route-pill">Phuket</span>
        <span className="route-arrow">â†’</span>
        <span className="route-pill">âœˆ Departure</span>
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
                <h3>Arrival in Bangkok</h3>
                <span className="tl-sub">Airport â†’ Luxury Hotel</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>ðŸš— Private transfer from Suvarnabhumi Airport</li>
                <li>ðŸ¹ Welcome drink & luxury check-in</li>
                <li>ðŸ›• Grand Palace & Wat Pho visit</li>
                <li>ðŸŒ† Evening at Bangkok skyline</li>
                <li>ðŸ½ Dinner at rooftop restaurant</li>
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
                <h3>Bangkok Full Day</h3>
                <span className="tl-sub">Temples Â· Markets Â· Culture</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>ðŸ½ Breakfast at hotel</li>
                <li>ðŸ›• Wat Arun & Wat Pho temples</li>
                <li>ðŸš¤ Floating market tour</li>
                <li>ðŸ› Chatuchak market shopping</li>
                <li>ðŸ½ Dinner at local restaurant</li>
              </ul>
              <div className="tl-note">Meals: Breakfast & Dinner included</div>
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
                <h3>Chiang Mai Adventure</h3>
                <span className="tl-sub">Temples Â· Mountains Â· Culture</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>ðŸ›¥ Flight to Chiang Mai</li>
                <li>ðŸ›• Doi Suthep temple visit</li>
                <li>ðŸ˜ Elephant sanctuary experience</li>
                <li>ðŸ½ Traditional Thai dinner</li>
              </ul>
              <div className="tl-note">Meals: Breakfast & Dinner included</div>
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
                <h3>Phuket Beach Day</h3>
                <span className="tl-sub">Island Â· Beach Â· Relaxation</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>ðŸ›¥ Flight to Phuket</li>
                <li>ðŸ– Patong Beach relaxation</li>
                <li>ðŸŒ… Sunset at Promthep Cape</li>
                <li>ðŸ½ Seafood dinner by beach</li>
              </ul>
              <div className="tl-note">Meals: Breakfast & Dinner included</div>
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
                <h3>Phi Phi Island & Departure</h3>
                <span className="tl-sub">Island Hopping Â· Farewell</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>ðŸ›¥ Phi Phi Island tour</li>
                <li>ðŸ“¸ Maya Bay & Monkey Beach</li>
                <li>ðŸ¤¿ Snorkeling at Coral Island</li>
                <li>ðŸ½ Lunch on island</li>
                <li>ðŸš— Airport transfer</li>
              </ul>
              <div className="tl-note">Meals: Breakfast & Lunch included</div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  </motion.section>
    {/* â–‘â–‘â–‘ INCLUSIONS / EXCLUSIONS â–‘â–‘â–‘ */}
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
                <p>3-4 nights in premium Thailand hotels (Bangkok, Phuket, Chiang Mai)</p>
              </div>
            </motion.div>

            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
              <div className="ic-icon">ðŸš—</div>
              <div>
                <strong>Private Transfers</strong>
                <p>Airport pickup & all sightseeing transfers included</p>
              </div>
            </motion.div>

            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
              <div className="ic-icon">ðŸ½</div>
              <div>
                <strong>Curated Dining</strong>
                <p>Daily breakfast + selected premium dinners</p>
              </div>
            </motion.div>

            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
              <div className="ic-icon">ðŸ—º</div>
              <div>
                <strong>Guided Experiences</strong>
                <p>Temple tours, cultural visits & island excursions</p>
              </div>
            </motion.div>

            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
              <div className="ic-icon">ðŸ›¥</div>
              <div>
                <strong>Island Tours</strong>
                <p>Phi Phi & island hopping with snorkeling</p>
              </div>
            </motion.div>

            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
              <div className="ic-icon">ðŸŒ…</div>
              <div>
                <strong>Sunset Experiences</strong>
                <p>Iconic viewpoints in Phuket & Bangkok</p>
              </div>
            </motion.div>

          </div>
        </div>

        <motion.div className="exc-col" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
          <div className="section-label">What's Excluded</div>
          <h2>Exclusions</h2>

          <ul className="exc-list">
            <li>âœˆ International airfare to/from Thailand</li>
            <li>ðŸ“‹ Thailand Visa charges</li>
            <li>ðŸ§¾ Travel Insurance</li>
            <li>ðŸ¹ Personal expenses</li>
            <li>ðŸ› Shopping & souvenirs</li>
            <li>ðŸ“¸ Optional activities (Spa, water sports)</li>
            <li>ðŸ’Š Medical expenses</li>
          </ul>
        </motion.div>

      </div>
    </div>
  </motion.section>

    {/* â–‘â–‘â–‘ PRICING â–‘â–‘â–‘ */}
    <motion.section className="pricing" id="pricing" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Thailand Â· 3N/4D Â· 4N/5D</motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Reserve Your <em>Escape</em></motion.h2>

      <div className="price-cards">

        {/* Card 1 â€” Solo */}
        <motion.div className="price-card" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <div className="pc-label">3N / 4D Â· Solo Traveller</div>
          <div className="pc-old">â‚¹29,999</div>
          <div className="pc-price">â‚¹24,999</div>
          <div className="pc-badge">15% OFF</div>

          <ul className="pc-perks">
            <li>Bangkok & Phuket hotel stay (single occupancy)</li>
            <li>All inclusions covered</li>
            <li>Private airport transfers</li>
            <li>Personal travel assistance</li>
          </ul>

          <a href="#contact" className="btn-primary full-btn" onClick={() => window.selectPackage && window.selectPackage('3N/4D Thailand â€“ Solo')}>Reserve 3N/4D Solo</a>
        </motion.div>

        {/* Card 2 â€” Couple (featured) */}
        <motion.div className="price-card featured" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
          <div className="pc-popular">Most Popular</div>
          <div className="pc-label">4N / 5D Â· Couple</div>
          <div className="pc-old">â‚¹44,999</div>
          <div className="pc-price">â‚¹34,999</div>
          <div className="pc-badge">22% OFF</div>

          <ul className="pc-perks">
            <li>Bangkok, Chiang Mai & Phuket stays</li>
            <li>Phi Phi island tour</li>
            <li>Temple visits & cultural experiences</li>
            <li>Daily breakfast & curated dinners</li>
            <li>Couple concierge support</li>
          </ul>

          <a href="#contact" className="btn-primary full-btn" onClick={() => window.selectPackage && window.selectPackage('4N/5D Thailand â€“ Couple')}>Reserve 4N/5D Couple</a>
        </motion.div>

        {/* Card 3 â€” Group */}
        <motion.div className="price-card" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
          <div className="pc-popular" style={{"display":"none"}}>Most Popular</div>
          <div className="pc-label">4N / 5D Â· Group (4+)</div>
          <div className="pc-old">â‚¹64,999</div>
          <div className="pc-price">â‚¹49,999</div>
          <div className="pc-badge">23% OFF</div>

          <ul className="pc-perks">
            <li>Bangkok, Chiang Mai & Phuket stays</li>
            <li>Private car transfers</li>
            <li>Full guided experience</li>
            <li>Phi Phi island tour</li>
            <li>Group assistance throughout trip</li>
          </ul>

          <a href="#contact" className="btn-primary full-btn" onClick={() => window.selectPackage && window.selectPackage('4N/5D Thailand â€“ Group')}>Reserve 4N/5D Group</a>
        </motion.div>

      </div>

      {/* Per-person note */}
      <motion.div className="price-perperson-note" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
        <div className="ppn-grid">
          <div className="ppn-item">
            <span className="ppn-icon">ðŸ‘¤</span>
            <span className="ppn-label">Solo Traveller</span>
            <span className="ppn-val">â‚¹24,999+</span>
          </div>
          <div className="ppn-item">
            <span className="ppn-icon">ðŸ’‘</span>
            <span className="ppn-label">Couple (per person)</span>
            <span className="ppn-val">â‚¹34,999+</span>
          </div>
          <div className="ppn-item">
            <span className="ppn-icon">ðŸ‘¨â€ðŸ‘©â€ðŸ‘§â€ðŸ‘¦</span>
            <span className="ppn-label">Group 4+ (per person)</span>
            <span className="ppn-val">â‚¹49,999+</span>
          </div>
        </div>
      </motion.div>

      <motion.p className="price-note" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
        ðŸ’³ EMI available Â· Flexible cancellation Â· No hidden charges
      </motion.p>
    </div>
  </motion.section>
    {/* â–‘â–‘â–‘ TESTIMONIALS â–‘â–‘â–‘ */}
    <motion.section className="testimonials" id="testimonials" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Voices of Delight</motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Stories That <em>Shine in Thailand</em></motion.h2>

      <div className="testi-slider">
        <div className="testi-track" id="testiTrack">

          <div className="testi-card">
            <div className="testi-stars">â˜…â˜…â˜…â˜…â˜…</div>
            <p>
              "Thailand's temples and beaches were absolutely magical. The Phi Phi island tour and Bangkok's golden palaces made our honeymoon unforgettable."
            </p>
            <div className="testi-author">
              <img src="https://i.pravatar.cc/60?img=47" alt="Ananya S." />
              <div>
                <strong>Ananya Sharma</strong>
                <span>Mumbai Â· Honeymoon</span>
              </div>
            </div>
          </div>

          <div className="testi-card">
            <div className="testi-stars">â˜…â˜…â˜…â˜…â˜…</div>
            <p>
              "Our family loved every moment â€” from Bangkok's cultural experiences to Phuket's crystal clear waters. Perfect balance of fun and relaxation."
            </p>
            <div className="testi-author">
              <img src="https://i.pravatar.cc/60?img=32" alt="Rohit & Priya" />
              <div>
                <strong>Rohit & Priya Menon</strong>
                <span>Bangalore Â· Family Package</span>
              </div>
            </div>
          </div>

          <div className="testi-card">
            <div className="testi-stars">â˜…â˜…â˜…â˜…â˜…</div>
            <p>
              "Thailand gave me the perfect mix of culture and beach relaxation. The temple visits and island hopping were incredible experiences."
            </p>
            <div className="testi-author">
              <img src="https://i.pravatar.cc/60?img=12" alt="Vikram N." />
              <div>
                <strong>Vikram Nair</strong>
                <span>Delhi Â· Solo Luxury</span>
              </div>
            </div>
          </div>

          <div className="testi-card">
            <div className="testi-stars">â˜…â˜…â˜…â˜…â˜†</div>
            <p>
              "Our friends trip to Thailand was amazing. The beach clubs, temple tours, and sunset views made it a perfect vacation."
            </p>
            <div className="testi-author">
              <img src="https://i.pravatar.cc/60?img=25" alt="Kavita R." />
              <div>
                <strong>Kavita & Suresh Rao</strong>
                <span>Hyderabad Â· Friends Group</span>
              </div>
            </div>
          </div>

        </div>

        <div className="testi-controls">
          <button className="tc-btn" id="tcPrev">â€¹</button>
          <div className="tc-dots" id="tcDots"></div>
          <button className="tc-btn" id="tcNext">â€º</button>
        </div>
      </div>
    </div>
  </motion.section>

    {/* â–‘â–‘â–‘ ADD-ONS â–‘â–‘â–‘ */}
    <motion.section className="addons" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Enhance Your Stay</motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Optional <em>Luxury Add-Ons</em></motion.h2>

      <div className="addon-grid">

        <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <span>ðŸ“¸</span>
          <strong>Professional Photoshoot</strong>
          <p>Photography session at iconic Thailand locations</p>
          <em>+â‚¹4,999</em>
        </motion.div>

        <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
          <span>ðŸ›¥</span>
          <strong>Private Yacht Charter</strong>
          <p>Sunset cruise around Phuket waters</p>
          <em>+â‚¹9,999</em>
        </motion.div>

        <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
          <span>ðŸŽ‚</span>
          <strong>Romantic Beach Setup</strong>
          <p>Private dinner with flowers & cake on beach</p>
          <em>+â‚¹5,499</em>
        </motion.div>

        <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
          <span>ðŸª‚</span>
          <strong>Paragliding at Phuket</strong>
          <p>Ultimate adrenaline experience over beaches</p>
          <em>+â‚¹29,999</em>
        </motion.div>

      </div>
    </div>
  </motion.section>

    {/* â–‘â–‘â–‘ FINAL CTA â–‘â–‘â–‘ */}
    <motion.section className="final-cta" id="cta" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="fcta-bg">
      <img src="/Thailand/thailand-phuket-patong-beach.jpg" alt="Thailand Temple" />
      <div className="fcta-overlay"></div>
    </div>

    <motion.div className="fcta-content" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
      <div className="section-label light">The Time Is Now</div>

      <h2>
        Paradise Awaits.<br /><em>Thailand is Calling.</em>
      </h2>

      <p>
        From the golden temples of Bangkok to pristine beaches of Phuket and cultural richness of Chiang Mai,
        your unforgettable Thailand escape begins here.
      </p>

      <a href="#pricing" className="btn-primary large-btn">Start Your Journey</a>
    </motion.div>
  </motion.section>

    {/* â–‘â–‘â–‘ CONTACT STRIP â–‘â–‘â–‘ */}
    <motion.section className="contact-strip" id="contact" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
      <div className="container">
        <div className="cs-grid">
          <motion.div className="cs-col" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
            <h3>Have Questions?</h3>
            <p>Our travel curators are available 9AMâ€“9PM, 7 days a week for your Thailand journey.</p>
            <div className="cs-actions">
              <a href="tel:+919494141475" className="cs-btn">ðŸ“ž +91 94941 41475</a>
              <a href="mailto:hello@aruvitours.in" className="cs-btn">âœ‰ hello@aruvitours.in</a>
            </div>
          </motion.div>
          <motion.div className="cs-col" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
            <h3>Quick Enquiry</h3>
            <form className="enquiry-form" onSubmit={(e) => { e.preventDefault(); window.submitEnquiry && window.submitEnquiry(); }}>
              <input type="text" id="formName" placeholder="Your Name" required />
              <input type="tel" id="formPhone" placeholder="Phone Number" required />
              <input type="hidden" id="formPkg" value="Thailand Package" />
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
