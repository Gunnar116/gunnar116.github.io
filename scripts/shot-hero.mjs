import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 })
await page.goto('http://localhost:5173/work/medefy', { waitUntil: 'networkidle0', timeout: 30000 })
await new Promise((r) => setTimeout(r, 800))
await page.evaluate(() => {
  const img = document.querySelector('button img[alt*="three phone"]')
  if (img) {
    const r = img.getBoundingClientRect()
    window.scrollTo({ top: r.top + window.scrollY - 120, behavior: 'instant' })
  }
})
await new Promise((r) => setTimeout(r, 700))
await page.screenshot({ path: '/tmp/medefy-hero.png', fullPage: false })
await browser.close()
