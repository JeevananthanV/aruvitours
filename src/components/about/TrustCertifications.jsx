import React from "react";
import { motion, useInView, useAnimation } from "motion/react";

const BADGES = [
  {
    icon: "🏛️",
    name: "GST Registered",
    detail: "Government of India · Tax Compliant",
  },
  {
    icon: "🎖️",
    name: "MSME Certified",
    detail: "Ministry of MSME · Officially Recognised",
  },
  {
    icon: "🤝",
    name: "Salem Tour Operators Assn.",
    detail: "Active Member · Industry Partner",
  },
  {
    icon: "🌟",
    name: "1000+ Happy Travellers",
    detail: "And growing — one journey at a time",
  },
];

export default function TrustCertifications() {
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  return (
    <section className="trust" aria-labelledby="trust-heading">
      <div className="container">
        <div className="trust__inner">
          <motion.div
            className="trust__text reveal"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="label" style={{ color: "var(--gold-light)" }}>
              Credentials
            </p>
            <span className="gold-line"></span>
            <h2 className="trust__heading" id="trust-heading">
              Travel with
              <br />
              <strong>Confidence & Trust.</strong>
            </h2>
            <p className="trust__desc">
              Our certifications are not just paperwork — they are our promise to every traveller.
              A commitment to ethical practice, professional standards, and genuine accountability
              at every step of your journey.
            </p>
          </motion.div>

          <motion.div
            ref={ref}
            className="trust__badges reveal"
            style={{ transitionDelay: "0.2s" }}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            {BADGES.map((b) => (
              <motion.div
                className="trust-badge"
                key={b.name}
                variants={itemVariants}
                whileHover={{ scale: 1.03, x: 5 }}
              >
                <div className="trust-badge__icon">{b.icon}</div>
                <div>
                  <p className="trust-badge__name">{b.name}</p>
                  <p className="trust-badge__detail">{b.detail}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}