const campaigns = [
  {
    title: 'Cardi B × BR MUD',
    note: 'Short-form beauty virality',
  },
  {
    title: 'Cardi B × JungKwanJang',
    note: 'Cultural relevance + social proof',
  },
  {
    title: 'Kris Jenner × Rejuran',
    note: 'Authority, trust, and prestige',
  },
  {
    title: 'Affiliate-first rollouts',
    note: 'Built for efficient spend',
  },
]

export default function PreviewHomeV3() {
  return (
    <main className="concept-shell concept-archive">
      <div className="concept-archive-header">
        <img src="/brand/crest.svg" alt="Genie Collective crest" className="concept-archive-crest" />
        <img src="/brand/logo-wordmark.svg" alt="Genie Collective" className="concept-archive-wordmark" />
      </div>

      <section className="concept-archive-hero">
        <div className="concept-section-label">Campaign archive</div>
        <h1>Trusted relationships. Visible results.</h1>
        <p>
          From virality to affiliate lift, Genie Collective creates partnerships that move quickly
          and land credibly.
        </p>
      </section>

      <section className="concept-archive-grid">
        {campaigns.map((campaign, index) => (
          <article key={campaign.title} className={`concept-archive-card concept-archive-card-${index + 1}`}>
            <div className="concept-archive-media" />
            <h2>{campaign.title}</h2>
            <p>{campaign.note}</p>
          </article>
        ))}
      </section>

      <section className="concept-archive-lower">
        <div>
          <div className="concept-section-label">Approach</div>
          <p>
            Personal relationships unlock clearer communication, faster timelines, and partnerships
            with fewer intermediaries.
          </p>
        </div>
        <div>
          <div className="concept-section-label">Services</div>
          <p>TikTok · Live Shopping · Affiliates · Instagram · YouTube</p>
        </div>
      </section>
    </main>
  )
}
