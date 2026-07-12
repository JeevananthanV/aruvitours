import { motion } from 'motion/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import WhatsAppFloat from '../Shared/Whatsappfloat';

export default function Bhutan() {

  useEffect(() => {
    document.title = "Bhutan | Aruvi Tours";
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
      lightboxImg.src = src.startsWith('http') || src.startsWith('/') ? src : `/Bhutan/${src}`;
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
    <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1800&amp;q=85" alt="Bhutan Mountains" className="hero-img" id="heroImg" />
    <div className="hero-overlay"></div>
    <div className="hero-grain"></div>
  </div>

  <div className="hero-content">
    <motion.div className="hero-badge" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
      <span className="badge-dot"></span>
      4 Nights Â· 5 Days Â· Bhutan
    </motion.div>

    <motion.h1 className="hero-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
      <em>Bhutan</em><br />Himalayan Escape
    </motion.h1>

    <motion.p className="hero-tagline" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
      Land of the Thunder Dragon, serenity, monasteries &amp; untouched mountains
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

  <div className="hero-weather">
    <span className="weather-icon">Ã°Å¸Ââ€</span>
    <span>18Â°C Â· Cool &amp; Misty</span>
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
        <span className="info-val">Bhutan</span>
      </div>
    </div>

    <div className="info-divider"></div>

    <div className="info-item">
      <span className="info-icon">ðŸ’°</span>
      <div>
        <span className="info-label">Starting From</span>
        <span className="info-val">â‚¹24,999<small>/person</small></span>
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
      <span className="info-icon">Ã°Å¸Ââ€</span>
      <div>
        <span className="info-label">Best Time</span>
        <span className="info-val">Mar â€“ May Â· Sep â€“ Nov</span>
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
        <h2>Himalayan Serenity &amp; Spiritual<br /><em>Bhutan Elegance</em></h2>

        <p>
          Experience the peaceful beauty of Bhutan â€” where mist-covered mountains, ancient monasteries, and untouched
          valleys create a journey of pure serenity. This curated 4N/5D Himalayan escape blends culture, nature, and
          mindful luxury.
        </p>

        <p>
          From the iconic Tigerâ€™s Nest Monastery perched on cliffs to the tranquil valleys of Paro and Punakha, every
          moment is designed to immerse you in Bhutanâ€™s spiritual charm and natural beauty.
        </p>

        <a href="#itinerary" className="link-arrow">
          Explore the Journey <span>â†’</span>
        </a>
      </motion.div>

      <motion.div className="about-highlights" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>

        <div className="highlight-card">
          <div className="hc-icon">Ã°Å¸Ââ€</div>
          <div>
            <strong>Himalayan Trekking</strong>
            <p>Scenic trails through pristine mountain landscapes</p>
          </div>
        </div>

        <div className="highlight-card">
          <div className="hc-icon">ðŸ›•</div>
          <div>
            <strong>Monastery Visits</strong>
            <p>Explore ancient Buddhist monasteries &amp; temples</p>
          </div>
        </div>

        <div className="highlight-card">
          <div className="hc-icon">Ã°Å¸ÂÅ¾</div>
          <div>
            <strong>Paro Valley Views</strong>
            <p>Peaceful valleys surrounded by Himalayan peaks</p>
          </div>
        </div>

        <div className="highlight-card">
          <div className="hc-icon">ðŸŒ‰</div>
          <div>
            <strong>Suspension Bridges</strong>
            <p>Walk across iconic Bhutanese hanging bridges</p>
          </div>
        </div>

        <div className="highlight-card">
          <div className="hc-icon">ðŸ§˜</div>
          <div>
            <strong>Meditation &amp; Wellness</strong>
            <p>Mindfulness sessions in serene monasteries</p>
          </div>
        </div>

        <div className="highlight-card">
          <div className="hc-icon">Ã°Å¸ÂÂµ</div>
          <div>
            <strong>Traditional Cuisine</strong>
            <p>Authentic Bhutanese food &amp; butter tea experience</p>
          </div>
        </div>

      </motion.div>
    </div>
  </div>
</motion.section>

 <motion.section className="gallery-section" id="gallery" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
  <div className="container">
    <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Visual Journey</motion.div>
    <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Frames of <em>Paradise</em></motion.h2>
  </div>

  <div className="gallery-grid" id="galleryGrid">

    <motion.div className="gallery-item" data-src="https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&amp;q=80" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
      <img src="/Bhutan/bhu-1.jpg" alt="Paro Valley" />
      <div className="gallery-caption">Paro Valley Views</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&amp;q=80" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
      <img src="/Bhutan/bhu-2.jpg" alt="Tiger's Nest" />
      <div className="gallery-caption">Tigerâ€™s Nest Monastery</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&amp;q=80" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
      <img src="/Bhutan/bhu-3.jpg" alt="Himalayan Mountains" />
      <div className="gallery-caption">Himalayan Peaks</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&amp;q=80" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
      <img src="/Bhutan/bhu-4.jpg" alt="Monastery Prayer Flags" />
      <div className="gallery-caption">Prayer Flags &amp; Monasteries</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&amp;q=80" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
      <img src="/Bhutan/bhu-5.jpg" alt="Bhutan Valley" />
      <div className="gallery-caption">Punakha Valley</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&amp;q=80" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
      <img src="/Bhutan/bhu-6.jpg" alt="Sunset Himalayas" />
      <div className="gallery-caption">Himalayan Sunset</div>
    </motion.div>

  </div>

  {/* Lightbox */}
  <div className="lightbox" id="lightbox">
    <button className="lb-close" id="lbClose">âœ•</button>
    <button className="lb-arrow lb-prev" id="lbPrev">â€¹</button>
    <img src="" alt="Lightbox gallery image for Bhutan" className="lb-img" id="lbImg" />
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
              <h3>Arrival in Paro</h3>
              <span className="tl-sub">Airport â†’ Mountain Valley Hotel</span>
            </div>
            <div className="tl-chevron">â–¾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>âœˆ Arrival at Paro International Airport</li>
              <li>ðŸš— Scenic transfer through Himalayan roads</li>
              <li>Ã°Å¸ÂÂµ Welcome traditional Bhutanese tea</li>
              <li>Ã°Å¸Ââ€ Check-in with mountain views</li>
              <li>ðŸŒ… Evening relaxation in serene valley</li>
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
              <h3>Thimphu Cultural Tour</h3>
              <span className="tl-sub">Monasteries Â· Culture Â· Markets</span>
            </div>
            <div className="tl-chevron">â–¾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>Ã°Å¸ÂÂ½ Breakfast at hotel</li>
              <li>ðŸ›• Buddha Dordenma visit</li>
              <li>Ã°Å¸Ââ€º National Memorial Chorten</li>
              <li>Ã°Å¸â€ºÂ Local handicraft market</li>
              <li>Ã°Å¸ÂÂ² Traditional Bhutanese lunch</li>
            </ul>
            <div className="tl-note">Meals: Breakfast &amp; Lunch included</div>
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
              <h3>Paro Valley &amp; Tigerâ€™s Nest</h3>
              <span className="tl-sub">Trek Â· Monastery Â· Views</span>
            </div>
            <div className="tl-chevron">â–¾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>ðŸ¥¾ Trek to Tigerâ€™s Nest Monastery</li>
              <li>Ã°Å¸Ââ€ Scenic Himalayan viewpoints</li>
              <li>ðŸ“¸ Photography stops</li>
              <li>ðŸ§˜ Spiritual meditation time</li>
              <li>Ã°Å¸ÂÂ½ Dinner at valley lodge</li>
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
              <h3>Punakha Excursion</h3>
              <span className="tl-sub">River Valley Â· Bridges Â· Nature</span>
            </div>
            <div className="tl-chevron">â–¾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>ðŸš— Drive to Punakha Valley</li>
              <li>ðŸŒ‰ Suspension bridge walk</li>
              <li>Ã°Å¸ÂÅ¾ Punakha Dzong visit</li>
              <li>ðŸŒ¸ Riverside nature experience</li>
              <li>Ã°Å¸ÂÂ½ Scenic lunch by river</li>
            </ul>
            <div className="tl-note">Meals: Breakfast &amp; Lunch included</div>
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
              <span className="tl-sub">Farewell Bhutan</span>
            </div>
            <div className="tl-chevron">â–¾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>â˜• Breakfast at hotel</li>
              <li>ðŸš— Transfer to Paro Airport</li>
              <li>âœˆ Departure with memories</li>
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

      {/* INCLUDED */}
      <div className="inc-col">
        <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>What's Included</motion.div>
        <motion.h2 className="" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Luxury <em>Inclusions</em></motion.h2>

        <div className="inc-cards">

          <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
            <div className="ic-icon">Ã°Å¸ÂÂ¨</div>
            <div>
              <strong>Himalayan Boutique Stays</strong>
              <p>4 nights in premium valley-view hotels (Paro &amp; Thimphu)</p>
            </div>
          </motion.div>

          <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
            <div className="ic-icon">ðŸš—</div>
            <div>
              <strong>Private Transfers</strong>
              <p>Airport pickups and intercity scenic transfers included</p>
            </div>
          </motion.div>

          <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
            <div className="ic-icon">Ã°Å¸ÂÂ½</div>
            <div>
              <strong>Traditional Cuisine</strong>
              <p>Daily breakfast + authentic Bhutanese meals</p>
            </div>
          </motion.div>

          <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
            <div className="ic-icon">ðŸ—º</div>
            <div>
              <strong>Guided Cultural Tours</strong>
              <p>Monasteries, valleys &amp; heritage sightseeing</p>
            </div>
          </motion.div>

          <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
            <div className="ic-icon">ðŸ¥¾</div>
            <div>
              <strong>Himalayan Trekking</strong>
              <p>Guided hike to Tigerâ€™s Nest Monastery</p>
            </div>
          </motion.div>

          <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
            <div className="ic-icon">ðŸ§˜</div>
            <div>
              <strong>Wellness &amp; Meditation</strong>
              <p>Mindfulness sessions in peaceful monasteries</p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* EXCLUDED */}
      <motion.div className="exc-col" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <div className="section-label">What's Excluded</div>
        <h2>Exclusions</h2>

        <ul className="exc-list">
          <li>âœˆ International airfare</li>
          <li>ðŸ“‹ Travel insurance</li>
          <li>ðŸ§¾ Visa fees (if applicable)</li>
          <li>Ã°Å¸ÂÂº Personal expenses</li>
          <li>Ã°Å¸â€ºÂ Shopping &amp; souvenirs</li>
          <li>ðŸŽ¯ Optional adventure activities</li>
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
    <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Reserve Your <em>Escape</em></motion.h2>

    <div className="price-cards">

      {/* SOLO */}
      <motion.div className="price-card" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
        <div className="pc-label">Solo Traveller</div>

        <div className="pc-old">â‚¹26,999</div>
        <div className="pc-price">â‚¹19,999</div>
        <div className="pc-badge">25% OFF</div>

        <div className="pc-note">Per person Â· All taxes included</div>

        <ul className="pc-perks">
          <li>Premium beachfront resort stay (single occupancy)</li>
          <li>Island hopping experience included</li>
          <li>Daily breakfast + airport transfers</li>
        </ul>

        <a href="#contact" className="btn-primary full-btn">Reserve Solo</a>
      </motion.div>

      {/* COUPLE */}
      <motion.div className="price-card featured" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <div className="pc-popular">Most Popular</div>
        <div className="pc-label">Couple Package</div>

        <div className="pc-old">â‚¹49,999</div>
        <div className="pc-price">â‚¹36,999</div>
        <div className="pc-badge">26% OFF</div>

        <div className="pc-note">Per couple Â· Romantic experience included</div>

        <ul className="pc-perks">
          <li>Ocean-view luxury beach resort stay</li>
          <li>Sunset romantic island cruise</li>
          <li>Couple snorkeling &amp; island hopping</li>
          <li>Private beach dinner setup</li>
          <li>24/7 travel concierge support</li>
        </ul>

        <a href="#contact" className="btn-primary full-btn">Reserve for Two</a>
      </motion.div>

      {/* FAMILY */}
      <motion.div className="price-card" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <div className="pc-label">Family / Group (4 pax)</div>

        <div className="pc-old">â‚¹89,999</div>
        <div className="pc-price">â‚¹64,999</div>
        <div className="pc-badge">28% OFF</div>

        <div className="pc-note">Group package Â· Best value deal</div>

        <ul className="pc-perks">
          <li>Family beachfront resort stay (2 rooms / villa)</li>
          <li>Private island hopping boat tour</li>
          <li>Snorkeling + beach activities</li>
          <li>Airport &amp; inter-island transfers</li>
          <li>Guided sightseeing tours</li>
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
    <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Stories That <em>Stay</em></motion.h2>

    <div className="testi-slider">
      <div className="testi-track" id="testiTrack">

        {/* 1 */}
        <div className="testi-card">
          <div className="testi-stars">â˜…â˜…â˜…â˜…â˜…</div>
          <p>
            "The island hopping in Palawan was unreal. Crystal-clear waters, hidden lagoons, and pristine beaches â€” every moment felt like a postcard come alive."
          </p>
          <div className="testi-author">
            <img src="https://i.pravatar.cc/60?img=47" alt="Arjun Sharma" />
            <div>
              <strong>Arjun Sharma</strong>
              <span>Mumbai Â· Solo Traveller</span>
            </div>
          </div>
        </div>

        {/* 2 */}
        <div className="testi-card">
          <div className="testi-stars">â˜…â˜…â˜…â˜…â˜…</div>
          <p>
            "Our honeymoon in Boracay was beyond magical. Sunset cruises, private beach dinners, and turquoise waters made it a once-in-a-lifetime experience."
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
            "Snorkeling in Cebu was unforgettable. Swimming through coral reefs surrounded by vibrant marine life felt like entering another world."
          </p>
          <div className="testi-author">
            <img src="https://i.pravatar.cc/60?img=12" alt="Vikram Nair" />
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
            "Perfect family getaway. Island tours, beach activities, and boat rides kept everyone engaged. Luxury and adventure balanced beautifully."
          </p>
          <div className="testi-author">
            <img src="https://i.pravatar.cc/60?img=25" alt="Kavita &amp; Suresh Rao" />
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
        <span>ðŸ“¸</span>
        <strong>Sunset Beach Photoshoot</strong>
        <p>Professional photography on tropical white-sand beaches</p>
        <em>+â‚¹3,499</em>
      </motion.div>

      <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <span>ðŸš¤</span>
        <strong>Private Island Speedboat</strong>
        <p>Exclusive boat upgrade for premium island hopping</p>
        <em>+â‚¹2,999</em>
      </motion.div>

      <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <span>Ã°Å¸ÂÂ¹</span>
        <strong>Romantic Beach Dinner</strong>
        <p>Candlelight dining experience by the ocean waves</p>
        <em>+â‚¹2,499</em>
      </motion.div>

      <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
        <span>ðŸ¤¿</span>
        <strong>Scuba Diving Adventure</strong>
        <p>Guided underwater exploration with certified instructor</p>
        <em>+â‚¹4,999</em>
      </motion.div>

    </div>

  </div>
</motion.section>
  {/* â–‘â–‘â–‘ FINAL CTA â–‘â–‘â–‘ */}
<motion.section className="final-cta" id="cta" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
  <div className="fcta-bg">
    <img src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1800&amp;q=85" alt="Philippines Beach Sunset" />
    <div className="fcta-overlay"></div>
  </div>

  <motion.div className="fcta-content" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="section-label light">The Time Is Now</div>

    <h2>
      Life is Short.<br />
      <em>Philippines is Calling.</em>
    </h2>

    <p>
      From the crystal lagoons of Palawan to the powder-white beaches of Boracay, your perfect tropical escape begins the moment you say yes.
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

