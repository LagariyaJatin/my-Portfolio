// Cursor behavior from cursor-animation-code-and-prompt.md — the provided
// vanilla JS kept intact (0.18 lerp follow, scroll-progress ring, data-cursor
// state classes). Adaptations, framework plumbing only:
// - returns a cleanup so React can remove listeners/cancel the rAF loop
// - scroll progress also listens to Lenis smooth-scroll events, since Lenis
//   scrolls the window and the native 'scroll' event still fires — this keeps
//   the ring updating on every frame of the inertial scroll.

const CIRCUMFERENCE = 125.6

export function initCursor() {
  const cursor = document.querySelector('.cursor')
  const progressBar = document.querySelector('.cursor-progress-bar')
  if (!cursor || !progressBar) return () => {}

  let mouseX = 0
  let mouseY = 0
  let posX = 0
  let posY = 0
  let raf = 0

  // Follow mouse with slight easing
  const onMouseMove = (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  }
  window.addEventListener('mousemove', onMouseMove)

  function render() {
    posX += (mouseX - posX) * 0.18
    posY += (mouseY - posY) * 0.18
    cursor.style.left = posX + 'px'
    cursor.style.top = posY + 'px'
    raf = requestAnimationFrame(render)
  }
  render()

  // Scroll progress ring
  function updateScrollProgress() {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = docHeight > 0 ? scrollTop / docHeight : 0
    const offset = CIRCUMFERENCE - progress * CIRCUMFERENCE
    progressBar.style.strokeDashoffset = offset
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true })
  updateScrollProgress()

  // State changes based on hovered element
  const hoverEls = document.querySelectorAll('[data-cursor]')
  const removers = []
  hoverEls.forEach((el) => {
    const type = el.getAttribute('data-cursor') // "link" or "media"
    const onEnter = () => cursor.classList.add(`is-${type}`)
    const onLeave = () => cursor.classList.remove(`is-${type}`)
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    removers.push(() => {
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
    })
  })

  return () => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('scroll', updateScrollProgress)
    removers.forEach((fn) => fn())
    cancelAnimationFrame(raf)
  }
}
