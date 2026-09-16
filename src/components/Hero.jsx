import { Fragment, useEffect, useState } from 'react'
import useMagnetic from '../hooks/useMagnetic.js'
import './Hero.css'

const BARS = [
  { h: 56, dark: true },
  { h: 78, dark: true },
  { h: 40, dark: false },
]

function MagneticLink({ className, href, children, ...rest }) {
  const ref = useMagnetic()
  return (
    <a ref={ref} href={href} className={className} {...rest}>
      {children}
    </a>
  )
}

/** Splits a sentence into word spans for the staggered reveal. */
function Words({ text }) {
  const words = text.split(' ')
  return words.map((word, i) => (
    <Fragment key={i}>
      <span className="hero__word-mask">
        <span className="hero__word" style={{ '--wd': `${i * 55}ms` }}>
          {word}
        </span>
      </span>
      {i < words.length - 1 ? ' ' : null}
    </Fragment>
  ))
}

export default function Hero() {
  // The hero waits for the loader to finish so its entrance is choreographed,
  // not competing with the overlay.
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setReady(true)
      return
    }
    const t = setTimeout(() => setReady(true), 900)
    return () => clearTimeout(t)
  }, [])

  return (
    <section id="top" className={`hero ${ready ? 'is-ready' : ''}`}>
      {/* Soft background glow */}
      <div className="hero__glow" aria-hidden="true">
        <span className="hero__glow-orb hero__glow-orb--1" />
        <span className="hero__glow-orb hero__glow-orb--2" />
        <span className="hero__grid-lines" />
      </div>

      <div className="container hero__grid">
        <div className="hero__content">
          <p className="hero__badge reveal-hero" style={{ '--hd': '40ms' }}>
            <span className="hero__badge-dot" />
            Available for freelance projects
          </p>
          <p className="hero__role reveal-hero" style={{ '--hd': '120ms' }}>
            WEB DEVELOPER · FREELANCER
          </p>
          <h1 className="hero__title" style={{ '--hd': '260ms' }}>
            <Words text="I Build Websites That Help Businesses Stand Out" />
          </h1>
          <p className="hero__sub reveal-hero" style={{ '--hd': '560ms' }}>
            I&apos;m Jatin, a web developer. I create modern, responsive websites for
            businesses, startups and individuals looking to build a professional
            online presence.
          </p>
          <p className="hero__sub hero__sub--second reveal-hero" style={{ '--hd': '600ms' }}>
            From design and development to deployment, I turn ideas into websites
            that are clean, user-friendly, and built around your goals.
          </p>
          <div className="hero__actions reveal-hero" style={{ '--hd': '660ms' }}>
            <MagneticLink href="#work" className="btn btn--dark" data-cursor="link">
              View My Work
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path
                  d="M6 1v10M2 7l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </MagneticLink>
            <MagneticLink href="https://wa.me/919913987262?text=Hi%20Jatin!%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noreferrer" className="btn btn--ghost" data-cursor="link">
              Start a Project
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path
                  d="M2 10L10 2M10 2H4M10 2V8"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </MagneticLink>
          </div>
        </div>

        {/* Code / architecture graphic card */}
        <aside
          className="hero__card card reveal-hero"
          style={{ '--hd': '480ms' }}
          aria-label="Code architecture card"
        >
          <div className="hero__card-top">
            <span className="hero__card-path">JATIN // WEB DEVELOPER</span>
            <span className="hero__card-status">AVAILABLE</span>
          </div>
          <p className="hero__card-title">Websites that make a strong first impression.</p>
          <p className="hero__card-sub">
            Clean design, responsive layouts, and a smooth experience across every screen.
          </p>
          <div className="hero__chart" aria-hidden="true">
            {BARS.map((b, i) => (
              <span
                key={i}
                className={`hero__bar ${b.dark ? 'hero__bar--dark' : 'hero__bar--ghost'}`}
                style={{ height: `${b.h}px`, transitionDelay: `${i * 90}ms` }}
              />
            ))}
            <span className="hero__chart-caption">SCALE // 8_PT</span>
          </div>
        </aside>
      </div>
    </section>
  )
}
