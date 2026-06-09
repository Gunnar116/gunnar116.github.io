// Slice the 8000×3985 library overview into readable horizontal sections.
import puppeteer from 'puppeteer-core'

const src = '/Users/gunnarmorgan/portfolio-site/public/work/kindness-ai/source/figma/library-hires.png'

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox','--disable-dev-shm-usage'],
})
const page = await browser.newPage()
// big viewport to fit the natural-size image
await page.setViewport({ width: 8000, height: 4100, deviceScaleFactor: 1 })

const html = `<!DOCTYPE html><html><head><style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
body{background:#fff;}
img{display:block;width:8000px;height:auto;}
</style></head><body><img src="file://${src}"/></body></html>`

await page.goto('data:text/html;base64,' + Buffer.from(html).toString('base64'), { waitUntil: 'load' })
await new Promise(r => setTimeout(r, 1500))

// slice into 5 equal horizontal sections of 1600 wide each
const slices = [
  { name: 'col-1', x: 0,    w: 1600 },
  { name: 'col-2', x: 1600, w: 1600 },
  { name: 'col-3', x: 3200, w: 1600 },
  { name: 'col-4', x: 4800, w: 1600 },
  { name: 'col-5', x: 6400, w: 1600 },
]
for (const s of slices) {
  await page.screenshot({
    path: `/tmp/lib-${s.name}.png`,
    clip: { x: s.x, y: 0, width: s.w, height: 3985 },
  })
  console.log(`saved /tmp/lib-${s.name}.png`)
}
await browser.close()
