import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 1 })
await page.goto('http://localhost:5173/work/fortress-a2v', { waitUntil: 'networkidle0', timeout: 30000 })
await new Promise((r) => setTimeout(r, 800))

// Hero
await page.evaluate(() => {
  const fig = document.querySelector('img[alt*="Asset-to-Vendor network visualization"]')
  if (fig) window.scrollTo({ top: fig.getBoundingClientRect().top + window.scrollY - 60, behavior: 'instant' })
})
await new Promise((r) => setTimeout(r, 700))
await page.screenshot({ path: '/tmp/fqa-hero.png' })

const chapterTitles = [
  ['Asset-to-Vendor Network', '/tmp/fqa-ch1.png'],
  ['Risk Visualization', '/tmp/fqa-ch2.png'],
  ['Dashboard Usability', '/tmp/fqa-ch3.png'],
  ['Design Leadership & System Patterns', '/tmp/fqa-ch4.png'],
]
for (const [title, out] of chapterTitles) {
  await page.evaluate((t) => {
    const li = Array.from(document.querySelectorAll('li')).find((el) => new RegExp(t).test(el.textContent || ''))
    if (li) window.scrollTo({ top: li.getBoundingClientRect().top + window.scrollY - 40, behavior: 'instant' })
  }, title)
  await new Promise((r) => setTimeout(r, 700))
  await page.screenshot({ path: out })
}

// Lightbox spot-check on Ch 04
await page.evaluate(() => {
  const li = Array.from(document.querySelectorAll('li')).find((el) => /Design Leadership/.test(el.textContent || ''))
  const btn = li?.querySelector('figure button, button')
  btn?.click()
})
await new Promise((r) => setTimeout(r, 600))
const lb = await page.evaluate(() => {
  const d = document.querySelector('[role="dialog"]')
  if (!d) return null
  return { src: d.querySelector('img')?.getAttribute('src'), hasFigcap: !!d.querySelector('figcaption, .caption') }
})
console.log('lightbox=', JSON.stringify(lb))
await browser.close()
