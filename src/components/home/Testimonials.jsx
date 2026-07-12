import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const TESTIMONIALS = [
  {
    quote:
      "Aruvi Tours planned our Kerala honeymoon with such care - from the private houseboat to the spice garden stay, every detail felt intentional. We never once worried about a thing.",
    author: "Ananya & Rohan",
    role: "Honeymoon, Kerala",
  },
  {
    quote:
      "As a family of six, we needed something that worked for all ages. Aruvi's custom Rajasthan package gave us camel safaris for the kids and rooftop dinners for us adults. Perfect balance.",
    author: "The Menon Family",
    role: "Family Vacation, Rajasthan",
  },
  {
    quote:
      "I've used big travel companies before, but Aruvi's personal approach is different. They actually listened to what I wanted and found hidden cafes in Istanbul I never would have discovered.",
    author: "Vikram Nair",
    role: "Solo Journey, Turkey",
  },
  {
    quote:
      "Our office retreat to Coorg was seamless. From airport transfers to team-building activities, Aruvi handled everything. We'll definitely be booking our next trip with them.",
    author: "Priya Sharma",
    role: "Corporate Retreat, Coorg",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((a) => (a + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="section-bg">
      <div className="section">
        <motion.div
          className="sec-header reveal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p className="sec-eyebrow">Voices of Delight</p>
            <h2 className="sec-title">
              Stories That <em>Stay</em>
            </h2>
          </div>
        </motion.div>
        <div className="testi-slider">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="testi-card"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p className="testi-quote">"{TESTIMONIALS[active].quote}"</p>
              <div className="testi-author">
                <strong>{TESTIMONIALS[active].author}</strong>
                <span>{TESTIMONIALS[active].role}</span>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="testi-dots">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                className={i === active ? "active" : ""}
                onClick={() => setActive(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}