import React, { useState } from "react";
import { motion } from "motion/react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail("");
    }, 3000);
  };

  return (
    <section className="newsletter" aria-labelledby="newsletter-heading">
      <div className="container">
        <div className="newsletter__inner">
          <motion.div
            className="reveal"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          >
            <p className="label newsletter__text">Stay Updated</p>
            <span className="gold-line" style={{ background: "var(--gold)" }}></span>
            <h2 className="newsletter__heading" id="newsletter-heading">
              Get <strong>Travel Deals</strong>
              <br />& Exclusive Updates
            </h2>
            <p className="newsletter__sub">
              Be the first to know about curated travel packages, seasonal offers, and destination
              guides — delivered directly to your inbox.
            </p>
          </motion.div>

          <motion.div
            className="reveal"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
          >
            <div className="newsletter__form">
              <div className="newsletter__input-row">
                <input
                  type="email"
                  className="newsletter__input"
                  placeholder="Enter your email address"
                  aria-label="Email address for newsletter"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <motion.button
                  type="button"
                  className="newsletter__btn"
                  onClick={handleSubscribe}
                  style={subscribed ? { background: "#2d7d46", color: "#fff" } : undefined}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {subscribed ? "✓ Subscribed!" : "Subscribe"}
                </motion.button>
              </div>
              <p className="newsletter__note">No spam. Unsubscribe anytime. We respect your privacy.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}