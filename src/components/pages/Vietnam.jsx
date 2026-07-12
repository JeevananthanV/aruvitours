import { motion } from 'motion/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import WhatsAppFloat from '../Shared/Whatsappfloat';

export default function Vietnam() {

  useEffect(() => {
    document.title = "Vietnam | Aruvi Tours";
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
      lightboxImg.src = src.startsWith('http') || src.startsWith('/') ? src : `/Vietnam/${src}`;
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
      <img src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1800&amp;q=85" alt="Vietnam" className="hero-img" id="heroImg" />
      <div className="hero-overlay"></div>
      <div className="hero-grain"></div>
    </div>

    <div className="hero-content">
      <motion.div className="hero-badge" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <span className="badge-dot"></span>
        3 Packages Â· Vietnam Â· Multiple Durations
      </motion.div>

      <motion.h1 className="hero-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <em>Vietnam</em><br />Luxury Escape
      </motion.h1>

      <motion.p className="hero-tagline" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
        Where ancient traditions meet breathtaking landscapes
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
      <span className="weather-icon">â˜€ï¸</span>
      <span>28Â°C Â· Tropical</span>
    </div>
  </motion.section>

  {/* â–‘â–‘â–‘ QUICK INFO BAR â–‘â–‘â–‘ */}
  <div className="infobar" id="infobar">
    <div className="infobar-inner">

      <div className="info-item">
        <span className="info-icon">ðŸ—“</span>
        <div>
          <span className="info-label">Packages</span>
          <span className="info-val">3N/4D Â· 4N/5D Â· 6N/7D</span>
        </div>
      </div>

      <div className="info-divider"></div>

      <div className="info-item">
        <span className="info-icon">Ã°Å¸â€œÂ</span>
        <div>
          <span className="info-label">Destinations</span>
          <span className="info-val">Hanoi Â· Ha Long Â· Hoi An</span>
        </div>
      </div>

      <div className="info-divider"></div>

      <div className="info-item">
        <span className="info-icon">ðŸ’°</span>
        <div>
          <span className="info-label">Starting From</span>
          <span className="info-val">â‚¹22,999 <small>/person</small></span>
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
        <span className="info-icon">ðŸŒ¿</span>
        <div>
          <span className="info-label">Best Time</span>
          <span className="info-val">Feb â€“ Apr Â· Aug â€“ Oct</span>
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
        <button className="pkg-tab" data-pkg="6n7d" onClick={() => window.switchPackage && window.switchPackage('6n7d', this)}>
          <span className="pkg-tab-duration">6N / 7D</span>
          <span className="pkg-tab-name">Grand Explorer</span>
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
          <h2>Ancient Culture &amp; Tropical<br /><em>Vietnamese Splendour</em></h2>

          <p>Step into the magical world of Vietnam â€” where ancient temples, emerald bays, and lantern-lit streets create an unforgettable journey. Our curated luxury escapes blend culture, adventure, and immersive experiences across multiple duration packages.</p>

          <p>From the colonial charm of Hanoi's Old Quarter to the surreal karst formations of Ha Long Bay and the golden lanterns of Hoi An, every moment reveals the soul of this extraordinary country.</p>

          <a href="#itinerary" className="link-arrow">Explore the Journey <span>â†’</span></a>
        </motion.div>

        <motion.div className="about-highlights" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>

          <div className="highlight-card">
            <div className="hc-icon">ðŸš¢</div>
            <div>
              <strong>Ha Long Bay Cruise</strong>
              <p>Sail through UNESCO World Heritage limestone karsts</p>
            </div>
          </div>

          <div className="highlight-card">
            <div className="hc-icon">Ã°Å¸ÂÂ®</div>
            <div>
              <strong>Hoi An Lantern Festival</strong>
              <p>Experience ancient town's magical evening atmosphere</p>
            </div>
          </div>

          <div className="highlight-card">
            <div className="hc-icon">Ã°Å¸ÂÅ“</div>
            <div>
              <strong>Street Food Tours</strong>
              <p>Authentic pho, banh mi &amp; local culinary delights</p>
            </div>
          </div>

          <div className="highlight-card">
            <div className="hc-icon">ðŸ›•</div>
            <div>
              <strong>Temple Exploration</strong>
              <p>Hanoi's Hoan Kiem Lake &amp; Temple of Literature</p>
            </div>
          </div>

          <div className="highlight-card">
            <div className="hc-icon">ðŸŒ¾</div>
            <div>
              <strong>Rice Terraces Trek</strong>
              <p>Sapa highland villages &amp; panoramic valley views</p>
            </div>
          </div>

          <div className="highlight-card">
            <div className="hc-icon">Ã°Å¸Ââ€“</div>
            <div>
              <strong>Da Nang Beaches</strong>
              <p>Pristine golden sands of My Khe &amp; Lang Co</p>
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
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Frames of <em>Vietnam</em></motion.h2>
    </div>

    <div className="gallery-grid" id="galleryGrid">

      <motion.div className="gallery-item" data-src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&amp;q=85" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <img src="/Vietnam/vie-1.jpg" alt="Ha Long Bay Vietnam" />
        <div className="gallery-caption">Ha Long Bay, Quáº£ng Ninh</div>
      </motion.div>

      <motion.div className="gallery-item" data-src="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1200&amp;q=85" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <img src="/Vietnam/vie-2.jpg" alt="Hoi An Lanterns" />
        <div className="gallery-caption">Há»™i An Ancient Town</div>
      </motion.div>

      <motion.div className="gallery-item" data-src="https://images.unsplash.com/photo-1580549411702-8c11bd1f2a48?w=1200&amp;q=85" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <img src="/Vietnam/vie-3.jpg" alt="Vietnam Rice Terraces" />
        <div className="gallery-caption">Sapa Rice Terraces</div>
      </motion.div>

      <motion.div className="gallery-item" data-src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200&amp;q=85" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <img src="/Vietnam/vie-4.jpg" alt="Hanoi Old Quarter" />
        <div className="gallery-caption">Hanoi Old Quarter</div>
      </motion.div>

      <motion.div className="gallery-item" data-src="https://images.unsplash.com/photo-1554931670-4ebfabf6e7a9?w=1200&amp;q=85" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <img src="https://images.unsplash.com/photo-1554931670-4ebfabf6e7a9?w=700&amp;q=80" alt="Vietnamese Cuisine" />
        <div className="gallery-caption">Authentic Vietnamese Cuisine</div>
      </motion.div>

      <motion.div className="gallery-item" data-src="https://images.unsplash.com/photo-1570366583862-f91883984fde?w=1200&amp;q=85" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
        <img src="/Vietnam/vie-6.jpg" alt="Da Nang Beach" />
        <div className="gallery-caption">Da Nang Coastal Escape</div>
      </motion.div>

    </div>

    {/* Lightbox */}
    <div className="lightbox" id="lightbox">
      <button className="lb-close" id="lbClose">âœ•</button>
      <button className="lb-arrow lb-prev" id="lbPrev">â€¹</button>
      <img src="" alt="Lightbox gallery image for Vietnam" className="lb-img" id="lbImg" />
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
        <span className="route-pill">Ã°Å¸Ââ„¢ Hanoi</span>
        <span className="route-arrow">â†’</span>
        <span className="route-pill">ðŸš¢ Ha Long Bay</span>
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
                <h3>Arrival in Hanoi</h3>
                <span className="tl-sub">Airport â†’ Luxury Hotel</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>ðŸš— Private transfer from Noi Bai Airport</li>
                <li>Ã°Å¸ÂÂ¨ Check-in at 5-star Old Quarter hotel</li>
                <li>Ã°Å¸ÂÂ¹ Welcome drink &amp; orientation</li>
                <li>ðŸŒ† Evening walk around Hoan Kiem Lake</li>
                <li>Ã°Å¸ÂÅ“ Dinner at authentic Vietnamese restaurant</li>
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
                <h3>Hanoi City Exploration</h3>
                <span className="tl-sub">History Â· Culture Â· Street Food</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>Ã°Å¸ÂÂ½ Breakfast at hotel</li>
                <li>ðŸ›• Visit Temple of Literature &amp; Ho Chi Minh Mausoleum</li>
                <li>Ã°Å¸Ââ€º Explore Vietnam Museum of Ethnology</li>
                <li>ðŸ›µ Old Quarter street food tour by cyclo</li>
                <li>Ã°Å¸ÂÂ· Farewell dinner at rooftop restaurant</li>
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
                <h3>Ha Long Bay Cruise</h3>
                <span className="tl-sub">UNESCO Heritage Â· Overnight Cruise</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>ðŸšŒ Transfer to Ha Long Bay (3.5 hrs)</li>
                <li>ðŸš¢ Board luxury overnight cruise</li>
                <li>Ã°Å¸ÂÂ Explore limestone karsts &amp; hidden caves</li>
                <li>ðŸ›¶ Kayaking through emerald lagoons</li>
                <li>ðŸŒ… Sunset cocktails on sundeck</li>
                <li>Ã°Å¸ÂÂ½ Seafood dinner on board</li>
              </ul>
              <div className="tl-note">Meals: Lunch, Dinner &amp; Breakfast included</div>
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
                <h3>Bay Morning &amp; Departure</h3>
                <span className="tl-sub">Farewell Vietnam</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>ðŸŒ… Sunrise on the bay deck</li>
                <li>â˜• Brunch on cruise</li>
                <li>ðŸšŒ Return transfer to Hanoi</li>
                <li>ðŸš— Airport drop-off</li>
              </ul>
              <div className="tl-note">Meals: Brunch included</div>
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
        <span className="route-pill">Ã°Å¸Ââ„¢ Hanoi</span>
        <span className="route-arrow">â†’</span>
        <span className="route-pill">ðŸš¢ Ha Long Bay</span>
        <span className="route-arrow">â†’</span>
        <span className="route-pill">Ã°Å¸ÂÂ® Hoi An</span>
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
                <h3>Arrival in Hanoi</h3>
                <span className="tl-sub">Airport â†’ Luxury Hotel</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>ðŸš— Private transfer from Noi Bai Airport</li>
                <li>Ã°Å¸ÂÂ¨ Check-in at luxury boutique hotel</li>
                <li>Ã°Å¸ÂÂ¹ Welcome cocktail &amp; city overview</li>
                <li>ðŸŒ† Evening stroll around Hoan Kiem Lake</li>
                <li>Ã°Å¸ÂÅ“ Welcome dinner with traditional music</li>
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
                <h3>Hanoi Full Day Tour</h3>
                <span className="tl-sub">Temples Â· Museums Â· Old Quarter</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>Ã°Å¸ÂÂ½ Breakfast at hotel</li>
                <li>ðŸ›• Temple of Literature &amp; One Pillar Pagoda</li>
                <li>Ã°Å¸Ââ€º Vietnam Museum of Ethnology</li>
                <li>ðŸŽ­ Water puppet show experience</li>
                <li>ðŸ›µ Street food tour by cyclo</li>
                <li>Ã°Å¸ÂÂ· Rooftop dinner with city views</li>
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
                <h3>Ha Long Bay Cruise</h3>
                <span className="tl-sub">UNESCO Heritage Â· Overnight</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>ðŸšŒ Scenic transfer to Ha Long Bay</li>
                <li>ðŸš¢ Board 5-star luxury junk cruise</li>
                <li>Ã°Å¸ÂÂ Limestone karst cave exploration</li>
                <li>ðŸ›¶ Kayaking &amp; bamboo boat rides</li>
                <li>ðŸŽ£ Squid fishing at night</li>
                <li>ðŸŒ… Sunset cocktail hour on deck</li>
                <li>ðŸ¦ž Seafood gala dinner on board</li>
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
                <span className="tl-sub">Lanterns Â· Heritage Â· Culture</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>ðŸŒ… Bay sunrise &amp; brunch</li>
                <li>âœˆ Flight Hanoi â†’ Da Nang</li>
                <li>ðŸš— Transfer to Hoi An boutique hotel</li>
                <li>Ã°Å¸ÂÂ® Evening lantern walk through ancient town</li>
                <li>Ã°Å¸ÂÂ½ Dinner by the Thu Bon River</li>
              </ul>
              <div className="tl-note">Meals: Brunch &amp; Dinner included</div>
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
                <h3>Hoi An &amp; Departure</h3>
                <span className="tl-sub">Farewell Vietnam</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>â˜• Breakfast at hotel</li>
                <li>Ã°Å¸â€ºÂ Morning market &amp; tailoring street</li>
                <li>ðŸš— Transfer to Da Nang Airport</li>
              </ul>
              <div className="tl-note">Meals: Breakfast included</div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  </motion.section>

  {/* â–‘â–‘â–‘ ITINERARY â€” 6N/7D â–‘â–‘â–‘ */}
  <motion.section className="itinerary pkg-itinerary" id="itinerary-6n7d" data-pkg-section="6n7d" style={{"display":"none"}} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>6N / 7D Â· Grand Explorer</motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Your <em>Journey</em> Unfolds</motion.h2>
      <motion.div className="pkg-route-pills" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
        <span className="route-pill">âœˆ Arrival</span>
        <span className="route-arrow">â†’</span>
        <span className="route-pill">Ã°Å¸Ââ„¢ Hanoi</span>
        <span className="route-arrow">â†’</span>
        <span className="route-pill">Ã°Å¸Ââ€ Sapa</span>
        <span className="route-arrow">â†’</span>
        <span className="route-pill">ðŸš¢ Ha Long</span>
        <span className="route-arrow">â†’</span>
        <span className="route-pill">Ã°Å¸ÂÂ® Hoi An</span>
        <span className="route-arrow">â†’</span>
        <span className="route-pill">Ã°Å¸Ââ€“ Da Nang</span>
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
                <h3>Arrival in Hanoi</h3>
                <span className="tl-sub">Airport â†’ Heritage Hotel</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>ðŸš— Private VIP transfer from airport</li>
                <li>Ã°Å¸ÂÂ¨ Check-in at 5-star heritage hotel</li>
                <li>Ã°Å¸ÂÂ¹ Welcome cocktail reception</li>
                <li>ðŸŒ† Evening at Hoan Kiem Lake &amp; Ngoc Son Temple</li>
                <li>Ã°Å¸ÂÅ“ Gala welcome dinner with cultural show</li>
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
                <h3>Hanoi Deep Dive</h3>
                <span className="tl-sub">History Â· Art Â· Cuisine</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>Ã°Å¸ÂÂ½ Breakfast at hotel</li>
                <li>ðŸ›• Temple of Literature &amp; Ho Chi Minh Complex</li>
                <li>Ã°Å¸Ââ€º Fine Arts Museum &amp; Hoa Lo Prison</li>
                <li>ðŸŽ¨ Local art gallery visit</li>
                <li>ðŸŽ­ Evening water puppet theatre</li>
                <li>Ã°Å¸ÂÂ· Fine dining at award-winning restaurant</li>
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
                <h3>Sapa Highland Adventure</h3>
                <span className="tl-sub">Mountains Â· Villages Â· Trekking</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>ðŸš„ Overnight train / early morning flight to Sapa</li>
                <li>Ã°Å¸Ââ€ Panoramic Fansipan Mountain views</li>
                <li>ðŸŒ¾ Trek through Muong Hoa Valley terraces</li>
                <li>Ã°Å¸ÂËœ H'mong &amp; Red Dao ethnic village visits</li>
                <li>ðŸŽ‹ Authentic highland homestay dinner</li>
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
                <h3>Ha Long Bay Luxury Cruise</h3>
                <span className="tl-sub">UNESCO Wonder Â· Overnight Junk</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>ðŸšŒ Return to Hanoi &amp; transfer to Ha Long</li>
                <li>ðŸš¢ Board premium 5-star junk cruise</li>
                <li>Ã°Å¸ÂÂ Sung Sot Cave &amp; Titov Island excursion</li>
                <li>ðŸ›¶ Kayaking in hidden lagoons</li>
                <li>Ã°Å¸ÂÂ³ Cooking class on board</li>
                <li>ðŸŽ£ Squid fishing by starlight</li>
                <li>ðŸ¦ž Full seafood banquet dinner</li>
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
                <h3>Hoi An Ancient Town</h3>
                <span className="tl-sub">Lanterns Â· Heritage Â· Tailoring</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>ðŸŒ… Sunrise tai chi on cruise deck</li>
                <li>âœˆ Flight Hanoi â†’ Da Nang</li>
                <li>ðŸš— Transfer to Hoi An luxury resort</li>
                <li>Ã°Å¸ÂÂ® Ancient town lantern walking tour</li>
                <li>Ã°Å¸â€ºÂ Japanese Covered Bridge &amp; merchant houses</li>
                <li>Ã°Å¸ÂÂ½ River-view dinner at upscale restaurant</li>
              </ul>
              <div className="tl-note">Meals: Brunch &amp; Dinner included</div>
            </div>
          </div>
        </motion.div>

        {/* Day 6 */}
        <motion.div className="tl-item" data-day="6" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
          <div className="tl-marker">
            <span className="tl-day">Day 6</span>
            <div className="tl-dot"></div>
          </div>
          <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
            <div className="tl-header">
              <div>
                <h3>Da Nang Coastal Bliss</h3>
                <span className="tl-sub">Beaches Â· Marble Mountains Â· Spa</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>â˜• Breakfast at boutique hotel</li>
                <li>â›° Marble Mountains &amp; Am Phu Cave</li>
                <li>Ã°Å¸Ââ€“ Afternoon at My Khe Beach</li>
                <li>â™¨ï¸ Vietnamese traditional spa &amp; massage</li>
                <li>ðŸŒ‰ Dragon Bridge evening stroll</li>
                <li>Ã°Å¸Â¦Â Seafood farewell dinner at beach shack</li>
              </ul>
              <div className="tl-note">Meals: Breakfast &amp; Dinner included</div>
            </div>
          </div>
        </motion.div>

        {/* Day 7 */}
        <motion.div className="tl-item" data-day="7" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
          <div className="tl-marker">
            <span className="tl-day">Day 7</span>
            <div className="tl-dot"></div>
          </div>
          <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
            <div className="tl-header">
              <div>
                <h3>Departure</h3>
                <span className="tl-sub">Farewell Vietnam</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>â˜• Breakfast at hotel</li>
                <li>Ã°Å¸â€ºÂ Last-minute souvenir shopping</li>
                <li>ðŸš— Private transfer to Da Nang Airport</li>
              </ul>
              <div className="tl-note">Meals: Breakfast included</div>
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
              <div className="ic-icon">Ã°Å¸ÂÂ¨</div>
              <div>
                <strong>5-Star Hotel Stay</strong>
                <p>Luxury boutique hotels in all destinations</p>
              </div>
            </motion.div>

            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
              <div className="ic-icon">ðŸš—</div>
              <div>
                <strong>Private Transfers</strong>
                <p>All airport and intercity transfers included</p>
              </div>
            </motion.div>

            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
              <div className="ic-icon">Ã°Å¸ÂÂ½</div>
              <div>
                <strong>Curated Meals</strong>
                <p>Daily breakfast + premium dinners as per itinerary</p>
              </div>
            </motion.div>

            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
              <div className="ic-icon">ðŸš¢</div>
              <div>
                <strong>Ha Long Bay Cruise</strong>
                <p>Luxury overnight junk cruise with full board</p>
              </div>
            </motion.div>

            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
              <div className="ic-icon">ðŸ—º</div>
              <div>
                <strong>Guided Tours</strong>
                <p>Expert local guides at every destination</p>
              </div>
            </motion.div>

            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
              <div className="ic-icon">ðŸ§˜</div>
              <div>
                <strong>Spa &amp; Wellness</strong>
                <p>Traditional Vietnamese spa experience (Grand package)</p>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div className="exc-col" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
          <div className="section-label">What's Excluded</div>
          <h2>Exclusions</h2>
          <ul className="exc-list">
            <li>âœˆ International airfare to/from Vietnam</li>
            <li>ðŸ“‹ Travel Insurance</li>
            <li>ðŸ§¾ Visa charges</li>
            <li>Ã°Å¸ÂÂº Personal expenses &amp; alcohol</li>
            <li>Ã°Å¸â€ºÂ Shopping &amp; souvenirs</li>
            <li>ðŸ“¸ Optional add-ons</li>
            <li>ðŸ’Š Medical expenses</li>
          </ul>
        </motion.div>

      </div>
    </div>
  </motion.section>

  {/* â–‘â–‘â–‘ PRICING â–‘â–‘â–‘ */}
  <motion.section className="pricing" id="pricing" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>3N/4D Â· Quick Escape</motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Reserve Your <em>Escape</em></motion.h2>

      <div className="price-cards">

        {/* Card 1 â€” Solo */}
        <motion.div className="price-card" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <div className="pc-label">3N / 4D Â· Solo Traveller</div>
          <div className="pc-old">â‚¹32,999</div>
          <div className="pc-price">â‚¹22,999</div>
          <div className="pc-badge">30% OFF</div>
          <ul className="pc-perks">
            <li>Hanoi 2 nights + Ha Long cruise 1 night</li>
            <li>Ha Long Bay overnight junk cruise</li>
            <li>All transfers &amp; guided city tour</li>
            <li>Meals as per itinerary</li>
          </ul>
          <a href="#contact" className="btn-primary full-btn" onClick={() => window.selectPackage && window.selectPackage('3N/4D Quick Escape â€“ Solo')}>Reserve 3N/4D Solo</a>
        </motion.div>

        {/* Card 2 â€” Couple (featured) */}
        <motion.div className="price-card featured" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
          <div className="pc-popular">Most Popular</div>
          <div className="pc-label">3N / 4D Â· Couple</div>
          <div className="pc-old">â‚¹58,999</div>
          <div className="pc-price">â‚¹38,999</div>
          <div className="pc-badge">34% OFF</div>
          <ul className="pc-perks">
            <li>Hanoi 2 nights + Ha Long cruise 1 night</li>
            <li>Romantic setup &amp; couple activities</li>
            <li>Ha Long Bay overnight cruise</li>
            <li>All transfers &amp; guided city tour</li>
            <li>Meals as per itinerary</li>
          </ul>
          <a href="#contact" className="btn-primary full-btn" onClick={() => window.selectPackage && window.selectPackage('3N/4D Quick Escape â€“ Couple')}>Reserve 3N/4D Couple</a>
        </motion.div>

        {/* Card 3 â€” Group */}
        <motion.div className="price-card" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
          <div className="pc-popular" style={{"display":"none"}}>Most Popular</div>
          <div className="pc-label">3N / 4D Â· Group (4+)</div>
          <div className="pc-old">â‚¹1,19,999</div>
          <div className="pc-price">â‚¹67,999</div>
          <div className="pc-badge">43% OFF</div>
          <ul className="pc-perks">
            <li>Hanoi 2 nights + Ha Long cruise 1 night</li>
            <li>Ha Long Bay overnight junk cruise</li>
            <li>All transfers &amp; expert guided tours</li>
            <li>Group discounts on activities</li>
            <li>Meals as per itinerary</li>
          </ul>
          <a href="#contact" className="btn-primary full-btn" onClick={() => window.selectPackage && window.selectPackage('3N/4D Quick Escape â€“ Group')}>Reserve 3N/4D Group</a>
        </motion.div>

      </div>

      {/* Per-person note */}
      <motion.div className="price-perperson-note" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
        <div className="ppn-grid">
          <div className="ppn-item">
            <span className="ppn-icon">ðŸ‘¤</span>
            <span className="ppn-label">Solo Traveller</span>
            <span className="ppn-val">â‚¹22,999+</span>
          </div>
          <div className="ppn-item">
            <span className="ppn-icon">ðŸ’‘</span>
            <span className="ppn-label">Couple (per person)</span>
            <span className="ppn-val">â‚¹19,499+</span>
          </div>
          <div className="ppn-item">
            <span className="ppn-icon">ðŸ‘¨Ã¢â‚¬ÂðŸ‘©Ã¢â‚¬ÂðŸ‘§Ã¢â‚¬ÂðŸ‘¦</span>
            <span className="ppn-label">Group 4+ (per person)</span>
            <span className="ppn-val">â‚¹16,999+</span>
          </div>
        </div>
      </motion.div>

      <motion.p className="price-note" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
        ðŸ’³ EMI available Â· 100% refund if cancelled 7 days before Â· No hidden charges
      </motion.p>
    </div>
  </motion.section>

  {/* â–‘â–‘â–‘ TESTIMONIALS â–‘â–‘â–‘ */}
  <motion.section className="testimonials" id="testimonials" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Voices of Delight</motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Stories That <em>Stay</em></motion.h2>

      <div className="testi-slider">
        <div className="testi-track" id="testiTrack">

          <div className="testi-card">
            <div className="testi-stars">â˜…â˜…â˜…â˜…â˜…</div>
            <p>"The Ha Long Bay cruise was absolutely magical. Waking up surrounded by limestone karsts with morning mist â€” I've never seen anything like it. The 4N/5D package was perfectly curated. Every detail exceeded our expectations."</p>
            <div className="testi-author">
              <img src="https://i.pravatar.cc/60?img=47" alt="Priya S." />
              <div>
                <strong>Priya Subramaniam</strong>
                <span>Chennai Â· 4N/5D Classic Journey</span>
              </div>
            </div>
          </div>

          <div className="testi-card">
            <div className="testi-stars">â˜…â˜…â˜…â˜…â˜…</div>
            <p>"The Grand Explorer 6N/7D package was worth every rupee. Sapa highlands felt like another world â€” the rice terraces and village culture were breathtaking. Hoi An at night with the lanterns was pure magic."</p>
            <div className="testi-author">
              <img src="https://i.pravatar.cc/60?img=32" alt="Arjun &amp; Meera" />
              <div>
                <strong>Arjun &amp; Meera Krishnan</strong>
                <span>Bangalore Â· 6N/7D Grand Explorer</span>
              </div>
            </div>
          </div>

          <div className="testi-card">
            <div className="testi-stars">â˜…â˜…â˜…â˜…â˜…</div>
            <p>"We only had a long weekend and the 3N/4D Quick Escape was perfect. Hanoi's energy and the Ha Long Bay cruise covered so much in so little time. I'm already planning the 6N/7D for next year!"</p>
            <div className="testi-author">
              <img src="https://i.pravatar.cc/60?img=12" alt="Ravi N." />
              <div>
                <strong>Ravi Nambiar</strong>
                <span>Mumbai Â· 3N/4D Quick Escape</span>
              </div>
            </div>
          </div>

          <div className="testi-card">
            <div className="testi-stars">â˜…â˜…â˜…â˜…â˜†</div>
            <p>"The family package for the 6N/7D was exceptional. Our kids loved the kayaking in Ha Long Bay and the cooking class on the cruise. The guides were knowledgeable and friendly throughout."</p>
            <div className="testi-author">
              <img src="https://i.pravatar.cc/60?img=25" alt="Kavitha R." />
              <div>
                <strong>Kavitha &amp; Suresh Rao</strong>
                <span>Hyderabad Â· 6N/7D Family Group</span>
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
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Optional <em>Add-Ons</em></motion.h2>
      <div className="addon-grid">

        <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <span>ðŸ“¸</span>
          <strong>Ha Long Bay Photoshoot</strong>
          <p>Professional shoot on karst limestone cruise</p>
          <em>+â‚¹3,999</em>
        </motion.div>

        <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
          <span>Ã°Å¸Å¡Â</span>
          <strong>Helicopter Over Ha Long</strong>
          <p>Aerial panoramic view of UNESCO bay</p>
          <em>+â‚¹8,499</em>
        </motion.div>

        <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
          <span>ðŸŽ‚</span>
          <strong>Romantic Setup</strong>
          <p>Flowers, floating candles &amp; personalised dÃ©cor</p>
          <em>+â‚¹2,999</em>
        </motion.div>

        <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
          <span>ðŸ›µ</span>
          <strong>Motorbike Food Tour</strong>
          <p>Authentic Hanoi street food on scooter</p>
          <em>+â‚¹1,999</em>
        </motion.div>

      </div>
    </div>
  </motion.section>

  {/* â–‘â–‘â–‘ FINAL CTA â–‘â–‘â–‘ */}
  <motion.section className="final-cta" id="cta" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="fcta-bg">
      <img src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1800&amp;q=85" alt="Vietnam Ha Long Bay" />
      <div className="fcta-overlay"></div>
    </div>
    <motion.div className="fcta-content" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
      <div className="section-label light">The Time Is Now</div>
      <h2>Life is Short.<br /><em>Vietnam is Calling.</em></h2>
      <p>From the emerald waters of Ha Long Bay to the golden lanterns of Hoi An, your unforgettable Vietnamese journey begins here.</p>
      <a href="#packages" className="btn-primary large-btn">Choose Your Package</a>
    </motion.div>
  </motion.section>

  {/* â–‘â–‘â–‘ CONTACT STRIP â–‘â–‘â–‘ */}
  <motion.section className="contact-strip" id="contact" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <div className="cs-grid">
        <motion.div className="cs-col" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <h3>Have Questions?</h3>
          <p>Our travel curators are available 9AMâ€“9PM, 7 days a week for your Vietnam journey.</p>
          <div className="cs-actions">
            <a href="tel:+919494141475" className="cs-btn">ðŸ“ž +91 94941 41475</a>
            <a href="mailto:hello@lumierevoyage.in" className="cs-btn">âœ‰ hello@lumierevoyage.in</a>
          </div>
        </motion.div>
        <motion.div className="cs-col" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
          <h3>Quick Enquiry</h3>
          <div className="cs-form">
            <input type="text" placeholder="Your Name" className="cs-input" id="formName" />
            <input type="tel" placeholder="Phone Number" className="cs-input" id="formPhone" />
            <select className="cs-input" id="formPkg">
              <option value="">Select Package</option>
              <option>3N/4D Quick Escape â€“ Solo</option>
              <option>3N/4D Quick Escape â€“ Couple</option>
              <option>3N/4D Quick Escape â€“ Group</option>
              <option>4N/5D Classic Journey â€“ Solo</option>
              <option>4N/5D Classic Journey â€“ Couple</option>
              <option>4N/5D Classic Journey â€“ Group</option>
              <option>6N/7D Grand Explorer â€“ Solo</option>
              <option>6N/7D Grand Explorer â€“ Couple</option>
              <option>6N/7D Grand Explorer â€“ Group</option>
            </select>
            <button className="btn-primary" onClick={() => window.submitEnquiry && window.submitEnquiry()}>Send Enquiry</button>
          </div>
        </motion.div>
      </div>
    </div>
  </motion.section>

  {/* â–‘â–‘â–‘ FOOTER â–‘â–‘â–‘ */}
  

  {/* Toast notification */}
  <div className="toast" id="toast"></div>
      </div>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

