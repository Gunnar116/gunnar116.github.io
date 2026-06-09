/**
 * Captures the Kindness Design Library page as the Ch 01 static fallback.
 * Source data is pulled directly from the Kindness Library Figma file
 * (xbHL9xeSsnDWvENnPwZ7VW) — all 44 token rows × 2 modes verbatim.
 *
 *   node scripts/capture-kindness-design-library.mjs
 */
import puppeteer from 'puppeteer-core'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { existsSync } from 'node:fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
if (!existsSync(chromePath)) { console.error(`Chrome not found: ${chromePath}`); process.exit(1) }

const sourcePath = path.join(repoRoot, 'public/work/kindness-ai/kindness-design-library.html')
const outPath = path.join(repoRoot, 'public/work/kindness-ai/kindness-product-infrastructure.png')

const VIEWPORT = { width: 1320, height: 1100, deviceScaleFactor: 2 }

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

try {
  const page = await browser.newPage()
  await page.setViewport(VIEWPORT)
  await page.goto(`file://${sourcePath}`, { waitUntil: 'networkidle0' })
  await new Promise((r) => setTimeout(r, 1200))

  // Grow viewport if board grew taller
  const size = await page.evaluate(() => {
    const el = document.querySelector('.board')
    if (!el) return null
    const r = el.getBoundingClientRect()
    return { width: Math.round(r.width), height: Math.round(r.height) }
  })
  if (size && size.height + 40 > VIEWPORT.height) {
    await page.setViewport({ width: VIEWPORT.width, height: size.height + 80, deviceScaleFactor: VIEWPORT.deviceScaleFactor })
    await new Promise((r) => setTimeout(r, 400))
  }

  await page.screenshot({
    path: outPath,
    type: 'png',
    clip: { x: 0, y: 0, width: size.width, height: size.height },
  })
  console.log(`  ✓ kindness-product-infrastructure.png  (${size.width}×${size.height} @ ${VIEWPORT.deviceScaleFactor}× from kindness-design-library.html)`)
} finally {
  await browser.close()
}
