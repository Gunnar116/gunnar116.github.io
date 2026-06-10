import { useState, type FormEvent, type ReactNode } from 'react'

/**
 * Lightweight client-side password gate.
 *
 * IMPORTANT — this is deterrence, not real security. On a static host
 * (GitHub Pages) the whole site, including this password, ships to the
 * browser, so a determined visitor can bypass it via devtools. It keeps the
 * portfolio out of casual view and out of search (paired with the noindex meta
 * tag in index.html). For genuine access control, host behind something like
 * Cloudflare Access instead.
 *
 * The password is read from VITE_SITE_PASSWORD at build time (set it in a
 * gitignored .env so it stays out of source), falling back to the constant
 * below. Change either to update the shared password.
 */
const SITE_PASSWORD = import.meta.env.VITE_SITE_PASSWORD ?? 'ThanksForBeingHere!'
const STORAGE_KEY = 'gm-portfolio-access'

function alreadyUnlocked() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'granted'
  } catch {
    return false
  }
}

export function PasswordGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(alreadyUnlocked)
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  if (unlocked) return <>{children}</>

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (value.trim() === SITE_PASSWORD) {
      try {
        localStorage.setItem(STORAGE_KEY, 'granted')
      } catch {
        /* storage unavailable — unlock for this view anyway */
      }
      setUnlocked(true)
    } else {
      setError(true)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-6 py-16">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[380px] rounded-2xl border border-border bg-surface px-7 py-9 text-center shadow-[0_28px_64px_-36px_rgba(20,20,20,0.42)] sm:px-9 sm:py-11"
      >
        <img
          src="/images/grm-logo.png"
          alt="Gunnar Morgan"
          width={807}
          height={325}
          className="mx-auto h-7 w-auto"
        />

        <h1 className="mt-7 text-[1.375rem] font-semibold tracking-[-0.015em] text-ink">
          This portfolio is private.
        </h1>
        <p className="mt-2 text-[14px] leading-[1.6] text-muted">
          Enter the password to continue.
        </p>

        <div className="mt-7 text-left">
          <label htmlFor="site-password" className="sr-only">
            Password
          </label>
          <input
            id="site-password"
            type="password"
            autoFocus
            autoComplete="off"
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              if (error) setError(false)
            }}
            aria-invalid={error}
            aria-describedby={error ? 'site-password-error' : undefined}
            placeholder="Password"
            className="focus-ring w-full rounded-full border border-border-strong bg-cream px-5 py-3 text-[15px] text-ink transition-colors placeholder:text-muted-soft hover:border-ink/40"
          />
          {error && (
            <p id="site-password-error" role="alert" className="mt-2 px-1 text-[13px] text-accent-strong">
              That password didn’t work. Please try again.
            </p>
          )}
        </div>

        <button
          type="submit"
          className="btn-primary mt-5 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-[14px] font-medium motion-safe:hover:-translate-y-[1px]"
        >
          Enter
        </button>
      </form>
    </main>
  )
}
