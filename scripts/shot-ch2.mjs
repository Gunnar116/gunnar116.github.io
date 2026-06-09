import puppeteer from 'puppeteer-core'

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox'],
})

async function shoot(w, h, file) {
  const page = await browser.newPage()
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 })
  await page.goto('http://localhost:5173/work/medefy', { waitUntil: 'networkidle0', timeout: 30000 })
  await new Promise((r) => setTimeout(r, 600))
  const y = await page.evaluate(() => {
    const ch = Array.from(document.querySelectorAll('li')).find((li) => /Medefy Member Mobile App/.test(li.textContent || ''))
    if (!ch) return 0
    return ch.getBoundingClientRect().top + window.scrollY
  })
  await page.evaluate((y) => window.scrollTo({ top: y - 40, behavior: 'instant' }), y)
  await new Promise((r) => setTimeout(r, 1000))
  await page.screenshot({ path: file, fullPage: false })
  const info = await page.evaluate(() => {
    const ch = Array.from(document.querySelectorAll('li')).find((li) => /Medefy Member Mobile App/.test(li.textContent || ''))
    if (!ch) return null
    const imgs = Array.from(ch.querySelectorAll('button[aria-label^="Enlarge image"] img'))
    return {
      visibleImageCount: imgs.length,
      rects: imgs.map((img) => {
        const r = img.getBoundingClientRect()
        return { w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.left) }
      }),
      counter: ch.querySelector('[aria-live="polite"]')?.textContent?.trim(),
    }
  })
  console.log(file, JSON.stringify(info))
  await page.close()
}

await shoot(1440, 1100, '/tmp/ch2-desktop.png')
await shoot(820, 1100, '/tmp/ch2-tablet.png')
await shoot(420, 900, '/tmp/ch2-mobile.png')

await browser.close()
