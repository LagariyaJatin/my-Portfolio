// Scroll reveal — GSAP ScrollTrigger on `.reveal-up` elements
// (y: 40, opacity: 0, duration: 0.8, ease 'power2.out', start 'top 85%').
//
// React safety (this bit is critical):
// gsap.context() scopes every tween it creates and ctx.revert() undoes the
// inline styles they applied. Without it, React StrictMode's dev double-mount
// killed tweens mid-flight and left sections stuck at opacity 0 — the
// "pages disappeared" bug. With it, unmount always restores the natural
// styles, so content can never be stranded invisible in dev.

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
// Large frame gaps (tab switches, slow devices) must not stall tweens.
gsap.ticker.lagSmoothing(0)

export function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {}
  }

  const lenis = globalThis.__lenis
  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update)
  }

  const ctx = gsap.context(() => {
    document.querySelectorAll('.reveal-up').forEach((el) => {
      gsap.from(el, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
      })
    })
  })

  ScrollTrigger.refresh()
  const onLoad = () => ScrollTrigger.refresh()
  window.addEventListener('load', onLoad)

  return () => {
    window.removeEventListener('load', onLoad)
    ctx.revert()
  }
}
