/**
 * Captures the Fortress homepage hero composition for the Selected Work
 * card on the portfolio homepage.
 *
 *   node scripts/capture-fortress-homepage-hero.mjs
 */
import puppeteer from 'puppeteer-core'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { existsSync } from 'node:fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
if (!existsSync(chromePath)) { console.error(`Chrome not found at: ${chromePath}`); process.exit(1) }

const sourcePath = path.join(repoRoot, 'public/work/fortress/homepage-hero.html')
const outPath = path.join(repoRoot, 'public/work/fortress/fortress-homepage-hero.png')

const VIEWPORT = { width: 1640, height: 1040, deviceScaleFactor: 2 }

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

  const handle = await page.$('.stage')
  if (!handle) throw new Error('.stage not found')
  await handle.screenshot({ path: outPath, type: 'png' })
  console.log(`  ✓ fortress-homepage-hero.png  (homepage-hero.html .stage)`)
} finally {
  await browser.close()
}
