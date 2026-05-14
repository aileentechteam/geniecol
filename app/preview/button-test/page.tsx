export default function ButtonTestPage() {
  return (
    <main className="button-test-shell">
      <div className="button-test-wrap">
        <div className="concept-section-label">Animated button test</div>
        <button className="wish-button" type="button" aria-label="wish">
          <span className="wish-button-flame wish-button-flame-back" aria-hidden="true" />
          <span className="wish-button-flame wish-button-flame-mid" aria-hidden="true" />
          <span className="wish-button-flame wish-button-flame-front" aria-hidden="true" />
          <span className="wish-button-smoke wish-button-smoke-back" aria-hidden="true" />
          <span className="wish-button-smoke wish-button-smoke-mid" aria-hidden="true" />
          <span className="wish-button-glow" aria-hidden="true" />
          <span className="wish-button-text">wish</span>
        </button>
      </div>
    </main>
  )
}
