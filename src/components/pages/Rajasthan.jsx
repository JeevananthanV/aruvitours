import { motion } from 'motion/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import WhatsAppFloat from '../Shared/Whatsappfloat';

export default function Rajasthan() {

  useEffect(() => {
    document.title = "Rajasthan | Aruvi Tours";
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
      lightboxImg.src = src.startsWith('http') || src.startsWith('/') ? src : `/Rajasthan/${src}`;
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
      <img src="/Rajasthan/rajasthan-udaipur-lake-palace.jpg" alt="Rajasthan Palaces" className="hero-img" id="heroImg" />
      <div className="hero-overlay"></div>
      <div className="hero-grain"></div>
    </div>

    <div className="hero-content">
      <motion.div className="hero-badge" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <span className="badge-dot"></span>
        6 Nights Â· 7 Days Â· Rajasthan, India
      </motion.div>
      <motion.h1 className="hero-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <em>Rajasthan</em><br />Royal Escape
      </motion.h1>
      <motion.p className="hero-tagline" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
        From grand forts to golden dunes â€” a timeless royal odyssey
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
          <span className="info-val">6N / 7D</span>
        </div>
      </div>
      <div className="info-divider"></div>
      <div className="info-item">
        <span className="info-icon">Ã°Å¸â€œÂ</span>
        <div>
          <span className="info-label">Location</span>
          <span className="info-val">Rajasthan, India</span>
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
            <h2>Palaces, Desert &amp; Culture<br /><em>Royal Rajasthan</em></h2>
            <p>Experience the grandeur of Rajasthan â€” a tapestry of magnificent forts, shimmering deserts, and timeless royal traditions. This curated 6N/7D package brings the region's rich heritage to life in comfort and style.</p>
            <p>From sunrise at Amber Fort to a twilight camel safari in the Thar, from lavish palace stays to intimate folk performances â€” each day is crafted to reveal Rajasthan's royal spirit. Handpicked heritage hotels, authentic Rajasthani cuisine, and private guided tours await.</p>
            <a href="#itinerary" className="link-arrow">Explore the Journey <span>â†’</span></a>
          </motion.div>
          <motion.div className="about-highlights" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
            <div className="highlight-card">
              <div className="hc-icon">Ã°Å¸ÂÂ°</div>
              <div>
                <strong>Heritage Palace Stays</strong>
                <p>Curated stays in restored palaces and havelis</p>
              </div>
            </div>
            <div className="highlight-card">
              <div className="hc-icon">Ã°Å¸ÂÂª</div>
              <div>
                <strong>Thar Desert Safari</strong>
                <p>Camel rides, dune dining &amp; sunset vistas</p>
              </div>
            </div>
            <div className="highlight-card">
              <div className="hc-icon">Ã°Å¸ÂÂ¯</div>
              <div>
                <strong>Fort &amp; City Tours</strong>
                <p>Amber, Mehrangarh, City Palace and old bazaars</p>
              </div>
            </div>
            <div className="highlight-card">
              <div className="hc-icon">Ã°Å¸ÂÂ²</div>
              <div>
                <strong>Rajasthani Cuisine</strong>
                <p>Traditional thali &amp; royal dining experiences</p>
              </div>
            </div>
            <div className="highlight-card">
              <div className="hc-icon">ðŸŽ­</div>
              <div>
                <strong>Folk Performances</strong>
                <p>Evening music, puppetry &amp; cultural storytelling</p>
              </div>
            </div>
            <div className="highlight-card">
              <div className="hc-icon">ðŸ§¶</div>
              <div>
                <strong>Artisan Workshops</strong>
                <p>Textiles, block printing &amp; blue pottery demonstrations</p>
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
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Frames of <em>Majesty</em></motion.h2>
    </div>
    <div className="gallery-grid" id="galleryGrid">
      <motion.div className="gallery-item" data-src="/Rajasthan/rajasthan-amber-fort-jaipur.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <img src="/Rajasthan/rajasthan-amber-fort-jaipur.jpg" alt="Amber Fort, Jaipur" />
        <div className="gallery-caption">Amber Fort, Jaipur</div>
      </motion.div>
      <motion.div className="gallery-item" data-src="/Rajasthan/rajasthan-hawa-mahal-jaipur.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <img src="/Rajasthan/rajasthan-hawa-mahal-jaipur.jpg" alt="Mehrangarh Fort, Jodhpur" />
        <div className="gallery-caption">Mehrangarh Fort, Jodhpur</div>
      </motion.div>
      <motion.div className="gallery-item" data-src="/Rajasthan/rajasthan-udaipur-lake-palace.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <img src="/Rajasthan/rajasthan-udaipur-lake-palace.jpg" alt="Lake Pichola, Udaipur" />
        <div className="gallery-caption">Lake Pichola, Udaipur</div>
      </motion.div>
      <motion.div className="gallery-item" data-src="/Rajasthan/rajasthan-jaisalmer-fort.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <img src="/Rajasthan/rajasthan-jaisalmer-fort.jpg" alt="Thar Desert, Jaisalmer" />
        <div className="gallery-caption">Thar Desert Dunes</div>
      </motion.div>
      <motion.div className="gallery-item" data-src="/Rajasthan/rajasthan-amber-fort-jaipur.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <img src="/Rajasthan/rajasthan-amber-fort-jaipur.jpg" alt="City Palace, Jaipur" />
        <div className="gallery-caption">City Palace Grandeur</div>
      </motion.div>
      <motion.div className="gallery-item" data-src="/Rajasthan/rajasthan-jaisalmer-fort.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
        <img src="/Rajasthan/rajasthan-jaisalmer-fort.jpg" alt="Ranthambore Safari" />
        <div className="gallery-caption">Ranthambore Wildlife</div>
      </motion.div>
    </div>

    {/* Lightbox */}
    <div className="lightbox" id="lightbox">
      <button className="lb-close" id="lbClose">âœ•</button>
      <button className="lb-arrow lb-prev" id="lbPrev">â€¹</button>
      <img src="" alt="Lightbox gallery image for Rajasthan" className="lb-img" id="lbImg" />
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
                <h3>Arrival in Jaipur</h3>
                <span className="tl-sub">Airport â†’ City Palace check-in</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>ðŸš— Private transfer from Jaipur Airport to your heritage hotel</li>
                <li>Ã°Å¸ÂÂµ Welcome drink &amp; orientation with your guide</li>
                <li>Ã°Å¸Ââ€º Evening stroll through local bazaars</li>
                <li>Ã°Å¸ÂÂ½ Rajasthani thali dinner at the palace hotel</li>
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
                <h3>Amber Fort &amp; City Sights</h3>
                <span className="tl-sub">Amber Fort Â· Hawa Mahal Â· City Palace</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>Ã°Å¸ÂËœ Guided visit to Amber Fort with royal views</li>
                <li>ðŸ“¸ Photo stops at Hawa Mahal and Jal Mahal</li>
                <li>Ã°Å¸â€ºÂ Explore Johri Bazaar and local craft shops</li>
                <li>Ã°Å¸ÂÂ½ Evening folk performance with dinner</li>
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
                <h3>Pushkar &amp; Ajmer</h3>
                <span className="tl-sub">Holy lakes Â· Local bazaars</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>ðŸ•‰ Morning visit to Pushkar Lake and Brahma Temple</li>
                <li>Ã°Å¸â€ºÂ Explore Pushkar's colorful market and local crafts</li>
                <li>ðŸš— Transfer to Jodhpur in the evening</li>
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
                <h3>Jodhpur &amp; Blue City</h3>
                <span className="tl-sub">Mehrangarh Fort Â· Local lanes</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>Ã°Å¸ÂÂ¯ Guided tour of Mehrangarh Fort and Jaswant Thada</li>
                <li>Ã°Å¸Ââ€º Lunch featuring Rajasthani specialties</li>
                <li>ðŸ“¸ Sunset views over the blue city</li>
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
                <h3>Udaipur â€“ City of Lakes</h3>
                <span className="tl-sub">Boat ride Â· City Palace</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>ðŸš¤ Morning boat ride on Lake Pichola</li>
                <li>Ã°Å¸Ââ€º Explore City Palace and royal galleries</li>
                <li>ðŸŽ¨ Evening free to stroll lakeside markets</li>
              </ul>
              <div className="tl-note">Meals: Breakfast &amp; Dinner included</div>
            </div>
          </div>
        </motion.div>

        <motion.div className="tl-item" data-day="6" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.5 }}>
          <div className="tl-marker">
            <span className="tl-day">Day 6</span>
            <div className="tl-dot"></div>
          </div>
          <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
            <div className="tl-header">
              <div>
                <h3>Ranthambore Safari</h3>
                <span className="tl-sub">Wildlife Reserve Â· Jungle Drive</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>Ã°Å¸Â¦Â Early morning jeep safari in Ranthambore National Park</li>
                <li>ðŸ“¸ Wildlife spotting and expert-guided nature walk</li>
                <li>Ã°Å¸ÂÂ½ Relaxed evening at a countryside heritage lodge</li>
              </ul>
              <div className="tl-note">Meals: Breakfast, Lunch &amp; Dinner included</div>
            </div>
          </div>
        </motion.div>

        <motion.div className="tl-item" data-day="7" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.6000000000000001 }}>
          <div className="tl-marker">
            <span className="tl-day">Day 7</span>
            <div className="tl-dot"></div>
          </div>
          <div className="tl-card" onClick={(e) => window.toggleDay && window.toggleDay(e.currentTarget)}>
            <div className="tl-header">
              <div>
                <h3>Departure from Jaipur</h3>
                <span className="tl-sub">Last moments &amp; transfer to airport</span>
              </div>
              <div className="tl-chevron">â–¾</div>
            </div>
            <div className="tl-body">
              <ul>
                <li>â˜• Leisurely breakfast at your hotel</li>
                <li>Ã°Å¸â€ºÂ Optional: Last-minute shopping for textiles and handicrafts</li>
                <li>ðŸš— Private transfer to Jaipur Airport for departure</li>
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
          <motion.h2 className="" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Royal <em>Inclusions</em></motion.h2>
          <div className="inc-cards">
            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
              <div className="ic-icon">Ã°Å¸ÂÂ°</div>
              <div>
                <strong>Heritage Palace Stays</strong>
                <p>Multiple nights in restored palaces, havelis and heritage hotels</p>
              </div>
            </motion.div>
            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
              <div className="ic-icon">ðŸš—</div>
              <div>
                <strong>Private Transfers</strong>
                <p>All airport, inter-city &amp; excursion transfers with expert drivers</p>
              </div>
            </motion.div>
            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
              <div className="ic-icon">Ã°Å¸ÂÂ½</div>
              <div>
                <strong>Curated Rajasthani Meals</strong>
                <p>Daily breakfast + traditional Rajasthani dining experiences</p>
              </div>
            </motion.div>
            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
              <div className="ic-icon">ðŸ—º</div>
              <div>
                <strong>Guided Heritage Tours</strong>
                <p>Certified local guides for forts, palaces and cultural sites</p>
              </div>
            </motion.div>
            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
              <div className="ic-icon">Ã°Å¸ÂÂª</div>
              <div>
                <strong>Thar Desert Experience</strong>
                <p>Camel safari, dune dining &amp; sunset experiences</p>
              </div>
            </motion.div>
            <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
              <div className="ic-icon">Ã°Å¸Â¦Â</div>
              <div>
                <strong>Wildlife Safari</strong>
                <p>Ranthambore jeep safari with an experienced naturalist</p>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div className="exc-col" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
          <div className="section-label">What's Excluded</div>
          <h2>Exclusions</h2>
          <ul className="exc-list">
            <li>âœˆ Airfare to/from Rajasthan</li>
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
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Reserve Your <em>Royal Retreat</em></motion.h2>

      <div className="price-cards">

        <motion.div className="price-card" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <div className="pc-label">Solo Explorer</div>
          <div className="pc-old">â‚¹33,999</div>
          <div className="pc-price">â‚¹24,999</div>
          <div className="pc-badge">26% OFF</div>
          <ul className="pc-perks">
            <li>Heritage palace room (single occupancy)</li>
            <li>Guided city &amp; fort tours</li>
            <li>All transfers &amp; select activities</li>
            <li>Personalized concierge service</li>
          </ul>
          <a href="#contact" className="btn-primary full-btn">Reserve Solo</a>
        </motion.div>

        <motion.div className="price-card featured" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
          <div className="pc-popular">Most Popular</div>
          <div className="pc-label">Romantic Escape (Couple)</div>
          <div className="pc-old">â‚¹59,999</div>
          <div className="pc-price">â‚¹42,999</div>
          <div className="pc-badge">28% OFF</div>
          <ul className="pc-perks">
            <li>Deluxe heritage suite with royal styling</li>
            <li>Private desert dinner &amp; guided experience</li>
            <li>Couples spa &amp; wellness treatments</li>
            <li>All inclusions above</li>
            <li>24/7 dedicated concierge</li>
          </ul>
          <a href="#contact" className="btn-primary full-btn">Reserve for Two</a>
        </motion.div>

        <motion.div className="price-card" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
          <div className="pc-label">Family Adventure (4 pax)</div>
          <div className="pc-old">â‚¹99,999</div>
          <div className="pc-price">â‚¹72,999</div>
          <div className="pc-badge">27% OFF</div>
          <ul className="pc-perks">
            <li>Family heritage suite with connecting rooms</li>
            <li>Kids' cultural workshops &amp; family excursions</li>
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
            <p>"The palace stay and the sunset at the Thar dunes were unforgettable. From royal dining to the vibrant bazaars â€” Rajasthan through LumiÃ¨re's eyes feels like stepping into history."</p>
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
            <p>"Our honeymoon in Rajasthan was magically romantic. The private desert dinner under the stars, the palace suite, and the folk music made it a trip we'll always remember."</p>
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
            <p>"As a photographer I loved the colors â€” Amber Fort at dawn, the blue lanes of Jodhpur, and the golden Thar dunes at sunset. Rajasthan is a dream for storytellers with cameras."</p>
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
            <p>"We brought the kids to Rajasthan and they still talk about the camel rides and puppet shows. The family-friendly activities kept everyone delighted â€” highly recommended."</p>
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
      <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Enhance Your Royal Escape</motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Optional <em>Add-Ons</em></motion.h2>
      <div className="addon-grid">
        <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <span>ðŸ“¸</span>
          <strong>Rajasthan Photography Tour</strong>
          <p>Sunrise and sunset shoots at forts and dunes</p>
          <em>+â‚¹2,999</em>
        </motion.div>
        <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
          <span>Ã°Å¸ÂÂª</span>
          <strong>Desert Camel Safari</strong>
          <p>Extended camel safari with overnight dune camp</p>
          <em>+â‚¹3,499</em>
        </motion.div>
        <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
          <span>ðŸŽ­</span>
          <strong>Cultural Performance &amp; Dinner</strong>
          <p>Private folk music and dance with royal dining</p>
          <em>+â‚¹2,499</em>
        </motion.div>
        <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
          <span>ðŸ§¶</span>
          <strong>Artisan Workshop</strong>
          <p>Block printing, pottery or textile visits with hands-on demo</p>
          <em>+â‚¹1,999</em>
        </motion.div>
      </div>
    </div>
  </motion.section>

  {/* â–‘â–‘â–‘ FINAL CTA â–‘â–‘â–‘ */}
  <motion.section className="final-cta" id="cta" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="fcta-bg">
      <img src="https://images.unsplash.com/photo-1505765051251-2f8f6d6ef1d8?w=1800&amp;q=85" alt="Rajasthan Panorama" />
      <div className="fcta-overlay"></div>
    </div>
    <motion.div className="fcta-content" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
      <div className="section-label light">The Time Is Now</div>
      <h2>Life is Short.<br /><em>Rajasthan is Calling.</em></h2>
      <p>Every great journey begins with a single step. Let us take care of every detail while you discover royal Rajasthan.</p>
      <a href="#pricing" className="btn-primary large-btn">Start Your Royal Journey</a>
    </motion.div>
  </motion.section>

  {/* â–‘â–‘â–‘ CONTACT STRIP â–‘â–‘â–‘ */}
  <motion.section className="contact-strip" id="contact" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <div className="cs-grid">
        <motion.div className="cs-col" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <h3>Have Questions?</h3>
          <p>Our Rajasthan travel experts are available 9AMâ€“9PM, 7 days a week.</p>
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


