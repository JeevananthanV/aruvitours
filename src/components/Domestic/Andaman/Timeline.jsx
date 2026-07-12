import { useState, forwardRef } from "react";
import { itineraries } from "../../data/andamanData";

const Timeline = forwardRef(function Timeline({ initialDays = 3 }, ref) {
  const [days, setDays] = useState(initialDays);
  const [openDay, setOpenDay] = useState(1);
  const tabs = [3, 4, 5, 6];

  const handleTab = (d) => {
    setDays(d);
    setOpenDay(1);
  };

  return (
    <section id="itinerary" className="aruvi-section" ref={ref}>
      <div className="aruvi-container">
        <div className="aruvi-header">
          <span className="aruvi-eyebrow">Day by Day</span>
          <h2 className="aruvi-heading">
            Your <em>Journey</em> Unfolds
          </h2>
        </div>

        <div className="tl-tabs" role="tablist">
          {tabs.map((d) => (
            <button
              key={d}
              role="tab"
              aria-selected={days === d}
              className={`tl-tab${days === d ? " is-active" : ""}`}
              onClick={() => handleTab(d)}
            >
              {d} Days
            </button>
          ))}
        </div>

        <div className="tl-list">
          {itineraries[days].map((item) => (
            <div className="tl-item" key={item.day}>
              <div className="tl-day">
                <span>Day</span>
                <strong>{item.day}</strong>
              </div>
              <div
                className={`tl-card${openDay === item.day ? " is-open" : ""}`}
                onClick={() => setOpenDay(openDay === item.day ? null : item.day)}
              >
                <div className="tl-card-header">
                  <div className="tl-card-title">{item.title}</div>
                  <div className="tl-card-icon">{openDay === item.day ? "–" : "+"}</div>
                </div>
                <div className="tl-card-body">
                  <p>{item.text}</p>
                  <div className="tl-tags">
                    {item.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Timeline;
