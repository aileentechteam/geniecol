export default function PreviewSmokeRectanglePage() {
  return (
    <main className="smoke-mockup-shell">
      <section className="smoke-mockup-header">
        <div className="preview-kicker">Staging concept</div>
        <h1 className="smoke-mockup-title">Smoke rectangle around the Genie Collective wordmark</h1>
        <p className="smoke-mockup-copy">
          Quick visual mockup of the current smoke-circle idea reshaped into a rectangular frame around the wordmark.
        </p>
      </section>

      <section className="smoke-mockup-stage">
        <img
          src="/assets/smoke-rectangle-mockup.png"
          alt="Mockup showing a smoky rectangular frame around the Genie Collective wordmark"
          className="smoke-mockup-image"
        />
      </section>
    </main>
  )
}
