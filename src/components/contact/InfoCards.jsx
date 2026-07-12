import React, { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "motion/react";

const CARDS = [
  {
    icon: "📍",
    label: "Our Office",
    value: (
      <>
        1/272/4, Krishnammal Nagar,
        <br />
        Fairlands, Salem,
        <br />
        Tamilnadu, India - 636016
      </>
    ),
  },
  {
    icon: "📞",
    label: "Call Us",
    value: <a href="tel:+919494141475">+91 9494141475</a>,
  },
  {
    icon: "✉️",
    label: "Email Us",
    value: <a href="mailto:aruvitours@gmail.com">aruvitours@gmail.com</a>,
  },
  {
    icon: "🕒",
    label: "Office Hours",
    value: (
      <>
        Monday – Saturday
        <br />
        10:30 AM – 5:00 PM
      </>
    ),
  },
];

export default function InfoCards() {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  return (
    <section className="info-cards" aria-label="Contact information">
      <div className="container">
        <motion.div
          ref={ref}
          className="info-cards__grid stagger"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {CARDS.map((c, i) => (
            <motion.div
              className="info-card reveal"
              style={{ transitionDelay: `${0.1 * i}s` }}
              key={c.label}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              <span className="info-card__icon" aria-hidden="true">
                {c.icon}
              </span>
              <span className="info-card__label">{c.label}</span>
              <p className="info-card__value">{c.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}