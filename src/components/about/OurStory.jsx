import React from "react";
import { motion } from "motion/react";
import storyImg from "../../assets/images/home/1.jpg";

export default function OurStory() {
  return (
    <section className="story" aria-labelledby="story-heading">
      <div className="container">
        <div className="story__inner">
          <motion.div
            className="story__img-wrap reveal"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <img
              className="story__img"
              src={storyImg}
              alt="A traveller gazing at a golden horizon — the spirit of Aruvi Tours"
              loading="lazy"
            />
            <div className="story__img-accent" aria-hidden="true"></div>
            <div className="story__img-tag">
              <span>2016</span>
              <small>Est. Salem, Tamil Nadu</small>
            </div>
          </motion.div>

          <motion.div
            className="story__text reveal"
            style={{ transitionDelay: "0.2s" }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="label story__eyebrow">Our Story</p>
            <span className="gold-line"></span>
            <h2 className="story__heading" id="story-heading">
              Born from a passion for
              <br />
              <em>discovery and wonder.</em>
            </h2>
            <p>
              Aruvi Tours began with a single conviction — that travel should be accessible
              without sacrificing elegance. Founded in Salem with a small team and an immense
              heart, we started by offering curated group tours to South India's most beloved
              spiritual and natural destinations.
            </p>
            <p>
              Word spread quietly at first — through the gratitude of families who returned home
              with stories, and honeymooners who found their perfect escape. Each journey refined
              our craft. Each traveller taught us something new about the world and about
              hospitality.
            </p>
            <p>
              Today, Aruvi Tours stands as a trusted name across Tamil Nadu and beyond — GST
              registered, MSME certified, and proudly affiliated with the Salem Tour Operators
              Association. Our growth has always been measured not in numbers, but in the smiles
              we've carried home.
            </p>
            <div className="story__quote">
              <p>
                "We didn't set out to build a company. We set out to change how people experience
                the world."
              </p>
              <cite>— Founder, Aruvi Tours</cite>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}