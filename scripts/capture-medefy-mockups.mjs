/**
 * Captures Medefy case study visuals from three source HTML files:
 *   - public/work/medefy/mockups.html     → hero, Texoma chat, Member mobile
 *   - public/work/medefy/mybf-report.html  → MyBenefitsFlorida accessibility
 *   - public/work/medefy/color-tokens.html → Product system / design tokens
 *
 *   node scripts/capture-medefy-mockups.mjs
 *
 * Real Medefy phone screens are used directly in mockups.html with
 * targeted CSS-overlay redactions for sensitive elements (persona names,
 * medical questions, dollar amounts, partner branding, face photos).
 */
import puppeteer from 'puppeteer-core'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { existsSync } from 'node:fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const outDir = path.join(repoRoot, 'public/work/medefy')

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
if (!existsSync(chromePath)) {
  console.error(`Chrome not found at: ${chromePath}`)
  process.exit(1)
}

const VIEWPORT = { width: 1520, height: 1100, deviceScaleFactor: 2 }

/**
 * Each capture has:
 *   source   — relative HTML path under public/work/medefy/
 *   selector — optional CSS selector to clip to a specific element
 *   clip     — optional absolute {x,y,width,height} crop (in CSS px)
 *   filename — output PNG name (saved in public/work/medefy/)
 */
const captures = [
  // Hero, Texoma, Member Mobile from the new mockups.html
  {
    source: 'mockups.html',
    selector: '#hero',
    filename: 'medefy-hero-product-ecosystem.png',
  },
  {
    source: 'mockups.html',
    selector: '#texoma',
    filename: 'medefy-texoma-chat-workflow.png',
  },
  {
    source: 'mockups.html',
    selector: '#mobile',
    filename: 'medefy-member-mobile-app.png',
  },

  // MyBenefitsFlorida accessibility — page 1 (title + findings cards)
  {
    source: 'mybf-report.html',
    clip: { x: 40, y: 64, width: 1440, height: 880 },
    filename: 'medefy-mybenefitsflorida-accessibility.png',
    waitMs: 1800,
  },
  // MyBF accessibility examples — additional report pages for the supporting gallery
  {
    source: 'mybf-report.html',
    goToPage: 2,
    clip: { x: 40, y: 64, width: 1440, height: 880 },
    filename: 'medefy-accessibility-example-01.png',
    waitMs: 1500,
  },
  {
    source: 'mybf-report.html',
    goToPage: 3,
    clip: { x: 40, y: 64, width: 1440, height: 880 },
    filename: 'medefy-accessibility-example-02.png',
    waitMs: 1500,
  },
  {
    source: 'mybf-report.html',
    goToPage: 5,
    clip: { x: 40, y: 64, width: 1440, height: 880 },
    filename: 'medefy-accessibility-example-03.png',
    waitMs: 1500,
  },

  // Color tokens — capture the top of the existing portfolio token reference
  // (header + table of tokens with before/after).
  {
    source: 'color-tokens.html',
    clip: { x: 0, y: 0, width: 1440, height: 940 },
    filename: 'medefy-product-system-foundation.png',
    waitMs: 1500,
  },
]

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

try {
  const page = await browser.newPage()
  await page.setViewport(VIEWPORT)

  // Group by source so we navigate to each HTML once
  const byUrl = new Map()
  for (const t of captures) {
    if (!byUrl.has(t.source)) byUrl.set(t.source, [])
    byUrl.get(t.source).push(t)
  }

  for (const [source, targets] of byUrl) {
    const sourcePath = path.join(repoRoot, 'public/work/medefy', source)
    if (!existsSync(sourcePath)) {
      console.error(`  ✗ source missing: ${sourcePath}`)
      continue
    }
    await page.goto(`file://${sourcePath}`, { waitUntil: 'networkidle0' })
    // wait extra for fonts/images to settle
    const maxWait = Math.max(1200, ...targets.map((t) => t.waitMs ?? 0))
    await new Promise((r) => setTimeout(r, maxWait))

    for (const t of targets) {
      const outPath = path.join(outDir, t.filename)
      try {
        // Optional: navigate the source's internal page carousel (used by mybf-report.html)
        if (t.goToPage != null) {
          await page.evaluate((n) => {
            if (typeof window.goTo === 'function') window.goTo(n)
          }, t.goToPage)
          await new Promise((r) => setTimeout(r, t.waitMs ?? 1200))
        }

        if (t.selector) {
          const handle = await page.$(t.selector)
          if (!handle) {
            console.error(`  ✗ ${t.filename} — selector "${t.selector}" not found in ${source}`)
            continue
          }
          await handle.screenshot({ path: outPath, type: 'png' })
          console.log(`  ✓ ${t.filename}  (${source} ${t.selector})`)
        } else if (t.clip) {
          await page.screenshot({
            path: outPath,
            type: 'png',
            clip: t.clip,
          })
          console.log(
            `  ✓ ${t.filename}  (${source} clip ${t.clip.width}×${t.clip.height})`,
          )
        } else {
          throw new Error('capture requires selector or clip')
        }
      } catch (err) {
        console.error(`  ✗ ${t.filename} → ${err.message || err}`)
      }
    }
  }
} finally {
  await browser.close()
}
