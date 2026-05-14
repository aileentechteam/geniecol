const experiments = [
  {
    title: 'Home v4 · Luxury Minimal',
    status: 'Kept',
    path: '/preview/home-v4',
    description: 'Baseline favorite with the centered sparse composition you liked.',
  },
  {
    title: 'Home v5 · Left Aligned Statement',
    status: 'Kept',
    path: '/preview/home-v5',
    description: 'The lone non-centered outlier kept for comparison against the new batch.',
  },
  {
    title: 'Home v9 · Floating Statement',
    status: 'New',
    path: '/preview/home-v9',
    description: 'Centered V4 descendant with a softer floating editorial feel.',
  },
  {
    title: 'Home v10 · Refined Corporate Luxury',
    status: 'New',
    path: '/preview/home-v10',
    description: 'Sharper, more polished, and slightly more executive in tone.',
  },
  {
    title: 'Home v11 · Gallery Minimal',
    status: 'New',
    path: '/preview/home-v11',
    description: 'Still minimal, but introduces a restrained visual gallery cue.',
  },
  {
    title: 'Home v12 · Monolith',
    status: 'New',
    path: '/preview/home-v12',
    description: 'Heavier single-block statement with a stronger luxury gravity.',
  },
  {
    title: 'Home v13 · Layered Editorial',
    status: 'New',
    path: '/preview/home-v13',
    description: 'The most fashion-editorial variant in this new centered batch.',
  },
]

export default function PreviewIndexPage() {
  return (
    <main className="preview-shell">
      <section className="preview-header">
        <div>
          <div className="preview-kicker">Password-protected</div>
          <h1 className="preview-title">Genie Collective staging area</h1>
          <p className="preview-copy">
            Desktop-first batch. New concepts follow the centered V4 direction with the fixed tagline beneath the crest. Reminder: add the services section later — TikTok, Live Shopping, Affiliates, Instagram, YouTube.
          </p>
        </div>
        <a className="preview-production-link" href="/">
          View production site
        </a>
      </section>

      <section className="preview-grid">
        {experiments.map((experiment) => (
          <article key={experiment.title} className="preview-card">
            <div className="preview-card-top">
              <span className="preview-status">{experiment.status}</span>
              <span className="preview-path">{experiment.path}</span>
            </div>
            <h2>{experiment.title}</h2>
            <p>{experiment.description}</p>
            <a href={experiment.path} className="preview-card-link">
              Open concept
            </a>
          </article>
        ))}
      </section>
    </main>
  )
}
