import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox','--disable-dev-shm-usage'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 1 })
// Use 'load' not 'networkidle0' (Google Fonts inside iframe never settles)
await page.goto('http://localhost:5173/work/kindness-ai', { waitUntil: 'load', timeout: 15000 })
await new Promise((r) => setTimeout(r, 2500))
await page.evaluate(() => {
  const li = Array.from(document.querySelectorAll('li')).find((el) => /Product Design Infrastructure/.test(el.textContent || ''))
  if (li) {
    const fig = li.querySelector('figure')
    if (fig) window.scrollTo({ top: fig.getBoundingClientRect().top + window.scrollY - 60, behavior: 'instant' })
  }
})
await new Promise((r) => setTimeout(r, 1500))
await page.screenshot({ path: '/tmp/kindness-ch1-live.png', fullPage: false })
await browser.close()
