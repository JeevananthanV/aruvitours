import React from "react";
import { motion, useInView, useAnimation } from "motion/react";

const REASONS = [
  {
    icon: "🧭",
    title: "Expert Knowledge",
    body: "Our travel specialists have walked the paths, navigated the borders, and discovered the hidden gems — so your experience is built on real, lived expertise.",
  },
  {
    icon: "🤝",
    title: "Personalized Service",
    body: "We invest time in understanding who you are as a traveller — before we plan a single hotel or route. Every recommendation is personal, not templated.",
  },
  {
    icon: "🏅",
    title: "Trusted & Certified",
    body: "GST registered, MSME certified, and affiliated with the Salem Tour Operators Association — our credentials reflect our commitment to transparency and professionalism.",
  },
  {
    icon: "💎",
    title: "Affordable Luxury",
    body: "Premium experiences need not carry prohibitive prices. Aruvi Tours is built on the belief that beautifully curated travel should be within reach — without compromise on quality.",
  },
];

export default function WhyChooseUs() {
  const ref = React.useRef(null);
  const inView = useInView(ref, { threshold: 0.2 });
  const controls = useAnimation();

  React.useEffect(() => {
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
            <p className="sec-eyebrow">Why Aruvi</p>
            <h2 className="sec-title">
              The <em>Aruvi Difference</em>
            </h2>
            <p className="sec-sub">Four pillars that define every journey we craft.</p>
          </div>
        </motion.div>
        <motion.div
          ref={ref}
          className="why-grid stagger"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {REASONS.map((r, i) => (
            <motion.div
              className="why-card reveal premium-card"
              key={r.title}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="why-icon" aria-hidden="true">
                {r.icon}
              </div>
              <h3>{r.title}</h3>
              <p>{r.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}