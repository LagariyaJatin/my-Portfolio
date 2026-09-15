import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../motion/motionCore.js'

/**
 * Magnetic pull effect. While the pointer is within `radius` px of the
 * element's center, the element translates toward the cursor (capped),
 * then springs back on exit. Transform-only; disabled for reduced motion
 * and on touch/coarse pointers.
 */
export default function useMagnetic({ radius = 90, strength = 0.35, maxShift = 10 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    let raf = 0
    let currentX = 0
    let currentY = 0
    let targetX = 0
    let targetY = 0
    let active = false

    const tick = () => {
      // Critically-damped easing toward the target: fast approach, soft settle
      currentX += (targetX - currentX) * 0.16
      currentY += (targetY - currentY) * 0.16
      if (Math.abs(currentX) < 0.05 && Math.abs(currentY) < 0.05 && !active) {
        currentX = 0
        currentY = 0
        el.style.transform = ''
        raf = 0
        return
      }
      el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`
      raf = requestAnimationFrame(tick)
    }

    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const distance = Math.hypot(dx, dy)

      if (distance < radius + Math.max(rect.width, rect.height) / 2) {
        active = true
        const falloff = 1 - Math.min(distance / (radius + Math.max(rect.width, rect.height) / 2), 1)
        const pull = strength * falloff
        targetX = Math.max(-maxShift, Math.min(maxShift, dx * pull))
        targetY = Math.max(-maxShift, Math.min(maxShift, dy * pull))
      } else {
        active = false
        targetX = 0
        targetY = 0
      }
      start()
    }

    const onLeave = () => {
      active = false
      targetX = 0
      targetY = 0
      start()
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('blur', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('blur', onLeave)
      if (raf) cancelAnimationFrame(raf)
      el.style.transform = ''
    }
  }, [radius, strength, maxShift])

  return ref
}
