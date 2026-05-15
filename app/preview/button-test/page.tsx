import WishButtonCanvas from './WishButtonCanvas'

export default function ButtonTestPage() {
  return (
    <main className="button-test-shell">
      <div className="button-test-wrap">
        <div className="concept-section-label">Glitch button</div>
        <div className="button-test-grid">
          <div className="button-test-state">
            <div className="button-test-state-label">Default</div>
            <WishButtonCanvas />
          </div>
          <div className="button-test-state">
            <div className="button-test-state-label">Hover / tap inverse</div>
            <WishButtonCanvas forceInverted />
          </div>
        </div>
      </div>
    </main>
  )
}
