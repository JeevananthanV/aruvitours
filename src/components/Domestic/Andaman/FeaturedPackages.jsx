import { featuredPackages } from "../../data/andamanData";

export default function FeaturedPackages({ onSelect }) {
  return (
    <section id="packages" className="aruvi-section">
      <div className="aruvi-container">
        <div className="aruvi-header">
          <span className="aruvi-eyebrow">Signature Journeys</span>
          <h2 className="aruvi-heading">
            Featured <em>Escapes</em>
          </h2>
        </div>

        <div className="fp-grid">
          {featuredPackages.map((pkg) => (
            <article
              key={pkg.id}
              className={`fp-card${pkg.featured ? " fp-card--featured" : ""}`}
            >
              {pkg.featured && <span className="fp-badge">Most Booked</span>}
              <div className="fp-image" style={{ backgroundImage: `url(${pkg.image})` }}>
                <span className="fp-label">{pkg.label}</span>
              </div>
              <div className="fp-body">
                <div className="fp-meta-row">
                  <span>{pkg.duration}</span>
                  <span className="fp-rating">★ {pkg.rating} ({pkg.reviews})</span>
                </div>
                <h3>{pkg.name}</h3>
                <p className="fp-location">{pkg.location}</p>
                <ul className="fp-highlights">
                  {pkg.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <div className="fp-price-row">
                  <div>
                    <span className="fp-original">₹{pkg.originalPrice.toLocaleString("en-IN")}</span>
                    <span className="fp-offer">₹{pkg.price.toLocaleString("en-IN")}</span>
                    <span className="fp-per">/person</span>
                  </div>
                  <button className="fp-btn" onClick={() => onSelect?.(pkg)}>
                    View Trip
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
