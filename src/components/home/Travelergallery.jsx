import React from "react";
import { motion, useInView, useAnimation } from "motion/react";

const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&fm=webp",
    alt: "Couple in Maldives",
  },
  {
    src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80&fm=webp",
    alt: "Family in Kerala",
  },
  {
    src: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=600&q=80&fm=webp",
    alt: "Solo traveler in Japan",
  },
  {
    src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80&fm=webp",
    alt: "Group in Dubai",
  },
  {
    src: "https://images.unsplash.com/photo-1528181304800-2f1702ad9fbe?w=600&q=80&fm=webp",
    alt: "Friends in Goa",
  },
  {
    src: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600&q=80&fm=webp",
    alt: "Couple in Kashmir",
  },
];

export default function TravelerGallery() {
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
          <p className="sec-eyebrow">Traveler Stories</p>
          <h2 className="sec-title">
            Moments from <em>Our Travelers</em>
          </h2>
        </div>
      </motion.div>
      <motion.div
        ref={ref}
        className="gallery-grid stagger"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        {GALLERY.map((g, i) => (
          <motion.div
            className="gallery-item reveal hover-zoom-container"
            key={g.src}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <img src={g.src} alt={g.alt} loading="lazy" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}