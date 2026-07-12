import { destinationHighlights } from "../../data/andamanData";

export default function DestinationHighlights() {
  return (
    <section id="destinations" className="aruvi-section">
      <div className="aruvi-container">
        <div className="aruvi-header">
          <span className="aruvi-eyebrow">Where You'll Go</span>
          <h2 className="aruvi-heading">
            Destination <em>Highlights</em>
          </h2>
        </div>

        <div className="dh-list">
          {destinationHighlights.map((d, i) => (
            <div
              className={`dh-row${i % 2 === 1 ? " dh-row--reverse" : ""}`}
              key={d.id}
            >
              <div className="dh-image" style={{ backgroundImage: `url(${d.image})` }} />
              <div className="dh-text">
                <span className="dh-tag">{d.tag}</span>
                <h3>{d.name}</h3>
                <p>{d.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
