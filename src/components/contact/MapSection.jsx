import React from "react";
import { motion } from "motion/react";

export default function MapSection() {
  return (
    <section className="map-section" aria-labelledby="map-heading">
      <div className="container">
        <div className="map-inner">
          <motion.div
            className="reveal"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="label">Find Us</p>
            <span className="gold-line"></span>
            <h2
              className="map-text"
              id="map-heading"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.8rem,3vw,2.4rem)",
                fontWeight: 300,
                lineHeight: 1.25,
                color: "var(--charcoal)",
                marginBottom: "1rem",
              }}
            >
              Visit Our Office
              <br />
              <strong style={{ fontWeight: 600 }}>in Salem</strong>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.05rem",
                fontStyle: "italic",
                color: "var(--stone)",
                lineHeight: 1.8,
                marginBottom: "1.4rem",
              }}
            >
              Our office is centrally located in Salem. Drop in during business hours — our team
              will be happy to meet you in person and plan your journey face to face.
            </p>
            <div className="map-address" role="address">
              <strong>Aruvi Tours</strong>
              <br />
              1/272/4, Krishnammal Nagar, Fairlands,
              <br />
              Salem, Tamilnadu, India - 636016
            </div>
          </motion.div>

          <motion.div
            className="map-embed reveal"
            style={{ transitionDelay: "0.2s" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.2!2d78.1485!3d11.6588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDM5JzMxLjciTiA3OMKwMDgnNTQuNiJF!5e0!3m2!1sen!2sin!4v1700000000000"
              title="Aruvi Tours office location in Salem, Tamil Nadu"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="map-embed__overlay" aria-hidden="true">
              Fairlands, Salem
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}