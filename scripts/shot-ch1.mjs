import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 1 })
await page.goto('http://localhost:5173/work/medefy', { waitUntil: 'networkidle0', timeout: 30000 })
await new Promise((r) => setTimeout(r, 800))
await page.evaluate(() => {
  const li = Array.from(document.querySelectorAll('li')).find((el) => /Texoma Care Guide/.test(el.textContent || ''))
  if (li) window.scrollTo({ top: li.getBoundingClientRect().top + window.scrollY - 40, behavior: 'instant' })
})
await new Promise((r) => setTimeout(r, 900))
await page.screenshot({ path: '/tmp/ch1-new.png', fullPage: false })

// Click image to verify lightbox
const ch1Img = await page.evaluateHandle(() => {
  const li = Array.from(document.querySelectorAll('li')).find((el) => /Texoma Care Guide/.test(el.textContent || ''))
  return li?.querySelector('figure button img') || li?.querySelector('button img')
})
if (ch1Img) {
  await page.evaluate((img) => img.click(), ch1Img)
  await new Promise((r) => setTimeout(r, 700))
  const lightbox = await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"]')
    if (!dialog) return null
    const img = dialog.querySelector('img')
    const caption = dialog.querySelector('figcaption, .caption')
    return {
      hasImg: !!img,
      imgSrc: img?.getAttribute('src'),
      hasCaption: !!caption,
    }
  })
  console.log('lightbox', JSON.stringify(lightbox))
  await page.screenshot({ path: '/tmp/ch1-lightbox.png', fullPage: false })
}
await browser.close()
