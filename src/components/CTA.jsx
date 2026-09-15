import useMagnetic from '../hooks/useMagnetic.js'
import './CTA.css'

export default function CTA() {
  const startRef = useMagnetic()
  const emailRef = useMagnetic()

  return (
    <section id="contact" className="section cta">
      <div className="container">
        <div className="cta__panel reveal-up">
          <span className="cta__glow" aria-hidden="true" />

          <p className="cta__kicker">LET&apos;S COLLABORATE</p>
          <h2 className="cta__title">
            Have an idea? Let&apos;s build it.
          </h2>
          <p className="cta__sub">
            Tell me what you&apos;re working on and I&apos;ll get back to you.
          </p>

          <div className="cta__actions">
            <a ref={startRef} href="mailto:hello@jatin.dev?subject=Project%20Inquiry" className="btn btn--accent" data-cursor="link">
              Start a Project
            </a>
            <a ref={emailRef} href="mailto:hello@jatin.dev" className="btn btn--outline-dark" data-cursor="link">
              Email Me
            </a>
          </div>

          <div className="cta__socials">
            <a href="https://github.com/" target="_blank" rel="noreferrer">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
              </svg>
              GitHub
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M13.6 0H2.4A2.4 2.4 0 0 0 0 2.4v11.2A2.4 2.4 0 0 0 2.4 16h11.2a2.4 2.4 0 0 0 2.4-2.4V2.4A2.4 2.4 0 0 0 13.6 0ZM4.98 13.6H2.54V6.03h2.44V13.6ZM3.76 4.96a1.42 1.42 0 1 1 0-2.83 1.42 1.42 0 0 1 0 2.83Zm9.84 8.64h-2.44V9.92c0-.88-.02-2.01-1.23-2.01-1.23 0-1.42.96-1.42 1.95v3.74H6.07V6.03h2.34v1.03h.03c.33-.62 1.12-1.27 2.31-1.27 2.47 0 2.93 1.63 2.93 3.74v4.07Z" />
              </svg>
              LinkedIn
            </a>
            <a href="mailto:hello@jatin.dev">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="1" y="2.5" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="1.4" />
                <path d="m2 4 6 5 6-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Email
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
