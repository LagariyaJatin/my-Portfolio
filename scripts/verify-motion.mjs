// Full-page motion verification (real time, no virtual-time distortion):
// 1) load, 2) scroll through the entire page in steps (triggering every
// ScrollTrigger), 3) report any .reveal-up element still not fully visible.
// Usage: node scripts/verify-motion.mjs [url]
import puppeteer from 'puppeteer-core'

const url = process.argv[2] || 'http://localhost:4173/'

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
  args: ['--no-first-run', '--disable-gpu'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1400, height: 900 })
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })
await new Promise((r) => setTimeout(r, 4500)) // loader + hero choreography

// Scroll through the page so every ScrollTrigger fires
await page.evaluate(async () => {
  const step = window.innerHeight * 0.7
  for (let y = 0; y <= document.body.scrollHeight; y += step) {
    window.scrollTo(0, y)
    await new Promise((r) => setTimeout(r, 220))
  }
  window.scrollTo(0, 0)
})
await new Promise((r) => setTimeout(r, 1500)) // let final tweens finish

const result = await page.evaluate(() => {
  const els = [...document.querySelectorAll('.reveal-up')]
  const bad = els
    .map((el) => ({ op: parseFloat(getComputedStyle(el).opacity), cls: el.className }))
    .filter((s) => s.op < 0.99)
  return { total: els.length, notFullyRevealed: bad.length, sample: bad.slice(0, 5) }
})
console.log(JSON.stringify(result, null, 2))

await browser.close()
process.exit(result.notFullyRevealed === 0 ? 0 : 1)
