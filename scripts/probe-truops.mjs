import puppeteer from 'puppeteer-core'

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 1 })
await page.goto('http://localhost:5173/work/truops-platform', { waitUntil: 'networkidle0', timeout: 30000 })
await new Promise((r) => setTimeout(r, 500))
const data = await page.evaluate(() => ({
  iframes: Array.from(document.querySelectorAll('iframe')).map((f) => ({
    src: f.getAttribute('src'),
    title: f.getAttribute('title'),
    transform: getComputedStyle(f).transform,
  })),
  badges: Array.from(document.querySelectorAll('.text-\\[11px\\]'))
    .map((n) => (n.textContent || '').trim())
    .filter((t) => /prototype|report/i.test(t)),
}))
console.log(JSON.stringify(data, null, 2))
await browser.close()
