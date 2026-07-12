import React from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useAnimation } from "motion/react";

const DESTINATIONS = [
  {
    name: "Kerala",
    image: "/kerala/kerala-hero-banner-backwaters.avif",
    path: "/domestic/kerala",
    tag: "Backwaters & Beaches",
  },
  {
    name: "Kashmir",
    image: "/Kashmir/kashmir-gulmarg-ski-resort.jpg",
    path: "/domestic/kashmir",
    tag: "Paradise Valley",
  },
  {
    name: "Ladakh",
    image: "/Ladakh/ladakh-pangong-lake.jpg",
    path: "/domestic/ladakh",
    tag: "High-Altitude Adventures",
  },
  {
    name: "Maldives",
    image: "/Maldives/mal-1.jpg",
    path: "/international/maldives",
    tag: "Overwater Luxury",
  },
  {
    name: "Japan",
    image: "/Japan/japan-1.jpg",
    path: "/international/japan",
    tag: "Neon & Tradition",
  },
  {
    name: "Turkey",
    image: "/Turkey/turkey-1.jpg",
    path: "/international/turkey",
    tag: "Crossroads of Civilizations",
  },
];

export default function FeaturedDestinations() {
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
          <p className="sec-eyebrow">Featured Destinations</p>
          <h2 className="sec-title">
            Handpicked <em>Locations</em>
          </h2>
        </div>
      </motion.div>
      <motion.div
        ref={ref}
        className="fd-grid stagger"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        {DESTINATIONS.map((d) => (
          <motion.div
            className="fd-card reveal"
            key={d.name}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <Link to={d.path} className="fd-link hover-zoom-container" aria-label={`Explore ${d.name} packages`}>
              <img src={d.image} alt={d.name} loading="lazy" />
              <div className="fd-overlay">
                <h3>{d.name}</h3>
                <p>{d.tag}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
