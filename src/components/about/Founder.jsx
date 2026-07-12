import React from "react";
import { motion } from "motion/react";

export default function Founder() {
  return (
    <section className="founder" aria-labelledby="founder-heading">
      <div className="container">
        <motion.div
          className="founder__inner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="founder__quote">
            <p>
              "We didn't set out to build a company. We set out to change how people experience
              the world."
            </p>
          </div>
          <div className="founder__content">
            <motion.div
              className="founder__img-wrap"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <img
                src="https://images.unsplash.com/photo-1507003211147-0a1033cbd5a0?w=400&q=80"
                alt="Karthik Iyer, Founder of Aruvi Tours"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              className="founder__text"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p className="label founder__eyebrow">From Our Founder</p>
              <span className="gold-line"></span>
              <h2 id="founder-heading" className="founder__heading">
                Karthik Iyer
              </h2>
              <p className="founder__role">Founder & Lead Travel Curator</p>
              <p>
                In 2012, I was guiding a small group through the backwaters of Kerala when I
                realized something: the best travel moments happen when someone who truly knows
                the place is planning your journey. Not a call center. Not a template. A real
                person who's been there, walked those streets, and found the hidden spots that
                make a trip unforgettable.
              </p>
              <p>
                That's why Aruvi Tours exists. Every itinerary is crafted by a destination
                specialist who has lived the experience they're planning for you.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}