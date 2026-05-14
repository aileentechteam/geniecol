const campaigns = [
  'Cardi B × BR MUD',
  'Cardi B × JungKwanJang',
  'Kris Jenner × Rejuran',
]

const services = ['TikTok', 'Live Shopping', 'Affiliates', 'Instagram', 'YouTube']

export default function PreviewHomeV1() {
  return (
    <main className="concept-shell concept-editorial">
      <div className="concept-crest-wrap">
        <img src="/brand/crest.svg" alt="Genie Collective crest" className="concept-crest" />
      </div>

      <div className="concept-rule" />
      <img src="/brand/logo-wordmark.svg" alt="Genie Collective" className="concept-wordmark" />

      <section className="concept-hero concept-hero-centered">
        <h1>
          Genie Collective connects brands with American celebrities through trusted, personal
          relationships.
        </h1>
        <p>
          Direct access means faster timelines, more efficient rates, clearer communication, and
          partnerships shaped through trust — not layers of middlemen.
        </p>
      </section>

      <section className="concept-section">
        <div className="concept-section-label">Selected campaigns</div>
        <div className="concept-card-row">
          {campaigns.map((campaign) => (
            <article key={campaign} className="concept-campaign-card">
              <div className="concept-campaign-media" />
              <div className="concept-campaign-title">{campaign}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="concept-foot-copy">
        <p>Kick-start virality with the best investment for ads and affiliates.</p>
      </section>

      <section className="concept-section concept-services-center">
        <div className="concept-section-label">Services</div>
        <div className="concept-services-list">
          {services.map((service) => (
            <span key={service}>{service}</span>
          ))}
        </div>
      </section>

      <footer className="concept-footer-minimal">
        <span>nyc | seoul</span>
        <span>wish@geniecol.com</span>
        <span>@hyp | @pug</span>
      </footer>
    </main>
  )
}
