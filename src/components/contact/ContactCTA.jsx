import React from "react";
import { motion } from "motion/react";

export default function ContactCTA() {
  return (
    <section className="cta" aria-label="Start planning your trip with Aruvi Tours">
      <div className="cta__bg" role="img" aria-label="Scenic aerial view of travel destination"></div>
      <div className="cta__overlay"></div>

      <div className="container">
        <motion.div
          className="cta__content reveal"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <p className="label cta__label">Your Journey Awaits</p>
          <h2 className="cta__heading">
            Let's Plan Your
            <br />
            Next Journey
          </h2>
          <p className="cta__sub">
            Whether it's a family vacation, a romantic escape, or a group adventure — Aruvi Tours
            is ready to bring your travel dream to life.
          </p>
          <motion.a
            href="tel:+919494141475"
            className="btn-gold"
            aria-label="Call Aruvi Tours to start planning your trip"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Trip
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}