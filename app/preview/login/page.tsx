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
      <div className="preview-login-card preview-login-card-branded">
        <div className="preview-brand-crest-wrap">
          <img className="preview-brand-crest" src="/brand/crest.svg" alt="Genie Collective crest" />
        </div>

        <img className="preview-brand-logo" src="/brand/logo-wordmark.svg" alt="Genie Collective" />

        <p className="preview-copy preview-copy-centered">
          private area. go away or email{' '}
          <a href="mailto:wish@geniecol.com" className="preview-inline-link">
            wish@geniecol.com
          </a>
        </p>

        {setupMissing ? (
          <div className="preview-alert preview-alert-warning">
            Add a <code>STAGING_PASSWORD</code> environment variable in Vercel to turn on access.
          </div>
        ) : null}

        {hasError ? <div className="preview-alert">Wrong password. Try again.</div> : null}

        <form className="preview-form" action="/api/preview-login" method="post">
          <input type="hidden" name="next" value={next} />
          <input
            id="password"
            name="password"
            type="password"
            className="preview-input"
            placeholder="Password"
            autoComplete="current-password"
            required
          />
          <button className="preview-button" type="submit">
            Enter
          </button>
        </form>
      </div>
    </main>
  )
}
