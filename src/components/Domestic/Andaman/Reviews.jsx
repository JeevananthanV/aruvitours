import { useState } from "react";
import { reviews } from "../../data/andamanData";

export default function Reviews() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + reviews.length) % reviews.length);
  const next = () => setIndex((i) => (i + 1) % reviews.length);

  return (
    <section id="reviews" className="aruvi-section aruvi-section--dark">
      <div className="aruvi-container">
        <div className="aruvi-header aruvi-header--center">
          <span className="aruvi-eyebrow">Guest Stories</span>
          <h2 className="aruvi-heading">
            Voices of <em>Experience</em>
          </h2>
        </div>

        <div className="rv-carousel">
          <div
            className="rv-track"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {reviews.map((r) => (
              <div className="rv-card" key={r.id}>
                <div className="rv-stars">{"★".repeat(r.rating)}</div>
                <p>&ldquo;{r.quote}&rdquo;</p>
                <div className="rv-author">
                  <div className="rv-avatar">{r.initials}</div>
                  <div>
                    <strong>{r.name}</strong>
                    <span>{r.trip}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rv-controls">
            <button onClick={prev} aria-label="Previous review">&#8592;</button>
            <div className="rv-dots">
              {reviews.map((r, i) => (
                <button
                  key={r.id}
                  className={`rv-dot${i === index ? " is-active" : ""}`}
                  onClick={() => setIndex(i)}
                  aria-label={`Show review ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={next} aria-label="Next review">&#8594;</button>
          </div>
        </div>
      </div>
    </section>
  );
}
