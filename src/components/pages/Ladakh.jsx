import { motion } from 'motion/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import WhatsAppFloat from '../Shared/Whatsappfloat';

export default function Ladakh() {

  useEffect(() => {
    document.title = "Ladakh | Aruvi Tours";
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
      lightboxImg.src = src.startsWith('http') || src.startsWith('/') ? src : `/Ladakh/${src}`;
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
      <img src="/Ladakh/ladakh-pangong-lake.jpg" alt="Ladakh mountain landscape" className="hero-img" id="heroImg" />
      <div className="hero-overlay"></div>
      <div className="hero-grain"></div>
    </div>

    <div className="hero-content">
      <motion.div className="hero-badge" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <span className="badge-dot"></span>
        4 Nights Â· 5 Days Â· Ladakh, India
      </motion.div>
      <motion.h1 className="hero-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <em>Ladakh</em><br />High-Altitude Escape
      </motion.h1>
      <motion.p className="hero-tagline" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
        From alpine passes to turquoise lakes â€” a refined Himalayan escape
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
      <span className="weather-icon">â˜€ï¸</span>
      <span>32Â°C Â· Sunny</span>
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
          <span className="info-val">Ladakh, India</span>
        </div>
      </div>
      <div className="info-divider"></div>
      <div className="info-item">
        <span className="info-icon">ðŸ’°</span>
        <div>
          <span className="info-label">Starting From</span>
          <span className="info-val">â‚¹29,999<small>/person</small></span>
        </div>
      </div>
      <div className="info-divider"></div>
      <div className="info-item">
        <span className="info-icon">â­</span>
        <div>
          <span className="info-label">Rating</span>
          <span className="info-val">4.7 / 5.0</span>
        </div>
      </div>
      <div className="info-divider"></div>
      <div className="info-item">
        <span className="info-icon">ðŸŒ¤</span>
        <div>
          <span className="info-label">Best Time</span>
          <span className="info-val">Oct â€“ Mar</span>
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
            <h2>Peaks, Lakes &amp; Monasteries<br /><em>Beautiful Ladakh</em></h2>
            <p>Experience the grandeur of Ladakh â€” a land of dramatic mountain passes, ancient monasteries, shimmering lakes, and timeless high-altitude villages. This curated 4N/5D package brings the best of Leh, Nubra, Pangong and local heritage together in comfort and style.</p>
            <p>From sunrise over Thiksey and a Nubra dune excursion to Pangong's blue waters and market walks in Leh, each day is crafted to reveal Ladakh's raw natural beauty and spiritual calm. Handpicked stays, warming cuisine, and private guided tours await.</p>
            <a href="#itinerary" className="link-arrow">Explore the Journey <span>â†’</span></a>
          </motion.div>
          <motion.div className="about-highlights" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
            <div className="highlight-card">
              <div className="hc-icon">Ã°Å¸ÂÂ°</div>
              <div>
                <strong>Boutique Himalayan Stays</strong>
                <p>Curated stays in Leh and scenic valley lodges with mountain views</p>
              </div>
            </div>
            <div className="highlight-card">
              <div className="hc-icon">Ã°Å¸ÂÂª</div>
              <div>
                <strong>Pass &amp; Valley Views</strong>
                <p>Sunset drives, scenic passes and luxurious high-altitude experiences</p>
              </div>
            </div>
            <div className="highlight-card">
              <div className="hc-icon">Ã°Å¸ÂÂ¯</div>
              <div>
                <strong>Monastery &amp; Culture Tours</strong>
                <p>Hemis, Thiksey, Leh bazaar and traditional village visits</p>
              </div>
            </div>
            <div className="highlight-card">
              <div className="hc-icon">Ã°Å¸ÂÂ²</div>
              <div>
                <strong>Local Ladakhi Cuisine</strong>
                <p>Thukpa, momos, butter tea and warming regional tasting experiences</p>
              </div>
            </div>
            <div className="highlight-card">
              <div className="hc-icon">ðŸŽ­</div>
              <div>
                <strong>Mountain Culture</strong>
                <p>Evening cultural performances, monastery visits and artisan storytelling</p>
              </div>
            </div>
            <div className="highlight-card">
              <div className="hc-icon">ðŸ§¶</div>
              <div>
                <strong>Craft &amp; Village Workshops</strong>
                <p>Pashmina weaving, apricot tasting and village craft sessions</p>
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
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Frames of <em>Ladakh</em></motion.h2>
    </div>
    <div className="gallery-grid" id="galleryGrid">
      <motion.div className="gallery-item" data-src="/Ladakh/ladakh-nubra-valley.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <img src="/Ladakh/ladakh-nubra-valley.jpg" alt="Ladakh monastery" />
        <div className="gallery-caption">Ancient Monasteries</div>
      </motion.div>
      <motion.div className="gallery-item" data-src="/Ladakh/ladakh-leh-palace.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <img src="/Ladakh/ladakh-leh-palace.jpg" alt="Ladakh mountain pass" />
        <div className="gallery-caption">High Mountain Passes</div>
      </motion.div>
      <motion.div className="gallery-item" data-src="/Ladakh/ladakh-khardung-la-pass.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <img src="/Ladakh/ladakh-khardung-la-pass.jpg" alt="Pangong lake" />
        <div className="gallery-caption">Pangong Lake</div>
      </motion.div>
      <motion.div className="gallery-item" data-src="/Ladakh/ladakh-pangong-lake.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <img src="/Ladakh/ladakh-pangong-lake.jpg" alt="Nubra valley" />
        <div className="gallery-caption">Nubra Valley</div>
      </motion.div>
      <motion.div className="gallery-item" data-src="/Ladakh/ladakh-thiksey-monastery.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <img src="/Ladakh/ladakh-thiksey-monastery.jpg" alt="Shyok river" />
        <div className="gallery-caption">Shyok River</div>
      </motion.div>
      <motion.div className="gallery-item" data-src="/Ladakh/ladakh-tso-moriri-lake.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
        <img src="/Ladakh/ladakh-tso-moriri-lake.jpg" alt="Leh town" />
        <div className="gallery-caption">Leh Town Views</div>
      </motion.div>
    </div>

    {/* Lightbox */}
    <div className="lightbox" id="lightbox">
      <button className="lb-close" id="lbClose">âœ•</button>
      <button className="lb-arrow lb-prev" id="lbPrev">â€¹</button>
      <img src="" alt="Lightbox gallery image for Ladakh" className="lb-img" id="lbImg" />
      <button className="lb-arrow lb-next" id="lbNext">â€º</button>
    </div>
  </motion.section>

  {/* â–‘â–‘â–‘ ITINERARY â–‘â–‘â–‘ */}
  <motion.section className="itinerary" id="itinerary" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Day by Day</motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Your <em>Journey</em> Unfolds</motion.h2>

      <div className="timeline">

        <motion.div className="tl-item" data-day="1" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <div className="tl-marker">
            <span className="tl-day">Day 1</span>
            <div className="tl-dot"></div>
          </div>
          <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
            <div className="tl-header">
              <div>
                <h3>Arrival in Leh</h3>
                <span className="tl-sub">Airport â†’ acclimatization check-in</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>ðŸš— Private transfer from Leh Airport to your boutique hotel</li>
                <li>Ã°Å¸ÂÂµ Welcome drink &amp; altitude orientation with your guide</li>
                <li>ðŸŒ… Gentle sunset at Shanti Stupa</li>
                <li>Ã°Å¸ÂÂ½ Ladakhi dinner at the hotel</li>
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
                <h3>Leh Monasteries</h3>
                <span className="tl-sub">Culture Â· Viewpoints Â· Heritage</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>ðŸ›• Visit Thiksey and Hemis monasteries</li>
                <li>ðŸ“¸ Scenic stops at hilltop viewpoints</li>
                <li>Ã°Å¸ÂÆ’ Explore Leh market and local craft stalls</li>
                <li>Ã°Å¸ÂÂ½ Evening relaxation at the hotel</li>
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
                <h3>Nubra Valley</h3>
                <span className="tl-sub">Dunes Â· Monastery Â· Desert drive</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>ðŸš™ Drive over Khardung La into Nubra Valley</li>
                <li>Ã°Å¸ÂÂª Visit the sand dunes and Diskit Monastery</li>
                <li>ðŸŽ¶ Evening at a valley camp or lodge</li>
              </ul>
              <div className="tl-note">Meals: Breakfast &amp; Lunch included</div>
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
                <h3>Pangong Lake</h3>
                <span className="tl-sub">Lake drive Â· Scenic stay</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>ðŸš— Scenic drive to Pangong via Chang La</li>
                <li>ðŸ“¸ Time at the lake shore for photography and leisure</li>
                <li>ðŸŒ™ Overnight stay near the lake</li>
              </ul>
              <div className="tl-note">Meals: Breakfast &amp; Dinner included</div>
            </div>
          </div>
        </motion.div>

        <motion.div className="tl-item" data-day="5" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.4 }}>
          <div className="tl-marker">
            <span className="tl-day">Day 5</span>
            <div className="tl-dot"></div>
          </div>
          <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
            <div className="tl-header">
              <div>
                <h3>Return to Leh &amp; Departure</h3>
                <span className="tl-sub">Lake morning Â· Airport transfer</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>ðŸŒ… Sunrise by the lake before the return drive</li>
                <li>Ã°Å¸â€ºÂ Final shopping for pashmina and local handicrafts</li>
                <li>ðŸš— Transfer to Leh Airport for departure</li>
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
          <motion.h2 className="" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Ladakh <em>Inclusions</em></motion.h2>
          <div className="inc-cards">
            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
              <div className="ic-icon">Ã°Å¸ÂÂ°</div>
              <div>
                <strong>Boutique Himalayan Stays</strong>
                <p>Multiple nights in handpicked stays in Leh, Nubra and Pangong</p>
              </div>
            </motion.div>
            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
              <div className="ic-icon">ðŸš—</div>
              <div>
                <strong>Private Transfers</strong>
                <p>All airport, station, inter-city &amp; excursion transfers with expert drivers</p>
              </div>
            </motion.div>
            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
              <div className="ic-icon">Ã°Å¸ÂÂ½</div>
              <div>
                <strong>Curated Ladakhi Meals</strong>
                <p>Daily breakfast + regional Ladakhi and warming dining experiences</p>
              </div>
            </motion.div>
            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
              <div className="ic-icon">ðŸ—º</div>
              <div>
                <strong>Guided Sightseeing</strong>
                <p>Certified local guides for monasteries, passes, lakes and villages</p>
              </div>
            </motion.div>
            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
              <div className="ic-icon">Ã°Å¸ÂÂª</div>
              <div>
                <strong>High-Altitude Transfers</strong>
                <p>Permit support and comfortable transfers across mountain routes</p>
              </div>
            </motion.div>
            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
              <div className="ic-icon">Ã°Å¸Â¦Â</div>
              <div>
                <strong>Village Visit</strong>
                <p>Guided village walk with apricot, pashmina and culture experiences</p>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div className="exc-col" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
          <div className="section-label">What's Excluded</div>
          <h2>Exclusions</h2>
          <ul className="exc-list">
            <li>âœˆ Airfare to/from Ladakh or nearby gateway airports</li>
            <li>ðŸ“‹ Travel Insurance (recommended)</li>
            <li>ðŸ§¾ GST / Service taxes (applied at checkout)</li>
            <li>Ã°Å¸ÂÂº Alcohol &amp; premium beverages beyond package meals</li>
            <li>ðŸ“¸ Optional professional photography or private guides</li>
            <li>ðŸ’Š Medical expenses or emergency evacuation costs</li>
            <li>Ã°Å¸â€ºÂ Personal shopping, laundry &amp; miscellaneous items</li>
          </ul>
        </motion.div>

      </div>
    </div>
  </motion.section>

  {/* â–‘â–‘â–‘ PRICING â–‘â–‘â–‘ */}
  <motion.section className="pricing" id="pricing" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Transparent Pricing</motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Reserve Your <em>Ladakh Retreat</em></motion.h2>

      <div className="price-cards">

        <motion.div className="price-card" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <div className="pc-label">Solo Explorer</div>
          <div className="pc-old">â‚¹24,999</div>
          <div className="pc-price">â‚¹17,999</div>
          <div className="pc-badge">26% OFF</div>
          <ul className="pc-perks">
            <li>City-view room (single occupancy)</li>
              <li>Guided Leh, Nubra &amp; Pangong sightseeing</li>
            <li>All transfers &amp; select activities</li>
            <li>Personalized concierge service</li>
          </ul>
          <a href="#contact" className="btn-primary full-btn">Reserve Solo</a>
        </motion.div>

        <motion.div className="price-card featured" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
          <div className="pc-popular">Most Popular</div>
          <div className="pc-label">Romantic Escape (Couple)</div>
          <div className="pc-old">â‚¹41,999</div>
          <div className="pc-price">â‚¹30,999</div>
          <div className="pc-badge">28% OFF</div>
          <ul className="pc-perks">
            <li>Deluxe mountain-view suite with premium styling</li>
            <li>Private lake-view dinner &amp; guided experience</li>
            <li>Couples spa &amp; wellness treatments</li>
            <li>All inclusions above</li>
            <li>24/7 dedicated concierge</li>
          </ul>
          <a href="#contact" className="btn-primary full-btn">Reserve for Two</a>
        </motion.div>

        <motion.div className="price-card" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
          <div className="pc-label">Family Adventure (4 pax)</div>
          <div className="pc-old">â‚¹69,999</div>
          <div className="pc-price">â‚¹49,999</div>
          <div className="pc-badge">27% OFF</div>
          <ul className="pc-perks">
            <li>Family suite with connecting rooms</li>
            <li>Family-friendly lake and valley excursions</li>
            <li>All inclusions above</li>
            <li>Family-friendly meal planning</li>
            <li>Group guide &amp; transfers</li>
          </ul>
          <a href="#contact" className="btn-primary full-btn">Reserve for Family</a>
        </motion.div>

      </div>

      <motion.p className="price-note" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>ðŸ’³ EMI available Â· 100% refund if cancelled 10 days before Â· No hidden charges</motion.p>
    </div>
  </motion.section>

  {/* â–‘â–‘â–‘ TESTIMONIALS â–‘â–‘â–‘ */}
  <motion.section className="testimonials" id="testimonials" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Voices of Delight</motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Stories That <em>Inspire</em></motion.h2>

      <div className="testi-slider">
        <div className="testi-track" id="testiTrack">

          <div className="testi-card">
            <div className="testi-stars">â˜…â˜…â˜…â˜…â˜…</div>
            <p>"The mountain drive, monasteries and Pangong sunrise were unforgettable. From high passes to blue lakes â€” Ladakh through LumiÃ¨re's eyes feels serene and polished at the same time."</p>
            <div className="testi-author">
              <img src="https://i.pravatar.cc/60?img=47" alt="Arjun M." />
              <div>
                <strong>Arjun Mishra</strong>
                <span>Delhi Â· Solo Traveller</span>
              </div>
            </div>
          </div>

          <div className="testi-card">
            <div className="testi-stars">â˜…â˜…â˜…â˜…â˜…</div>
            <p>"Our honeymoon in Ladakh was wonderfully romantic. The private dinner, the cozy stay, and the calm atmosphere made it a trip we'll always remember."</p>
            <div className="testi-author">
              <img src="https://i.pravatar.cc/60?img=32" alt="Ravi &amp; Neha" />
              <div>
                <strong>Ravi &amp; Neha Sharma</strong>
                <span>Bangalore Â· Honeymoon</span>
              </div>
            </div>
          </div>

          <div className="testi-card">
            <div className="testi-stars">â˜…â˜…â˜…â˜…â˜…</div>
            <p>"As a photographer I loved the colors â€” monasteries at dawn, passes in the clouds, and the lakes at dusk. Ladakh is a dream for storytellers with cameras."</p>
            <div className="testi-author">
              <img src="https://i.pravatar.cc/60?img=12" alt="Priya S." />
              <div>
                <strong>Priya Singh</strong>
                <span>Mumbai Â· Photography Enthusiast</span>
              </div>
            </div>
          </div>

          <div className="testi-card">
            <div className="testi-stars">â˜…â˜…â˜…â˜…â˜†</div>
            <p>"We brought the kids to Ladakh and they still talk about the lake drive and village visit. The family-friendly activities kept everyone delighted â€” highly recommended."</p>
            <div className="testi-author">
              <img src="https://i.pravatar.cc/60?img=25" alt="Anil K." />
              <div>
                <strong>Anil &amp; Kavya Gupta</strong>
                <span>Pune Â· Family Adventure</span>
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
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Enhance Your Ladakh Escape</motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Optional <em>Add-Ons</em></motion.h2>
      <div className="addon-grid">
        <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <span>ðŸ“¸</span>
          <strong>Ladakh Photography Tour</strong>
          <p>Sunrise and sunset shoots at passes, lakes and monastery viewpoints</p>
          <em>+â‚¹2,999</em>
        </motion.div>
        <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
          <span>Ã°Å¸ÂÂª</span>
          <strong>Stargazing Session</strong>
          <p>Guided night-sky experience with telescope setup</p>
          <em>+â‚¹3,499</em>
        </motion.div>
        <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
          <span>ðŸŽ­</span>
          <strong>Cultural Performance &amp; Dinner</strong>
          <p>Private Ladakhi music and local dinner with mountain views</p>
          <em>+â‚¹2,499</em>
        </motion.div>
        <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
          <span>ðŸ§¶</span>
          <strong>Village &amp; Craft Visit</strong>
          <p>Village visits, handicraft shopping and local demo sessions</p>
          <em>+â‚¹1,999</em>
        </motion.div>
      </div>
    </div>
  </motion.section>

  {/* â–‘â–‘â–‘ FINAL CTA â–‘â–‘â–‘ */}
  <motion.section className="final-cta" id="cta" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="fcta-bg">
      <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1800&amp;q=85" alt="Ladakh Panorama" />
      <div className="fcta-overlay"></div>
    </div>
    <motion.div className="fcta-content" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
      <div className="section-label light">The Time Is Now</div>
      <h2>Life is Short.<br /><em>Ladakh is Calling.</em></h2>
      <p>Every great journey begins with a single step. Let us take care of every detail while you discover Ladakh's mountains, lakes and monasteries.</p>
      <a href="#pricing" className="btn-primary large-btn">Start Your Ladakh Journey</a>
    </motion.div>
  </motion.section>

  {/* â–‘â–‘â–‘ CONTACT STRIP â–‘â–‘â–‘ */}
  <motion.section className="contact-strip" id="contact" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <div className="cs-grid">
        <motion.div className="cs-col" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <h3>Have Questions?</h3>
          <p>Our Ladakh travel experts are available 9AMâ€“9PM, 7 days a week.</p>
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
              <option>Solo Explorer</option>
              <option>Romantic Escape (Couple)</option>
              <option>Family Adventure (4 pax)</option>
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


