import { useState } from "react";
import { faqItems } from "../../data/andamanData";

export default function FAQ() {
  const [openId, setOpenId] = useState(faqItems[0].id);

  return (
    <section id="faq" className="aruvi-section">
      <div className="aruvi-container aruvi-container--narrow">
        <div className="aruvi-header aruvi-header--center">
          <span className="aruvi-eyebrow">Good to Know</span>
          <h2 className="aruvi-heading">
            Frequently <em>Asked</em>
          </h2>
        </div>

        <div className="faq-list">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div className={`faq-item${isOpen ? " is-open" : ""}`} key={item.id}>
                <button
                  className="faq-question"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <span className="faq-icon">{isOpen ? "–" : "+"}</span>
                </button>
                <div className="faq-answer">
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
