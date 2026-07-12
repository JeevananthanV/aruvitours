import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function FinalCTA({ onBookNow }) {
  const [email, setEmail] = useState("");
  const [btnText, setBtnText] = useState("Subscribe");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setBtnText("Subscribed!");
    setEmail("");
    setTimeout(() => setBtnText("Subscribe"), 2500);
  };

  return (
    <div className="final-cta" id="contact">
      <motion.div
        className="fc-orb"
        aria-hidden="true"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
      />
      <div className="fc-inner">
        <motion.p
          className="fc-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Let's Plan Something
        </motion.p>
        <motion.h2
          className="fc-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Ready for Your
          <br />
          <em>Next Journey?</em>
        </motion.h2>
        <motion.p
          className="fc-sub"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Speak with an Aruvi travel expert today - no scripts, no pressure, just a real
          conversation about where you want to go.
        </motion.p>
        <motion.div
          className="fc-btns"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.a
            href="#booking"
            className="btn-primary"
            onClick={() => onBookNow && onBookNow("")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Plan My Trip
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M1 7h12M8 3l5 4-5 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>
          <motion.a
            href="https://wa.me/919494141475"
            className="btn-wa"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
            </svg>
            WhatsApp Us
          </motion.a>
        </motion.div>
        <motion.div
          className="fc-divider"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <span></span>
          <p>or join the list</p>
          <span></span>
        </motion.div>
        <motion.form
          className="fc-form"
          id="nlForm"
          noValidate
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <label htmlFor="nlEmail" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden" }}>
            Email address
          </label>
          <input
            className="fc-input"
            type="email"
            id="nlEmail"
            placeholder="Your email address…"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="fc-btn" type="submit" id="nlBtn">
            <span id="nlBtnTxt">{btnText}</span>
          </button>
        </motion.form>
        <motion.p
          className="fc-consent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Occasional trip ideas and offers. Unsubscribe anytime.
        </motion.p>
      </div>
    </div>
  );
}