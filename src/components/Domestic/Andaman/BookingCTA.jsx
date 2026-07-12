
const options = [
  { days: 3, label: "Book 3 Days" },
  { days: 4, label: "Book 4 Days" },
  { days: 5, label: "Book 5 Days" },
  { days: 6, label: "Book 6 Days" },
];

export default function BookingCTA({ onSelectDays }) {
  return (
    <section id="booking" className="cta-section">
      <div className="cta-overlay" />
      <div className="cta-content">
        <span className="aruvi-eyebrow cta-eyebrow">Aruvi Tours · Andaman</span>
        <h2>
          Choose your escape.
          <br />
          Experience the <em>extraordinary.</em>
        </h2>
        <p>Every journey is shaped around the itinerary, not a package switch.</p>
        <div className="cta-btns">
          {options.map((opt, i) => (
            <button
              key={opt.days}
              className={i < 2 ? "cta-btn-gold" : "cta-btn-outline"}
              onClick={() => onSelectDays?.(opt.days)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
