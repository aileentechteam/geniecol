const splineUrl = 'https://my.spline.design/interactiveportal-5ddc1c72719738f0ff93088a739ef9b4/'

export default function HomePage() {
  return (
    <main className="genie-shell">
      <div className="genie-spline-layer" aria-hidden="true">
        <iframe
          className="genie-spline"
          src={splineUrl}
          frameBorder="0"
          title="Genie Collective background"
        />
      </div>

      <header className="genie-crest-wrap" aria-label="Genie Collective crest">
        <img className="genie-crest" src="/brand/crest.svg" alt="Genie Collective crest" />
      </header>

      <section className="genie-logo-wrap" aria-label="Genie Collective logo">
        <img className="genie-logo" src="/brand/logo-wordmark.svg" alt="Genie Collective" />
      </section>

      <footer className="genie-footer">
        <a href="mailto:wish@geniecol.com" className="genie-email">
          wish@geniecol.com
        </a>
        <br />© 2025 Genie Collective. All rights reserved.
      </footer>
    </main>
  )
}
