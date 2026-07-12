import { comparisonRows } from "../../data/andamanData";

const days = [3, 4, 5, 6];

export default function Comparison() {
  return (
    <section id="comparison" className="aruvi-section">
      <div className="aruvi-container">
        <div className="aruvi-header aruvi-header--center">
          <span className="aruvi-eyebrow">Choose the Right Pace</span>
          <h2 className="aruvi-heading">
            Package <em>Comparison</em>
          </h2>
        </div>

        <div className="cmp-scroll">
          <table className="cmp-table">
            <thead>
              <tr>
                <th></th>
                {days.map((d) => (
                  <th key={d} className={d === 5 ? "cmp-best" : ""}>
                    {d === 5 && <span className="cmp-star">★ Best Value</span>}
                    {d} Days
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.feature}>
                  <th scope="row">{row.feature}</th>
                  {days.map((d) => (
                    <td key={d} className={d === 5 ? "cmp-best" : ""}>
                      {row[d]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
