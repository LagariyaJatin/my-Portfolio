import { useEffect, useState } from 'react'
import './Loader.css'

/**
 * First-visit intro animation. A mono wordmark and a progress bar play,
 * then the whole panel slides up. Total ~1.1s, skipped entirely under
 * reduced motion. Calls onDone when the page should be considered ready.
 */
export default function Loader({ onDone }) {
  const [leaving, setLeaving] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setGone(true)
      onDone?.()
      return
    }

    // Lock scroll while the loader is up
    document.body.style.overflow = 'hidden'
    const leaveTimer = setTimeout(() => setLeaving(true), 820)
    const doneTimer = setTimeout(() => {
      setGone(true)
      document.body.style.overflow = ''
      onDone?.()
    }, 1360)

    return () => {
      clearTimeout(leaveTimer)
      clearTimeout(doneTimer)
      document.body.style.overflow = ''
    }
  }, [onDone])

  if (gone) return null

  return (
    <div className={`loader ${leaving ? 'is-leaving' : ''}`} aria-hidden="true">
      <div className="loader__inner">
        <span className="loader__mark">
          <span className="loader__square" />
          JATIN
        </span>
        <span className="loader__track">
          <span className="loader__bar" />
        </span>
      </div>
    </div>
  )
}
