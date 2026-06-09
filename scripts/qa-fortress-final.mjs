import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 1 })
await page.goto('http://localhost:5173/work/fortress-a2v', { waitUntil: 'networkidle0', timeout: 30000 })
await new Promise((r) => setTimeout(r, 1000))

// click each chapter image -> verify lightbox
const targets = ['Asset-to-Vendor Network', 'Risk Visualization', 'Dashboard Usability', 'Design Leadership']
for (const t of targets) {
  await page.evaluate((title) => {
    const li = Array.from(document.querySelectorAll('li')).find((el) => new RegExp(title).test(el.textContent || ''))
    const btn = li?.querySelector('figure button, button')
    btn?.click()
  }, t)
  await new Promise((r) => setTimeout(r, 500))
  const lb = await page.evaluate(() => {
    const d = document.querySelector('[role="dialog"]')
    if (!d) return null
    return { src: d.querySelector('img')?.getAttribute('src'), hasFigcap: !!d.querySelector('figcaption, .caption') }
  })
  console.log(`Ch[${t}]:`, JSON.stringify(lb))
  // close lightbox
  await page.evaluate(() => document.querySelector('[role="dialog"] button[aria-label="Close image"]')?.click())
  await new Promise((r) => setTimeout(r, 300))
}
await browser.close()
