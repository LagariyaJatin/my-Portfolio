// Lenis smooth-scroll singleton. Created once by App and shared so nav clicks,
// the cursor, and any future UI can scroll through the same instance.
let lenisInstance = null

export function setLenis(instance) {
  lenisInstance = instance
}

export function getLenis() {
  return lenisInstance
}
