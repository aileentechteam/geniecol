export default function ButtonTestPage() {
  return (
    <main className="button-test-shell">
      <div className="button-test-wrap">
        <div className="concept-section-label">Animated button test</div>
        <button className="wish-button wish-button-rect" type="button" aria-label="wish">
          <span className="wish-button-plume wish-button-plume-1" aria-hidden="true" />
          <span className="wish-button-plume wish-button-plume-2" aria-hidden="true" />
          <span className="wish-button-plume wish-button-plume-3" aria-hidden="true" />
          <span className="wish-button-smoke wish-button-smoke-1" aria-hidden="true" />
          <span className="wish-button-smoke wish-button-smoke-2" aria-hidden="true" />
          <span className="wish-button-smoke wish-button-smoke-3" aria-hidden="true" />
          <span className="wish-button-haze" aria-hidden="true" />
          <span className="wish-button-text">wish</span>
        </button>
      </div>
    </main>
  )
}
