import { motion } from 'motion/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import WhatsAppFloat from '../Shared/Whatsappfloat';

export default function Dubai() {

  useEffect(() => {
    document.title = "Dubai | Aruvi Tours";
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
      lightboxImg.src = src.startsWith('http') || src.startsWith('/') ? src : `/Dubai/${src}`;
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
    <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1800&amp;q=85" alt="Dubai" className="hero-img" id="heroImg" />
    <div className="hero-overlay"></div>
    <div className="hero-grain"></div>
  </div>

  <div className="hero-content">
    <motion.div className="hero-badge" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
      <span className="badge-dot"></span>
      4 Nights Â· 5 Days Â· Dubai
    </motion.div>

    <motion.h1 className="hero-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
      <em>Dubai</em><br />Luxury Escape
    </motion.h1>

    <motion.p className="hero-tagline" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
      Where modern marvels meet Arabian elegance
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
    <span className="weather-icon">ðŸŒ¤ï¸</span>
    <span>35Â°C Â· Sunny</span>
  </div>
</motion.section>

  {/* â–‘â–‘â–‘ QUICK INFO BAR â–‘â–‘â–‘ */}
  <div className="infobar" id="infobar">
  <div className="infobar-inner">

    <div className="info-item">
      <span className="info-icon">ðŸ—“</span>
      <div>
        <span className="info-label">Duration</span>
        <span className="info-val">4N / 5D</span>
      </div>
    </div>

    <div className="info-divider"></div>

    <div className="info-item">
      <span className="info-icon">Ã°Å¸â€œÂ</span>
      <div>
        <span className="info-label">Location</span>
        <span className="info-val">Dubai</span>
      </div>
    </div>

    <div className="info-divider"></div>

    <div className="info-item">
      <span className="info-icon">ðŸ’°</span>
      <div>
        <span className="info-label">Starting From</span>
        <span className="info-val">â‚¹22,999<small>/person</small></span>
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
        <span className="info-val">Nov â€“ Mar</span>
      </div>
    </div>

  </div>
</div>
  {/* â–‘â–‘â–‘ ABOUT â–‘â–‘â–‘ */}
 <motion.section className="about" id="about" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
  <div className="container">
    <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>The Experience</motion.div>

    <div className="about-grid">

      <motion.div className="about-text" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
        <h2>Skylines, Desert &amp; Dazzling<br /><em>Dubai Luxury Escape</em></h2>

        <p>
          Experience the grandeur of Dubai â€” where futuristic skylines rise from golden deserts,
          luxury meets tradition, and every moment feels larger than life. This curated 4N/5D escape
          blends adventure, elegance, and world-class comfort.
        </p>

        <p>
          From Burj Khalifa sunsets and luxury yacht cruises to desert safaris under starlit skies,
          every detail is designed to showcase Dubaiâ€™s iconic charm and modern opulence.
        </p>

        <a href="#itinerary" className="link-arrow">
          Explore the Journey <span>â†’</span>
        </a>
      </motion.div>

      <motion.div className="about-highlights" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>

        <div className="highlight-card">
          <div className="hc-icon">Ã°Å¸Ââ„¢</div>
          <div>
            <strong>Burj Khalifa Experience</strong>
            <p>View the world from the tallest tower</p>
          </div>
        </div>

        <div className="highlight-card">
          <div className="hc-icon">Ã°Å¸ÂÅ“</div>
          <div>
            <strong>Desert Safari</strong>
            <p>Dune bashing &amp; Arabian night camp</p>
          </div>
        </div>

        <div className="highlight-card">
          <div className="hc-icon">ðŸ›¥</div>
          <div>
            <strong>Luxury Yacht Cruise</strong>
            <p>Sail through Dubai Marina skyline</p>
          </div>
        </div>

        <div className="highlight-card">
          <div className="hc-icon">ðŸ•Œ</div>
          <div>
            <strong>Dubai Cultural Tour</strong>
            <p>Explore Al Fahidi &amp; heritage districts</p>
          </div>
        </div>

        <div className="highlight-card">
          <div className="hc-icon">Ã°Å¸â€ºÂ</div>
          <div>
            <strong>Dubai Mall Experience</strong>
            <p>Shopping, aquarium &amp; fountain show</p>
          </div>
        </div>

        <div className="highlight-card">
          <div className="hc-icon">ðŸŒ…</div>
          <div>
            <strong>Sunset Views</strong>
            <p>Golden hour at Palm Jumeirah</p>
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
    <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Frames of <em>Luxury Dubai</em></motion.h2>
  </div>

  <div className="gallery-grid" id="galleryGrid">

    <motion.div className="gallery-item" data-src="/Dubai/dubai-1.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
      <img src="/Dubai/dubai-1.jpg" alt="Burj Khalifa Skyline" />
      <div className="gallery-caption">Burj Khalifa Skyline</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="/Dubai/dubai-2.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
      <img src="/Dubai/dubai-2.jpg" alt="Dubai Marina Sunset" />
      <div className="gallery-caption">Dubai Marina Sunset</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="/Dubai/dubai-3.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
      <img src="/Dubai/dubai-3.jpg" alt="Luxury Desert Safari" />
      <div className="gallery-caption">Desert Safari Experience</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="/Dubai/dubai-4.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
      <img src="/Dubai/dubai-4.jpg" alt="Luxury Yacht Cruise" />
      <div className="gallery-caption">Yacht Cruise at Marina</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="/Dubai/dubai-5.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
      <img src="/Dubai/dubai-5.jpg" alt="Palm Jumeirah View" />
      <div className="gallery-caption">Palm Jumeirah Views</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="/Dubai/dubai-6.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
      <img src="/Dubai/dubai-6.jpg" alt="Dubai Fountain Show" />
      <div className="gallery-caption">Dubai Fountain Show</div>
    </motion.div>

  </div>

  {/* Lightbox */}
  <div className="lightbox" id="lightbox">
    <button className="lb-close" id="lbClose">âœ•</button>
    <button className="lb-arrow lb-prev" id="lbPrev">â€¹</button>
    <img src="" alt="Lightbox gallery image for Dubai" className="lb-img" id="lbImg" />
    <button className="lb-arrow lb-next" id="lbNext">â€º</button>
  </div>
</motion.section>

  {/* â–‘â–‘â–‘ ITINERARY â–‘â–‘â–‘ */}
 <motion.section className="itinerary" id="itinerary" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
  <div className="container">
    <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Day by Day</motion.div>
    <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Your <em>Dubai Journey</em> Unfolds</motion.h2>

    <div className="timeline">

      <motion.div className="tl-item" data-day="1" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
        <div className="tl-marker">
          <span className="tl-day">Day 1</span>
          <div className="tl-dot"></div>
        </div>

        <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
          <div className="tl-header">
            <div>
              <h3>Arrival in Dubai</h3>
              <span className="tl-sub">Airport â†’ Luxury Hotel</span>
            </div>
            <div className="tl-chevron">â–¾</div>
          </div>

          <div className="tl-body">
            <ul>
              <li>ðŸš— Private transfer from Dubai Airport</li>
              <li>Ã°Å¸ÂÂ¹ Welcome drink &amp; luxury check-in</li>
              <li>Ã°Å¸Ââ„¢ Evening walk at Dubai Marina</li>
              <li>Ã°Å¸ÂÂ½ Dinner with skyline view</li>
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
              <h3>City &amp; Iconic Landmarks</h3>
              <span className="tl-sub">Modern Dubai Experience</span>
            </div>
            <div className="tl-chevron">â–¾</div>
          </div>

          <div className="tl-body">
            <ul>
              <li>Ã°Å¸Ââ„¢ Visit Burj Khalifa (At The Top)</li>
              <li>Ã°Å¸â€ºÂ Dubai Mall exploration</li>
              <li>â›² Dubai Fountain show</li>
              <li>Ã°Å¸ÂÂ Palm Jumeirah drive</li>
              <li>Ã°Å¸ÂÂ½ Dinner at rooftop restaurant</li>
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
              <h3>Desert Safari Adventure</h3>
              <span className="tl-sub">Dunes Â· Culture Â· Sunset</span>
            </div>
            <div className="tl-chevron">â–¾</div>
          </div>

          <div className="tl-body">
            <ul>
              <li>Ã°Å¸ÂÅ“ Dune bashing in 4x4 SUV</li>
              <li>Ã°Å¸ÂÂª Camel ride experience</li>
              <li>ðŸŽ­ Live cultural performances</li>
              <li>Ã°Å¸Ââ€“ BBQ dinner in desert camp</li>
              <li>ðŸŒ… Sunset photography</li>
            </ul>
            <div className="tl-note">Meals: Breakfast &amp; Dinner included</div>
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
              <h3>Luxury Cruise &amp; Leisure</h3>
              <span className="tl-sub">Yacht Â· Relaxation Â· Views</span>
            </div>
            <div className="tl-chevron">â–¾</div>
          </div>

          <div className="tl-body">
            <ul>
              <li>ðŸ›¥ Luxury yacht cruise at Marina</li>
              <li>ðŸ“¸ Skyline photography session</li>
              <li>ðŸ§˜ Leisure time at resort</li>
              <li>Ã°Å¸â€ºÂ Optional shopping at souks</li>
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
              <span className="tl-sub">Farewell Dubai</span>
            </div>
            <div className="tl-chevron">â–¾</div>
          </div>

          <div className="tl-body">
            <ul>
              <li>â˜• Breakfast at hotel</li>
              <li>ðŸš— Airport transfer</li>
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
              <p>4 nights in premium Dubai luxury hotels (Marina / Downtown)</p>
            </div>
          </motion.div>

          <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
            <div className="ic-icon">ðŸš—</div>
            <div>
              <strong>Private Transfers</strong>
              <p>Airport pickup &amp; all city transfers included</p>
            </div>
          </motion.div>

          <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
            <div className="ic-icon">Ã°Å¸ÂÂ½</div>
            <div>
              <strong>Curated Dining</strong>
              <p>Daily breakfast + selected premium dinners</p>
            </div>
          </motion.div>

          <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
            <div className="ic-icon">ðŸ—º</div>
            <div>
              <strong>Guided Experiences</strong>
              <p>Burj Khalifa, city tour &amp; cultural visits</p>
            </div>
          </motion.div>

          <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
            <div className="ic-icon">Ã°Å¸ÂÅ“</div>
            <div>
              <strong>Desert Safari</strong>
              <p>Dune bashing, camel ride &amp; BBQ dinner camp</p>
            </div>
          </motion.div>

          <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
            <div className="ic-icon">ðŸ›¥</div>
            <div>
              <strong>Luxury Yacht Cruise</strong>
              <p>Evening cruise at Dubai Marina with skyline views</p>
            </div>
          </motion.div>

        </div>
      </div>

      <motion.div className="exc-col" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <div className="section-label">What's Excluded</div>
        <h2>Exclusions</h2>

        <ul className="exc-list">
          <li>âœˆ Airfare to and from Dubai</li>
          <li>ðŸ“‹ UAE Visa charges</li>
          <li>ðŸ§¾ Travel Insurance</li>
          <li>Ã°Å¸ÂÂ¹ Personal expenses</li>
          <li>Ã°Å¸â€ºÂ Shopping &amp; souvenirs</li>
          <li>ðŸ“¸ Optional activities (Skydiving, VIP upgrades)</li>
          <li>ðŸ’Š Medical expenses</li>
        </ul>
      </motion.div>

    </div>
  </div>
</motion.section>

  {/* â–‘â–‘â–‘ PRICING â–‘â–‘â–‘ */}
 <motion.section className="pricing" id="pricing" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
  <div className="container">
    <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Transparent Pricing</motion.div>
    <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Reserve Your <em>Dubai Escape</em></motion.h2>

    <div className="price-cards">

      <motion.div className="price-card" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
        <div className="pc-label">Solo Traveller</div>
        <div className="pc-old">â‚¹28,999</div>
        <div className="pc-price">â‚¹22,999</div>
        <div className="pc-badge">21% OFF</div>

        <ul className="pc-perks">
          <li>4-star / 5-star hotel stay (single occupancy)</li>
          <li>All inclusions covered</li>
          <li>Private airport transfers</li>
          <li>Personal travel assistance</li>
        </ul>

        <a href="#contact" className="btn-primary full-btn">Reserve Solo</a>
      </motion.div>

      <motion.div className="price-card featured" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <div className="pc-popular">Most Popular</div>
        <div className="pc-label">Couple Package</div>
        <div className="pc-old">â‚¹52,999</div>
        <div className="pc-price">â‚¹39,999</div>
        <div className="pc-badge">25% OFF</div>

        <ul className="pc-perks">
          <li>Luxury Marina view hotel stay</li>
          <li>Romantic yacht dinner cruise</li>
          <li>Desert safari BBQ night experience</li>
          <li>Burj Khalifa premium entry</li>
          <li>Couple concierge support</li>
        </ul>

        <a href="#contact" className="btn-primary full-btn">Reserve for Two</a>
      </motion.div>

      <motion.div className="price-card" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <div className="pc-label">Family / Group (4 pax)</div>
        <div className="pc-old">â‚¹89,999</div>
        <div className="pc-price">â‚¹69,999</div>
        <div className="pc-badge">22% OFF</div>

        <ul className="pc-perks">
          <li>Luxury 2BHK / 3BHK serviced apartment</li>
          <li>Private SUV transfers</li>
          <li>Family desert safari experience</li>
          <li>City tour + theme park options</li>
          <li>Group assistance throughout trip</li>
        </ul>

        <a href="#contact" className="btn-primary full-btn">Reserve for Group</a>
      </motion.div>

    </div>

    <motion.p className="price-note" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
      ðŸ’³ EMI available Â· 100% refund if cancelled 7 days before departure Â· No hidden charges
    </motion.p>

  </div>
</motion.section>
  {/* â–‘â–‘â–‘ TESTIMONIALS â–‘â–‘â–‘ */}
  <motion.section className="testimonials" id="testimonials" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
  <div className="container">
    <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Voices of Delight</motion.div>
    <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Stories That <em>Shine in Dubai</em></motion.h2>

    <div className="testi-slider">
      <div className="testi-track" id="testiTrack">

        <div className="testi-card">
          <div className="testi-stars">â˜…â˜…â˜…â˜…â˜…</div>
          <p>
            "Seeing the Burj Khalifa at night was breathtaking. The desert safari and luxury yacht cruise were perfectly arranged.
            Every moment felt like pure luxury."
          </p>
          <div className="testi-author">
            <img src="https://i.pravatar.cc/60?img=47" alt="Ananya S." />
            <div>
              <strong>Ananya Sharma</strong>
              <span>Mumbai Â· Solo Traveller</span>
            </div>
          </div>
        </div>

        <div className="testi-card">
          <div className="testi-stars">â˜…â˜…â˜…â˜…â˜…</div>
          <p>
            "Our honeymoon in Dubai was magical. From Marina yacht dinner to desert sunset views, everything was romantic and perfectly planned."
          </p>
          <div className="testi-author">
            <img src="https://i.pravatar.cc/60?img=32" alt="Rohit &amp; Priya" />
            <div>
              <strong>Rohit &amp; Priya Menon</strong>
              <span>Bangalore Â· Honeymoon Package</span>
            </div>
          </div>
        </div>

        <div className="testi-card">
          <div className="testi-stars">â˜…â˜…â˜…â˜…â˜…</div>
          <p>
            "Dubai gave me the perfect mix of adventure and luxury. Burj Khalifa, Palm Jumeirah, and desert safari â€” all unforgettable experiences."
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
            "Our family loved every moment â€” desert safari, Dubai Mall, and fountain show. It was a perfect balance of fun and comfort."
          </p>
          <div className="testi-author">
            <img src="https://i.pravatar.cc/60?img=25" alt="Kavita R." />
            <div>
              <strong>Kavita &amp; Suresh Rao</strong>
              <span>Hyderabad Â· Family Group</span>
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
        <strong>Burj Khalifa Photoshoot</strong>
        <p>Professional shoot at the worldâ€™s tallest tower</p>
        <em>+â‚¹4,999</em>
      </motion.div>

      <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <span>Ã°Å¸ÂÅ½</span>
        <strong>Luxury Supercar Ride</strong>
        <p>Drive Ferrari / Lamborghini on Dubai streets</p>
        <em>+â‚¹9,999</em>
      </motion.div>

      <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <span>ðŸŽ‚</span>
        <strong>Romantic Yacht Setup</strong>
        <p>Private dinner with flowers &amp; cake on yacht</p>
        <em>+â‚¹5,499</em>
      </motion.div>

      <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
        <span>ðŸª‚</span>
        <strong>Skydiving at Palm Jumeirah</strong>
        <p>Ultimate adrenaline experience over Dubai</p>
        <em>+â‚¹29,999</em>
      </motion.div>

    </div>
  </div>
</motion.section>

  {/* â–‘â–‘â–‘ FINAL CTA â–‘â–‘â–‘ */}
  <motion.section className="final-cta" id="cta" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
  <div className="fcta-bg">
    <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1800&amp;q=85" alt="Dubai Skyline" />
    <div className="fcta-overlay"></div>
  </div>

  <motion.div className="fcta-content" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="section-label light">The Time Is Now</div>

    <h2>
      Luxury Awaits.<br /><em>Dubai is Calling.</em>
    </h2>

    <p>
      From the dazzling Burj Khalifa skyline to golden desert sunsets and luxury yacht cruises,
      your unforgettable Dubai escape begins here.
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
          <p>Our travel curators are available 9AMâ€“9PM, 7 days a week for your Turkey journey.</p>
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

  {/* â–‘â–‘â–‘ FOOTER â–‘â–‘â–‘ */}
  

  {/* Toast notification */}
  <div className="toast" id="toast"></div>
      </div>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

