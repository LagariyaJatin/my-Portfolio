import { useEffect, useState } from 'react'
import useMagnetic from '../hooks/useMagnetic.js'
import './Header.css'

const LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const ctaRef = useMagnetic({ radius: 60, strength: 0.3, maxShift: 6 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">
        <a href="#top" className="header__logo" onClick={close}>
          <span className="header__logo-mark" aria-hidden="true" />
          JATIN
        </a>

        <nav className="header__nav" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="header__link" data-cursor="link">
              {l.label}
            </a>
          ))}
        </nav>

        <a ref={ctaRef} href="https://wa.me/919913987262?text=Hi%20Jatin!%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noreferrer" className="btn btn--dark header__cta" data-cursor="link">
          Let&apos;s Talk
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M2 10L10 2M10 2H4M10 2V8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        <button
          type="button"
          className={`header__burger ${open ? 'is-open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`header__sheet ${open ? 'is-open' : ''}`}>
        <nav className="header__sheet-nav" aria-label="Mobile">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className="header__sheet-link"
              style={{ transitionDelay: open ? `${80 + i * 45}ms` : '0ms' }}
              onClick={close}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a href="https://wa.me/919913987262?text=Hi%20Jatin!%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noreferrer" className="btn btn--dark header__sheet-cta" data-cursor="link" onClick={close}>
          Let&apos;s Talk
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M2 10L10 2M10 2H4M10 2V8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </header>
  )
}
