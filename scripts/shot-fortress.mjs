import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 1 })
await page.goto('http://localhost:5173/work/fortress-a2v', { waitUntil: 'networkidle0', timeout: 30000 })
await new Promise((r) => setTimeout(r, 800))
await page.screenshot({ path: '/tmp/fortress-top.png', fullPage: false })

await page.evaluate(() => {
  const li = Array.from(document.querySelectorAll('li')).find((el) => /Asset-to-Vendor Network/.test(el.textContent || ''))
  if (li) window.scrollTo({ top: li.getBoundingClientRect().top + window.scrollY - 40, behavior: 'instant' })
})
await new Promise((r) => setTimeout(r, 1200))
await page.screenshot({ path: '/tmp/fortress-ch1.png', fullPage: false })

await browser.close()
