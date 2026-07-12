import { inclusions } from "../../data/andamanData";

const emoji = {
  hotel: "🏨",
  car: "🚗",
  guide: "🎭",
  meal: "🍽️",
  spa: "💆",
  camera: "📸",
  gift: "🎁",
  phone: "📞",
};

export default function Inclusions() {
  return (
    <section id="inclusions" className="aruvi-section aruvi-section--dark">
      <div className="aruvi-container">
        <div className="aruvi-header aruvi-header--center">
          <span className="aruvi-eyebrow">What's Included</span>
          <h2 className="aruvi-heading">
            Crafted for <em>Perfection</em>
          </h2>
        </div>

        <div className="inc-grid">
          {inclusions.map((item) => (
            <div className="inc-card" key={item.title}>
              <div className="inc-icon">{emoji[item.icon]}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
