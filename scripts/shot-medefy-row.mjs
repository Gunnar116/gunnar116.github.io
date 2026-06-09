import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox'],
})
async function shot(w, h, file) {
  const page = await browser.newPage()
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 })
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 30000 })
  await new Promise((r) => setTimeout(r, 600))
  await page.evaluate(() => {
    const link = document.querySelector('a[href*="/work/medefy"]')
    if (link) window.scrollTo({ top: link.getBoundingClientRect().top + window.scrollY - 60, behavior: 'instant' })
  })
  await new Promise((r) => setTimeout(r, 1200))
  await page.screenshot({ path: file, fullPage: false })
  await page.close()
}
await shot(1440, 900, '/tmp/medefy-row.png')
await shot(420, 900, '/tmp/medefy-row-mobile.png')
await browser.close()
