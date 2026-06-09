import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1320, height: 1400, deviceScaleFactor: 2 })
await page.goto('http://localhost:5173/work/fortress/design-system-board.html', { waitUntil: 'networkidle0', timeout: 30000 })
await new Promise((r) => setTimeout(r, 800))

// Hover the FIRST swatch of Primary (most likely to be clipped at edge)
const swatches = await page.$$('.fan-swatch')
console.log('total swatches:', swatches.length)

// Hover the very first swatch — Darkest of Primary
await swatches[0].hover()
await new Promise((r) => setTimeout(r, 400))
await page.screenshot({ path: '/tmp/tooltip-first.png', clip: { x: 0, y: 0, width: 1320, height: 280 } })

// Now hover a middle one for a normal-position test
await swatches[8].hover() // around Neutral
await new Promise((r) => setTimeout(r, 400))
await page.screenshot({ path: '/tmp/tooltip-mid.png', clip: { x: 0, y: 0, width: 1320, height: 280 } })

// Check tooltip clipping by reading computed bounds
const result = await page.evaluate(() => {
  const first = document.querySelector('.fan-swatch:first-child')
  if (!first) return null
  const rect = first.getBoundingClientRect()
  return {
    swatchLeft: rect.left,
    swatchTop: rect.top,
    swatchWidth: rect.width,
    swatchHeight: rect.height,
    bodyOverflow: getComputedStyle(document.body).overflow,
    colorTileOverflow: document.querySelector('.t-color')
      ? getComputedStyle(document.querySelector('.t-color')).overflow
      : 'no t-color',
  }
})
console.log(JSON.stringify(result, null, 2))

await browser.close()
