import { useState } from "react";
import { galleryItems } from "../../data/andamanData";

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const open = (i) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) => (i - 1 + galleryItems.length) % galleryItems.length);
  const next = () => setLightboxIndex((i) => (i + 1) % galleryItems.length);

  const active = lightboxIndex !== null ? galleryItems[lightboxIndex] : null;

  return (
    <section id="gallery" className="aruvi-section aruvi-section--dark">
      <div className="aruvi-container">
        <div className="aruvi-header aruvi-header--center">
          <span className="aruvi-eyebrow">Visual Journey</span>
          <h2 className="aruvi-heading">
            Frames of <em>Andaman</em>
          </h2>
        </div>

        <div className="gal-grid">
          {galleryItems.map((item, i) => (
            <button className="gal-item" key={item.id} onClick={() => open(i)}>
              <div
                className="gal-thumb"
                style={{ backgroundImage: `url(${item.type === "video" ? item.poster : item.src})` }}
              />
              {item.type === "video" && (
                <span className="gal-play" aria-hidden="true">
                  ▶
                </span>
              )}
              <span className="gal-caption">{item.caption}</span>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div className="gal-lightbox" role="dialog" aria-modal="true">
          <button className="gal-lb-close" onClick={close} aria-label="Close">
            &times;
          </button>
          <button className="gal-lb-nav gal-lb-prev" onClick={prev} aria-label="Previous">
            &#8592;
          </button>
          <div className="gal-lb-media">
            {active.type === "video" ? (
              <video src={active.src} poster={active.poster} controls autoPlay />
            ) : (
              <img src={active.src} alt={active.caption} />
            )}
          </div>
          <button className="gal-lb-nav gal-lb-next" onClick={next} aria-label="Next">
            &#8594;
          </button>
          <p className="gal-lb-caption">{active.caption}</p>
        </div>
      )}
    </section>
  );
}
