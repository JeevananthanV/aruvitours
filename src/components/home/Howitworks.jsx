import React from "react";
import { motion, useInView, useAnimation } from "motion/react";

const STEPS = [
  {
    num: 1,
    title: "Tell Us Where",
    body: "Use the trip search, call us, or message on WhatsApp. Just tell us where you want to go and roughly when.",
  },
  {
    num: 2,
    title: "Talk to a Specialist",
    body: "A real travel expert calls you within hours - not a chatbot - to understand your budget, pace, and priorities.",
  },
  {
    num: 3,
    title: "Get Your Itinerary",
    body: "You'll receive a day-by-day plan with hotels, transport, and pricing - free to adjust until it feels right.",
  },
  {
    num: 4,
    title: "Travel, Supported",
    body: "Once you're on the road, your specialist and our 24/7 desk are a phone call away for the whole trip.",
  },
];

export default function HowItWorks() {
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
    <div className="section-bg">
      <div className="section">
        <motion.div
          className="sec-header reveal"
          style={{ marginBottom: "clamp(40px,5vh,60px)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p className="sec-eyebrow">Getting Started</p>
            <h2 className="sec-title">
              How Booking
              <br />
              <em>Works</em>
            </h2>
          </div>
        </motion.div>
        <motion.div
          ref={ref}
          className="how-grid stagger"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {STEPS.map((s) => (
            <motion.div
              className="how-step reveal"
              key={s.num}
              variants={itemVariants}
            >
              <div className="how-num" aria-hidden="true">
                {s.num}
              </div>
              <h4>{s.title}</h4>
              <p>{s.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}