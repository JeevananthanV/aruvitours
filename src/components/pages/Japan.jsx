import { motion } from 'motion/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import WhatsAppFloat from '../Shared/Whatsappfloat';

export default function Japan() {

  useEffect(() => {
    document.title = "Japan | Aruvi Tours";
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
      lightboxImg.src = src.startsWith('http') || src.startsWith('/') ? src : `/Japan/${src}`;
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
    <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1800&amp;q=85" alt="Japan" className="hero-img" id="heroImg" />
    <div className="hero-overlay"></div>
    <div className="hero-grain"></div>
  </div>

  <div className="hero-content">
    <motion.div className="hero-badge" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
      <span className="badge-dot"></span>
      8 Nights Â· 9 Days Â· Japan
    </motion.div>
    <motion.h1 className="hero-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
      <em>Japan</em><br />Luxury Escape
    </motion.h1>
    <motion.p className="hero-tagline" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
      Where tradition meets futuristic elegance
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
    <span className="weather-icon">ðŸŒ¸</span>
    <span>18Â°C Â· Pleasant</span>
  </div>
</motion.section>

  {/* â–‘â–‘â–‘ QUICK INFO BAR â–‘â–‘â–‘ */}
 <div className="infobar" id="infobar">
  <div className="infobar-inner">
    <div className="info-item">
      <span className="info-icon">ðŸ—“</span>
      <div>
        <span className="info-label">Duration</span>
        <span className="info-val">8N / 9D</span>
      </div>
    </div>
    <div className="info-divider"></div>
    <div className="info-item">
      <span className="info-icon">Ã°Å¸â€œÂ</span>
      <div>
        <span className="info-label">Location</span>
        <span className="info-val">Japan</span>
      </div>
    </div>
    <div className="info-divider"></div>
    <div className="info-item">
      <span className="info-icon">ðŸ’°</span>
      <div>
        <span className="info-label">Starting From</span>
        <span className="info-val">â‚¹89,999<small>/person</small></span>
      </div>
    </div>
    <div className="info-divider"></div>
    <div className="info-item">
      <span className="info-icon">â­</span>
      <div>
        <span className="info-label">Rating</span>
        <span className="info-val">4.9 / 5.0</span>
      </div>
    </div>
    <div className="info-divider"></div>
    <div className="info-item">
      <span className="info-icon">ðŸŒ¤</span>
      <div>
        <span className="info-label">Best Time</span>
        <span className="info-val">Mar â€“ May Â· Oct â€“ Nov</span>
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
        <h2>Tradition, Technology &amp; Timeless<br /><em>Japanese Elegance</em></h2>
        <p>Experience the magic of Japan â€” where ancient temples, vibrant cityscapes, and serene landscapes blend seamlessly. This curated 8N/9D luxury escape offers a perfect mix of culture, innovation, and unforgettable moments.</p>

        <p>From cherry blossoms in Kyoto to neon-lit streets of Tokyo and breathtaking views of Mount Fuji, every detail is crafted to immerse you in Japanâ€™s rich heritage and modern sophistication.</p>
        <a href="#itinerary" className="link-arrow">Explore the Journey <span>â†’</span></a>
      </motion.div>
      <motion.div className="about-highlights" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <div className="highlight-card">
          <div className="hc-icon">ðŸŒ¸</div>
          <div>
            <strong>Cherry Blossom Experience</strong>
            <p>Witness sakura blooms in iconic spots</p>
          </div>
        </div>
        <div className="highlight-card">
          <div className="hc-icon">Ã°Å¸ÂÂ£</div>
          <div>
            <strong>Japanese Fine Dining</strong>
            <p>Authentic sushi, ramen &amp; kaiseki meals</p>
          </div>
        </div>
        <div className="highlight-card">
          <div className="hc-icon">ðŸš„</div>
          <div>
            <strong>Bullet Train Ride</strong>
            <p>Travel via the world-famous Shinkansen</p>
          </div>
        </div>
        <div className="highlight-card">
          <div className="hc-icon">â›©</div>
          <div>
            <strong>Historic Temples</strong>
            <p>Explore Kyoto shrines &amp; ancient culture</p>
          </div>
        </div>
        <div className="highlight-card">
          <div className="hc-icon">ðŸ—»</div>
          <div>
            <strong>Mount Fuji Views</strong>
            <p>Scenic landscapes and photo spots</p>
          </div>
        </div>
        <div className="highlight-card">
          <div className="hc-icon">Ã°Å¸â€ºÂ</div>
          <div>
            <strong>Tokyo Shopping</strong>
            <p>Explore Shibuya &amp; Ginza districts</p>
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
    <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Frames of <em>Paradise</em></motion.h2>
  </div>
  <div className="gallery-grid" id="galleryGrid">

    <motion.div className="gallery-item" data-src="/Japan/japan-1.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
      <img src="/Japan/japan-1.jpg" alt="Cherry Blossoms" />
      <div className="gallery-caption">Cherry Blossoms in Kyoto</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="/Japan/japan-2.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
      <img src="/Japan/japan-2.jpg" alt="Tokyo Night" />
      <div className="gallery-caption">Tokyo City Lights</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="/Japan/japan-3.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
      <img src="/Japan/japan-3.jpg" alt="Ryokan Stay" />
      <div className="gallery-caption">Traditional Ryokan Stay</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="/Japan/japan-4.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
      <img src="/Japan/japan-4.jpg" alt="Japanese Cuisine" />
      <div className="gallery-caption">Authentic Japanese Cuisine</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="/Japan/japan-5.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
      <img src="/Japan/japan-5.jpg" alt="Mount Fuji" />
      <div className="gallery-caption">Mount Fuji Views</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="https://images.unsplash.com/photo-1526481280691-7813b68b0fcd?w=700&amp;q=80" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
      <img src="/Japan/japan-6.jpg" alt="Shibuya Crossing" />
      <div className="gallery-caption">Shibuya Crossing</div>
    </motion.div>

  </div>

  {/* Lightbox */}
  <div className="lightbox" id="lightbox">
    <button className="lb-close" id="lbClose">âœ•</button>
    <button className="lb-arrow lb-prev" id="lbPrev">â€¹</button>
    <img src="" alt="Lightbox gallery image for Japan" className="lb-img" id="lbImg" />
    <button className="lb-arrow lb-next" id="lbNext">â€º</button>
  </div>
</motion.section>
  {/* â–‘â–‘â–‘ ITINERARY â–‘â–‘â–‘ */}
  <motion.section className="itinerary" id="itinerary" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
  <div className="container">
    <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Day by Day</motion.div>
    <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Your <em>Journey</em> Unfolds</motion.h2>

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
              <h3>Arrival in Tokyo</h3>
              <span className="tl-sub">Airport â†’ Luxury Hotel</span>
            </div>
            <div className="tl-chevron">â–¾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>ðŸš— Private airport transfer</li>
              <li>Ã°Å¸ÂÂ¹ Welcome drink &amp; hotel check-in</li>
              <li>Ã°Å¸Ââ„¢ Evening walk in Shinjuku</li>
              <li>Ã°Å¸ÂÂ½ Dinner with Tokyo skyline view</li>
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
              <h3>Tokyo City Exploration</h3>
              <span className="tl-sub">Culture Â· Technology Â· Shopping</span>
            </div>
            <div className="tl-chevron">â–¾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>Ã°Å¸ÂÂ½ Breakfast at hotel</li>
              <li>â›© Visit Asakusa Temple</li>
              <li>Ã°Å¸â€ºÂ Explore Shibuya &amp; Harajuku</li>
              <li>ðŸ“¸ Shibuya Crossing experience</li>
              <li>Ã°Å¸ÂÂ£ Sushi dinner experience</li>
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
              <h3>Mount Fuji Excursion</h3>
              <span className="tl-sub">Nature Â· Scenic Views</span>
            </div>
            <div className="tl-chevron">â–¾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>ðŸ—» Visit Mount Fuji viewpoints</li>
              <li>ðŸš¤ Lake Kawaguchi cruise</li>
              <li>ðŸ“¸ Photography stops</li>
              <li>Ã°Å¸ÂÂ± Traditional Japanese lunch</li>
            </ul>
            <div className="tl-note">Meals: Breakfast &amp; Lunch included</div>
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
              <h3>Bullet Train to Kyoto</h3>
              <span className="tl-sub">Shinkansen Â· Heritage</span>
            </div>
            <div className="tl-chevron">â–¾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>ðŸš„ Ride the Shinkansen</li>
              <li>Ã°Å¸ÂÂ¨ Check-in to Kyoto hotel</li>
              <li>ðŸŒ¸ Evening walk in Gion district</li>
              <li>Ã°Å¸ÂÂ½ Dinner with cultural experience</li>
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
              <h3>Kyoto Cultural Tour</h3>
              <span className="tl-sub">Temples Â· Traditions</span>
            </div>
            <div className="tl-chevron">â–¾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>â›© Visit Fushimi Inari Shrine</li>
              <li>Ã°Å¸ÂÂ¯ Explore Kinkaku-ji (Golden Pavilion)</li>
              <li>ðŸŒ¸ Arashiyama Bamboo Forest walk</li>
              <li>Ã°Å¸ÂÂ± Authentic Kyoto cuisine</li>
            </ul>
            <div className="tl-note">Meals: Breakfast &amp; Lunch included</div>
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
              <h3>Osaka Day Trip</h3>
              <span className="tl-sub">Food Â· City Life</span>
            </div>
            <div className="tl-chevron">â–¾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>ðŸš„ Travel to Osaka</li>
              <li>Ã°Å¸ÂÂ¯ Visit Osaka Castle</li>
              <li>Ã°Å¸ÂÅ“ Street food at Dotonbori</li>
              <li>Ã°Å¸â€ºÂ Shopping &amp; exploration</li>
            </ul>
            <div className="tl-note">Meals: Breakfast included</div>
          </div>
        </div>
      </motion.div>

      {/* Day 7 */}
      <motion.div className="tl-item" data-day="7" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <div className="tl-marker">
          <span className="tl-day">Day 7</span>
          <div className="tl-dot"></div>
        </div>
        <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
          <div className="tl-header">
            <div>
              <h3>Leisure &amp; Shopping</h3>
              <span className="tl-sub">Free Day Â· Exploration</span>
            </div>
            <div className="tl-chevron">â–¾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>ðŸ§˜ Relax or explore nearby areas</li>
              <li>Ã°Å¸â€ºÂ Shopping in Kyoto/Osaka</li>
              <li>Ã°Å¸ÂÂ£ Try local delicacies</li>
            </ul>
            <div className="tl-note">Meals: Breakfast included</div>
          </div>
        </div>
      </motion.div>

      {/* Day 8 */}
      <motion.div className="tl-item" data-day="8" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
        <div className="tl-marker">
          <span className="tl-day">Day 8</span>
          <div className="tl-dot"></div>
        </div>
        <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
          <div className="tl-header">
            <div>
              <h3>Return to Tokyo</h3>
              <span className="tl-sub">Relaxation Â· City Life</span>
            </div>
            <div className="tl-chevron">â–¾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>ðŸš„ Travel back to Tokyo</li>
              <li>Ã°Å¸ÂÂ¨ Hotel check-in</li>
              <li>ðŸŒ† Free evening exploration</li>
            </ul>
            <div className="tl-note">Meals: Breakfast included</div>
          </div>
        </div>
      </motion.div>

      {/* Day 9 */}
      <motion.div className="tl-item" data-day="9" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <div className="tl-marker">
          <span className="tl-day">Day 9</span>
          <div className="tl-dot"></div>
        </div>
        <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
          <div className="tl-header">
            <div>
              <h3>Departure</h3>
              <span className="tl-sub">Farewell Japan</span>
            </div>
            <div className="tl-chevron">â–¾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>â˜• Breakfast at hotel</li>
              <li>ðŸš— Transfer to airport</li>
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

      {/* INCLUSIONS */}
      <div className="inc-col">
        <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>What's Included</motion.div>
        <motion.h2 className="" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Luxury <em>Inclusions</em></motion.h2>

        <div className="inc-cards">

          <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
            <div className="ic-icon">Ã°Å¸ÂÂ¨</div>
            <div>
              <strong>4â˜… / 5â˜… Hotel Stay</strong>
              <p>8 nights in Tokyo, Kyoto &amp; Osaka premium hotels</p>
            </div>
          </motion.div>

          <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
            <div className="ic-icon">ðŸš„</div>
            <div>
              <strong>Bullet Train (Shinkansen)</strong>
              <p>High-speed travel between major cities</p>
            </div>
          </motion.div>

          <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
            <div className="ic-icon">Ã°Å¸ÂÂ±</div>
            <div>
              <strong>Curated Meals</strong>
              <p>Daily breakfast + authentic Japanese dining</p>
            </div>
          </motion.div>

          <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
            <div className="ic-icon">ðŸ—º</div>
            <div>
              <strong>Guided Tours</strong>
              <p>Tokyo, Kyoto temples, Mount Fuji &amp; city tours</p>
            </div>
          </motion.div>

          <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
            <div className="ic-icon">ðŸ—»</div>
            <div>
              <strong>Mount Fuji Experience</strong>
              <p>Scenic visit &amp; nearby attractions</p>
            </div>
          </motion.div>

          <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
            <div className="ic-icon">â™¨</div>
            <div>
              <strong>Onsen &amp; Wellness</strong>
              <p>Traditional hot spring relaxation experience</p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* EXCLUSIONS */}
      <motion.div className="exc-col" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <div className="section-label">What's Excluded</div>
        <h2>Exclusions</h2>

        <ul className="exc-list">
          <li>âœˆ International airfare to Japan</li>
          <li>ðŸ“‹ Travel insurance</li>
          <li>ðŸ§¾ Visa charges</li>
          <li>Ã°Å¸ÂÂ¹ Personal expenses</li>
          <li>Ã°Å¸â€ºÂ Shopping &amp; souvenirs</li>
          <li>ðŸ“¸ Optional experiences &amp; add-ons</li>
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
    <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Reserve Your <em>Japan Escape</em></motion.h2>

    <div className="price-cards">

      {/* SOLO */}
      <motion.div className="price-card" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
        <div className="pc-label">Solo Traveller</div>
        <div className="pc-old">â‚¹89,999</div>
        <div className="pc-price">â‚¹69,999</div>
        <div className="pc-badge">22% OFF</div>

        <ul className="pc-perks">
          <li>Single occupancy premium hotel room</li>
          <li>All inclusions (hotels, trains, tours)</li>
          <li>Shinkansen (bullet train) experience</li>
          <li>Daily breakfast + select meals</li>
          <li>Personal travel assistance</li>
        </ul>

        <a href="#contact" className="btn-primary full-btn">Reserve Solo</a>
      </motion.div>

      {/* COUPLE */}
      <motion.div className="price-card featured" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <div className="pc-popular">Most Popular</div>
        <div className="pc-label">Couple Package</div>
        <div className="pc-old">â‚¹1,59,999</div>
        <div className="pc-price">â‚¹1,29,999</div>
        <div className="pc-badge">19% OFF</div>

        <ul className="pc-perks">
          <li>Double occupancy luxury rooms</li>
          <li>Romantic Kyoto &amp; Tokyo experiences</li>
          <li>Mount Fuji day tour</li>
          <li>Onsen (hot spring) experience</li>
          <li>Shinkansen travel included</li>
          <li>24/7 concierge support</li>
        </ul>

        <a href="#contact" className="btn-primary full-btn">Reserve for Two</a>
      </motion.div>

      {/* FAMILY */}
      <motion.div className="price-card" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <div className="pc-label">Family / Group (4 pax)</div>
        <div className="pc-old">â‚¹2,99,999</div>
        <div className="pc-price">â‚¹2,39,999</div>
        <div className="pc-badge">20% OFF</div>

        <ul className="pc-perks">
          <li>Family rooms / interconnected stays</li>
          <li>Tokyo Disneyland / Universal Studios (optional)</li>
          <li>Guided city tours &amp; cultural activities</li>
          <li>All transport &amp; transfers included</li>
          <li>Kid-friendly experiences</li>
        </ul>

        <a href="#contact" className="btn-primary full-btn">Reserve for Group</a>
      </motion.div>

    </div>

    <motion.p className="price-note" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
      ðŸ’³ EMI available Â· Flexible cancellation Â· No hidden charges
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

        {/* 1 */}
        <div className="testi-card">
          <div className="testi-stars">â˜…â˜…â˜…â˜…â˜…</div>
          <p>
            "Japan was beyond anything I imagined. Watching cherry blossoms in Kyoto and experiencing the bullet train
            was surreal. Everything was perfectly organized and luxurious."
          </p>
          <div className="testi-author">
            <img src="https://i.pravatar.cc/60?img=47" alt="Ananya S." />
            <div>
              <strong>Ananya Sharma</strong>
              <span>Mumbai Â· Solo Traveller</span>
            </div>
          </div>
        </div>

        {/* 2 */}
        <div className="testi-card">
          <div className="testi-stars">â˜…â˜…â˜…â˜…â˜…</div>
          <p>
            "Our honeymoon in Japan felt like a movie. From the peaceful temples of Kyoto to the vibrant streets of
            Tokyo, every moment was magical. The onsen experience was unforgettable."
          </p>
          <div className="testi-author">
            <img src="https://i.pravatar.cc/60?img=32" alt="Rohit &amp; Priya" />
            <div>
              <strong>Rohit &amp; Priya Menon</strong>
              <span>Bangalore Â· Honeymoon Package</span>
            </div>
          </div>
        </div>

        {/* 3 */}
        <div className="testi-card">
          <div className="testi-stars">â˜…â˜…â˜…â˜…â˜…</div>
          <p>
            "The perfect balance of tradition and modern life. Visiting Mount Fuji and exploring Tokyoâ€™s skyline gave me
            two completely different yet amazing experiences in one trip."
          </p>
          <div className="testi-author">
            <img src="https://i.pravatar.cc/60?img=12" alt="Vikram N." />
            <div>
              <strong>Vikram Nair</strong>
              <span>Delhi Â· Solo Luxury</span>
            </div>
          </div>
        </div>

        {/* 4 */}
        <div className="testi-card">
          <div className="testi-stars">â˜…â˜…â˜…â˜…â˜†</div>
          <p>
            "We traveled as a family and loved every part of Japan. The kids enjoyed Tokyo Disneyland while we enjoyed
            the cultural experiences. Very well planned and comfortable trip."
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
    <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Optional <em>Add-Ons</em></motion.h2>

    <div className="addon-grid">

      <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
        <span>ðŸŽŒ</span>
        <strong>Kimono Photoshoot</strong>
        <p>Traditional dress photoshoot in Kyoto streets</p>
        <em>+â‚¹2,999</em>
      </motion.div>

      <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <span>Ã°Å¸ÂÂ£</span>
        <strong>Tokyo Food Tour</strong>
        <p>Explore sushi, ramen &amp; Japanese street food</p>
        <em>+â‚¹1,999</em>
      </motion.div>

      <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <span>ðŸ—»</span>
        <strong>Mount Fuji Experience</strong>
        <p>Day trip with lake cruise &amp; scenic views</p>
        <em>+â‚¹3,499</em>
      </motion.div>

      <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
        <span>ðŸŽŽ</span>
        <strong>Geisha Cultural Show</strong>
        <p>Authentic traditional performance in Kyoto</p>
        <em>+â‚¹2,499</em>
      </motion.div>

    </div>
  </div>
</motion.section>

  {/* â–‘â–‘â–‘ FINAL CTA â–‘â–‘â–‘ */}
 <motion.section className="final-cta" id="cta" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
  <div className="fcta-bg">
    <img src="/Japan/japan-3.jpg" alt="Japan Sunset" />
    <div className="fcta-overlay"></div>
  </div>

  <motion.div className="fcta-content" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="section-label light">The Time Is Now</div>

    <h2>
      Life is Short.<br />
      <em>Japan is Calling.</em>
    </h2>

    <p>
      From Kyotoâ€™s timeless temples to Tokyoâ€™s vibrant skyline and the beauty of Mount Fuji,
      your unforgettable Japan journey begins here.
    </p>

    <a href="#pricing" className="btn-primary large-btn">
      Start Your Journey
    </a>
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

