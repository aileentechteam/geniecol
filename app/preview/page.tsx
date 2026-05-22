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
    description: 'The lone non-centered outlier kept for comparison.',
  },
  {
    title: 'Smoke rectangle mockup',
    status: 'New',
    path: '/preview/smoke-rectangle',
    description: 'Concept image showing the smoke circle reshaped into a rectangle around the Genie Collective wordmark.',
  },
  {
    title: 'Crest test',
    status: 'Utility',
    path: '/preview/crest-test',
    description: 'Side-by-side comparison of the reference image, original SVG, and thicker outline SVG.',
  },
  {
    title: 'Glitch button',
    status: 'Utility',
    path: '/preview/button-test',
    description: 'Animated grayscale glitch button with slow luxurious motion.',
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
            Current set: just v4 and v5. Reminder for later: add the services section — TikTok, Live Shopping, Affiliates, Instagram, YouTube.
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
