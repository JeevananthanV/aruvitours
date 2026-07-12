import React from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useAnimation } from "motion/react";

const JOURNAL = [
  {
    title: "The Best Time to Visit Kashmir",
    excerpt:
      "From sakura springs to snow-capped winters, we break down when to book your Kashmir escape for the experience you're looking for.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80&fm=webp",
    path: "/blog/kashmir-best-time",
  },
  {
    title: "Hidden Cafes of Istanbul",
    excerpt:
      "Our destination specialist shares the local coffee shops where you can watch the city wake up, away from the tourist crowds.",
    image: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=600&q=80&fm=webp",
    path: "/blog/istanbul-cafes",
  },
  {
    title: "Solo Female Travel in Kerala",
    excerpt:
      "A practical guide to exploring God's Own Country safely and authentically, written by our lead Kerala specialist.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&fm=webp",
    path: "/blog/kerala-solo-female",
  },
];

export default function TravelJournal() {
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
          <p className="sec-eyebrow">Travel Journal</p>
          <h2 className="sec-title">
            From the <em>Experts</em>
          </h2>
        </div>
      </motion.div>
      <motion.div
        ref={ref}
        className="journal-grid stagger"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        {JOURNAL.map((j) => (
          <motion.div
            className="journal-card reveal premium-card"
            key={j.title}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <Link to={j.path} className="journal-link" aria-label={`Read: ${j.title}`}>
              <div className="hover-zoom-container" style={{ borderRadius: "var(--radius) var(--radius) 0 0", overflow: "hidden" }}>
                <img src={j.image} alt={j.title} loading="lazy" style={{ width: "100%", height: "200px", objectFit: "cover" }} />
              </div>
              <div className="journal-content">
                <h3>{j.title}</h3>
                <p>{j.excerpt}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}