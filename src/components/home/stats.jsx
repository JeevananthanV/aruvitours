import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "motion/react";

const STATS = [
  { target: 5000, suffix: "+", label: "Happy Travelers" },
  { target: 35, suffix: "+", label: "Destinations" },
  { target: 12, suffix: "+", label: "Years of Excellence" },
  { target: 98, suffix: "%", label: "Satisfaction Rate" },
];

function Counter({ target }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  const inView = useInView(ref, { threshold: 0.4 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView && !started.current) {
      started.current = true;
      const duration = 1200;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        setValue(Math.floor(progress * target));
        if (progress < 1) requestAnimationFrame(tick);
        else setValue(target);
      };
      requestAnimationFrame(tick);
    }
  }, [inView, target]);

  return (
    <motion.span
      className="counter"
      data-target={target}
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={controls}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      {value.toLocaleString()}
    </motion.span>
  );
}

export default function Stats() {
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
    <motion.div
      ref={ref}
      className="stats"
      aria-label="Key statistics"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <div className="stats-inner stagger">
        {STATS.map((s) => (
          <motion.div
            className="stat"
            key={s.label}
            variants={itemVariants}
          >
            <div className="stat-num">
              <Counter target={s.target} />
              <sup>{s.suffix}</sup>
            </div>
            <div className="stat-label">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}