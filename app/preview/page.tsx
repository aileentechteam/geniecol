const experiments = [
  {
    title: 'Home v4 · Luxury Minimal',
    status: 'Kept',
    path: '/preview/home-v4',
    description: 'Your current favorite: restrained, centered, and very sparse.',
  },
  {
    title: 'Home v5 · Left Aligned Statement',
    status: 'New',
    path: '/preview/home-v5',
    description: 'Minimal but less formal: a stronger editorial left-aligned composition.',
  },
  {
    title: 'Home v6 · Framed Statement',
    status: 'New',
    path: '/preview/home-v6',
    description: 'A contained luxury layout with a single high-trust message block.',
  },
  {
    title: 'Home v7 · Stacked Manifesto',
    status: 'New',
    path: '/preview/home-v7',
    description: 'Vertical, fashion-editorial structure with a slightly stronger point of view.',
  },
  {
    title: 'Home v8 · Monument',
    status: 'New',
    path: '/preview/home-v8',
    description: 'A dramatic centered direction with a stronger brand-mark presence.',
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
            Current batch: five minimalist homepage options, refined around the luxury direction you liked best.
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
