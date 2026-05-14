const experiments = [
  {
    title: 'Homepage hero concepts',
    status: 'Ready for iteration',
    path: '/preview',
    description: 'We can place multiple homepage directions here for side-by-side review.',
  },
  {
    title: 'About / story page',
    status: 'Placeholder',
    path: '/preview/about-v1',
    description: 'Reserved for the first narrative brand page once you want it.',
  },
  {
    title: 'Services / offering page',
    status: 'Placeholder',
    path: '/preview/services-v1',
    description: 'Reserved for offer structure, positioning, and conversion experiments.',
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
          </article>
        ))}
      </section>
    </main>
  )
}
