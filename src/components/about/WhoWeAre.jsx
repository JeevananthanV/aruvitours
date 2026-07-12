import React from "react";
import { motion } from "motion/react";

export default function WhoWeAre() {
  return (
    <section className="wwa" aria-labelledby="wwa-heading">
      <div className="container">
        <motion.div
          className="wwa__inner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="wwa__content">
            <p className="label wwa__eyebrow">Who We Are</p>
            <span className="gold-line"></span>
            <h2 id="wwa-heading" className="wwa__heading">
              A Small Team with
              <br />
              <em>Big Dreams</em>
            </h2>
            <p>
              Aruvi Tours is a boutique travel company based in Salem, Tamil Nadu. We're not
              a call center, not a franchise, and not a template-based booking engine. We're
              six destination specialists who have walked the streets, stayed in the hotels,
              and eaten at the restaurants we recommend.
            </p>
            <p>
              When you call us, you're speaking to someone who has been where you want to go.
              Someone who can tell you which houseboat serves the best prawn curry, or which
              guide in Tawang knows the best sunrise spot.
            </p>
            <a href="tel:+919494141475" className="btn-gold">
              Speak to a Specialist
            </a>
          </div>
          <div className="wwa__img-wrap">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
              alt="The Aruvi Tours team planning travel experiences"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}