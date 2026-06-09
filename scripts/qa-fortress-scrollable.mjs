import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 1 })
await page.goto('http://localhost:5173/work/fortress-a2v', { waitUntil: 'networkidle0', timeout: 30000 })
await new Promise((r) => setTimeout(r, 1200))

// Inspect every figure / product-screen frame on page
const data = await page.evaluate(() => {
  const frames = Array.from(document.querySelectorAll('figure'))
  return frames.map((f) => {
    const img = f.querySelector('img')
    const scrollable = f.querySelector('[style*="overflow-y"], .overflow-y-auto')
    const openLink = f.querySelector('a[target="_blank"]')
    const label = f.querySelector('span.uppercase, span.text-\\[11px\\]')?.textContent?.trim()
    const isProductScreen = !!scrollable && !!openLink
    return {
      isProductScreen,
      label,
      imgSrc: img?.getAttribute('src'),
      openHref: openLink?.getAttribute('href'),
      openText: openLink?.textContent?.trim(),
      scrollHeight: scrollable?.clientHeight,
    }
  })
})
console.log('frames:', JSON.stringify(data, null, 2))

// Try scrolling inside the hero's scroll frame
const heroScrollResult = await page.evaluate(() => {
  const frames = document.querySelectorAll('figure .overflow-y-auto')
  const hero = frames[0]
  if (!hero) return { found: false }
  const before = hero.scrollTop
  hero.scrollTop = 400
  const after = hero.scrollTop
  return { found: true, before, after, scrolled: after > before }
})
console.log('hero-scroll:', JSON.stringify(heroScrollResult))

// Click on Ch 01 static image to verify lightbox still works
await page.evaluate(() => {
  const li = Array.from(document.querySelectorAll('li')).find((el) => /Asset-to-Vendor Network/.test(el.textContent || ''))
  const btn = li?.querySelector('figure button')
  btn?.click()
})
await new Promise((r) => setTimeout(r, 500))
const lb = await page.evaluate(() => {
  const d = document.querySelector('[role="dialog"]')
  if (!d) return null
  return { src: d.querySelector('img')?.getAttribute('src'), hasFigcap: !!d.querySelector('figcaption, .caption') }
})
console.log('ch1-lightbox:', JSON.stringify(lb))
await browser.close()
