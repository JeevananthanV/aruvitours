import { useState } from "react";
import { mapPins } from "../../data/andamanData";

export default function IslandMap() {
  const [activePin, setActivePin] = useState(mapPins[0].id);
  const current = mapPins.find((p) => p.id === activePin);

  return (
    <section id="island-map" className="aruvi-section aruvi-section--dark">
      <div className="aruvi-container">
        <div className="aruvi-header aruvi-header--center">
          <span className="aruvi-eyebrow">Chart Your Course</span>
          <h2 className="aruvi-heading">
            The <em>Archipelago</em>, Mapped
          </h2>
        </div>

        <div className="im-wrap">
          <div className="im-map">
            <svg viewBox="0 0 100 80" className="im-svg" role="img" aria-label="Map of the Andaman Islands">
              <defs>
                <linearGradient id="imWater" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#0b3a41" />
                  <stop offset="100%" stopColor="#08262b" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="100" height="80" fill="url(#imWater)" />
              {/* stylised landmasses */}
              <path d="M52 8 C60 6 66 12 65 20 C64 28 56 30 52 26 C48 22 46 12 52 8Z" fill="#134048" opacity="0.9" />
              <path d="M38 24 C46 22 52 30 48 38 C44 46 32 46 28 38 C24 30 30 26 38 24Z" fill="#134048" opacity="0.9" />
              <path d="M40 50 C46 48 52 54 48 60 C44 66 34 66 32 58 C30 52 34 52 40 50Z" fill="#134048" opacity="0.9" />

              {mapPins.map((pin) => (
                <g
                  key={pin.id}
                  transform={`translate(${pin.x} ${pin.y})`}
                  className={`im-pin${activePin === pin.id ? " is-active" : ""}`}
                  onClick={() => setActivePin(pin.id)}
                  tabIndex={0}
                  role="button"
                  aria-label={pin.name}
                  onKeyDown={(e) => e.key === "Enter" && setActivePin(pin.id)}
                >
                  <circle r="3.4" className="im-pin-ring" />
                  <circle r="1.6" className="im-pin-dot" />
                </g>
              ))}
            </svg>
          </div>

          <div className="im-info">
            <div className="im-pin-list">
              {mapPins.map((pin) => (
                <button
                  key={pin.id}
                  className={`im-pin-btn${activePin === pin.id ? " is-active" : ""}`}
                  onClick={() => setActivePin(pin.id)}
                >
                  {pin.name}
                </button>
              ))}
            </div>
            {current && (
              <div className="im-card">
                <h3>{current.name}</h3>
                <p>{current.info}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
