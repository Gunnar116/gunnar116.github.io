import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 1 })
await page.goto('http://localhost:5173/work/fortress-a2v', { waitUntil: 'networkidle0', timeout: 30000 })
await new Promise((r) => setTimeout(r, 1500))

// Inspect all iframes + figure frames
const data = await page.evaluate(() => {
  const iframes = Array.from(document.querySelectorAll('iframe')).map((f) => ({
    src: f.getAttribute('src'),
    title: f.getAttribute('title'),
    width: f.clientWidth,
    height: f.clientHeight,
  }))
  // Ch 04 specific
  const li = Array.from(document.querySelectorAll('li')).find((el) => /Design Leadership/.test(el.textContent || ''))
  const ch4Iframe = li?.querySelector('iframe')
  const ch4Badge = li?.querySelector('.text-\\[11px\\].uppercase')?.textContent?.trim()
  const ch4Open = li?.querySelector('a[target="_blank"]')
  return {
    iframes,
    ch4HasIframe: !!ch4Iframe,
    ch4IframeSrc: ch4Iframe?.getAttribute('src'),
    ch4Badge,
    ch4OpenHref: ch4Open?.getAttribute('href'),
    ch4OpenText: ch4Open?.textContent?.trim(),
  }
})
console.log(JSON.stringify(data, null, 2))

// Scroll to Ch 04 and screenshot
await page.evaluate(() => {
  const li = Array.from(document.querySelectorAll('li')).find((el) => /Design Leadership/.test(el.textContent || ''))
  if (li) window.scrollTo({ top: li.getBoundingClientRect().top + window.scrollY - 40, behavior: 'instant' })
})
await new Promise((r) => setTimeout(r, 1200))
await page.screenshot({ path: '/tmp/ch4-embed-live.png' })

// Test hover by going into the iframe directly
const ifr = await page.$('iframe[src*="design-system-board"]')
if (ifr) {
  const frame = await ifr.contentFrame()
  if (frame) {
    // find a fan-swatch and hover
    await frame.waitForSelector('.fan-swatch', { timeout: 5000 })
    const swatches = await frame.$$('.fan-swatch')
    console.log('iframe swatch count:', swatches.length)
    if (swatches[2]) {
      await swatches[2].hover()
      await new Promise((r) => setTimeout(r, 500))
      // check tooltip presence in computed styles
      const tooltipVisible = await frame.evaluate((el) => {
        const s = window.getComputedStyle(el, '::before')
        return { opacity: s.opacity, transform: s.transform }
      }, swatches[2])
      console.log('hover effect:', JSON.stringify(tooltipVisible))
    }
  }
}
await browser.close()
