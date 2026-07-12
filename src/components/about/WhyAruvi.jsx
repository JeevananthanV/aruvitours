import React from "react";
import { motion, useInView, useAnimation } from "motion/react";

const REASONS = [
  {
    icon: "🧭",
    title: "Expert Knowledge",
    desc: "Our travel specialists have walked the paths, navigated the borders, and discovered the hidden gems — so your experience is built on real, lived expertise.",
  },
  {
    icon: "🤝",
    title: "Personalized Service",
    desc: "We invest time in understanding who you are as a traveller — before we plan a single hotel or route. Every recommendation is personal, not templated.",
  },
  {
    icon: "🏅",
    title: "Trusted & Certified",
    desc: "GST registered, MSME certified, and affiliated with the Salem Tour Operators Association — our credentials reflect our commitment to transparency and professionalism.",
  },
  {
    icon: "💎",
    title: "Affordable Luxury",
    desc: "Premium experiences need not carry prohibitive prices. Aruvi Tours is built on the belief that beautifully curated travel should be within reach — without compromise on quality.",
  },
];

export default function WhyAruvi() {
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
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  return (
    <section className="why" aria-labelledby="why-heading">
      <div className="container">
        <motion.div
          className="section-header reveal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="label">Why Aruvi</p>
          <span className="gold-line"></span>
          <h2 id="why-heading">
            The <strong>Aruvi Difference</strong>
          </h2>
          <p>Four pillars that define every journey we craft.</p>
        </motion.div>

        <motion.div
          ref={ref}
          className="why__grid stagger"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {REASONS.map((r, i) => (
            <motion.div
              className="why-card reveal"
              style={{ transitionDelay: `${0.1 * (i + 1)}s` }}
              key={r.title}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="why-card__icon-wrap" aria-hidden="true">
                {r.icon}
              </div>
              <div>
                <h3 className="why-card__title">{r.title}</h3>
                <p className="why-card__desc">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}