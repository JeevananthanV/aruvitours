import { motion } from 'motion/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import WhatsAppFloat from '../Shared/Whatsappfloat';

export default function Brunei() {

  useEffect(() => {
    document.title = "Brunei | Aruvi Tours";
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
      lightboxImg.src = src.startsWith('http') || src.startsWith('/') ? src : `/Brunei/${src}`;
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
      <img src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1800&amp;q=85" alt="Brunei" className="hero-img" id="heroImg" />
      <div className="hero-overlay"></div>
      <div className="hero-grain"></div>
    </div>

    <div className="hero-content">
      <motion.div className="hero-badge" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <span className="badge-dot"></span>
        Royal Escape Â· Brunei Â· Luxury Experience
      </motion.div>

      <motion.h1 className="hero-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <em>Brunei</em><br />Royal Luxury Escape
      </motion.h1>

      <motion.p className="hero-tagline" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
        Where untouched nature meets royal elegance and serene luxury
      </motion.p>

      <motion.div className="hero-actions" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.4 }}>
        <a href="#packages" className="btn-primary">Explore Packages</a>
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
      <span>30Â°C Â· Tropical Royal Climate</span>
    </div>
  </motion.section>

  {/* â–‘â–‘â–‘ QUICK INFO BAR â–‘â–‘â–‘ */}
 <div className="infobar" id="infobar">
  <div className="infobar-inner">

    <div className="info-item">
      <span className="info-icon">ðŸ—“</span>
      <div>
        <span className="info-label">Packages</span>
        <span className="info-val">2N / 3D Â· 3N / 4D</span>
      </div>
    </div>

    <div className="info-divider"></div>

    <div className="info-item">
      <span className="info-icon">Ã°Å¸â€œÂ</span>
      <div>
        <span className="info-label">Destinations</span>
        <span className="info-val">Bandar Seri Begawan Â· Ulu Temburong</span>
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
        <span className="info-val">4.7 / 5.0</span>
      </div>
    </div>

    <div className="info-divider"></div>

    <div className="info-item">
      <span className="info-icon">ðŸŒ¿</span>
      <div>
        <span className="info-label">Best Time</span>
        <span className="info-val">Jan â€“ May Â· Jul â€“ Sep</span>
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

      <button className="pkg-tab active" data-pkg="2n3d" onClick={() => window.switchPackage && window.switchPackage('2n3d', this)}>
        <span className="pkg-tab-duration">2N / 3D</span>
        <span className="pkg-tab-name">Royal Quick Escape</span>
      </button>

      <button className="pkg-tab" data-pkg="3n4d" onClick={() => window.switchPackage && window.switchPackage('3n4d', this)}>
        <span className="pkg-tab-duration">3N / 4D</span>
        <span className="pkg-tab-name">Brunei Classic Journey</span>
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
        <h2>Royal Heritage &amp; Untouched<br /><em>Brunei Elegance</em></h2>

        <p>
          Discover the hidden gem of Southeast Asia â€” Brunei, where royal palaces,
          pristine rainforests, and serene Islamic architecture create a truly unique escape.
          Our curated short luxury packages offer a perfect blend of culture, nature, and tranquility.
        </p>

        <p>
          From the majestic mosques of Bandar Seri Begawan to the lush wilderness of Ulu Temburong,
          every moment is designed to immerse you in Bruneiâ€™s peaceful charm and royal lifestyle.
        </p>

        <a href="#itinerary" className="link-arrow">
          Explore the Journey <span>â†’</span>
        </a>
      </motion.div>

      <motion.div className="about-highlights" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>

        <div className="highlight-card">
          <div className="hc-icon">ðŸ•Œ</div>
          <div>
            <strong>Sultan Omar Ali Saifuddien Mosque</strong>
            <p>Iconic golden dome &amp; serene lagoon views</p>
          </div>
        </div>

        <div className="highlight-card">
          <div className="hc-icon">Ã°Å¸ÂÂ°</div>
          <div>
            <strong>Royal Palace Visit</strong>
            <p>Explore Istana Nurul Iman exterior</p>
          </div>
        </div>

        <div className="highlight-card">
          <div className="hc-icon">ðŸŒ¿</div>
          <div>
            <strong>Ulu Temburong National Park</strong>
            <p>Rainforest adventure &amp; canopy walkway</p>
          </div>
        </div>

        <div className="highlight-card">
          <div className="hc-icon">ðŸš¤</div>
          <div>
            <strong>Water Village Tour</strong>
            <p>Kampong Ayer boat ride experience</p>
          </div>
        </div>

        <div className="highlight-card">
          <div className="hc-icon">Ã°Å¸ÂÂ½</div>
          <div>
            <strong>Local Cuisine</strong>
            <p>Taste authentic Malay &amp; Bruneian dishes</p>
          </div>
        </div>

        <div className="highlight-card">
          <div className="hc-icon">ðŸŒ…</div>
          <div>
            <strong>Sunset River Views</strong>
            <p>Relax along Brunei River waterfront</p>
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
    <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Frames of <em>Brunei</em></motion.h2>
  </div>

  <div className="gallery-grid" id="galleryGrid">

    <motion.div className="gallery-item" data-src="https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?w=1200&amp;q=85" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
      <img src="/Brunei/bru-1.jpg" alt="Sultan Omar Ali Saifuddien Mosque" />
      <div className="gallery-caption">Sultan Omar Ali Saifuddien Mosque</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="https://images.unsplash.com/photo-1586500036706-41963de24d8d?w=1200&amp;q=85" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
      <img src="/Brunei/bru-2.jpg" alt="Kampong Ayer Water Village" />
      <div className="gallery-caption">Kampong Ayer Water Village</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&amp;q=85" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
      <img src="/Brunei/bru-3.jpg" alt="Ulu Temburong Rainforest" />
      <div className="gallery-caption">Ulu Temburong Rainforest</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&amp;q=85" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
      <img src="/Brunei/bru-4.jpg" alt="Brunei River Sunset" />
      <div className="gallery-caption">Brunei River Sunset</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1200&amp;q=85" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
      <img src="/Brunei/bru-5.jpg" alt="Brunei Local Cuisine" />
      <div className="gallery-caption">Authentic Bruneian Cuisine</div>
    </motion.div>

    <motion.div className="gallery-item" data-src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&amp;q=85" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
      <img src="/Brunei/bru-6.jpg" alt="Tropical Forest Canopy" />
      <div className="gallery-caption">Canopy Walk Experience</div>
    </motion.div>

  </div>

  {/* Lightbox */}
  <div className="lightbox" id="lightbox">
    <button className="lb-close" id="lbClose">âœ•</button>
    <button className="lb-arrow lb-prev" id="lbPrev">â€¹</button>
    <img src="" alt="Lightbox gallery image for Brunei" className="lb-img" id="lbImg" />
    <button className="lb-arrow lb-next" id="lbNext">â€º</button>
  </div>
</motion.section>

  {/* â–‘â–‘â–‘ ITINERARY â€” 2N/3D â–‘â–‘â–‘ */}
  <motion.section className="itinerary pkg-itinerary active" id="itinerary" data-pkg-section="2n3d" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
  <div className="container">
    <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>2N / 3D Â· Royal Quick Escape</motion.div>
    <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Your <em>Journey</em> Unfolds</motion.h2>

    <motion.div className="pkg-route-pills" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
      <span className="route-pill">âœˆ Arrival</span>
      <span className="route-arrow">â†’</span>
      <span className="route-pill">Ã°Å¸Ââ„¢ Bandar Seri Begawan</span>
      <span className="route-arrow">â†’</span>
      <span className="route-pill">ðŸš¤ Kampong Ayer</span>
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
              <h3>Arrival in Brunei</h3>
              <span className="tl-sub">Airport â†’ Luxury Hotel</span>
            </div>
            <div className="tl-chevron">â–¾</div>
          </div>

          <div className="tl-body">
            <ul>
              <li>ðŸš— Private airport transfer</li>
              <li>Ã°Å¸ÂÂ¨ Check-in at luxury hotel</li>
              <li>ðŸ•Œ Visit Sultan Omar Ali Saifuddien Mosque</li>
              <li>ðŸŒ… Sunset at Brunei River</li>
              <li>Ã°Å¸ÂÂ½ Welcome dinner</li>
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
              <h3>Culture &amp; Water Village</h3>
              <span className="tl-sub">Heritage Â· River Life</span>
            </div>
            <div className="tl-chevron">â–¾</div>
          </div>

          <div className="tl-body">
            <ul>
              <li>Ã°Å¸ÂÂ½ Breakfast at hotel</li>
              <li>Ã°Å¸ÂÂ° Photo stop at Istana Nurul Iman</li>
              <li>ðŸš¤ Boat tour of Kampong Ayer</li>
              <li>Ã°Å¸Ââ€™ Proboscis monkey spotting</li>
              <li>Ã°Å¸ÂÂ½ Dinner with local cuisine</li>
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
              <h3>Departure</h3>
              <span className="tl-sub">Farewell Brunei</span>
            </div>
            <div className="tl-chevron">â–¾</div>
          </div>

          <div className="tl-body">
            <ul>
              <li>â˜• Breakfast at hotel</li>
              <li>Ã°Å¸â€ºÂ Optional local shopping</li>
              <li>ðŸš— Airport transfer</li>
            </ul>
            <div className="tl-note">Meals: Breakfast included</div>
          </div>
        </div>
      </motion.div>

    </div>
  </div>
</motion.section>

  {/* â–‘â–‘â–‘ ITINERARY â€” 3N/4D â–‘â–‘â–‘ */}
 <motion.section className="itinerary pkg-itinerary" id="itinerary-3n4d" data-pkg-section="3n4d" style={{"display":"none"}} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
  <div className="container">
    <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>3N / 4D Â· Brunei Classic Journey</motion.div>
    <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Your <em>Journey</em> Unfolds</motion.h2>

    <motion.div className="pkg-route-pills" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
      <span className="route-pill">âœˆ Arrival</span>
      <span className="route-arrow">â†’</span>
      <span className="route-pill">Ã°Å¸Ââ„¢ Bandar Seri Begawan</span>
      <span className="route-arrow">â†’</span>
      <span className="route-pill">ðŸŒ¿ Ulu Temburong</span>
      <span className="route-arrow">â†’</span>
      <span className="route-pill">ðŸš¤ Kampong Ayer</span>
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
              <h3>Arrival in Brunei</h3>
              <span className="tl-sub">Luxury Welcome</span>
            </div>
            <div className="tl-chevron">â–¾</div>
          </div>

          <div className="tl-body">
            <ul>
              <li>ðŸš— Private airport transfer</li>
              <li>Ã°Å¸ÂÂ¨ Check-in at premium hotel</li>
              <li>ðŸ•Œ Mosque visit &amp; city orientation</li>
              <li>ðŸŒ… River sunset views</li>
              <li>Ã°Å¸ÂÂ½ Dinner</li>
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
              <h3>Ulu Temburong Adventure</h3>
              <span className="tl-sub">Rainforest Â· Canopy Walk</span>
            </div>
            <div className="tl-chevron">â–¾</div>
          </div>

          <div className="tl-body">
            <ul>
              <li>ðŸš¤ Speedboat to rainforest park</li>
              <li>ðŸŒ¿ Jungle trekking experience</li>
              <li>ðŸŒ‰ Canopy walk above rainforest</li>
              <li>ðŸ’§ Natural waterfall relaxation</li>
              <li>Ã°Å¸ÂÂ½ Lunch &amp; return to hotel</li>
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
              <h3>Water Village &amp; Leisure</h3>
              <span className="tl-sub">Culture Â· Relaxation</span>
            </div>
            <div className="tl-chevron">â–¾</div>
          </div>

          <div className="tl-body">
            <ul>
              <li>ðŸš¤ Kampong Ayer boat tour</li>
              <li>Ã°Å¸â€ºÂ Local markets visit</li>
              <li>Ã°Å¸ÂÂ½ Authentic Bruneian cuisine</li>
              <li>ðŸ§˜ Leisure evening</li>
            </ul>
            <div className="tl-note">Meals: Breakfast included</div>
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
              <h3>Departure</h3>
              <span className="tl-sub">Farewell Brunei</span>
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

  {/* â–‘â–‘â–‘ PRICING â–‘â–‘â–‘ */}
 <motion.section className="pricing" id="pricing-2n3d" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
  <div className="container">
    <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>2N/3D Â· Brunei Short Escape</motion.div>
    <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Reserve Your <em>Escape</em></motion.h2>

    <div className="price-cards">

      {/* Solo */}
      <motion.div className="price-card" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
        <div className="pc-label">2N / 3D Â· Solo Traveller</div>
        <div className="pc-old">â‚¹22,999</div>
        <div className="pc-price">â‚¹16,999</div>
        <div className="pc-badge">26% OFF</div>
        <ul className="pc-perks">
          <li>Bandar Seri Begawan luxury stay</li>
          <li>Kampong Ayer boat tour</li>
          <li>City highlights &amp; cultural visit</li>
          <li>All transfers included</li>
        </ul>
        <a href="#contact" className="btn-primary full-btn" onClick={() => window.selectPackage && window.selectPackage('2N/3D Brunei â€“ Solo')}>Reserve 2N/3D Solo</a>
      </motion.div>

      {/* Couple */}
      <motion.div className="price-card featured" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <div className="pc-popular">Most Popular</div>
        <div className="pc-label">2N / 3D Â· Couple</div>
        <div className="pc-old">â‚¹39,999</div>
        <div className="pc-price">â‚¹27,999</div>
        <div className="pc-badge">30% OFF</div>
        <ul className="pc-perks">
          <li>Premium hotel with river view</li>
          <li>Romantic dinner experience</li>
          <li>Kampong Ayer tour</li>
          <li>All transfers &amp; guided tours</li>
        </ul>
        <a href="#contact" className="btn-primary full-btn" onClick={() => window.selectPackage && window.selectPackage('2N/3D Brunei â€“ Couple')}>Reserve 2N/3D Couple</a>
      </motion.div>

      {/* Group */}
      <motion.div className="price-card" initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <div className="pc-label">2N / 3D Â· Group (4+)</div>
        <div className="pc-old">â‚¹79,999</div>
        <div className="pc-price">â‚¹49,999</div>
        <div className="pc-badge">37% OFF</div>
        <ul className="pc-perks">
          <li>Luxury group stay</li>
          <li>City + cultural tours</li>
          <li>Private transport</li>
          <li>Group activity discounts</li>
        </ul>
        <a href="#contact" className="btn-primary full-btn" onClick={() => window.selectPackage && window.selectPackage('2N/3D Brunei â€“ Group')}>Reserve 2N/3D Group</a>
      </motion.div>

    </div>
  </div>
</motion.section>

  {/* â–‘â–‘â–‘ TESTIMONIALS â–‘â–‘â–‘ */}
 <motion.section className="testimonials" id="testimonials" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
  <div className="container">
    <motion.div className="section-label" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Voices of Delight</motion.div>
    <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>Stories That <em>Stay</em></motion.h2>

    <div className="testi-slider">
      <div className="testi-track" id="testiTrack">

        {/* Testimonial 1 */}
        <div className="testi-card">
          <div className="testi-stars">â˜…â˜…â˜…â˜…â˜…</div>
          <p>"Exploring Kampong Ayer felt like stepping into another world. The water village tour and sunset cruise were unforgettable. The 3N/4D package was perfectly planned and very relaxing."</p>
          <div className="testi-author">
            <img src="https://i.pravatar.cc/60?img=47" alt="Ananya S." />
            <div>
              <strong>Ananya Sharma</strong>
              <span>Mumbai Â· 3N/4D Classic Journey</span>
            </div>
          </div>
        </div>

        {/* Testimonial 2 */}
        <div className="testi-card">
          <div className="testi-stars">â˜…â˜…â˜…â˜…â˜…</div>
          <p>"The Ulu Temburong rainforest was the highlight of our trip. Walking through the canopy bridge and seeing untouched nature was surreal. Everything was smooth and luxurious."</p>
          <div className="testi-author">
            <img src="https://i.pravatar.cc/60?img=32" alt="Rohit &amp; Priya" />
            <div>
              <strong>Rohit &amp; Priya Menon</strong>
              <span>Bangalore Â· 3N/4D Couple Package</span>
            </div>
          </div>
        </div>

        {/* Testimonial 3 */}
        <div className="testi-card">
          <div className="testi-stars">â˜…â˜…â˜…â˜…â˜…</div>
          <p>"We chose the 2N/3D short escape and it was perfect for a quick getaway. The city tour and river views were beautiful, and the peaceful vibe of Brunei made it truly refreshing."</p>
          <div className="testi-author">
            <img src="https://i.pravatar.cc/60?img=12" alt="Vikram N." />
            <div>
              <strong>Vikram Nair</strong>
              <span>Delhi Â· 2N/3D Short Escape</span>
            </div>
          </div>
        </div>

        {/* Testimonial 4 */}
        <div className="testi-card">
          <div className="testi-stars">â˜…â˜…â˜…â˜…â˜†</div>
          <p>"Our family trip was amazing. The kids loved the boat rides and nature tours. Everything was well organized and stress-free. A perfect blend of culture and relaxation."</p>
          <div className="testi-author">
            <img src="https://i.pravatar.cc/60?img=25" alt="Kavita R." />
            <div>
              <strong>Kavita &amp; Suresh Rao</strong>
              <span>Hyderabad Â· 3N/4D Family Group</span>
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

      {/* Add-on 1 */}
      <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
        <span>ðŸ“¸</span>
        <strong>Kampong Ayer Photoshoot</strong>
        <p>Professional shoot in the iconic water village</p>
        <em>+â‚¹3,499</em>
      </motion.div>

      {/* Add-on 2 */}
      <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}>
        <span>ðŸš¤</span>
        <strong>Sunset River Cruise</strong>
        <p>Luxury cruise along Brunei River with sunset views</p>
        <em>+â‚¹2,999</em>
      </motion.div>

      {/* Add-on 3 */}
      <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}>
        <span>ðŸŽ‚</span>
        <strong>Romantic Setup</strong>
        <p>Private dÃ©cor, flowers &amp; candlelight dinner</p>
        <em>+â‚¹2,499</em>
      </motion.div>

      {/* Add-on 4 */}
      <motion.div className="addon-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.30000000000000004 }}>
        <span>ðŸŒ¿</span>
        <strong>Rainforest Canopy Walk</strong>
        <p>Ulu Temburong treetop adventure experience</p>
        <em>+â‚¹2,999</em>
      </motion.div>

    </div>
  </div>
</motion.section>
  {/* â–‘â–‘â–‘ FINAL CTA â–‘â–‘â–‘ */}
  <motion.section className="final-cta" id="cta" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
  <div className="fcta-bg">
    <img src="https://images.unsplash.com/photo-1600679472829-3044539ce8d7?w=1800&amp;q=85" alt="Brunei River Sunset" />
    <div className="fcta-overlay"></div>
  </div>

  <motion.div className="fcta-content" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0 }}>
    <div className="section-label light">The Time Is Now</div>

    <h2>Life is Short.<br /><em>Brunei is Calling.</em></h2>

    <p>
      From the serene waters of Kampong Ayer to the untouched beauty of Ulu Temburong rainforest,
      your luxurious Brunei escape begins here.
    </p>

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

