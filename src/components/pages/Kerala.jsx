import { motion } from 'motion/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import WhatsAppFloat from '../Shared/Whatsappfloat';

export default function Kerala() {

  useEffect(() => {
    document.title = "kerala | Aruvi Tours";
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
      lightboxImg.src = src.startsWith('http') || src.startsWith('/') ? src : `/kerala/${src}`;
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

      <div className="hero-panel" data-pkg="0" style={{"backgroundImage":"url('/kerala/kerala-hero-banner-backwaters.avif')"}}>
        <div className="panel-overlay"></div>
        <div className="panel-content">
          <span className="panel-badge">2 Nights · 3 Days</span>
          <h2>Backwater<br /><em>Bliss</em></h2>
          <p>Alleppey's whispered canals</p>
          <button className="panel-cta" onClick={() => { window.selectItineraryDays && window.selectItineraryDays(3); document.getElementById("itinerary")?.scrollIntoView({ behavior: "smooth" }); }}>Explore</button>
        </div>
        <div className="panel-number">01</div>
      </div>

      <div className="hero-panel" data-pkg="1" style={{"backgroundImage":"url('/kerala/kerala-hero-banner-backwaters.avif')"}}>
        <div className="panel-overlay"></div>
        <div className="panel-content">
          <span className="panel-badge">3 Nights · 4 Days</span>
          <h2>Misty<br /><em>Hills</em></h2>
          <p>Munnar's emerald tea estates</p>
          <button className="panel-cta" onClick={() => { window.selectItineraryDays && window.selectItineraryDays(4); document.getElementById("itinerary")?.scrollIntoView({ behavior: "smooth" }); }}>Explore</button>
        </div>
        <div className="panel-number">02</div>
      </div>

      <div className="hero-panel" data-pkg="2" style={{"backgroundImage":"url('/kerala/kerala-tropical-beach-sunset.avif')"}}>
        <div className="panel-overlay"></div>
        <div className="panel-content">
          <span className="panel-badge">4 Nights · 5 Days</span>
          <h2>Royal<br /><em>Kerala</em></h2>
          <p>Forts, spices &amp; coastal legends</p>
          <button className="panel-cta" onClick={() => { window.selectItineraryDays && window.selectItineraryDays(5); document.getElementById("itinerary")?.scrollIntoView({ behavior: "smooth" }); }}>Explore</button>
        </div>
        <div className="panel-number">03</div>
      </div>

      <div className="hero-panel" data-pkg="3" style={{"backgroundImage":"url('/kerala/kerala-houseboat-kerala-backwaters.avif')"}}>
        <div className="panel-overlay"></div>
        <div className="panel-content">
          <span className="panel-badge">5 Nights · 6 Days</span>
          <h2>Grand<br /><em>Kerala</em></h2>
          <p>The ultimate God's Own Country</p>
          <button className="panel-cta" onClick={() => { window.selectItineraryDays && window.selectItineraryDays(6); document.getElementById("itinerary")?.scrollIntoView({ behavior: "smooth" }); }}>Explore</button>
        </div>
        <div className="panel-number">04</div>
      </div>

    </div>

    <div className="hero-brand">
      <span>Aruvi Tours</span>
      <span className="hero-brand-sep">·</span>
      <span>Kerala Luxury Escapes</span>
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

  {/* ===== PACKAGE DETAILS ===== */}
  <motion.section id="packages" className="section-pad" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">

      {/* Package 0 */}
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
            <img src="/kerala/kerala-hero-banner-backwaters.avif" alt="Backwater Bliss" />
            <div className="img-badge">From ₹14,999<small>/person</small></div>
          </div>
        </div>
      </div>

      {/* Package 1 */}
      <div className="pkg-detail">
        <div className="pkg-detail-grid">
          <div className="pkg-detail-text reveal">
            <span className="pkg-label">Package 02</span>
            <h2 className="pkg-title">Misty <em>Hills</em></h2>
            <p className="pkg-desc">Ascend into the clouds where Munnar's rolling tea plantations stretch to the horizon. Walk through spice gardens perfumed with cardamom and pepper, discover thundering waterfalls, and wake to mist-kissed mornings in a private hill-top villa.</p>
            <div className="pkg-meta">
              <div className="meta-item"><span className="meta-icon">ðŸ“</span><span>Kochi · Munnar · Thekkady</span></div>
              <div className="meta-item"><span className="meta-icon">🌙</span><span>3 Nights · 4 Days</span></div>
              <div className="meta-item"><span className="meta-icon">🌿</span><span>Best Time: Sep – May</span></div>
              <div className="meta-item"><span className="meta-icon">⭐</span><span>4.8 / 5 · 189 Reviews</span></div>
            </div>
            <div className="pkg-highlights">
              <div className="highlight-chip">ðŸƒ Tea Estate Walk</div>
              <div className="highlight-chip">ðŸ˜ Wildlife Safari</div>
              <div className="highlight-chip">🌊 Athirappilly Falls</div>
              <div className="highlight-chip">🌶 Spice Plantation</div>
            </div>
          </div>
          <div className="pkg-detail-image reveal">
            <img src="/kerala/kerala-hero-banner-backwaters.avif" alt="Misty Hills" />
            <div className="img-badge">From ₹21,999<small>/person</small></div>
          </div>
        </div>
      </div>

      {/* Package 2 */}
      <div className="pkg-detail">
        <div className="pkg-detail-grid">
          <div className="pkg-detail-text reveal">
            <span className="pkg-label">Package 03</span>
            <h2 className="pkg-title">Royal <em>Kerala</em></h2>
            <p className="pkg-desc">Trace the legacy of Kerala's ancient kingdoms — from the colonial spice ports of Fort Kochi to the ivory-tipped palaces of Thrissur. A journey that weaves culture, cuisine, and coastal wonder into one unforgettable tapestry.</p>
            <div className="pkg-meta">
              <div className="meta-item"><span className="meta-icon">ðŸ“</span><span>Kochi · Thrissur · Alleppey · Varkala</span></div>
              <div className="meta-item"><span className="meta-icon">🌙</span><span>4 Nights · 5 Days</span></div>
              <div className="meta-item"><span className="meta-icon">🌿</span><span>Best Time: Nov – Feb</span></div>
              <div className="meta-item"><span className="meta-icon">⭐</span><span>4.9 / 5 · 217 Reviews</span></div>
            </div>
            <div className="pkg-highlights">
              <div className="highlight-chip">ðŸ¯ Fort Kochi Heritage</div>
              <div className="highlight-chip">🌺 Padmanabha Temple</div>
              <div className="highlight-chip">🛶 Backwater Cruise</div>
              <div className="highlight-chip">ðŸ› Royal Kerala Feast</div>
            </div>
          </div>
          <div className="pkg-detail-image reveal">
            <img src="/kerala/kerala-tropical-beach-sunset.avif" alt="Royal Kerala" />
            <div className="img-badge">From ₹29,999<small>/person</small></div>
          </div>
        </div>
      </div>

      {/* Package 3 */}
      <div className="pkg-detail">
        <div className="pkg-detail-grid">
          <div className="pkg-detail-text reveal">
            <span className="pkg-label">Package 04</span>
            <h2 className="pkg-title">Grand <em>Kerala</em></h2>
            <p className="pkg-desc">The most immersive way to experience God's Own Country. From the cool mist of Wayanad's forests to the silent lap of Kumarakom's bird sanctuary, from Bekal's ancient fort to the golden sands of Marari — this is Kerala, unabridged.</p>
            <div className="pkg-meta">
              <div className="meta-item"><span className="meta-icon">ðŸ“</span><span>Kochi · Munnar · Wayanad · Alleppey · Kovalam</span></div>
              <div className="meta-item"><span className="meta-icon">🌙</span><span>5 Nights · 6 Days</span></div>
              <div className="meta-item"><span className="meta-icon">🌿</span><span>Best Time: Oct – Feb</span></div>
              <div className="meta-item"><span className="meta-icon">⭐</span><span>5.0 / 5 · 94 Reviews</span></div>
            </div>
            <div className="pkg-highlights">
              <div className="highlight-chip">🌲 Wayanad Forest</div>
              <div className="highlight-chip">🦜 Bird Sanctuary</div>
              <div className="highlight-chip">ðŸ¯ Bekal Fort</div>
              <div className="highlight-chip">💆 Ayurveda Retreat</div>
            </div>
          </div>
          <div className="pkg-detail-image reveal">
            <img src="/kerala/kerala-houseboat-kerala-backwaters.avif" alt="Grand Kerala" />
            <div className="img-badge">From ₹41,999<small>/person</small></div>
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
        <h2>Frames of <em>Kerala</em></h2>
      </div>

      <div className="gallery-grids">

        <div className="gallery-grid active">
          <div className="gallery-item" style={{"backgroundImage":"url('/kerala/kerala-alleppey-backwaters-houseboat.jpg')"}}>
            <div className="gallery-overlay"><span>Alleppey Backwaters</span></div>
          </div>
          <div className="gallery-item" style={{"backgroundImage":"url('/kerala/kerala-hero-banner-backwaters.avif')"}}>
            <div className="gallery-overlay"><span>Houseboat Serenity</span></div>
          </div>
          <div className="gallery-item" style={{"backgroundImage":"url('/kerala/kerala-kovalam-beach-resort.jpg')"}}>
            <div className="gallery-overlay"><span>Kovalam Beach</span></div>
          </div>
          <div className="gallery-item" style={{"backgroundImage":"url('/kerala/kerala-fort-kochi-historical.jpg')"}}>
            <div className="gallery-overlay"><span>Fort Kochi Sunset</span></div>
          </div>
          <div className="gallery-item" style={{"backgroundImage":"url('/kerala/kerala-backwater-canal-scenic.jpg')"}}>
            <div className="gallery-overlay"><span>Canal Village Life</span></div>
          </div>
          <div className="gallery-item" style={{"backgroundImage":"url('/kerala/kerala-backwaters-twilight-serenity.jpg')"}}>
            <div className="gallery-overlay"><span>Twilight Reflections</span></div>
          </div>
        </div>

        <div className="gallery-grid">
          <div className="gallery-item" style={{"backgroundImage":"url('/kerala/kerala-alleppey-backwaters-houseboat.jpg')"}}>
            <div className="gallery-overlay"><span>Munnar Tea Garden</span></div>
          </div>
          <div className="gallery-item" style={{"backgroundImage":"url('/kerala/kerala-hero-banner-backwaters.avif')"}}>
            <div className="gallery-overlay"><span>Morning Mist</span></div>
          </div>
          <div className="gallery-item" style={{"backgroundImage":"url('/kerala/kerala-backwaters-twilight-serenity.jpg')"}}>
            <div className="gallery-overlay"><span>Athirappilly Falls</span></div>
          </div>
          <div className="gallery-item" style={{"backgroundImage":"url('/kerala/kerala-tropical-beach-sunset.avif')"}}>
            <div className="gallery-overlay"><span>Spice Garden Trail</span></div>
          </div>
          <div className="gallery-item" style={{"backgroundImage":"url('/kerala/kerala-fort-kochi-historical.jpg')"}}>
            <div className="gallery-overlay"><span>Elephant Encounter</span></div>
          </div>
          <div className="gallery-item" style={{"backgroundImage":"url('/kerala/kerala-tropical-beach-sunset.avif')"}}>
            <div className="gallery-overlay"><span>Valley of Clouds</span></div>
          </div>
        </div>

        <div className="gallery-grid">
          <div className="gallery-item" style={{"backgroundImage":"url('/kerala/kerala-backwater-canal-scenic.jpg')"}}>
            <div className="gallery-overlay"><span>Fort Kochi</span></div>
          </div>
          <div className="gallery-item" style={{"backgroundImage":"url('/kerala/kerala-fort-kochi-historical.jpg')"}}>
            <div className="gallery-overlay"><span>Chinese Fishing Nets</span></div>
          </div>
          <div className="gallery-item" style={{"backgroundImage":"url('/kerala/kerala-backwater-cruise-tour.jpg')"}}>
            <div className="gallery-overlay"><span>Backwater Cruise</span></div>
          </div>
          <div className="gallery-item" style={{"backgroundImage":"url('/kerala/kerala-kovalam-beach-resort.jpg')"}}>
            <div className="gallery-overlay"><span>Varkala Cliffs</span></div>
          </div>
          <div className="gallery-item" style={{"backgroundImage":"url('/kerala/kerala-fort-kochi-historical.jpg')"}}>
            <div className="gallery-overlay"><span>Heritage Streets</span></div>
          </div>
          <div className="gallery-item" style={{"backgroundImage":"url('/kerala/kerala-houseboat-kerala-backwaters.avif')"}}>
            <div className="gallery-overlay"><span>Kerala Cuisine</span></div>
          </div>
        </div>

        <div className="gallery-grid">
          <div className="gallery-item" style={{"backgroundImage":"url('/kerala/kerala-backwater-cruise-tour.jpg')"}}>
            <div className="gallery-overlay"><span>Wayanad Forest</span></div>
          </div>
          <div className="gallery-item" style={{"backgroundImage":"url('/kerala/kerala-backwaters-twilight-serenity.jpg')"}}>
            <div className="gallery-overlay"><span>Highland Views</span></div>
          </div>
          <div className="gallery-item" style={{"backgroundImage":"url('/kerala/kerala-kovalam-beach-resort.jpg')"}}>
            <div className="gallery-overlay"><span>Bekal Fort</span></div>
          </div>
          <div className="gallery-item" style={{"backgroundImage":"url('/kerala/kerala-backwater-cruise-tour.jpg')"}}>
            <div className="gallery-overlay"><span>Marari Beach</span></div>
          </div>
          <div className="gallery-item" style={{"backgroundImage":"url('/kerala/kerala-alleppey-backwaters-houseboat.jpg')"}}>
            <div className="gallery-overlay"><span>Ayurveda Ritual</span></div>
          </div>
          <div className="gallery-item" style={{"backgroundImage":"url('/kerala/kerala-alleppey-backwaters-houseboat.jpg')"}}>
            <div className="gallery-overlay"><span>Kumarakom Birds</span></div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <div id="lightbox" className="lightbox">
        <button className="lb-close" onClick={() => window.closeLightbox && window.closeLightbox()}>×</button>
        <button className="lb-prev" onClick={() => window.lbPrev && window.lbPrev()}>←</button>
        <button className="lb-next" onClick={() => window.lbNext && window.lbNext()}>→</button>
        <div className="lb-img-wrap"><img id="lbImg" src="" alt="Lightbox gallery image for Kerala" /></div>
        <p id="lbCaption" className="lb-caption"></p>
      </div>
    </div>
  </motion.section>

  {/* ===== ITINERARY NAVIGATION BAR ===== */}
  <div className="itinerary-nav-bar">
    <div className="itinerary-nav-inner">
      <button className="itinerary-day-btn active" data-days="3" onClick={() => window.selectItineraryDays && window.selectItineraryDays(3)}>
        <span>3 Days</span>
      </button>
      <button className="itinerary-day-btn" data-days="4" onClick={() => window.selectItineraryDays && window.selectItineraryDays(4)}>
        <span>4 Days</span>
      </button>
      <button className="itinerary-day-btn" data-days="5" onClick={() => window.selectItineraryDays && window.selectItineraryDays(5)}>
        <span>5 Days</span>
      </button>
      <button className="itinerary-day-btn" data-days="6" onClick={() => window.selectItineraryDays && window.selectItineraryDays(6)}>
        <span>6 Days</span>
      </button>
      <div className="itinerary-indicator" id="itineraryIndicator"></div>
    </div>
  </div>

  {/* ===== ITINERARY ===== */}
  <motion.section id="itinerary" className="section-pad" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <div className="section-header reveal">
        <span className="section-label">Day by Day</span>
        <h2>Your <em>Journey</em> Unfolds</h2>
      </div>

      <div className="itinerary-grids">

        {/* Package 0 Itinerary */}
        <div className="itinerary-list active">
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>01</strong></div>
            <div className="itin-card" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header">
                <div className="itin-title">Arrival in Kochi — City of Spices</div>
                <span className="itin-icon">+</span>
              </div>
              <div className="itin-body">
                <p>Arrive at Cochin International Airport. Our representative welcomes you and transfers you to your heritage boutique hotel in Fort Kochi. Afternoon walk through Jew Town's antique lanes, Chinese Fishing Nets at sunset. Kathakali performance in the evening. Welcome dinner at a riverside restaurant.</p>
                <div className="itin-tags"><span>Hotel Check-in</span><span>City Tour</span><span>Cultural Show</span></div>
              </div>
            </div>
          </div>
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>02</strong></div>
            <div className="itin-card" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header">
                <div className="itin-title">Alleppey — Houseboat Paradise</div>
                <span className="itin-icon">+</span>
              </div>
              <div className="itin-body">
                <p>Morning drive to Alleppey (1.5 hrs). Board your private, premium houseboat by noon. Glide through network of canals watching rural Kerala life unfold. Freshly cooked Kerala lunch onboard. Sunset cruise into open lake. Overnight stay on the houseboat under a canopy of stars.</p>
                <div className="itin-tags"><span>Houseboat</span><span>Canal Cruise</span><span>Kerala Lunch</span></div>
              </div>
            </div>
          </div>
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>03</strong></div>
            <div className="itin-card" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header">
                <div className="itin-title">Kovalam Beach — Farewell to the Sea</div>
                <span className="itin-icon">+</span>
              </div>
              <div className="itin-body">
                <p>Wake to a misty morning on the backwaters. Breakfast onboard, then disembark and drive south to Kovalam (3 hrs). Check in to your beachfront resort. Leisure time on the crescent beach. Optional Ayurvedic massage. Farewell seafood dinner. Transfer to Trivandrum airport.</p>
                <div className="itin-tags"><span>Beach Resort</span><span>Ayurveda</span><span>Departure</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Package 1 Itinerary */}
        <div className="itinerary-list">
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>01</strong></div>
            <div className="itin-card" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header"><div className="itin-title">Kochi — Gateway to Kerala</div><span className="itin-icon">+</span></div>
              <div className="itin-body"><p>Arrival at Kochi. Heritage walk through Fort Kochi, St. Francis Church, and Dutch Palace. Sunset at Cherai Beach. Check in to boutique hotel.</p><div className="itin-tags"><span>City Tour</span><span>Heritage Walk</span></div></div>
            </div>
          </div>
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>02</strong></div>
            <div className="itin-card" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header"><div className="itin-title">Munnar — Into the Clouds</div><span className="itin-icon">+</span></div>
              <div className="itin-body"><p>Drive to Munnar (3.5 hrs) through Athirappilly Waterfalls. Check in to a hill-top estate resort. Evening nature walk through tea plantations. Stargazing dinner on the deck.</p><div className="itin-tags"><span>Waterfalls</span><span>Tea Estate</span><span>Hill Resort</span></div></div>
            </div>
          </div>
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>03</strong></div>
            <div className="itin-card" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header"><div className="itin-title">Thekkady — Wildlife &amp; Spices</div><span className="itin-icon">+</span></div>
              <div className="itin-body"><p>Morning sunrise trek in Munnar. Drive to Thekkady. Periyar Wildlife Sanctuary boat ride. Spice plantation guided tour. Traditional Kerala dinner.</p><div className="itin-tags"><span>Periyar Lake</span><span>Spice Garden</span><span>Wildlife</span></div></div>
            </div>
          </div>
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>04</strong></div>
            <div className="itin-card" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header"><div className="itin-title">Departure via Kochi</div><span className="itin-icon">+</span></div>
              <div className="itin-body"><p>Morning at leisure. Drive back to Kochi. Optional last-minute shopping at Lulu Mall or Broadway Market. Departure from Cochin International Airport.</p><div className="itin-tags"><span>Shopping</span><span>Departure</span></div></div>
            </div>
          </div>
        </div>

        {/* Package 2 Itinerary */}
        <div className="itinerary-list">
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>01</strong></div>
            <div className="itin-card" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header"><div className="itin-title">Kochi — Colonial Grandeur</div><span className="itin-icon">+</span></div>
              <div className="itin-body"><p>Arrive Kochi. Heritage tour — Fort Kochi, Mattancherry Palace, Paradesi Synagogue. Sunset dinner cruise on the backwaters. Luxury heritage hotel stay.</p><div className="itin-tags"><span>Heritage Tour</span><span>Dinner Cruise</span></div></div>
            </div>
          </div>
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>02</strong></div>
            <div className="itin-card" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header"><div className="itin-title">Thrissur — The Cultural Capital</div><span className="itin-icon">+</span></div>
              <div className="itin-body"><p>Drive north to Thrissur. Visit Vadakkunnathan Temple, Kerala Kalamandalam art academy. Attend traditional Chenda performance. Local Sadhya feast experience.</p><div className="itin-tags"><span>Temple</span><span>Classical Arts</span><span>Sadhya</span></div></div>
            </div>
          </div>
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>03</strong></div>
            <div className="itin-card" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header"><div className="itin-title">Alleppey — Royal Waters</div><span className="itin-icon">+</span></div>
              <div className="itin-body"><p>Drive south to Alleppey. Premium houseboat check-in. Canal village visit by shikara. Sunset cocktails on the boat deck. Chef-curated Kerala dinner.</p><div className="itin-tags"><span>Houseboat</span><span>Shikara</span><span>Gourmet Dinner</span></div></div>
            </div>
          </div>
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>04</strong></div>
            <div className="itin-card" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header"><div className="itin-title">Varkala — Cliff &amp; Sea</div><span className="itin-icon">+</span></div>
              <div className="itin-body"><p>Drive to Varkala. Clifftop walk with panoramic sea views. Papanasam Beach. Ayurvedic spa treatment. Sunset yoga session. Cliffside restaurant dinner.</p><div className="itin-tags"><span>Cliff Walk</span><span>Ayurveda</span><span>Yoga</span></div></div>
            </div>
          </div>
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>05</strong></div>
            <div className="itin-card" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header"><div className="itin-title">Departure — A Royal Farewell</div><span className="itin-icon">+</span></div>
              <div className="itin-body"><p>Morning at leisure on the beach. Drive to Trivandrum airport. Farewell gift of handcrafted Kerala spice collection by Aruvi Tours.</p><div className="itin-tags"><span>Leisure</span><span>Departure Gift</span></div></div>
            </div>
          </div>
        </div>

        {/* Package 3 Itinerary */}
        <div className="itinerary-list">
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>01</strong></div>
            <div className="itin-card" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header"><div className="itin-title">Kochi — First Impressions</div><span className="itin-icon">+</span></div>
              <div className="itin-body"><p>Arrive Kochi. Fort Kochi immersion tour. Welcome Ayurvedic foot massage. Heritage hotel. Sunset on the harbour with cocktails.</p><div className="itin-tags"><span>Heritage</span><span>Ayurveda</span></div></div>
            </div>
          </div>
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>02</strong></div>
            <div className="itin-card" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header"><div className="itin-title">Munnar — Peak of Serenity</div><span className="itin-icon">+</span></div>
              <div className="itin-body"><p>Drive to Munnar via Athirappilly. Eravikulam National Park. Sunset in the tea gardens. Private bungalow stay inside estate.</p><div className="itin-tags"><span>National Park</span><span>Tea Estate Bungalow</span></div></div>
            </div>
          </div>
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>03</strong></div>
            <div className="itin-card" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header"><div className="itin-title">Wayanad — Wild at Heart</div><span className="itin-icon">+</span></div>
              <div className="itin-body"><p>Drive to Wayanad. Edakkal Caves exploration. Banasura Hill trek. Periyar tiger reserve border. Treehouse stay in jungle resort.</p><div className="itin-tags"><span>Caves</span><span>Trekking</span><span>Treehouse</span></div></div>
            </div>
          </div>
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>04</strong></div>
            <div className="itin-card" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header"><div className="itin-title">Alleppey — Floating Luxury</div><span className="itin-icon">+</span></div>
              <div className="itin-body"><p>Drive to Alleppey. Board premium 2-bedroom luxury houseboat. Private chef. Sunset champagne on deck. Overnight canal stay.</p><div className="itin-tags"><span>Luxury Houseboat</span><span>Private Chef</span></div></div>
            </div>
          </div>
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>05</strong></div>
            <div className="itin-card" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header"><div className="itin-title">Kovalam — Ocean's Edge</div><span className="itin-icon">+</span></div>
              <div className="itin-body"><p>Disembark and drive to Kovalam. Beach luxury resort. Full Ayurvedic treatment package. Candlelight seafood dinner on the beach.</p><div className="itin-tags"><span>Beach Resort</span><span>Ayurveda Spa</span><span>Candlelight Dinner</span></div></div>
            </div>
          </div>
          <div className="itin-item">
            <div className="itin-day"><span>Day</span><strong>06</strong></div>
            <div className="itin-card" onClick={(e) => window.toggleItinerary && window.toggleItinerary(e.currentTarget)}>
              <div className="itin-header"><div className="itin-title">Farewell — Until Kerala Calls Again</div><span className="itin-icon">+</span></div>
              <div className="itin-body"><p>Morning yoga session on the beach. Checkout and transfer to Trivandrum airport. Exclusive Aruvi Tours farewell gift hamper with premium Kerala spices and hand-crafted mementos.</p><div className="itin-tags"><span>Beach Yoga</span><span>Departure Hamper</span></div></div>
            </div>
          </div>
        </div>

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
          <p>Daily breakfast, curated Kerala feasts, and romantic dinners included</p>
        </div>
        <div className="inclusion-card reveal">
          <div className="inc-icon">💆</div>
          <h3>Ayurveda Ritual</h3>
          <p>Traditional Ayurvedic massage session at a certified wellness centre</p>
        </div>
        <div className="inclusion-card reveal">
          <div className="inc-icon">📸</div>
          <h3>Photo Sessions</h3>
          <p>Professional photography at select locations — memories preserved forever</p>
        </div>
        <div className="inclusion-card reveal">
          <div className="inc-icon">ðŸŽ</div>
          <h3>Welcome Gift</h3>
          <p>Exclusive Aruvi Tours welcome hamper with Kerala spices and local artisanal treats</p>
        </div>
        <div className="inclusion-card reveal">
          <div className="inc-icon">📞</div>
          <h3>24/7 Concierge</h3>
          <p>Dedicated trip manager on call throughout your entire Kerala journey</p>
        </div>
      </div>
    </div>
  </motion.section>

  {/* ===== WHY CHOOSE ARUVI TOURS ===== */}
  <motion.section id="comparison" className="section-pad" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <div className="section-header reveal">
        <span className="section-label">Our Promise</span>
        <h2>Why Choose <em>Aruvi Tours</em></h2>
      </div>
      <div className="why-choose-grid">
        <div className="why-card reveal">
          <div className="why-icon">✈️</div>
          <h3>Expert Curation</h3>
          <p>Every itinerary is meticulously crafted by our Kerala specialists with 15+ years of experience in luxury travel.</p>
        </div>
        <div className="why-card reveal">
          <div className="why-icon">ðŸ¤</div>
          <h3>Personalized Service</h3>
          <p>Dedicated trip managers available 24/7 to customize your journey and handle every detail seamlessly.</p>
        </div>
        <div className="why-card reveal">
          <div className="why-icon">⭐</div>
          <h3>Handpicked Stays</h3>
          <p>Only luxury 5-star hotels, heritage boutiques, and award-winning resorts that meet our premium standards.</p>
        </div>
        <div className="why-card reveal">
          <div className="why-icon">🛶</div>
          <h3>Authentic Experiences</h3>
          <p>Private houseboats, exclusive cultural immersions, and local expert guides for genuine Kerala connection.</p>
        </div>
        <div className="why-card reveal">
          <div className="why-icon">💎</div>
          <h3>All-Inclusive Packages</h3>
          <p>Meals, transport, activities, and Ayurveda sessions included—no hidden costs, complete transparency.</p>
        </div>
        <div className="why-card reveal">
          <div className="why-icon">📸</div>
          <h3>Professional Photography</h3>
          <p>Stunning couple/family portraits at scenic locations preserved in high resolution for your memories.</p>
        </div>
        <div className="why-card reveal">
          <div className="why-icon">🌿</div>
          <h3>Sustainable Tourism</h3>
          <p>Committed to responsible travel practices that respect Kerala's nature and support local communities.</p>
        </div>
        <div className="why-card reveal">
          <div className="why-icon">ðŸ†</div>
          <h3>Award-Winning Quality</h3>
          <p>Trusted by 2000+ travelers • 4.9/5 average rating • Featured in luxury travel publications worldwide.</p>
        </div>
      </div>
    </div>
  </motion.section>

  {/* ===== PRICING ===== */}
  <motion.section id="pricing" className="section-pad bg-dark" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="container">
      <div className="section-header reveal">
        <span className="section-label">Investment</span>
        <h2>Select Your <em>Escape</em></h2>
      </div>
      <div className="pricing-grid">

        <div className="price-card reveal">
          <div className="price-pkg-label">Package 01</div>
          <h3>Backwater Bliss</h3>
          <div className="price-duration">2 Nights · 3 Days</div>
          <div className="price-original">₹18,999</div>
          <div className="price-offer">₹14,999<small>/person</small></div>
          <div className="price-save">Save 21%</div>
          <ul className="price-includes">
            <li>✓ 2 Nights accommodation</li>
            <li>✓ 1 Night houseboat</li>
            <li>✓ All transfers</li>
            <li>✓ 1 Ayurveda session</li>
          </ul>
          <a href="#contact" className="price-btn">Book Now</a>
        </div>

        <div className="price-card reveal">
          <div className="price-pkg-label">Package 02</div>
          <h3>Misty Hills</h3>
          <div className="price-duration">3 Nights · 4 Days</div>
          <div className="price-original">₹27,999</div>
          <div className="price-offer">₹21,999<small>/person</small></div>
          <div className="price-save">Save 21%</div>
          <ul className="price-includes">
            <li>✓ 3 Nights accommodation</li>
            <li>✓ Tea estate bungalow</li>
            <li>✓ Wildlife safari</li>
            <li>✓ Spice garden tour</li>
          </ul>
          <a href="#contact" className="price-btn">Book Now</a>
        </div>

        <div className="price-card best-value-card reveal">
          <div className="best-val-badge">⭐ Best Value</div>
          <div className="price-pkg-label">Package 03</div>
          <h3>Royal Kerala</h3>
          <div className="price-duration">4 Nights · 5 Days</div>
          <div className="price-original">₹38,999</div>
          <div className="price-offer">₹29,999<small>/person</small></div>
          <div className="price-save">Save 23%</div>
          <ul className="price-includes">
            <li>✓ 5-Star hotels</li>
            <li>✓ Houseboat stay</li>
            <li>✓ 2 Ayurveda sessions</li>
            <li>✓ Full board meals</li>
          </ul>
          <a href="#contact" className="price-btn">Book Now</a>
        </div>

        <div className="price-card reveal">
          <div className="price-pkg-label">Package 04</div>
          <h3>Grand Kerala</h3>
          <div className="price-duration">5 Nights · 6 Days</div>
          <div className="price-original">₹54,999</div>
          <div className="price-offer">₹41,999<small>/person</small></div>
          <div className="price-save">Save 24%</div>
          <ul className="price-includes">
            <li>✓ Luxury 5-Star stays</li>
            <li>✓ 2 Nights houseboat</li>
            <li>✓ 3 Ayurveda sessions</li>
            <li>✓ Professional photography</li>
          </ul>
          <a href="#contact" className="price-btn">Book Now</a>
        </div>

      </div>
    </div>
  </motion.section>

  {/* ===== TESTIMONIALS ===== */}
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
            <p>"Aruvi Tours created the most magical 3 nights in Kerala. The houseboat experience on the Alleppey backwaters was straight out of a dream. Every detail was taken care of. Worth every rupee."</p>
            <div className="testi-author">
              <div className="testi-avatar">SR</div>
              <div><strong>Suresh Raghavan</strong><span>Chennai · Backwater Bliss</span></div>
            </div>
          </div>

          <div className="testi-card">
            <div className="testi-stars">★★★★★</div>
            <p>"Munnar in the monsoon is surreal — and Aruvi Tours picked the perfect route. The tea estate bungalow stay was extraordinary. Waking up to fog rolling through the hills is something I'll never forget."</p>
            <div className="testi-author">
              <div className="testi-avatar">PK</div>
              <div><strong>Priya Krishnamurthy</strong><span>Bangalore · Misty Hills</span></div>
            </div>
          </div>

          <div className="testi-card">
            <div className="testi-stars">★★★★★</div>
            <p>"We booked Royal Kerala for our anniversary. From the candlelight Varkala dinner to the Fort Kochi heritage walk, everything was curated with such warmth. Aruvi Tours truly understands luxury."</p>
            <div className="testi-author">
              <div className="testi-avatar">AM</div>
              <div><strong>Arjun &amp; Meera</strong><span>Mumbai · Royal Kerala</span></div>
            </div>
          </div>

          <div className="testi-card">
            <div className="testi-stars">★★★★★</div>
            <p>"Grand Kerala was absolutely worth it. 6 days of pure bliss — Wayanad treehouse, luxury houseboat, Kovalam beach Ayurveda... our trip manager was incredible. We're already planning our return."</p>
            <div className="testi-author">
              <div className="testi-avatar">RD</div>
              <div><strong>Rohan Das</strong><span>Hyderabad · Grand Kerala</span></div>
            </div>
          </div>

          <div className="testi-card">
            <div className="testi-stars">★★★★★</div>
            <p>"The photography sessions included in our package were an unexpected gem. We have stunning couple shots at the Athirappilly falls. Aruvi Tours goes far beyond just a travel agency."</p>
            <div className="testi-author">
              <div className="testi-avatar">NK</div>
              <div><strong>Neha &amp; Karthik</strong><span>Delhi · Misty Hills</span></div>
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

  {/* ===== FINAL CTA ===== */}
  <motion.section id="finalCta" className="final-cta" style={{"backgroundImage":"url('https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1600&amp"}} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="final-cta-overlay"></div>
    <div className="final-cta-content">
      <span className="cta-pretitle">Aruvi Tours · Kerala</span>
      <h2>"Choose your escape.<br />Experience the <em>extraordinary.</em>"</h2>
      <p>Every package is a love letter to God's Own Country.</p>
      <div className="cta-btns">
        <a href="#contact" className="cta-btn-gold" onClick={() => window.selectItineraryDays && window.selectItineraryDays(3)}>Book 2N/3D</a>
        <a href="#contact" className="cta-btn-gold" onClick={() => window.selectItineraryDays && window.selectItineraryDays(4)}>Book 3N/4D</a>
        <a href="#contact" className="cta-btn-outline" onClick={() => window.selectItineraryDays && window.selectItineraryDays(5)}>Book 4N/5D</a>
        <a href="#contact" className="cta-btn-outline" onClick={() => window.selectItineraryDays && window.selectItineraryDays(6)}>Book 5N/6D</a>
      </div>
    </div>
  </motion.section>

  {/* ===== CONTACT / FOOTER ===== */}
  

  {/* Scroll to top */}
  <button id="scrollTop" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Scroll to top">↑</button>
      </div>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}


