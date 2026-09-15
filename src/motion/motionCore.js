// Shared helpers for the motion system.

/** True when the user prefers reduced motion. Evaluated live each call. */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
