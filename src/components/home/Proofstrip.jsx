import React from "react";
import { motion, useInView, useAnimation } from "motion/react";

const PROOF = [
  { icon: "🏆", text: "Best Boutique Agency · T+L India, 2024" },
  { icon: "✦", text: "Travellers' Choice · TripAdvisor 2024" },
  { icon: "✈", text: "IATA Certified · Ministry of Tourism" },
  { icon: "🌟", text: "1000+ Happy Travellers" },
];

export default function ProofStrip() {
  const ref = React.useRef(null);
  const inView = useInView(ref, { threshold: 0.3 });
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  return (
    <motion.div
      ref={ref}
      className="proof-strip"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {PROOF.map((p) => (
        <motion.div
          className="proof-strip-item"
          key={p.text}
          variants={itemVariants}
        >
          <div className="proof-strip-icon" aria-hidden="true">
            {p.icon}
          </div>
          <span className="proof-strip-text">{p.text}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}