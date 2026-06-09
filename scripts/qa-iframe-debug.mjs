import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1320, height: 900, deviceScaleFactor: 1 })
await page.goto('http://localhost:5173/work/kindness-ai/kindness-design-library.html', { waitUntil: 'load', timeout: 15000 })
await new Promise((r) => setTimeout(r, 1200))
const out = await page.evaluate(() => ({
  swatches: document.querySelectorAll('.fan-swatch').length,
  families: document.querySelectorAll('.fam').length,
  toggle: document.querySelectorAll('.mode-toggle button').length,
  tip6: document.querySelectorAll('.fam.kindigo .fan-swatch')[6]?.getAttribute('data-tip'),
}))
console.log(JSON.stringify(out, null, 2))

// Toggle dark mode
await page.click('.mode-toggle button[data-mode="dark"]')
await new Promise((r) => setTimeout(r, 400))
const darkVal = await page.evaluate(() => document.querySelectorAll('.fam.kindigo .fan-swatch')[6].style.background)
console.log('kindigo-600 dark:', darkVal)
await browser.close()
