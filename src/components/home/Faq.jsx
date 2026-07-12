import React, { useState } from "react";
import { motion, AnimatePresence, useInView, useAnimation } from "motion/react";

const FAQS = [
  {
    q: "How do I book a trip with Aruvi Tours?",
    a: "Simply call us, message on WhatsApp, or use our enquiry form. A travel specialist will reach out within hours to understand your needs and craft a personalized itinerary.",
  },
  {
    q: "What makes Aruvi Tours different from other agencies?",
    a: "We're a small team that actually answers the phone. Every itinerary is handcrafted by a destination specialist who has been there, not pulled from a template. You get personal attention from planning to return.",
  },
  {
    q: "Do you handle international travel?",
    a: "Yes, we specialize in both domestic and international destinations across 35+ locations. From Southeast Asia to Europe, we handle flights, visas, and curated experiences.",
  },
  {
    q: "Can I customize my package?",
    a: "Absolutely. Every package is a starting point - we'll adjust hotels, activities, and duration based on your preferences, budget, and travel style.",
  },
  {
    q: "What's included in the package price?",
    a: "All packages include accommodation, transfers, and daily breakfast. Flights, meals, and special activities are clearly marked as optional add-ons.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  return (
    <div className="section" id="faq">
      <motion.div
        className="sec-header reveal"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <p className="sec-eyebrow">Questions Answered</p>
          <h2 className="sec-title">
            Frequently Asked <em>Questions</em>
          </h2>
        </div>
      </motion.div>
      <motion.div
        ref={ref}
        className="faq-list stagger"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        {FAQS.map((f, i) => (
          <motion.div
            className="faq-item reveal"
            key={f.q}
            variants={itemVariants}
          >
            <button
              className="faq-q"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span>{f.q}</span>
              <motion.span
                className="faq-icon"
                animate={{ rotate: open === i ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ▾
              </motion.span>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  className="faq-a"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {f.a}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}