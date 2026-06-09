/**
 * Captures the Kindness Design Library board in DARK mode.
 *   node scripts/capture-kindness-design-library-dark.mjs
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
const outPath = path.join(repoRoot, 'public/work/kindness-ai/kindness-product-infrastructure-dark.png')

const VIEWPORT = { width: 1320, height: 1300, deviceScaleFactor: 2 }

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

try {
  const page = await browser.newPage()
  await page.setViewport(VIEWPORT)
  await page.goto(`file://${sourcePath}`, { waitUntil: 'networkidle0' })
  await new Promise((r) => setTimeout(r, 800))

  // Switch to dark mode
  await page.evaluate(() => {
    const btn = document.querySelector('.mode-seg__btn[data-mode="dark"]')
    if (btn) btn.click()
  })
  await new Promise((r) => setTimeout(r, 400))

  const size = await page.evaluate(() => {
    const el = document.querySelector('.board')
    if (!el) return null
    const r = el.getBoundingClientRect()
    return { width: Math.round(r.width), height: Math.round(r.height) }
  })
  if (size && size.height + 40 > VIEWPORT.height) {
    await page.setViewport({ width: VIEWPORT.width, height: size.height + 80, deviceScaleFactor: VIEWPORT.deviceScaleFactor })
    await new Promise((r) => setTimeout(r, 300))
  }

  await page.screenshot({
    path: outPath,
    type: 'png',
    clip: { x: 0, y: 0, width: size.width, height: size.height },
  })
  console.log(`  ✓ kindness-product-infrastructure-dark.png  (${size.width}×${size.height} @ ${VIEWPORT.deviceScaleFactor}×)`)
} finally {
  await browser.close()
}
