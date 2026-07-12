import React from "react";
import { motion } from "motion/react";

export default function AboutHero() {
  return (
    <section className="hero" aria-label="About Aruvi Tours">
      <div className="hero__bg" role="img" aria-label="Scenic travel destination background"></div>
      <div className="hero__overlay"></div>

      <div className="container">
        <motion.div
          className="hero__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <span>Aruvi Tours &nbsp;·&nbsp; Salem, India</span>
          </motion.div>
          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            About <em>Us</em>
          </motion.h1>
          <motion.p
            className="hero__sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            We're a small team in Salem who believe travel should feel personal, not packaged.
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        className="hero__scroll"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <div className="hero__scroll-line"></div>
        <span>Scroll</span>
      </motion.div>
    </section>
  );
}