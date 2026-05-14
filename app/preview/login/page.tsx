type LoginPageProps = {
  searchParams: Promise<{
    error?: string
    next?: string
    setup?: string
  }>
}

export default async function PreviewLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams
  const next = params.next && params.next.startsWith('/preview') ? params.next : '/preview'
  const hasError = params.error === '1'
  const setupMissing = params.setup === '1'

  return (
    <main className="preview-login-shell">
      <div className="preview-login-card">
        <div className="preview-kicker">Genie Collective staging</div>
        <h1 className="preview-title">Private design review area</h1>
        <p className="preview-copy">
          New pages, experiments, and design directions will live here first. Production stays on
          geniecol.com until you approve changes.
        </p>

        {setupMissing ? (
          <div className="preview-alert preview-alert-warning">
            Add a <code>STAGING_PASSWORD</code> environment variable in Vercel to turn on access.
          </div>
        ) : null}

        {hasError ? <div className="preview-alert">Wrong password. Try again.</div> : null}

        <form className="preview-form" action="/api/preview-login" method="post">
          <input type="hidden" name="next" value={next} />
          <label className="preview-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="preview-input"
            placeholder="Enter staging password"
            autoComplete="current-password"
            required
          />
          <button className="preview-button" type="submit">
            Enter staging
          </button>
        </form>
      </div>
    </main>
  )
}
