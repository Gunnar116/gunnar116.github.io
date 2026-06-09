/**
 * Captures Kindness.ai case study visuals from a single source HTML:
 *   - public/work/kindness-ai/mockups.html
 *       #hero    → product ecosystem (inbox + thread + AI panel)
 *       #system  → product design infrastructure / system board
 *       #inbox   → inbox workflow redesign
 *       #thread  → message threading + labels + filters
 *       #ai      → AI-assisted search + auto-labeling
 *
 *   node scripts/capture-kindness-mockups.mjs
 */
import puppeteer from 'puppeteer-core'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { existsSync } from 'node:fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const outDir = path.join(repoRoot, 'public/work/kindness-ai')

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
if (!existsSync(chromePath)) {
  console.error(`Chrome not found at: ${chromePath}`)
  process.exit(1)
}

const VIEWPORT = { width: 1760, height: 1100, deviceScaleFactor: 2 }

const captures = [
  { selector: '#hero',   filename: 'kindness-hero-inbox-system.png' },
  { selector: '#system', filename: 'kindness-product-infrastructure.png' },
  { selector: '#inbox',  filename: 'kindness-inbox-workflow.png' },
  { selector: '#thread', filename: 'kindness-threading-labels-filters.png' },
  { selector: '#ai',     filename: 'kindness-ai-search-auto-labeling.png' },
]

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

try {
  const page = await browser.newPage()
  await page.setViewport(VIEWPORT)
  const sourcePath = path.join(repoRoot, 'public/work/kindness-ai/mockups.html')
  if (!existsSync(sourcePath)) {
    console.error(`  ✗ source missing: ${sourcePath}`)
    process.exit(1)
  }
  await page.goto(`file://${sourcePath}`, { waitUntil: 'networkidle0' })
  await new Promise((r) => setTimeout(r, 1500))

  for (const t of captures) {
    const outPath = path.join(outDir, t.filename)
    const handle = await page.$(t.selector)
    if (!handle) {
      console.error(`  ✗ ${t.filename} — selector "${t.selector}" not found`)
      continue
    }
    await handle.screenshot({ path: outPath, type: 'png' })
    console.log(`  ✓ ${t.filename}  (mockups.html ${t.selector})`)
  }
} finally {
  await browser.close()
}
