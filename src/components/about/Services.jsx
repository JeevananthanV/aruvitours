import React from "react";
import { motion, useInView, useAnimation } from "motion/react";

const SERVICES = [
  {
    num: "01",
    icon: "✈️",
    title: "All-Inclusive Travel Packages",
    desc: "From flights and accommodation to dining and sightseeing — every detail is thoughtfully arranged so you can simply arrive and experience. Our all-inclusive packages remove the complexity, leaving only the joy.",
  },
  {
    num: "02",
    icon: "🌍",
    title: "Escorted Group Tours",
    desc: "Travel alongside like-minded explorers, led by our experienced tour managers. Our curated group tours blend camaraderie with culture — creating friendships as lasting as the destinations themselves.",
  },
  {
    num: "03",
    icon: "🗺️",
    title: "Customized Private Trips",
    desc: "Your journey, on your terms. We design bespoke itineraries for individuals, couples, and families — shaped around your interests, timeline, and travel style. No templates. Only craftsmanship.",
  },
];

export default function Services() {
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
    <section className="services" aria-labelledby="services-heading">
      <div className="container">
        <motion.div
          className="section-header reveal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="label">What We Offer</p>
          <span className="gold-line"></span>
          <h2 id="services-heading">
            Our <strong>Services</strong>
          </h2>
          <p>Tailored for every kind of explorer — from the first-time traveller to the seasoned wanderer.</p>
        </motion.div>

        <motion.div
          ref={ref}
          className="services__grid stagger"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {SERVICES.map((s, i) => (
            <motion.article
              className="service-card reveal"
              style={{ transitionDelay: `${0.1 * (i + 1)}s` }}
              key={s.num}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <span className="service-card__num">{s.num}</span>
              <div className="service-card__icon" aria-hidden="true">
                {s.icon}
              </div>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__desc">{s.desc}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}