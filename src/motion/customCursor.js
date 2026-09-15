// Custom cursor tracker — the provided vanilla implementation, kept as-is
// except for two adaptations: the ring size tuned to the theme's 8px grid,
// and the rAF id being tracked so React can cancel the loop on unmount.
// Structure, classes, lerp factor (0.15) and the 64px .hovered state are unchanged.

export function initCustomCursor() {
  const dot = document.querySelector('.cursor-dot')
  const ring = document.querySelector('.cursor-ring')
  if (!dot || !ring) return () => {}

  let mouseX = 0
  let mouseY = 0
  let ringX = 0
  let ringY = 0
  let raf = 0

  const onMouseMove = (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
    dot.style.left = mouseX + 'px'
    dot.style.top = mouseY + 'px'
  }
  window.addEventListener('mousemove', onMouseMove)

  function animateRing() {
    ringX += (mouseX - ringX) * 0.15
    ringY += (mouseY - ringY) * 0.15
    ring.style.left = ringX + 'px'
    ring.style.top = ringY + 'px'
    raf = requestAnimationFrame(animateRing)
  }
  animateRing()

  const hoverEls = document.querySelectorAll('a, button, .project-card')
  hoverEls.forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'))
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'))
  })

  return () => {
    window.removeEventListener('mousemove', onMouseMove)
    cancelAnimationFrame(raf)
  }
}
