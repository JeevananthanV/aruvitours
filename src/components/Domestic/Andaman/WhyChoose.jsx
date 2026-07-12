import { trustPoints } from "../../data/andamanData";

const icons = {
  compass: (
    <svg viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="19" stroke="currentColor" strokeWidth="2" />
      <path d="M30 18l-4 10-10 4 4-10 10-4z" fill="currentColor" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 48 48" fill="none">
      <path d="M24 6l15 5v11c0 10-6.5 17-15 20-8.5-3-15-10-15-20V11l15-5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M17 24l5 5 9-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  concierge: (
    <svg viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="16" r="6" stroke="currentColor" strokeWidth="2" />
      <path d="M10 40c0-8 6-13 14-13s14 5 14 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 48 48" fill="none">
      <path d="M24 40S6 29 6 17.5C6 11 11 7 16.5 7 20 7 23 9 24 12c1-3 4-5 7.5-5C37 7 42 11 42 17.5 42 29 24 40 24 40z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  ),
};

export default function WhyChoose() {
  return (
    <section id="why-choose" className="aruvi-section aruvi-section--dark">
      <div className="aruvi-container">
        <div className="aruvi-header aruvi-header--center">
          <span className="aruvi-eyebrow">The Aruvi Difference</span>
          <h2 className="aruvi-heading">
            Why Travelers <em>Choose Us</em>
          </h2>
        </div>

        <div className="wc-grid">
          {trustPoints.map((point) => (
            <div className="wc-card" key={point.title}>
              <div className="wc-icon">{icons[point.icon]}</div>
              <h3>{point.title}</h3>
              <p>{point.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
