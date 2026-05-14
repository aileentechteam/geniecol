const experiments = [
  {
    title: 'Home v1 · Editorial Statement',
    status: 'Ready',
    path: '/preview/home-v1',
    description: 'Centered poster-style homepage inspired most directly by your reference graphic.',
  },
  {
    title: 'Home v2 · Split Narrative',
    status: 'Ready',
    path: '/preview/home-v2',
    description: 'Left-copy/right-campaign layout with a more modern web feel.',
  },
  {
    title: 'Home v3 · Campaign Archive',
    status: 'Ready',
    path: '/preview/home-v3',
    description: 'Proof-first layout that treats the homepage like a curated portfolio.',
  },
  {
    title: 'Home v4 · Luxury Minimal',
    status: 'Ready',
    path: '/preview/home-v4',
    description: 'Ultra-minimal landing page with maximum negative space and restraint.',
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
            This is where I’ll put design explorations before anything touches production.
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
