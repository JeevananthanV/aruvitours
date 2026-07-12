import React from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useAnimation } from "motion/react";

const EXPERIENCES = [
  { icon: "❣", label: "Honeymoon Escapes", count: "8 Packages", filter: "honeymoon" },
  { icon: "👨‍👩‍👧", label: "Family Holidays", count: "11 Packages", filter: "family" },
  { icon: "✦", label: "Luxury Retreats", count: "9 Packages", filter: "luxury" },
  { icon: "⛰", label: "Adventure Journeys", count: "7 Packages", filter: "adventure" },
  { icon: "🌿", label: "Wellness & Ayurveda", count: "6 Packages", filter: "wellness" },
  { icon: "✈", label: "International", count: "20 Packages", filter: "international" },
];

export default function ExperienceGrid({ onFilter }) {
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
    <div className="section">
      <motion.div
        className="sec-header reveal"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <p className="sec-eyebrow">Travel by Experience</p>
          <h2 className="sec-title">
            Find the Trip
            <br />
            <em>That Fits You</em>
          </h2>
        </div>
      </motion.div>
      <motion.div
        ref={ref}
        className="exp-grid stagger"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        {EXPERIENCES.map((e) => (
          <motion.div
            className="exp-card reveal"
            key={e.label}
            onClick={() => onFilter && onFilter(e.filter)}
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="exp-icon" aria-hidden="true">
              {e.icon}
            </div>
            <h5>{e.label}</h5>
            <span>{e.count}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}