/**
 * Slice the 8000×3985 Kindness library overview into named section assets.
 * Coordinates anchored to the hi-res canvas via the /tmp/lib-col-*.png slices.
 *
 *   node scripts/slice-kindness-sections.mjs
 */
import puppeteer from 'puppeteer-core'
import { copyFileSync, writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')

const SRC = path.join(repoRoot, 'public/work/kindness-ai/source/figma/library-hires.png')
const OUT_DIR = path.join(repoRoot, 'public/work/kindness-ai/source/figma/sections')
mkdirSync(OUT_DIR, { recursive: true })

const stagedImg = '/tmp/lib-hires-slicer.png'
copyFileSync(SRC, stagedImg)
const stagedHtml = '/tmp/lib-hires-slicer.html'
writeFileSync(stagedHtml, `<!DOCTYPE html><html><head><style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
html,body{background:#fff;}
img{display:block;width:8000px;height:3985px;}
</style></head><body><img src="file://${stagedImg}"/></body></html>`)

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

try {
  const page = await browser.newPage()
  await page.setViewport({ width: 8000, height: 4000, deviceScaleFactor: 1 })
  await page.goto(`file://${stagedHtml}`, { waitUntil: 'load' })
  await new Promise((r) => setTimeout(r, 1500))

  const sections = [
    // Brand mark (heart + kindness wordmark)
    { name: '01-brand', clip: { x: 30, y: 60, width: 110, height: 230 } },

    // Buttons — light-mode matrix (col-1 right top, exclude "Dark Mode Below")
    { name: '03a-buttons-light', clip: { x: 510, y: 130, width: 780, height: 950 } },

    // Buttons — dark-mode panel (full black region with all button types)
    { name: '03b-buttons-dark', clip: { x: 510, y: 1100, width: 780, height: 760 } },

    // Form controls — calendar/dropdown cluster (lower portion of col-2 right)
    { name: '04-form-controls', clip: { x: 2810, y: 500, width: 540, height: 800 } },

    // Typography — middle-dense portion (skip very top + bottom whitespace)
    { name: '05-typography', clip: { x: 6770, y: 80, width: 410, height: 1400 } },

    // Nav / toolbar — wider crop capturing toolbar + icon variants
    { name: '06-nav-toolbar', clip: { x: 4710, y: 40, width: 1400, height: 400 } },

    // Spec tables — skip dark-panel bleed at left, start at "Small" header
    { name: '07-spec-tables', clip: { x: 3960, y: 80, width: 900, height: 1750 } },

    // Exploratory: full top region for visual verification
    { name: '00-overview-content', clip: { x: 0, y: 0, width: 8000, height: 2400 } },
  ]

  for (const s of sections) {
    const out = path.join(OUT_DIR, `${s.name}.png`)
    await page.screenshot({ path: out, clip: s.clip })
    console.log(`  ✓ ${s.name}.png  (${s.clip.width}×${s.clip.height})`)
  }
} finally {
  await browser.close()
}
