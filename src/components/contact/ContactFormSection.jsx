import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "motion/react";

const DESTINATIONS_INDIA = [
  "Kerala – God's Own Country",
  "Rajasthan – Land of Kings",
  "Himachal Pradesh – Mountain Escape",
  "Goa – Sun, Sand & Sea",
  "Andaman Islands",
  "Varanasi – Spiritual Journey",
  "North East India",
  "Kashmir – Paradise Valley",
];

const DESTINATIONS_INTL = [
  "Southeast Asia (Thailand, Bali, Vietnam)",
  "Europe (France, Switzerland, Italy)",
  "Dubai & UAE",
  "Sri Lanka",
  "Maldives",
  "Singapore & Malaysia",
  "Other / Custom Destination",
];

const INITIAL_FORM = {
  name: "",
  email: "",
  whatsapp: "",
  city: "",
  destination: "",
  message: "",
};

export default function ContactFormSection() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm(INITIAL_FORM);
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="contact-form-section" aria-labelledby="form-heading">
      <div className="container">
        <motion.div
          className="form-grid stagger"
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {/* FORM */}
          <motion.div
            className="form-wrap reveal"
            variants={itemVariants}
          >
            <p className="label">Enquiry Form</p>
            <span className="gold-line"></span>
            <motion.h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.5rem",
                fontWeight: 300,
                color: "var(--charcoal)",
                marginBottom: "2rem",
                lineHeight: 1.3,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Tell us about your <strong style={{ fontWeight: 600 }}>dream trip</strong>
            </motion.h2>

            <form noValidate onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">
                    Full Name <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your full name"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    Email Address <span className="req">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="whatsapp">
                    WhatsApp Number <span className="req">*</span>
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    placeholder="+91 XXXXX XXXXX"
                    required
                    autoComplete="tel"
                    value={form.whatsapp}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="city">Your City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="City you're from"
                    autoComplete="address-level2"
                    value={form.city}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="destination">Interested Travel Destination</label>
                <select id="destination" name="destination" value={form.destination} onChange={handleChange}>
                  <option value="" disabled>
                    Select a destination
                  </option>
                  <optgroup label="India">
                    {DESTINATIONS_INDIA.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </optgroup>
                  <optgroup label="International">
                    {DESTINATIONS_INTL.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message (Optional)</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us more about your travel plans, dates, group size, or any special requests…"
                  value={form.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <motion.button
                type="submit"
                className="btn-submit"
                style={
                  submitted
                    ? { background: "#2d7d46", color: "#fff", borderRadius: "100px" }
                    : undefined
                }
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {submitted ? (
                  "✓ Enquiry Sent!"
                ) : (
                  <>
                    Send Enquiry
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                    </svg>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* SIDE PANEL */}
          <motion.aside
            className="form-side reveal"
            style={{ transitionDelay: "0.15s" }}
            variants={itemVariants}
          >
            <div className="form-side__intro">
              <p className="label">Get In Touch</p>
              <span className="gold-line"></span>
              <h2>
                We'd love to <strong>hear from you.</strong>
              </h2>
              <p>
                Planning a trip can feel overwhelming — but it doesn't have to be. Our travel
                consultants are ready to guide you every step of the way. Reach out and let's
                start crafting your story.
              </p>
              <ul className="contact-list" role="list">
                <li>
                  <div className="contact-list__icon" aria-hidden="true">
                    📞
                  </div>
                  <div className="contact-list__detail">
                    <small>Call us directly</small>
                    <a href="tel:+919494141475">
                      <strong>+91 9494141475</strong>
                    </a>
                  </div>
                </li>
                <li>
                  <div className="contact-list__icon" aria-hidden="true">
                    ✉️
                  </div>
                  <div className="contact-list__detail">
                    <small>Write to us</small>
                    <a href="mailto:aruvitours@gmail.com">
                      <strong>aruvitours@gmail.com</strong>
                    </a>
                  </div>
                </li>
                <li>
                  <div className="contact-list__icon" aria-hidden="true">
                    💬
                  </div>
                  <div className="contact-list__detail">
                    <small>WhatsApp available</small>
                    <a href="https://wa.me/919494141475" target="_blank" rel="noopener noreferrer">
                      <strong>Chat with us on WhatsApp</strong>
                    </a>
                  </div>
                </li>
                <li>
                  <div className="contact-list__icon" aria-hidden="true">
                    🕒
                  </div>
                  <div className="contact-list__detail">
                    <small>Office hours</small>
                    <strong>Mon–Sat, 10:30 AM – 5:00 PM</strong>
                  </div>
                </li>
              </ul>
            </div>

            <div className="form-side__img">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
                alt="Scenic mountain landscape — the spirit of travel"
                loading="lazy"
              />
            </div>
          </motion.aside>
        </motion.div>
      </div>
    </section>
  );
}