import puppeteer from 'puppeteer-core'

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 })
await page.goto('http://localhost:5173/work/medefy', { waitUntil: 'networkidle0', timeout: 30000 })
await new Promise((r) => setTimeout(r, 800))

const y = await page.evaluate(() => {
  const ch3 = Array.from(document.querySelectorAll('li')).find((li) => /MyBenefitsFlorida/.test(li.textContent || ''))
  if (!ch3) return 0
  const rect = ch3.getBoundingClientRect()
  return rect.top + window.scrollY
})
// Land deeper in the iframe so the "Before — Figma designs" section is visible
await page.evaluate((y) => window.scrollTo({ top: y + 1200, behavior: 'instant' }), y)
await new Promise((r) => setTimeout(r, 1500))
await page.screenshot({ path: '/tmp/ch3-deep.png', fullPage: false })
await browser.close()
