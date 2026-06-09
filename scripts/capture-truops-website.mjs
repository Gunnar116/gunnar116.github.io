/**
 * Captures section-level crops from truops.com pages for the TruOps Website case study.
 *
 *   node scripts/capture-truops-website.mjs
 *
 * truops.com is a Framer site whose scroll position is controlled by a
 * smooth-scroll library, so window.scrollTo / Element.scrollIntoView don't
 * meaningfully move the viewport from headless Puppeteer. We bypass scrolling
 * entirely by clipping at absolute document coordinates — Puppeteer's
 * `clip` option works in document space and captures beyond the viewport
 * by default.
 *
 * Output PNGs go to public/work/truops-website/.
 */
import puppeteer from 'puppeteer-core'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { existsSync } from 'node:fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const outDir = path.join(repoRoot, 'public/work/truops-website')

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
if (!existsSync(chromePath)) {
  console.error(`Chrome not found at: ${chromePath}`)
  process.exit(1)
}

const VIEWPORT = { width: 1440, height: 1200, deviceScaleFactor: 2 }

const captures = [
  // 01 — Homepage hero (top fold only)
  {
    url: 'https://truops.com/',
    filename: 'truops-site-01-home-hero.png',
    type: 'top',
    height: 900,
  },

  // 02 — Multi-Tenant: "Designed for Self-Serviceability" (heading at y≈3037)
  {
    url: 'https://truops.com/multi-tenant',
    filename: 'truops-site-02-multi-tenant-self-service.png',
    type: 'section',
    heading: 'Designed for Self-Serviceability',
    padTop: 80,
    height: 820,
  },

  // 03 — Multi-Tenant: "Simple to get started" (heading at y≈3515)
  {
    url: 'https://truops.com/multi-tenant',
    filename: 'truops-site-03-assessment-templates.png',
    type: 'section',
    heading: 'Simple to get started',
    padTop: 80,
    height: 820,
  },

  // 04 — Multi-Tenant: "Getting to the Report" (heading at y≈4913)
  {
    url: 'https://truops.com/multi-tenant',
    filename: 'truops-site-04-report-automation.png',
    type: 'section',
    heading: 'Getting to the Report',
    padTop: 80,
    height: 820,
  },

  // 05 — Pricing: plan-comparison section (H2 "Pricing for Multi-Tenant & End Clients" at y≈570)
  {
    url: 'https://truops.com/pricing',
    filename: 'truops-site-05-pricing-conversion.png',
    type: 'section',
    heading: 'Pricing for Multi-Tenant & End Clients',
    padTop: 200, // give the H6 "Pricing Table" eyebrow above the H2 some room
    height: 1000,
  },

  // 06 — Case Studies: the grid (first card H2 at y≈1298)
  {
    url: 'https://truops.com/case-studies',
    filename: 'truops-site-06-case-studies-grid.png',
    type: 'section',
    heading: 'F500 MSSP delivers',
    padTop: 140, // a little context above the first card row
    height: 980,
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
  // Framer Motion typically gates scroll-triggered animations on prefers-reduced-motion.
  // Setting reduce here freezes elements in their final/visible state, which is what we want
  // for screenshots that bypass real scrolling.
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
  )

  const byUrl = new Map()
  for (const t of captures) {
    if (!byUrl.has(t.url)) byUrl.set(t.url, [])
    byUrl.get(t.url).push(t)
  }

  for (const [url, targets] of byUrl) {
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 })
      await page.waitForSelector('nav', { timeout: 15000 }).catch(() => {})
      await new Promise((r) => setTimeout(r, 2000))

      // Wake up lazy intersection observers by walking native wheel events
      // through the full page height. truops.com is a Framer site whose smooth
      // scroll lib intercepts `window.scrollTo` — native wheel events still
      // trigger image/section reveal handlers correctly.
      const pageHeight = await page.evaluate(() => document.body.scrollHeight)
      const stepPx = 600
      let walked = 0
      // start the cursor inside the viewport so wheel events have a target
      await page.mouse.move(VIEWPORT.width / 2, VIEWPORT.height / 2)
      while (walked < pageHeight + 1000) {
        await page.mouse.wheel({ deltaY: stepPx })
        await new Promise((r) => setTimeout(r, 120))
        walked += stepPx
      }
      // settle, then jump back to top for consistent clip math
      await new Promise((r) => setTimeout(r, 1500))
      // try multiple ways to reset to top (Framer scroll lib may intercept)
      await page.evaluate(() => window.scrollTo(0, 0))
      for (let i = 0; i < 30; i++) {
        await page.mouse.wheel({ deltaY: -stepPx })
        await new Promise((r) => setTimeout(r, 50))
      }
      await new Promise((r) => setTimeout(r, 1000))

      // dismiss any cookie/CTA modal if present
      await page
        .evaluate(() => {
          const candidates = Array.from(document.querySelectorAll('button, a'))
          for (const el of candidates) {
            const txt = (el.textContent || '').toLowerCase().trim()
            if (
              txt === 'accept' ||
              txt === 'accept all' ||
              txt === 'i agree' ||
              txt === 'got it' ||
              txt === 'close'
            ) {
              el.click()
              return true
            }
          }
          return false
        })
        .catch(() => {})

      await new Promise((r) => setTimeout(r, 500))

      for (const t of targets) {
        const outPath = path.join(outDir, t.filename)
        try {
          if (t.type === 'top') {
            await page.screenshot({
              path: outPath,
              type: 'png',
              clip: { x: 0, y: 0, width: VIEWPORT.width, height: t.height },
            })
            console.log(`  ✓ ${t.filename}  (top of ${url})`)
            continue
          }

          // Resolve heading to absolute Y in the document
          const yPos = await page.evaluate((text) => {
            const lower = text.toLowerCase()
            const headings = Array.from(
              document.querySelectorAll('h1, h2, h3, h4, h5, h6'),
            )
            for (const h of headings) {
              const tt = (h.textContent || '').trim().toLowerCase()
              if (tt.includes(lower)) {
                return h.getBoundingClientRect().top + window.scrollY
              }
            }
            return null
          }, t.heading)

          if (yPos == null) {
            throw new Error(`Heading not found: "${t.heading}"`)
          }

          const clipY = Math.max(0, Math.round(yPos - (t.padTop ?? 80)))

          await page.screenshot({
            path: outPath,
            type: 'png',
            clip: {
              x: 0,
              y: clipY,
              width: VIEWPORT.width,
              height: t.height,
            },
          })
          console.log(
            `  ✓ ${t.filename}  (section "${t.heading}" — clipped at y=${clipY})`,
          )
        } catch (err) {
          console.error(`  ✗ ${t.filename} → ${err.message || err}`)
        }
      }
    } catch (err) {
      console.error(`  ✗ navigation failed: ${url} → ${err.message || err}`)
    }
  }
} finally {
  await browser.close()
}
