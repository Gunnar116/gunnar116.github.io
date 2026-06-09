/**
 * Captures each .composition section from public/work/truops/mockups.html
 * as its own high-DPI PNG, preserving the editorial treatment (charcoal
 * panel, browser chrome, URL pill, pull-quote copy).
 *
 * Run with: node scripts/capture-truops-mockups.mjs
 */
import puppeteer from 'puppeteer-core'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { existsSync } from 'node:fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const mockupsPath = path.join(repoRoot, 'public/work/truops/mockups.html')
const outDir = path.join(repoRoot, 'public/work/truops')

const filenames = [
  'truops-mockup-01-solo-hero.png',
  'truops-mockup-02-system-pair.png',
  'truops-mockup-03-detail-focus.png',
  'truops-mockup-04-ai-moment.png',
]

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
if (!existsSync(chromePath)) {
  console.error(`Chrome not found at: ${chromePath}`)
  process.exit(1)
}

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

try {
  const page = await browser.newPage()
  await page.setViewport({
    width: 1520,
    height: 1200,
    deviceScaleFactor: 2,
  })
  await page.goto(`file://${mockupsPath}`, { waitUntil: 'networkidle0' })

  // Wait an extra moment for fonts/images
  await new Promise((r) => setTimeout(r, 800))

  const sections = await page.$$('.composition')
  if (sections.length !== filenames.length) {
    throw new Error(
      `Expected ${filenames.length} .composition elements, found ${sections.length}`,
    )
  }

  for (let i = 0; i < sections.length; i++) {
    const outPath = path.join(outDir, filenames[i])
    await sections[i].screenshot({
      path: outPath,
      type: 'png',
      omitBackground: false,
    })
    console.log(`  ✓ ${filenames[i]}`)
  }
} finally {
  await browser.close()
}
