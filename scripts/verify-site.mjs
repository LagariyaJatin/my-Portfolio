// Full site audit: confirms every section exists with its key content, the
// data-cursor attributes are wired, and captures screenshots for review.
// Scrolling is performed through Lenis when it is active (native scrollTo
// can fight Lenis's internal target and produce false negatives).
// Usage: node scripts/verify-site.mjs [url]
import puppeteer from 'puppeteer-core'
import fs from 'node:fs'

const url = process.argv[2] || 'http://localhost:4173/'

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
  args: ['--no-first-run', '--disable-gpu'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1400, height: 900 })
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })
await new Promise((r) => setTimeout(r, 4500))

// Scroll through the entire page so every ScrollTrigger fires
const scrolled = await page.evaluate(async () => {
  const useLenis = !!window.__lenis
  const step = window.innerHeight * 0.7
  const max = document.documentElement.scrollHeight
  for (let y = 0; y <= max; y += step) {
    if (useLenis) window.__lenis.scrollTo(y, { immediate: true })
    else window.scrollTo(0, y)
    await new Promise((r) => setTimeout(r, 250))
  }
  if (useLenis) window.__lenis.scrollTo(0, { immediate: true })
  else window.scrollTo(0, 0)
  return useLenis
})
await new Promise((r) => setTimeout(r, 1800)) // let final tweens finish
console.log('scrolled via lenis:', scrolled)

const audit = await page.evaluate(() => {
  const text = document.body.innerText
  const sections = [
    ['About', '#about', 'More Than Just Code'],
    ['Hero', '#top', 'I build websites that turn ideas into digital experiences'],
    ['Projects', '#work', 'Featured Projects'],
    ['Method', '.method', 'More Than Just Writing Code'],
    ['Tools', '#skills', 'Tools I Work With'],
    ['Process', '#process', 'How I Work'],
    ['Testimonials', '.testimonials', 'What People Say'],
    ['CTA', '#contact', "Have an idea? Let's build it"],
    ['Footer', '.footer', 'Jatin — Web Developer'],
  ]
  const sectionReport = sections.map(([name, sel, marker]) => {
    const el = document.querySelector(sel)
    return {
      name,
      exists: !!el,
      content: text.includes(marker),
      hidden: el ? parseFloat(getComputedStyle(el).opacity) < 0.99 : null,
    }
  })

  return {
    sections: sectionReport,
    counts: {
      revealUp: document.querySelectorAll('.reveal-up').length,
      cursorLink: document.querySelectorAll('[data-cursor="link"]').length,
      cursorMedia: document.querySelectorAll('[data-cursor="media"]').length,
      projectCards: document.querySelectorAll('.project-card').length,
      images: document.querySelectorAll('img').length,
      brokenImages: [...document.querySelectorAll('img')].filter((i) => !i.complete || i.naturalWidth === 0).length,
    },
    cursorEl: !!document.querySelector('.cursor'),
    hiddenReveals: [...document.querySelectorAll('.reveal-up')].filter(
      (el) => parseFloat(getComputedStyle(el).opacity) < 0.99,
    ).length,
    scrollY: window.scrollY,
    docHeight: document.documentElement.scrollHeight,
  }
})
console.log(JSON.stringify(audit, null, 2))

// Screenshots
fs.mkdirSync('shots', { recursive: true })
await page.screenshot({ path: 'shots/full.png', fullPage: true })
await page.screenshot({ path: 'shots/hero.png' })
console.log('screenshots saved to shots/')

await browser.close()
const problems = [
  ...audit.sections.filter((s) => !s.exists || !s.content || s.hidden),
  audit.hiddenReveals > 0 ? { name: 'hidden reveals' } : null,
  audit.counts.brokenImages > 0 ? { name: 'broken images' } : null,
].filter(Boolean)
process.exit(problems.length ? 1 : 0)
