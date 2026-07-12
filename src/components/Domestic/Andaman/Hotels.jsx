import { hotels } from "../../data/andamanData";

export default function Hotels() {
  return (
    <section id="hotels" className="aruvi-section">
      <div className="aruvi-container">
        <div className="aruvi-header">
          <span className="aruvi-eyebrow">Where You'll Stay</span>
          <h2 className="aruvi-heading">
            Hotels & <em>Resorts</em>
          </h2>
        </div>

        <div className="ht-grid">
          {hotels.map((hotel) => (
            <div className="ht-card" key={hotel.id}>
              <div className="ht-image" style={{ backgroundImage: `url(${hotel.image})` }}>
                <span className="ht-stars">{"★".repeat(hotel.stars)}</span>
              </div>
              <div className="ht-body">
                <h3>{hotel.name}</h3>
                <p className="ht-location">{hotel.location}</p>
                <p className="ht-note">{hotel.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
