import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 1 })
await page.goto('http://localhost:5173/work/fortress-a2v', { waitUntil: 'networkidle0', timeout: 30000 })
await new Promise((r) => setTimeout(r, 1200))

// Click Ch 04 image -> lightbox check
await page.evaluate(() => {
  const li = Array.from(document.querySelectorAll('li')).find((el) => /Design Leadership/.test(el.textContent || ''))
  if (li) window.scrollTo({ top: li.getBoundingClientRect().top + window.scrollY - 40, behavior: 'instant' })
})
await new Promise((r) => setTimeout(r, 500))
await page.screenshot({ path: '/tmp/ds-board-live.png' })

await page.evaluate(() => {
  const li = Array.from(document.querySelectorAll('li')).find((el) => /Design Leadership/.test(el.textContent || ''))
  const btn = li?.querySelector('figure button')
  btn?.click()
})
await new Promise((r) => setTimeout(r, 500))
const lb = await page.evaluate(() => {
  const d = document.querySelector('[role="dialog"]')
  if (!d) return null
  return { src: d.querySelector('img')?.getAttribute('src'), hasFigcap: !!d.querySelector('figcaption, .caption') }
})
console.log('ch4-lightbox:', JSON.stringify(lb))

// Confirm Ch 02/Ch 03 scrollable + hero scrollable still alive
const frameAudit = await page.evaluate(() => {
  const f = Array.from(document.querySelectorAll('figure'))
  return f.map((el) => {
    const img = el.querySelector('img')
    const isScroll = !!el.querySelector('.overflow-y-auto')
    return { src: img?.getAttribute('src'), isProductScreen: isScroll }
  })
})
console.log('all-frames:', JSON.stringify(frameAudit, null, 2))
await browser.close()
