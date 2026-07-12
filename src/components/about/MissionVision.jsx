import React from "react";
import { motion, useInView, useAnimation } from "motion/react";

export default function MissionVision() {
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
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  return (
    <section className="mv" aria-labelledby="mv-heading">
      <div className="container">
        <motion.div
          className="section-header reveal"
          style={{ marginBottom: "3.5rem" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="label">Our Purpose</p>
          <span className="gold-line"></span>
          <h2 id="mv-heading">
            Mission <strong>& Vision</strong>
          </h2>
        </motion.div>

        <motion.div
          ref={ref}
          className="mv__grid stagger"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.div
            className="mv__card reveal"
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <span className="mv__type">Our Mission</span>
            <h3 className="mv__heading">
              Creating <strong>meaningful travel</strong> experiences
            </h3>
            <p className="mv__body">
              To design and deliver travel experiences that go beyond sightseeing — journeys that
              awaken curiosity, foster human connection, and leave travellers changed in the most
              beautiful ways. We commit to the highest standards of care, honesty, and craft in
              every trip we touch.
            </p>
          </motion.div>

          <div className="mv__divider" aria-hidden="true">
            <div className="mv__divider-line"></div>
            <div className="mv__divider-icon">✦</div>
            <div className="mv__divider-line"></div>
          </div>

          <motion.div
            className="mv__card reveal"
            style={{ transitionDelay: "0.2s" }}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <span className="mv__type">Our Vision</span>
            <h3 className="mv__heading">
              Becoming a <strong>trusted global</strong> travel brand
            </h3>
            <p className="mv__body">
              To become South India's most admired travel company — recognised not just for the
              destinations we cover, but for the depth of experience we bring to every journey. We
              envision Aruvi Tours as a brand synonymous with trust, refinement, and the enduring
              joy of exploration.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}