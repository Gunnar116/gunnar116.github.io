/**
 * Captures the Fortress design system board from the dedicated standalone
 * page at public/work/fortress/design-system-board.html and writes it to
 * the Ch 04 output path used by the case study.
 *
 *   node scripts/capture-fortress-design-system.mjs
 *
 * Source data is adapted from the user-provided Figma Make export
 * ("Create Portfolio Visual.zip") — palette, typography, button variants,
 * badges, alerts, text-field states, sliders/progress, and toggles all
 * follow that file's MUI-style ramps.
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

const sourcePath = path.join(repoRoot, 'public/work/fortress/design-system-board.html')
if (!existsSync(sourcePath)) {
  console.error(`Source HTML missing: ${sourcePath}`)
  process.exit(1)
}

// Board max-width is 1280 (matches the case study's wide-variant iframe
// width). Viewport is slightly wider to give room for the centered layout.
// Tall viewport ensures the full board renders before screenshot clips.
const VIEWPORT = { width: 1320, height: 2000, deviceScaleFactor: 2 }

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

try {
  const page = await browser.newPage()
  await page.setViewport(VIEWPORT)
  await page.goto(`file://${sourcePath}`, { waitUntil: 'networkidle0' })
  await new Promise((r) => setTimeout(r, 1500))

  // Get the natural height of the board so we screenshot exactly that area.
  const boardSize = await page.evaluate(() => {
    const el = document.querySelector('.board')
    if (!el) return null
    const rect = el.getBoundingClientRect()
    return { width: Math.round(rect.width), height: Math.round(rect.height) }
  })
  if (!boardSize) {
    throw new Error('.board element not found on the page')
  }

  // If the board is taller than the current viewport, grow the viewport so
  // the screenshot clip captures the entire board in one pass.
  if (boardSize.height + 40 > VIEWPORT.height) {
    await page.setViewport({
      width: VIEWPORT.width,
      height: boardSize.height + 80,
      deviceScaleFactor: VIEWPORT.deviceScaleFactor,
    })
    await new Promise((r) => setTimeout(r, 500))
  }

  const outPath = path.join(outDir, 'fortress-system-patterns.png')
  await page.screenshot({
    path: outPath,
    type: 'png',
    clip: { x: 0, y: 0, width: boardSize.width, height: boardSize.height },
  })
  console.log(`  ✓ fortress-system-patterns.png  (${boardSize.width}×${boardSize.height} @ ${VIEWPORT.deviceScaleFactor}× from design-system-board.html)`)
} finally {
  await browser.close()
}
