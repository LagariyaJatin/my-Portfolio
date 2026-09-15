import { useEffect } from 'react'
import Lenis from 'lenis'
import Header from './components/Header.jsx'
import About from './components/About.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import Method from './components/Method.jsx'
import Tools from './components/Tools.jsx'
import Process from './components/Process.jsx'
import Testimonials from './components/Testimonials.jsx'
import CTA from './components/CTA.jsx'
import Footer from './components/Footer.jsx'
import Cursor from './components/Cursor.jsx'
import Loader from './components/Loader.jsx'
import { setLenis } from './motion/lenis.js'
import { initScrollReveal } from './motion/scrollReveal.js'
import { initCursor } from './motion/cursorSystem.js'
import { prefersReducedMotion } from './motion/motionCore.js'

export default function App() {
  // Buttery inertia scrolling + routed anchor navigation through Lenis
  useEffect(() => {
    if (prefersReducedMotion()) return
    // Debug escape hatch: /?nolenis disables smooth scroll for diagnostics
    if (new URLSearchParams(window.location.search).has('nolenis')) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    })
    setLenis(lenis)
    globalThis.__lenis = lenis
    document.documentElement.classList.add('lenis-active')

    let raf = 0
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // Delegate all in-page anchor clicks through Lenis for weighted scrolling
    const onClick = (e) => {
      const anchor = e.target.closest?.('a[href^="#"]')
      if (!anchor) return
      const hash = anchor.getAttribute('href')
      if (hash === '#' || hash === '') return
      e.preventDefault()
      if (hash === '#top') {
        lenis.scrollTo(0, { duration: 1.2 })
        return
      }
      const target = document.querySelector(hash)
      if (target) {
        lenis.scrollTo(target, { offset: -72, duration: 1.2 })
      }
    }
    document.addEventListener('click', onClick)

    // GSAP ScrollTrigger reveals (the provided snippet), after Lenis exists
    const cleanupReveal = initScrollReveal()
    // Boot the custom cursor here so it initializes after ALL sections are
    // mounted and its data-cursor listeners bind to the final DOM.
    const cleanupCursor = initCursor()

    return () => {
      cleanupReveal()
      cleanupCursor()
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(raf)
      lenis.destroy()
      setLenis(null)
      globalThis.__lenis = null
      document.documentElement.classList.remove('lenis-active')
    }
  }, [])

  return (
    <>
      <Loader />
      <Cursor />
      <Header />
      <main>
        <About />
        <Hero />
        <Projects />
        <Method />
        <Tools />
        <Process />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
