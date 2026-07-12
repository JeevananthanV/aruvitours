import { motion } from 'motion/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import WhatsAppFloat from '../Shared/Whatsappfloat';

export default function HimachalPradesh() {

  useEffect(() => {
    document.title = "Himachal Pradesh | Aruvi Tours";
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
      lightboxImg.src = src.startsWith('http') || src.startsWith('/') ? src : `/Himachal Pradesh/${src}`;
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
        <span className="weather-icon">â„️</span>
        <span>12°C · Cool &amp; Pleasant</span>
    </div>
    

    {/* ░░░ QUICK INFO BAR ░░░ */}
    <div className="infobar" id="infobar">
    <div className="infobar-inner">

        <div className="info-item">
        <span className="info-icon">🗓</span>
        <div>
            <span className="info-label">Packages</span>
            <span className="info-val">3N/4D · 5N/6D</span>
        </div>
        </div>

        <div className="info-divider"></div>

        <div className="info-item">
        <span className="info-icon">ðŸ“</span>
        <div>
            <span className="info-label">Destinations</span>
            <span className="info-val">Shimla · Kullu · Manali</span>
        </div>
        </div>

        <div className="info-divider"></div>

        <div className="info-item">
        <span className="info-icon">💰</span>
        <div>
            <span className="info-label">Starting From</span>
            <span className="info-val">₹15,999 <small>/person</small></span>
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
            <span className="info-val">October – June</span>
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
        <span className="pkg-tab-name">Shimla–Manali Escape</span>
        </button>
        <button className="pkg-tab" data-pkg="4n5d" onClick={() => window.switchPackage && window.switchPackage('4n5d', this)}>
        <span className="pkg-tab-duration">5N / 6D</span>
        <span className="pkg-tab-name">Grand Himachal Tour</span>
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
        <h2>Mountain Escape<br /><em>Himachal Pradesh Retreat</em></h2>

        <p>Discover the breathtaking beauty of Himachal Pradesh with Aruvi Tours, where nature, adventure, and serenity come alive across Shimla 🌄, Kullu 🌿, and Manali â„️. Enjoy scenic drives through lush valleys, experience snowfall in the Himalayas, and unwind in peaceful hill towns.</p>

        <p>Our carefully curated packages ensure a seamless journey — blending cozy mountain stays, guided sightseeing, and thrilling experiences. Whether it’s a short hill escape or an extended mountain vacation, Aruvi Tours transforms your trip into a refreshing and unforgettable experience ✨.</p>

        <a href="#itinerary" className="link-arrow">Explore the Journey <span>→</span></a>
        </motion.div>

        <motion.div className="about-highlights" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>

        <div className="highlight-card">
            <div className="hc-icon">🌄</div>
            <div>
            <strong>Shimla</strong>
            <p>The Queen of Hills — explore Mall Road, Kufri, and colonial charm surrounded by scenic mountains.</p>
            </div>
        </div>

        <div className="highlight-card">
            <div className="hc-icon">â„️</div>
            <div>
            <strong>Solang Valley</strong>
            <p>A paradise for adventure lovers — enjoy snow activities, paragliding, and breathtaking Himalayan views.</p>
            </div>
        </div>

        <div className="highlight-card">
            <div className="hc-icon">ðŸ”️</div>
            <div>
            <strong>Rohtang Pass</strong>
            <p>Experience snow-covered landscapes and stunning mountain views at one of Himachal’s most iconic destinations.</p>
            </div>
        </div>

        <div className="highlight-card">
            <div className="hc-icon">🌿</div>
            <div>
            <strong>Kullu Valley</strong>
            <p>Known for its scenic beauty, rivers, and adventure activities like river rafting.</p>
            </div>
        </div>

        <div className="highlight-card">
            <div className="hc-icon">🛕</div>
            <div>
            <strong>Hadimba Temple</strong>
            <p>A peaceful wooden temple nestled in cedar forests, showcasing unique Himachali architecture.</p>
            </div>
        </div>

        <div className="highlight-card">
            <div className="hc-icon">ðŸ›️</div>
            <div>
            <strong>Local Markets</strong>
            <p>Shop woollens, handicrafts, and souvenirs in vibrant hill town bazaars of Shimla and Manali.</p>
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
    <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Frames of <em>Himachal Escape</em></motion.h2>
  </div>

  <div className="gallery-grid" id="galleryGrid">

    <motion.div className="gallery-item" data-src="/Himachal Pradesh/himachal-shimla-mall-road.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
      <img src="/Himachal Pradesh/himachal-shimla-mall-road.jpg" alt="Shimla Hills" />
      <div className="gallery-caption">Shimla · Hill Town</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="/Himachal Pradesh/rohotang.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
      <img src="/Himachal Pradesh/rohotang.jpg" alt="Kufri Snow Point" />
      <div className="gallery-caption">Kufri · Snow Activities</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="/Himachal Pradesh/manali.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
      <img src="/Himachal Pradesh/himachal-dharamshala-temple.jpg" alt="Manali Valley" />
      <div className="gallery-caption">Manali · Scenic Valley</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="/Himachal Pradesh/solong.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
      <img src="/Himachal Pradesh/solong.jpg" alt="Solang Valley" />
      <div className="gallery-caption">Solang Valley · Adventure</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="/Himachal Pradesh/rohotang.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
      <img src="/Himachal Pradesh/himachal-manali-solang-valley.jpg" alt="Rohtang Pass" />
      <div className="gallery-caption">Rohtang Pass · Snow Peaks</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="/Himachal Pradesh/himachal-kullu-valley.jpg" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
      <img src="/Himachal Pradesh/hidimba.jpg" alt="Kullu Valley" />
      <div className="gallery-caption">Kullu · River Valley</div>
    </motion.div>

  </div>
  {/* Lightbox */}
  <div className="lightbox" id="lightbox">
    <button className="lb-close" id="lbClose">✕</button>
    <button className="lb-arrow lb-prev" id="lbPrev">‹</button>
    <img src="" alt="Lightbox gallery image for Himachal Pradesh" className="lb-img" id="lbImg" />
    <button className="lb-arrow lb-next" id="lbNext">›</button>
  </div>
</motion.section>

{/* ░░░ ITINERARY — 3N/4D ░░░ */}
<motion.section className="itinerary pkg-itinerary active" id="itinerary" data-pkg-section="2n3d" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
  <div className="container">
    <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>3N / 4D · Himachal Escape</motion.div>
    <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Your <em>Journey</em> Unfolds</motion.h2>
    <motion.div className="pkg-route-pills" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
      <span className="route-pill">✈ Arrival</span>
      <span className="route-arrow">→</span>
      <span className="route-pill">Shimla</span>
      <span className="route-arrow">→</span>
      <span className="route-pill">Kullu</span>
      <span className="route-arrow">→</span>
      <span className="route-pill">Manali</span>
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
              <h3>Arrival in Shimla</h3>
              <span className="tl-sub">Airport/Station → Hill Hotel</span>
            </div>
            <div className="tl-chevron">▾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>🚗 Transfer to Shimla</li>
              <li>ðŸ¨ Hotel check-in</li>
              <li>🌆 Evening at Mall Road</li>
              <li>⛪ Visit Christ Church</li>
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
              <h3>Shimla → Kullu → Manali</h3>
              <span className="tl-sub">Scenic Drive · River Valley</span>
            </div>
            <div className="tl-chevron">▾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>ðŸ½ Breakfast at hotel</li>
              <li>🚗 Drive via Kullu Valley</li>
              <li>🌊 Visit Beas River &amp; rafting point</li>
              <li>ðŸ¨ Check-in at Manali hotel</li>
              <li>ðŸ½ Dinner &amp; overnight stay</li>
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
              <h3>Manali Exploration</h3>
              <span className="tl-sub">Adventure · Snow · Nature</span>
            </div>
            <div className="tl-chevron">▾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>ðŸ” Visit Solang Valley</li>
              <li>â„️ Optional Rohtang Pass excursion</li>
              <li>🛕 Hadimba Temple visit</li>
              <li>ðŸ› Mall Road shopping</li>
              <li>ðŸ½ Dinner at hotel</li>
            </ul>
            <div className="tl-note">Meals: Breakfast &amp; Dinner included</div>
          </div>
        </div>
      </motion.div>

      {/* Day 4 */}
      <motion.div className="tl-item" data-day="4" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <div className="tl-marker">
          <span className="tl-day">Day 4</span>
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
              <li>🚗 Transfer to departure point</li>
              <li>✈ Journey back home</li>
            </ul>
            <div className="tl-note">Meals: Breakfast included</div>
          </div>
        </div>
      </motion.div>

    </div>
  </div>
</motion.section>

{/* ░░░ ITINERARY — 5N/6D ░░░ */}
<motion.section className="itinerary pkg-itinerary" id="itinerary-4n5d" data-pkg-section="4n5d" style={{"display":"none"}} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
  <div className="container">
    <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>5N / 6D · Shimla Kullu Manali</motion.div>
    <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Your <em>Journey</em> Unfolds</motion.h2>
    <motion.div className="pkg-route-pills" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
      <span className="route-pill">✈ Arrival</span>
      <span className="route-arrow">→</span>
      <span className="route-pill">Shimla</span>
      <span className="route-arrow">→</span>
      <span className="route-pill">Kullu</span>
      <span className="route-arrow">→</span>
      <span className="route-pill">Manali</span>
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
              <h3>Arrival in Shimla</h3>
              <span className="tl-sub">Leisure &amp; Local Exploration</span>
            </div>
            <div className="tl-chevron">▾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>🚗 Arrival &amp; transfer</li>
              <li>ðŸ¨ Hotel check-in</li>
              <li>🌆 Evening Mall Road walk</li>
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
              <h3>Shimla Sightseeing</h3>
              <span className="tl-sub">Kufri · Nature Views</span>
            </div>
            <div className="tl-chevron">▾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>ðŸ” Visit Kufri</li>
              <li>🌲 Himalayan Nature Park</li>
              <li>ðŸ› Local shopping</li>
              <li>ðŸ½ Dinner at hotel</li>
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
              <h3>Shimla → Manali via Kullu</h3>
              <span className="tl-sub">Scenic Highway</span>
            </div>
            <div className="tl-chevron">▾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>🚗 Drive to Manali</li>
              <li>🌊 Kullu Valley stop</li>
              <li>ðŸ¨ Check-in at Manali hotel</li>
              <li>ðŸ½ Dinner at hotel</li>
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
              <h3>Manali Adventure Day</h3>
              <span className="tl-sub">Snow &amp; Activities</span>
            </div>
            <div className="tl-chevron">▾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>ðŸ” Solang Valley adventure</li>
              <li>â„️ Rohtang Pass (optional)</li>
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
              <h3>Manali Local Sightseeing</h3>
              <span className="tl-sub">Culture &amp; Markets</span>
            </div>
            <div className="tl-chevron">▾</div>
          </div>
          <div className="tl-body">
            <ul>
              <li>🛕 Hadimba Temple</li>
              <li>🌊 Vashisht Hot Springs</li>
              <li>ðŸ› Mall Road shopping</li>
              <li>ðŸ½ Dinner at hotel</li>
            </ul>
            <div className="tl-note">Meals: Breakfast &amp; Dinner included</div>
          </div>
        </div>
      </motion.div>

      {/* Day 6 */}
      <motion.div className="tl-item" data-day="6" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <div className="tl-marker">
          <span className="tl-day">Day 6</span>
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
              <li>🚗 Drop to station/airport</li>
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
        <motion.h2 className="" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Premium <em>Mountain Inclusions</em></motion.h2>
        <div className="inc-cards">
          <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
            <div className="ic-icon">ðŸ¨</div>
            <div>
              <strong>Scenic Hotel Stay</strong>
              <p>Comfort stays in Shimla, Kullu &amp; Manali with mountain views</p>
            </div>
          </motion.div>

          <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
            <div className="ic-icon">🚗</div>
            <div>
              <strong>Private Transfers</strong>
              <p>All transfers &amp; hill drives in AC vehicle (Volvo optional)</p>
            </div>
          </motion.div>

          <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
            <div className="ic-icon">ðŸ½</div>
            <div>
              <strong>Meals Included</strong>
              <p>Daily breakfast &amp; dinner as per itinerary</p>
            </div>
          </motion.div>

          <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
            <div className="ic-icon">ðŸ”</div>
            <div>
              <strong>Sightseeing Tours</strong>
              <p>Solang Valley, Rohtang Pass (if open), Kufri &amp; Mall Road</p>
            </div>
          </motion.div>

          <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
            <div className="ic-icon">🗺</div>
            <div>
              <strong>Local Guides</strong>
              <p>Experienced drivers &amp; optional local guides for sightseeing</p>
            </div>
          </motion.div>

          <motion.div className="inc-card glass" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
            <div className="ic-icon">🎿</div>
            <div>
              <strong>Adventure Experiences</strong>
              <p>Snow activities, river rafting &amp; paragliding (seasonal)</p>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div className="exc-col" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <div className="section-label">What's Excluded</div>
        <h2>Exclusions</h2>
        <ul className="exc-list">
          <li>✈ Flights / Train tickets</li>
          <li>📋 Travel Insurance</li>
          <li>🚙 Rohtang Pass permit &amp; extra vehicle charges</li>
          <li>ðŸº Personal expenses &amp; beverages</li>
          <li>ðŸ› Shopping &amp; souvenirs</li>
          <li>🎿 Adventure activity charges</li>
          <li>💊 Medical expenses</li>
        </ul>
      </motion.div>

    </div>
  </div>
</motion.section>
{/* ░░░ PRICING ░░░ */}
<motion.section className="pricing" id="pricing" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
  <div className="container">
    <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>3N/4D · Himachal Escape</motion.div>
    <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Reserve Your <em>Mountain Journey</em></motion.h2>

    <div className="price-cards">

      {/* Card 1 — Solo */}
      <motion.div className="price-card" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
        <div className="pc-label">3N / 4D · Solo Traveller</div>
        <div className="pc-old">₹22,999</div>
        <div className="pc-price">₹15,999</div>
        <div className="pc-badge">30% OFF</div>
        <ul className="pc-perks">
          <li>Shimla 1 night + Manali 2 nights</li>
          <li>Private hill transfers &amp; sightseeing</li>
          <li>Kufri &amp; Solang Valley visit</li>
          <li>Meals as per itinerary</li>
        </ul>
        <a href="#contact" className="btn-primary full-btn" onClick={() => window.selectPackage && window.selectPackage('3N/4D Himachal – Solo')}>Reserve 3N/4D Solo</a>
      </motion.div>

      {/* Card 2 — Couple */}
      <motion.div className="price-card featured" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <div className="pc-popular">Most Popular</div>
        <div className="pc-label">3N / 4D · Couple</div>
        <div className="pc-old">₹38,999</div>
        <div className="pc-price">₹25,999</div>
        <div className="pc-badge">33% OFF</div>
        <ul className="pc-perks">
          <li>Shimla + Manali scenic stays</li>
          <li>Private cab &amp; sightseeing tours</li>
          <li>Solang Valley &amp; Mall Road experience</li>
          <li>Daily breakfast &amp; dinner</li>
        </ul>
        <a href="#contact" className="btn-primary full-btn" onClick={() => window.selectPackage && window.selectPackage('3N/4D Himachal – Couple')}>Reserve 3N/4D Couple</a>
      </motion.div>

      {/* Card 3 — Group */}
      <motion.div className="price-card" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <div className="pc-popular" style={{"display":"none"}}>Most Popular</div>
        <div className="pc-label">5N / 6D · Group (4+)</div>
        <div className="pc-old">₹49,999</div>
        <div className="pc-price">₹36,999</div>
        <div className="pc-badge">26% OFF</div>
        <ul className="pc-perks">
          <li>Shimla + Kullu + Manali extended stay</li>
          <li>Private transfers &amp; full hill experience</li>
          <li>Rohtang Pass (if open) &amp; Solang Valley</li>
          <li>Daily breakfast &amp; curated dinners</li>
        </ul>
        <a href="#contact" className="btn-primary full-btn" onClick={() => window.selectPackage && window.selectPackage('5N/6D Himachal – Group')}>Reserve 5N/6D Group</a>
      </motion.div>

    </div>

    {/* Per-person note */}
    <motion.div className="price-perperson-note" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
      <div className="ppn-grid">
        <div className="ppn-item">
          <span className="ppn-icon">👤</span>
          <span className="ppn-label">Solo Traveller</span>
          <span className="ppn-val">₹15,999+</span>
        </div>
        <div className="ppn-item">
          <span className="ppn-icon">💑</span>
          <span className="ppn-label">Couple (per person)</span>
          <span className="ppn-val">₹25,999+</span>
        </div>
        <div className="ppn-item">
          <span className="ppn-icon">👨â€👩â€👧â€👦</span>
          <span className="ppn-label">Group 4+ (per person)</span>
          <span className="ppn-val">₹36,999+</span>
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
          <p>"Our Himachal trip was magical! From Shimla’s peaceful charm to the snowy adventures in Manali, everything was perfectly arranged. The Solang Valley experience was unforgettable."</p>
          <div className="testi-author">
            <img src="https://i.pravatar.cc/60?img=47" alt="Traveller" />
            <div>
              <strong>Venkatachalam</strong>
              <span>Chennai · 5N/6D Himachal Trip</span>
            </div>
          </div>
        </div>

        <div className="testi-card">
          <div className="testi-stars">★★★★★</div>
          <p>"A perfect hill getaway! The cool weather, scenic drives, and beautiful landscapes made this trip amazing. Manali and Kullu were the highlights for us."</p>
          <div className="testi-author">
            <img src="https://i.pravatar.cc/60?img=32" alt="Couple" />
            <div>
              <strong>Arjun &amp; Meera Krishnan</strong>
              <span>Bangalore · 3N/4D Couple Trip</span>
            </div>
          </div>
        </div>

        <div className="testi-card">
          <div className="testi-stars">★★★★★</div>
          <p>"The 3N/4D package covered everything beautifully. Kufri, Mall Road, and Solang Valley were breathtaking. Completely stress-free travel experience."</p>
          <div className="testi-author">
            <img src="https://i.pravatar.cc/60?img=12" alt="Traveller" />
            <div>
              <strong>Ravi Nambiar</strong>
              <span>Mumbai · 3N/4D Quick Escape</span>
            </div>
          </div>
        </div>

        <div className="testi-card">
          <div className="testi-stars">★★★★☆</div>
          <p>"A wonderful family trip! Kids loved the snow activities in Manali and the scenic beauty throughout the journey. Everything was well organized."</p>
          <div className="testi-author">
            <img src="https://i.pravatar.cc/60?img=25" alt="Family" />
            <div>
              <strong>Kavitha &amp; Suresh Rao</strong>
              <span>Hyderabad · 5N/6D Family Trip</span>
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
        <strong>Mountain Photoshoot</strong>
        <p>Professional photoshoot in snow &amp; scenic landscapes</p>
        <em>+₹2,999</em>
      </motion.div>

      <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <span>🎿</span>
        <strong>Snow Adventure Package</strong>
        <p>Skiing, snowboarding &amp; snow scooter rides</p>
        <em>+₹3,499</em>
      </motion.div>

      <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <span>🪂</span>
        <strong>Paragliding Experience</strong>
        <p>Fly over the valleys of Kullu &amp; Manali</p>
        <em>+₹2,499</em>
      </motion.div>

      <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
        <span>🔥</span>
        <strong>Bonfire &amp; Himachali Dinner</strong>
        <p>Traditional dinner with bonfire &amp; mountain vibes</p>
        <em>+₹2,999</em>
      </motion.div>

    </div>
  </div>
</motion.section>

{/* ░░░ FINAL CTA ░░░ */}
<motion.section className="final-cta" id="cta" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
  <div className="fcta-bg">
    <img src="/Himachal Pradesh/manali.jpg" alt="Manali hill station in Himachal Pradesh" />
    <div className="fcta-overlay"></div>
  </div>
  <motion.div className="fcta-content" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="section-label light">The Time Is Now</div>
    <h2>Escape To The Mountains<br /><em>Himachal Awaits.</em></h2>
    <p>From the colonial charm of Shimla to the breathtaking valleys of Kullu and the snowy adventures of Manali, experience the perfect Himalayan getaway.</p>
    <a href="#packages" className="btn-primary large-btn">Choose Your Package</a>
  </motion.div>
</motion.section>

  {/* ░░░ CONTACT STRIP ░░░ */}
  <motion.section className="contact-strip" id="contact" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <div className="cs-grid">
        <motion.div className="cs-col" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
          <h3>Have Questions?</h3>
          <p>Our travel curators are available 9AM–9PM, 7 days a week for your Himachal Pradesh journey.</p>
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
              <option value="3N/4D Himachal – Solo">3N/4D Himachal – Solo</option>
              <option value="3N/4D Himachal – Couple">3N/4D Himachal – Couple</option>
              <option value="5N/6D Himachal – Group">5N/6D Himachal – Group</option>
              <option value="5N/6D Himachal – Solo">5N/6D Himachal – Solo</option>
              <option value="4N/5D Himachal – Couple">5N/6D Himachal – Couple</option>
              <option value="5N/6D Himachal – Group">5N/6D Himachal – Group</option>
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


