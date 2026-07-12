import { motion } from 'motion/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import WhatsAppFloat from '../Shared/Whatsappfloat';

export default function Andaman() {

  useEffect(() => {
    document.title = "Andaman | Aruvi Tours";
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
      lightboxImg.src = src.startsWith('http') || src.startsWith('/') ? src : `/Andaman/${src}`;
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

    
    // Split Hero Carousel Autoplay & Control Logic
    const panels = document.querySelectorAll('.hero-panel');
    let activePanel = 0;
    let autoplayTimer;

    const setPanelActive = (idx) => {
      panels.forEach((p, i) => {
        p.classList.toggle('active', i === idx);
        p.classList.toggle('inactive', i !== idx);
      });
      activePanel = idx;
    };

    const startAutoplay = () => {
      window.clearInterval(autoplayTimer);
      autoplayTimer = window.setInterval(() => {
        setPanelActive((activePanel + 1) % panels.length);
      }, 5000);
    };

    panels.forEach((panel, idx) => {
      panel.addEventListener('mouseenter', () => {
        window.clearInterval(autoplayTimer);
        setPanelActive(idx);
      });
      panel.addEventListener('mouseleave', startAutoplay);
    });

    window.heroNext = () => {
      setPanelActive((activePanel + 1) % panels.length);
      startAutoplay();
    };

    window.heroPrev = () => {
      setPanelActive((activePanel - 1 + panels.length) % panels.length);
      startAutoplay();
    };

    setPanelActive(0);
    startAutoplay();
    

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
      
      window.clearInterval(autoplayTimer);
      window.heroNext = null;
      window.heroPrev = null;
      
    };
  }, []);
  

  return (
    <>
      <Navbar />
      <div className="package-page-wrapper">

  {/* ===== PRELOADER ===== */}
  

  {/* ===== NAVBAR ===== */}
  

  {/* Mobile Menu */}
    
  {/* ===== HERO: CINEMATIC SPLIT (4 PACKAGES) ===== */}
  <motion.section id="hero" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="hero-split" id="heroSplit">

      <div className="hero-panel" style={{"backgroundImage":"url('/Andaman/sunset.jpg')"}}>
        <div className="panel-overlay"></div>
        <div className="panel-content">
          <span className="panel-badge">2 Nights · 3 Days</span>
          <h2>Island<br /><em>Dawn</em></h2>
          <p>Port Blair, heritage lights, and ocean calm</p>
          <button className="panel-cta" onClick={() => window.jumpToItinerary && window.jumpToItinerary(3)}>Explore itinerary</button>
        </div>
        <div className="panel-number">01</div>
      </div>

      <div className="hero-panel" style={{"backgroundImage":"url('/Andaman/sea.jpg')"}}>
        <div className="panel-overlay"></div>
        <div className="panel-content">
          <span className="panel-badge">3 Nights · 4 Days</span>
          <h2>Coral<br /><em>Serenity</em></h2>
          <p>Havelock waters, Radhanagar sunsets, and reef-framed luxury</p>
          <button className="panel-cta" onClick={() => window.jumpToItinerary && window.jumpToItinerary(4)}>Explore itinerary</button>
        </div>
        <div className="panel-number">02</div>
      </div>

      <div className="hero-panel" style={{"backgroundImage":"url('/Andaman/ross.jpg')"}}>
        <div className="panel-overlay"></div>
        <div className="panel-content">
          <span className="panel-badge">4 Nights · 5 Days</span>
          <h2>Heritage<br /><em>Isles</em></h2>
          <p>Ross Island ruins, coastal legends, and island culture</p>
          <button className="panel-cta" onClick={() => window.jumpToItinerary && window.jumpToItinerary(5)}>Explore itinerary</button>
        </div>
        <div className="panel-number">03</div>
      </div>

      <div className="hero-panel" style={{"backgroundImage":"url('/Andaman/bg4.jpg')"}}>
        <div className="panel-overlay"></div>
        <div className="panel-content">
          <span className="panel-badge">5 Nights · 6 Days</span>
          <h2>Grand<br /><em>Archipelago</em></h2>
          <p>The ultimate Andaman journey across sea and forest</p>
          <button className="panel-cta" onClick={() => window.jumpToItinerary && window.jumpToItinerary(6)}>Explore itinerary</button>
        </div>
        <div className="panel-number">04</div>
      </div>

    </div>

    <div className="hero-brand">
      <span>Aruvi Tours</span>
      <span className="hero-brand-sep">·</span>
      <span>Andaman Luxury Escapes</span>
    </div>

    <div className="hero-controls" aria-hidden="false">
      <button className="hero-prev" aria-label="Previous" onClick={() => window.heroPrev && window.heroPrev()}>❮</button>
      <div className="hero-dots" id="heroDots"></div>
      <button className="hero-next" aria-label="Next" onClick={() => window.heroNext && window.heroNext()}>❯</button>
    </div>

    <div className="hero-scroll-hint">
      <span>Scroll</span>
      <div className="scroll-line"></div>
    </div>
  </motion.section>

  {/* ===== PACKAGE OVERVIEW ===== */}
  <motion.section id="packages" className="section-pad" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <div className="section-header reveal">
        <span className="section-label">Travel Essentials</span>
        <h2>Signature <em>Journeys</em></h2>
      </div>
      <div className="pkg-detail active">
        <div className="pkg-detail-grid">
          <div className="pkg-detail-text reveal">
            <span className="pkg-label">Package 01</span>
            <h2 className="pkg-title">Backwater <em>Bliss</em></h2>
            <p className="pkg-desc">Float through Kerala's legendary backwaters aboard a private houseboat, where silence is a luxury and time dissolves into the rhythm of still waters. Witness kingfishers dart across lotus-covered canals as the sun melts into the Arabian Sea.</p>
            <div className="pkg-meta">
              <div className="meta-item"><span className="meta-icon">ðŸ“</span><span>Kochi · Alleppey · Kovalam</span></div>
              <div className="meta-item"><span className="meta-icon">🌙</span><span>2 Nights · 3 Days</span></div>
              <div className="meta-item"><span className="meta-icon">🌿</span><span>Best Time: Oct – Mar</span></div>
              <div className="meta-item"><span className="meta-icon">⭐</span><span>4.9 / 5 · 142 Reviews</span></div>
            </div>
            <div className="pkg-highlights">
              <div className="highlight-chip">🛶 Private Houseboat</div>
              <div className="highlight-chip">🌅 Sunset Cruise</div>
              <div className="highlight-chip">ðŸš Kovalam Beach</div>
              <div className="highlight-chip">🎭 Kathakali Show</div>
            </div>
          </div>
          <div className="pkg-detail-image reveal">
            <img src="/Andaman/bg1.avif" alt="Backwater Bliss" />
            <div className="img-badge">From ₹14,999<small>/person</small></div>
          </div>
        </div>
      </div>

    </div>
  </motion.section>

  {/* ===== GALLERY ===== */}
  <motion.section id="gallery" className="section-pad bg-dark" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <div className="section-header reveal">
        <span className="section-label">Visual Journey</span>
        <h2>Frames of <em>Andaman</em></h2>
      </div>

      <div className="gallery-grids">
        <div className="gallery-grid gallery-grid-static">
          <div className="gallery-item" style={{"backgroundImage":"url('/Andaman/baratang.jpg')"}}>
            <div className="gallery-overlay"><span>Port Blair Marina</span></div>
          </div>
          <div className="gallery-item" style={{"backgroundImage":"url('/Andaman/villa.jpg')"}}>
            <div className="gallery-overlay"><span>Cellular Jail Light</span></div>
          </div>
          <div className="gallery-item" style={{"backgroundImage":"url('/Andaman/beach.avif')"}}>
            <div className="gallery-overlay"><span>Radhanagar Beach</span></div>
          </div>
          <div className="gallery-item" style={{"backgroundImage":"url('/Andaman/cove.jpg')"}}>
            <div className="gallery-overlay"><span>Corbyn's Cove</span></div>
          </div>
          <div className="gallery-item" style={{"backgroundImage":"url('/Andaman/ross.jpg')"}}>
            <div className="gallery-overlay"><span>Ross Island Ruins</span></div>
          </div>
          <div className="gallery-item" style={{"backgroundImage":"url('/Andaman/baratang.jpg')"}}>
            <div className="gallery-overlay"><span>Baratang Forest</span></div>
          </div>
          <div className="gallery-item" style={{"backgroundImage":"url('/Andaman/eve.jpg')"}}>
            <div className="gallery-overlay"><span>Island Cruise</span></div>
          </div>
          <div className="gallery-item" style={{"backgroundImage":"url('/Andaman/reef.jpg')"}}>
            <div className="gallery-overlay"><span>Luxury Arrival</span></div>
          </div>
        </div>

      </div>

      {/* Lightbox */}
      <div id="lightbox" className="lightbox">
        <button className="lb-close" onClick={() => window.closeLightbox && window.closeLightbox()}>×</button>
        <button className="lb-prev" onClick={() => window.lbPrev && window.lbPrev()}>←</button>
        <button className="lb-next" onClick={() => window.lbNext && window.lbNext()}>→</button>
        <div className="lb-img-wrap"><img id="lbImg" src="" alt="Lightbox gallery image for Andaman" /></div>
        <p id="lbCaption" className="lb-caption"></p>
      </div>
    </div>
  </motion.section>

  {/* ===== ITINERARY ===== */}
  <motion.section id="itinerary" className="section-pad" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <div className="section-header reveal">
        <span className="section-label">Day by Day</span>
        <h2>Your <em>Journey</em> Unfolds</h2>
      </div>

      <div className="itinerary-nav-wrap">
        <div className="itinerary-switch-inner" role="tablist" aria-label="Itinerary duration">
          <button className="itinerary-tab active" type="button" data-days="3" aria-selected="true" onClick={() => window.selectItineraryDays && window.selectItineraryDays(3)}>3 Days</button>
          <button className="itinerary-tab" type="button" data-days="4" aria-selected="false" onClick={() => window.selectItineraryDays && window.selectItineraryDays(4)}>4 Days</button>
          <button className="itinerary-tab" type="button" data-days="5" aria-selected="false" onClick={() => window.selectItineraryDays && window.selectItineraryDays(5)}>5 Days</button>
          <button className="itinerary-tab" type="button" data-days="6" aria-selected="false" onClick={() => window.selectItineraryDays && window.selectItineraryDays(6)}>6 Days</button>
          <div className="itinerary-slider" id="itinerarySlider"></div>
        </div>
      </div>

      <div className="itinerary-grids">
        <div className="itinerary-list active" data-days="3">
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>1</strong></div>
            <div className="itin-card open" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header"><div className="itin-title">Arrival in Port Blair</div><div className="itin-icon">+</div></div>
              <div className="itin-body"><p>Check in to your premium hotel, unwind with a curated welcome, and head out for the Cellular Jail sound-and-light experience after sunset.</p><div className="itin-tags"><span>Port Blair</span><span>Heritage</span><span>Evening Show</span></div></div>
            </div>
          </div>
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>2</strong></div>
            <div className="itin-card" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header"><div className="itin-title">Corbyn's Cove and Harbor Views</div><div className="itin-icon">+</div></div>
              <div className="itin-body"><p>Enjoy a slow beach morning, private lunch, and an elevated harbor cruise with photo stops and local tasting moments.</p><div className="itin-tags"><span>Beach</span><span>Cruise</span><span>Dining</span></div></div>
            </div>
          </div>
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>3</strong></div>
            <div className="itin-card" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header"><div className="itin-title">Departure with Island Farewell</div><div className="itin-icon">+</div></div>
              <div className="itin-body"><p>After breakfast, enjoy a final boutique shopping stop before your airport transfer. The compact route is ideal for travelers with limited time.</p><div className="itin-tags"><span>Transfer</span><span>Airport</span><span>Relaxed</span></div></div>
            </div>
          </div>
        </div>
        <div className="itinerary-list" data-days="4">
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>1</strong></div>
            <div className="itin-card open" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header"><div className="itin-title">Arrival in Port Blair</div><div className="itin-icon">+</div></div>
              <div className="itin-body"><p>Settle into your resort and visit Cellular Jail for an elegant historical introduction to the islands.</p><div className="itin-tags"><span>History</span><span>Resort</span><span>Sunset</span></div></div>
            </div>
          </div>
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>2</strong></div>
            <div className="itin-card" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header"><div className="itin-title">Havelock Island by Ferry</div><div className="itin-icon">+</div></div>
              <div className="itin-body"><p>Transfer to Havelock, check in to a beachfront stay, and spend the evening at a private stretch of sand.</p><div className="itin-tags"><span>Ferry</span><span>Havelock</span><span>Beachfront</span></div></div>
            </div>
          </div>
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>3</strong></div>
            <div className="itin-card" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header"><div className="itin-title">Radhanagar Beach</div><div className="itin-icon">+</div></div>
              <div className="itin-body"><p>Spend the day between swim, spa, and sunset. Radhanagar is the signature beach moment of the Andaman journey.</p><div className="itin-tags"><span>Radhanagar</span><span>Spa</span><span>Sunset</span></div></div>
            </div>
          </div>
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>4</strong></div>
            <div className="itin-card" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header"><div className="itin-title">Neil Island Excursion</div><div className="itin-icon">+</div></div>
              <div className="itin-body"><p>Explore Neil's blue lagoons and quiet viewpoints before returning to Port Blair with a private transfer.</p><div className="itin-tags"><span>Neil Island</span><span>Lagoon</span><span>Transfer</span></div></div>
            </div>
          </div>
        </div>
        <div className="itinerary-list" data-days="5">
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>1</strong></div>
            <div className="itin-card open" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header"><div className="itin-title">Port Blair Welcome</div><div className="itin-icon">+</div></div>
              <div className="itin-body"><p>Arrive, refresh, and take in the city from a heritage viewpoint before a chef-led dinner tasting.</p><div className="itin-tags"><span>Arrival</span><span>Dining</span><span>Viewpoint</span></div></div>
            </div>
          </div>
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>2</strong></div>
            <div className="itin-card" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header"><div className="itin-title">Ross Island and North Bay</div><div className="itin-icon">+</div></div>
              <div className="itin-body"><p>Step into the colonial past at Ross Island, then continue to North Bay for reef-view activities and cruising.</p><div className="itin-tags"><span>Ross Island</span><span>North Bay</span><span>Reef</span></div></div>
            </div>
          </div>
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>3</strong></div>
            <div className="itin-card" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header"><div className="itin-title">Chidiya Tapu Sunset</div><div className="itin-icon">+</div></div>
              <div className="itin-body"><p>Finish the day with a forest-framed sunset, birdlife, and a quiet coastal dinner.</p><div className="itin-tags"><span>Birding</span><span>Sunset</span><span>Forest</span></div></div>
            </div>
          </div>
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>4</strong></div>
            <div className="itin-card" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header"><div className="itin-title">Leisure and Local Tastes</div><div className="itin-icon">+</div></div>
              <div className="itin-body"><p>A relaxed day for shopping, photography, and a final curated lunch before departure.</p><div className="itin-tags"><span>Leisure</span><span>Shopping</span><span>Lunch</span></div></div>
            </div>
          </div>
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>5</strong></div>
            <div className="itin-card" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header"><div className="itin-title">Departure</div><div className="itin-icon">+</div></div>
              <div className="itin-body"><p>Transfer to the airport with a polished farewell and time to plan the next island escape.</p><div className="itin-tags"><span>Farewell</span><span>Airport</span><span>Luxury</span></div></div>
            </div>
          </div>
        </div>
        <div className="itinerary-list" data-days="6">
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>1</strong></div>
            <div className="itin-card open" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header"><div className="itin-title">Arrive and Unwind</div><div className="itin-icon">+</div></div>
              <div className="itin-body"><p>Arrive in Port Blair, settle into your suite, and enjoy a curated welcome dinner with local seafood highlights.</p><div className="itin-tags"><span>Suite</span><span>Dinner</span><span>Port Blair</span></div></div>
            </div>
          </div>
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>2</strong></div>
            <div className="itin-card" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header"><div className="itin-title">Havelock and Radhanagar</div><div className="itin-icon">+</div></div>
              <div className="itin-body"><p>Travel to Havelock, spend the afternoon at Radhanagar Beach, and finish with a golden-hour oceanfront dinner.</p><div className="itin-tags"><span>Havelock</span><span>Beach</span><span>Dinner</span></div></div>
            </div>
          </div>
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>3</strong></div>
            <div className="itin-card" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header"><div className="itin-title">Neil Island Lagoon Day</div><div className="itin-icon">+</div></div>
              <div className="itin-body"><p>Spend the day moving between lagoons, beaches, and private resort experiences with smooth ferry transfers.</p><div className="itin-tags"><span>Neil</span><span>Lagoon</span><span>Resort</span></div></div>
            </div>
          </div>
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>4</strong></div>
            <div className="itin-card" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header"><div className="itin-title">Baratang Expedition</div><div className="itin-icon">+</div></div>
              <div className="itin-body"><p>Explore Baratang's dense island landscapes, mangrove channels, and geological wonders with private logistics.</p><div className="itin-tags"><span>Baratang</span><span>Mangroves</span><span>Nature</span></div></div>
            </div>
          </div>
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>5</strong></div>
            <div className="itin-card" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header"><div className="itin-title">Spare Time for Spa and Shopping</div><div className="itin-icon">+</div></div>
              <div className="itin-body"><p>Take the morning to relax at the resort, then browse curated island boutiques for final gifts and keepsakes.</p><div className="itin-tags"><span>Spa</span><span>Shopping</span><span>Relax</span></div></div>
            </div>
          </div>
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>6</strong></div>
            <div className="itin-card" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header"><div className="itin-title">Departure</div><div className="itin-icon">+</div></div>
              <div className="itin-body"><p>Check out and transfer to the airport after a full luxury circuit of the archipelago.</p><div className="itin-tags"><span>Farewell</span><span>Airport</span><span>Archipelago</span></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.section>

  {/* ===== EXPERIENCE NOTES ===== */}
  <motion.section id="comparison" className="section-pad" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <div className="section-header reveal">
        <span className="section-label">Experience Notes</span>
        <h2>Choose the <em>Right Pace</em></h2>
      </div>

      <div className="experience-grid reveal">
        <article className="experience-card">
          <span className="experience-tag">3 Days</span>
          <h3>Quick luxury reset</h3>
          <p>Best for travelers who want the island tone, heritage stops, and a clean first impression without overpacking the trip.</p>
          <strong>Focus: Port Blair</strong>
        </article>
        <article className="experience-card">
          <span className="experience-tag">4 Days</span>
          <h3>Beach-forward escape</h3>
          <p>This route gives you the easiest balance of resort time, ferry travel, and the classic Havelock arrival experience.</p>
          <strong>Focus: Havelock</strong>
        </article>
        <article className="experience-card featured">
          <span className="experience-tag">5 Days</span>
          <h3>Best balance overall</h3>
          <p>Ideal when you want history, reef, and slow luxury in one polished sequence with enough room to breathe.</p>
          <strong>Focus: Heritage + coast</strong>
        </article>
        <article className="experience-card">
          <span className="experience-tag">6 Days</span>
          <h3>Full archipelago circuit</h3>
          <p>The most immersive option with island hopping, forest edges, and extra time for spa, transfer, and sunset moments.</p>
          <strong>Focus: Havelock, Neil, Baratang</strong>
        </article>
      </div>
    </div>
  </motion.section>

  {/* ===== INCLUSIONS ===== */}
  <motion.section id="inclusions" className="section-pad bg-dark" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <div className="section-header reveal">
        <span className="section-label">What's Included</span>
        <h2>Crafted for <em>Perfection</em></h2>
      </div>
      <div className="inclusions-grid">
        {/* same cards as original */}
        <div className="inclusion-card reveal">
          <div className="inc-icon">ðŸ¨</div>
          <h3>5-Star Stays</h3>
          <p>Handpicked heritage hotels, private estate bungalows, and award-winning resorts</p>
        </div>
        <div className="inclusion-card reveal">
          <div className="inc-icon">🚗</div>
          <h3>Private Transport</h3>
          <p>Luxury AC vehicles with professional chauffeurs available 24/7</p>
        </div>
        <div className="inclusion-card reveal">
          <div className="inc-icon">🎭</div>
          <h3>Guided Experiences</h3>
          <p>Expert local guides curating authentic cultural immersions</p>
        </div>
        <div className="inclusion-card reveal">
          <div className="inc-icon">ðŸ½️</div>
          <h3>Gourmet Meals</h3>
          <p>Daily breakfast, curated local feasts, and romantic dinners included</p>
        </div>
        <div className="inclusion-card reveal">
          <div className="inc-icon">💆</div>
          <h3>Wellness Ritual</h3>
          <p>Traditional wellness treatments at certified centres</p>
        </div>
        <div className="inclusion-card reveal">
          <div className="inc-icon">📸</div>
          <h3>Photo Sessions</h3>
          <p>Professional photography at select locations — memories preserved forever</p>
        </div>
        <div className="inclusion-card reveal">
          <div className="inc-icon">ðŸŽ</div>
          <h3>Welcome Gift</h3>
          <p>Exclusive Aruvi Tours welcome hamper with local artisanal treats</p>
        </div>
        <div className="inclusion-card reveal">
          <div className="inc-icon">📞</div>
          <h3>24/7 Concierge</h3>
          <p>Dedicated trip manager on call throughout your entire journey</p>
        </div>
      </div>
    </div>
  </motion.section>

  {/* ===== PRICING, TESTIMONIALS, CTA, FOOTER (copied with region text updated) ===== */}
  <motion.section id="pricing" className="section-pad bg-dark" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <div className="section-header reveal">
        <span className="section-label">Investment</span>
        <h2>Select Your <em>Escape</em></h2>
      </div>
      <div className="pricing-grid">

        <div className="price-card reveal">
          <div className="price-pkg-label">Package 01</div>
          <h3>Island Dawn</h3>
          <div className="price-duration">2 Nights · 3 Days</div>
          <div className="price-original">₹18,999</div>
          <div className="price-offer">₹14,999<small>/person</small></div>
          <div className="price-save">Save 21%</div>
          <ul className="price-includes">
            <li>✓ 2 Nights luxury stay</li>
            <li>✓ Cellular Jail visit</li>
            <li>✓ All transfers</li>
            <li>✓ Sunset cruise</li>
          </ul>
          <a href="#contact" className="price-btn">Book Now</a>
        </div>

        <div className="price-card reveal">
          <div className="price-pkg-label">Package 02</div>
          <h3>Coral Serenity</h3>
          <div className="price-duration">3 Nights · 4 Days</div>
          <div className="price-original">₹27,999</div>
          <div className="price-offer">₹21,999<small>/person</small></div>
          <div className="price-save">Save 21%</div>
          <ul className="price-includes">
            <li>✓ 3 Nights beachfront stay</li>
            <li>✓ Havelock ferry</li>
            <li>✓ Radhanagar sunset</li>
            <li>✓ Snorkeling session</li>
          </ul>
          <a href="#contact" className="price-btn">Book Now</a>
        </div>

        <div className="price-card best-value-card reveal">
          <div className="best-val-badge">⭐ Best Value</div>
          <div className="price-pkg-label">Package 03</div>
          <h3>Heritage Isles</h3>
          <div className="price-duration">4 Nights · 5 Days</div>
          <div className="price-original">₹38,999</div>
          <div className="price-offer">₹29,999<small>/person</small></div>
          <div className="price-save">Save 23%</div>
          <ul className="price-includes">
            <li>✓ Heritage city stay</li>
            <li>✓ Ross Island &amp; North Bay</li>
            <li>✓ 2 premium experiences</li>
            <li>✓ Full board meals</li>
          </ul>
          <a href="#contact" className="price-btn">Book Now</a>
        </div>

        <div className="price-card reveal">
          <div className="price-pkg-label">Package 04</div>
          <h3>Grand Archipelago</h3>
          <div className="price-duration">5 Nights · 6 Days</div>
          <div className="price-original">₹54,999</div>
          <div className="price-offer">₹41,999<small>/person</small></div>
          <div className="price-save">Save 24%</div>
          <ul className="price-includes">
            <li>✓ Luxury island stays</li>
            <li>✓ Havelock + Neil + Baratang</li>
            <li>✓ 3 premium experiences</li>
            <li>✓ Professional photography</li>
          </ul>
          <a href="#contact" className="price-btn">Book Now</a>
        </div>

      </div>
    </div>
  </motion.section>

  <motion.section id="testimonials" className="section-pad" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <div className="section-header reveal">
        <span className="section-label">Guest Stories</span>
        <h2>Voices of <em>Experience</em></h2>
      </div>

      <div className="testimonial-carousel">
        <div className="testi-track" id="testiTrack">
          <div className="testi-card">
            <div className="testi-stars">★★★★★</div>
            <p>"Island Dawn was the perfect short escape. Port Blair felt polished, calm, and beautifully curated from arrival to departure."</p>
            <div className="testi-author">
              <div className="testi-avatar">SR</div>
              <div><strong>Suresh Raghavan</strong><span>Island Dawn</span></div>
            </div>
          </div>
          <div className="testi-card">
            <div className="testi-stars">★★★★★</div>
            <p>"Coral Serenity gave us the exact beach luxury we wanted. Havelock and Radhanagar were unforgettable, and the transfers were seamless."</p>
            <div className="testi-author">
              <div className="testi-avatar">AP</div>
              <div><strong>Ananya Pillai</strong><span>Coral Serenity</span></div>
            </div>
          </div>
          <div className="testi-card">
            <div className="testi-stars">★★★★★</div>
            <p>"Heritage Isles balanced history and relaxation perfectly. Ross Island, North Bay, and the evening dinner made it feel truly premium."</p>
            <div className="testi-author">
              <div className="testi-avatar">VK</div>
              <div><strong>Vikram Kumar</strong><span>Heritage Isles</span></div>
            </div>
          </div>
          <div className="testi-card">
            <div className="testi-stars">★★★★★</div>
            <p>"Grand Archipelago felt expansive and exclusive. The itinerary was paced beautifully, with spa time, island hopping, and cinematic sunsets."</p>
            <div className="testi-author">
              <div className="testi-avatar">NM</div>
              <div><strong>Nisha Menon</strong><span>Grand Archipelago</span></div>
            </div>
          </div>
        </div>

        <div className="testi-controls">
          <button onClick={() => window.testiPrev && window.testiPrev()} aria-label="Previous">←</button>
          <div className="testi-dots" id="testiDots"></div>
          <button onClick={() => window.testiNext && window.testiNext()} aria-label="Next">→</button>
        </div>
      </div>
    </div>
  </motion.section>

  <motion.section id="finalCta" className="final-cta" style={{"backgroundImage":"url('/Andaman/bg1.avif')"}} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="final-cta-overlay"></div>
    <div className="final-cta-content">
      <span className="cta-pretitle">Aruvi Tours · Andaman</span>
      <h2>"Choose your escape.<br />Experience the <em>extraordinary.</em>"</h2>
      <p>Every journey is shaped around the itinerary, not a package switch.</p>
      <div className="cta-btns">
        <a href="#itinerary" className="cta-btn-gold" onClick={() => window.jumpToItinerary && window.jumpToItinerary(3)}>Book 3 Days</a>
        <a href="#itinerary" className="cta-btn-gold" onClick={() => window.jumpToItinerary && window.jumpToItinerary(4)}>Book 4 Days</a>
        <a href="#itinerary" className="cta-btn-outline" onClick={() => window.jumpToItinerary && window.jumpToItinerary(5)}>Book 5 Days</a>
        <a href="#itinerary" className="cta-btn-outline" onClick={() => window.jumpToItinerary && window.jumpToItinerary(6)}>Book 6 Days</a>
      </div>
    </div>
  </motion.section>
      </div>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
