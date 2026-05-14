export default function CrestTestPage() {
  return (
    <main className="crest-test-shell">
      <section className="crest-test-header">
        <div className="concept-section-label">Crest comparison</div>
        <h1 className="crest-test-title">Original vs thicker outline</h1>
        <p className="crest-test-copy">
          Side-by-side review for the Genie Collective crest outline treatment.
        </p>
      </section>

      <section className="crest-test-grid">
        <article className="crest-test-card">
          <div className="crest-test-label">Reference image</div>
          <div className="crest-test-stage crest-test-stage-image">
            <img src="/brand/crest-reference.jpg" alt="Uploaded crest reference" className="crest-test-reference" />
          </div>
        </article>

        <article className="crest-test-card">
          <div className="crest-test-label">Original SVG</div>
          <div className="crest-test-stage">
            <img src="/brand/crest-original.svg" alt="Original crest SVG" className="crest-test-crest" />
          </div>
        </article>

        <article className="crest-test-card">
          <div className="crest-test-label">Thicker outline SVG</div>
          <div className="crest-test-stage">
            <img src="/brand/crest-thick.svg" alt="Thicker outline crest SVG" className="crest-test-crest" />
          </div>
        </article>
      </section>
    </main>
  )
}
