import React from "react";
import { motion } from "motion/react";

export default function Story() {
  return (
    <div className="section" id="story">
      <div className="story-grid">
        <motion.div
          className="reveal left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="sec-eyebrow">The Aruvi Difference</p>
          <h2 className="sec-title" style={{ marginBottom: 22 }}>
            Why Aruvi
            <br />
            <em>Exists</em>
          </h2>
          <div className="story-copy">
            <p>
              Founded in 2012, Aruvi Tours started with a simple belief: travel should feel
              personal, not packaged. We were tired of seeing identical itineraries sold to every
              traveler regardless of who they were or what they wanted.
            </p>
            <p>
              So every trip we plan is handled by a destination specialist who has actually been
              there - someone who knows which houseboat operator on the backwaters still cooks
              the way their grandmother did, and which Gulmarg guide will get you to the slope
              before the crowds.
            </p>
            <p>
              We're a small team in Salem, and we like it that way. It means the person who
              plans your trip is the same person who picks up the phone if something needs to
              change.
            </p>
          </div>
          <div className="story-stats">
            <div>
              <div className="story-stat-num">12+</div>
              <div className="story-stat-lbl">Years Running</div>
            </div>
            <div>
              <div className="story-stat-num">5,000+</div>
              <div className="story-stat-lbl">Trips Planned</div>
            </div>
            <div>
              <div className="story-stat-num">6</div>
              <div className="story-stat-lbl">Destination Specialists</div>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="story-visual reveal right hover-zoom-container"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900&q=80&fm=webp"
            alt="Travel planning desk with maps and a journal"
          />
          <div className="story-visual-overlay"></div>
          <div className="story-quote-card">
            <p>"We don't sell trips off a shelf. We ask what you actually want, then go build it."</p>
            <div className="story-quote-name">Karthik Iyer</div>
            <div className="story-quote-role">Founder, Aruvi Tours - on the team since day one</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}