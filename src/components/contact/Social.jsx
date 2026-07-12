import React, { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "motion/react";

const SOCIALS = [
  {
    href: "https://instagram.com/aruvitours",
    label: "Follow Aruvi Tours on Instagram",
    handle: "Instagram",
    variant: "ig",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "https://facebook.com/aruvitours",
    label: "Follow Aruvi Tours on Facebook",
    handle: "Facebook",
    variant: "fb",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    href: "https://youtube.com/@aruvitours",
    label: "Subscribe to Aruvi Tours on YouTube",
    handle: "YouTube",
    variant: "yt",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "https://x.com/aruvitours",
    label: "Follow Aruvi Tours on X",
    handle: "X (Twitter)",
    variant: "x",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function Social() {
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
    <section className="social" aria-labelledby="social-heading">
      <div className="container">
        <div className="social__inner">
          <motion.div
            className="reveal"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          >
            <p className="label">Follow Along</p>
            <span className="gold-line" style={{ marginInline: "auto" }}></span>
            <h2
              id="social-heading"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.7rem,2.8vw,2.2rem)",
                fontWeight: 300,
                color: "var(--charcoal)",
                marginBottom: "0.5rem",
              }}
            >
              Join Our <strong style={{ fontWeight: 600 }}>Travel Community</strong>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1rem",
                fontStyle: "italic",
                color: "var(--stone)",
                maxWidth: 400,
                marginInline: "auto",
              }}
            >
              Follow us for daily travel inspiration, destination guides, and behind-the-scenes
              moments from our journeys.
            </p>
          </motion.div>

          <motion.div
            ref={ref}
            className="social__icons"
            role="list"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            {SOCIALS.map((s, i) => (
              <motion.a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link reveal"
                aria-label={s.label}
                role="listitem"
                key={s.handle}
                variants={itemVariants}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`social-icon social-icon--${s.variant}`}>{s.icon}</div>
                <span className="social__handle">{s.handle}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}