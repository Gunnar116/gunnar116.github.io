import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 })
await page.goto('http://localhost:5173/work/fortress-a2v', { waitUntil: 'networkidle0', timeout: 30000 })
await new Promise((r) => setTimeout(r, 1200))

// hero
await page.evaluate(() => {
  const f = document.querySelector('figure')
  if (f) window.scrollTo({ top: f.getBoundingClientRect().top + window.scrollY - 60, behavior: 'instant' })
})
await new Promise((r) => setTimeout(r, 800))
await page.screenshot({ path: '/tmp/ff-hero-scroll.png' })

// Ch 02
await page.evaluate(() => {
  const li = Array.from(document.querySelectorAll('li')).find((el) => /Risk Visualization/.test(el.textContent || ''))
  if (li) window.scrollTo({ top: li.getBoundingClientRect().top + window.scrollY - 40, behavior: 'instant' })
})
await new Promise((r) => setTimeout(r, 800))
await page.screenshot({ path: '/tmp/ff-ch2-scroll.png' })

// Ch 03
await page.evaluate(() => {
  const li = Array.from(document.querySelectorAll('li')).find((el) => /Dashboard Usability/.test(el.textContent || ''))
  if (li) window.scrollTo({ top: li.getBoundingClientRect().top + window.scrollY - 40, behavior: 'instant' })
})
await new Promise((r) => setTimeout(r, 800))
await page.screenshot({ path: '/tmp/ff-ch3-scroll.png' })
await browser.close()
