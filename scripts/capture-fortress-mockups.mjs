/**
 * Captures Fortress A2V case study visuals from a single source HTML:
 *   - public/work/fortress/mockups.html
 *       #hero  → hero A2V network composition
 *       #a2v   → asset-to-vendor network map
 *       #risk  → risk visualization dashboard
 *       #dash  → dashboard usability overview
 *       #sys   → design system pattern library sheet
 *
 *   node scripts/capture-fortress-mockups.mjs
 */
import puppeteer from 'puppeteer-core'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { existsSync } from 'node:fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const outDir = path.join(repoRoot, 'public/work/fortress')

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
if (!existsSync(chromePath)) {
  console.error(`Chrome not found at: ${chromePath}`)
  process.exit(1)
}

// Wider viewport + higher DPR so the system board exports at retina quality.
// The board canvas is 2000 wide; 3× scale produces a 6000-wide PNG.
const VIEWPORT = { width: 2100, height: 1400, deviceScaleFactor: 3 }

/**
 * Only the #sys design system board is captured from mockups.html.
 * The hero and Ch 01–03 visuals are now composed from real product PNGs by
 * scripts/compose-fortress-product-pngs.mjs and must not be overwritten here.
 * The other mockup sections remain in mockups.html for reference only.
 */
const captures = [
  { selector: '#sys',  filename: 'fortress-system-patterns.png' },
]

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

try {
  const page = await browser.newPage()
  await page.setViewport(VIEWPORT)

  const sourcePath = path.join(repoRoot, 'public/work/fortress/mockups.html')
  if (!existsSync(sourcePath)) {
    console.error(`  ✗ source missing: ${sourcePath}`)
    process.exit(1)
  }

  await page.goto(`file://${sourcePath}`, { waitUntil: 'networkidle0' })
  // Let fonts and any layout settle.
  await new Promise((r) => setTimeout(r, 1500))

  for (const t of captures) {
    const outPath = path.join(outDir, t.filename)
    try {
      const handle = await page.$(t.selector)
      if (!handle) {
        console.error(`  ✗ ${t.filename} — selector "${t.selector}" not found`)
        continue
      }
      await handle.screenshot({ path: outPath, type: 'png' })
      console.log(`  ✓ ${t.filename}  (mockups.html ${t.selector})`)
    } catch (err) {
      console.error(`  ✗ ${t.filename} → ${err.message || err}`)
    }
  }
} finally {
  await browser.close()
}
