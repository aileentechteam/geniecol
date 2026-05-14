const campaigns = [
  'Cardi B × BR MUD',
  'Cardi B × JungKwanJang',
  'Kris Jenner × Rejuran',
]

const points = [
  'Direct celebrity access',
  'Clearer communication',
  'Faster campaign timelines',
  'Higher-trust partnerships',
]

export default function PreviewHomeV2() {
  return (
    <main className="concept-shell concept-split">
      <header className="concept-topbar">
        <div className="concept-topbar-brand">
          <img src="/brand/crest.svg" alt="Genie Collective crest" className="concept-top-crest" />
          <img src="/brand/logo-wordmark.svg" alt="Genie Collective" className="concept-top-wordmark" />
        </div>
        <a href="mailto:wish@geniecol.com" className="concept-link-light">
          wish@geniecol.com
        </a>
      </header>

      <section className="concept-split-grid">
        <div className="concept-split-copy">
          <div className="concept-section-label">Home v2 · split narrative</div>
          <h1>Direct celebrity access. Fewer layers. Faster execution.</h1>
          <p>
            We build high-trust partnerships between brands and celebrity talent with clarity,
            speed, and discretion.
          </p>
          <div className="concept-points-list">
            {points.map((point) => (
              <div key={point} className="concept-point-item">
                {point}
              </div>
            ))}
          </div>
        </div>

        <div className="concept-split-stack">
          {campaigns.map((campaign, index) => (
            <article key={campaign} className={`concept-stack-card concept-stack-card-${index + 1}`}>
              <div className="concept-stack-media" />
              <div className="concept-stack-title">{campaign}</div>
            </article>
          ))}
        </div>
      </section>

      <footer className="concept-footer-inline">
        <span>Services</span>
        <span>TikTok</span>
        <span>Live Shopping</span>
        <span>Affiliates</span>
        <span>Instagram</span>
        <span>YouTube</span>
      </footer>
    </main>
  )
}
