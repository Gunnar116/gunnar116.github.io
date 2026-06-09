/**
 * Supplemental captures for the TruOps Website case study.
 * Re-uses the same Framer-aware capture strategy as capture-truops-website.mjs:
 *   - Puppeteer-core driving system Chrome
 *   - prefers-reduced-motion: reduce to freeze scroll animations
 *   - native mouse-wheel warmup to wake intersection observers
 *   - absolute-coordinate `clip` to bypass intercepted window.scrollTo
 *
 *   node scripts/capture-truops-supplemental.mjs
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
  // Assessments to Reports — top hero fold
  {
    url: 'https://truops.com/assessments-to-reports/',
    filename: 'truops-site-06-assessments-hero.png',
    type: 'top',
    height: 980,
  },

  // Arcade interactive demo — click "Get Started", wait for splash to fade,
  // then clip tight to the demo card itself (no surrounding whitespace).
  {
    url: 'https://app.arcade.software/share/hm6MlWqpE39axk4RE1ss',
    filename: 'truops-site-05-arcade-demo.png',
    type: 'element',
    isArcade: true,
    clickButtonText: 'Get Started',
    postClickWaitMs: 6500,
    waitForTextGone: 'Assessments can be a manual and time-consuming process',
    // Find the gradient demo card by walking up from a text node that exists
    // inside the demo (template names visible in the templates step).
    elementAnchorText: 'NIST CSF 2.0',
    elementMinWidth: 700,
    elementMaxWidth: 1400,
    elementMinHeight: 380,
    elementMaxHeight: 800,
    elementPadding: 30,
  },

  // Risk page — "Risk Register + Real-Time Dashboards" stacked sections
  {
    url: 'https://truops.com/risk/',
    filename: 'truops-site-07-risk-page.png',
    type: 'section',
    heading: 'One place for all your risks',
    padTop: 80,
    height: 1280, // tall enough to include both Risk Register and Real-Time Risk Dashboards
  },

  // Homepage — "Why Choose Us / GRC Expertise" section
  {
    url: 'https://truops.com/',
    filename: 'truops-site-04-grc-expertise.png',
    type: 'section',
    heading: 'We are partners with GRC Expertise',
    padTop: 80,
    height: 820,
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
  await page.emulateMediaFeatures([
    { name: 'prefers-reduced-motion', value: 'reduce' },
  ])
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
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 })
      await page.waitForSelector('body', { timeout: 15000 }).catch(() => {})
      await new Promise((r) => setTimeout(r, 2500))

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

      const isArcade = targets.every((t) => t.isArcade)
      if (!isArcade) {
        // Wake up Framer's intersection observers
        const pageHeight = await page.evaluate(() => document.body.scrollHeight)
        const stepPx = 600
        let walked = 0
        await page.mouse.move(VIEWPORT.width / 2, VIEWPORT.height / 2)
        while (walked < pageHeight + 1000) {
          await page.mouse.wheel({ deltaY: stepPx })
          await new Promise((r) => setTimeout(r, 100))
          walked += stepPx
        }
        await new Promise((r) => setTimeout(r, 1200))
        await page.evaluate(() => window.scrollTo(0, 0))
        for (let i = 0; i < 30; i++) {
          await page.mouse.wheel({ deltaY: -stepPx })
          await new Promise((r) => setTimeout(r, 40))
        }
        await new Promise((r) => setTimeout(r, 1000))
      }

      for (const t of targets) {
        const outPath = path.join(outDir, t.filename)
        try {
          // Optional: click a button by text before capture (e.g. Arcade "Get Started")
          if (t.clickButtonText) {
            // Use ElementHandle.click() so it dispatches a real Puppeteer mouse event
            const handle = await page.evaluateHandle((label) => {
              const candidates = Array.from(
                document.querySelectorAll('button, a, [role="button"]'),
              )
              for (const el of candidates) {
                const txt = (el.textContent || '').trim()
                if (txt.toLowerCase().includes(label.toLowerCase())) {
                  return el
                }
              }
              return null
            }, t.clickButtonText)
            const element = handle.asElement()
            if (element) {
              try {
                await element.click()
                console.log(`    → clicked "${t.clickButtonText}"`)
              } catch (clickErr) {
                console.warn(
                  `    ⚠ click "${t.clickButtonText}" failed: ${clickErr.message || clickErr}`,
                )
              }
            } else {
              console.warn(`    ⚠ click target "${t.clickButtonText}" not found on ${url}`)
            }
            await new Promise((r) => setTimeout(r, t.postClickWaitMs ?? 1500))

            // Optional: poll until a given text disappears from the DOM
            if (t.waitForTextGone) {
              const start = Date.now()
              const maxWaitMs = 8000
              while (Date.now() - start < maxWaitMs) {
                const stillPresent = await page.evaluate((needle) => {
                  return document.body.innerText
                    .toLowerCase()
                    .includes(needle.toLowerCase())
                }, t.waitForTextGone)
                if (!stillPresent) break
                await new Promise((r) => setTimeout(r, 400))
              }
              // small additional settle once it's gone
              await new Promise((r) => setTimeout(r, 600))
            }
          }

          if (t.type === 'top') {
            await page.screenshot({
              path: outPath,
              type: 'png',
              clip: { x: 0, y: 0, width: VIEWPORT.width, height: t.height },
            })
            console.log(`  ✓ ${t.filename}  (top of ${url})`)
            continue
          }

          if (t.type === 'element') {
            // Find a parent element containing the anchor text that fits given size bounds
            const box = await page.evaluate(
              ({
                anchorText,
                minW,
                maxW,
                minH,
                maxH,
              }) => {
                const all = Array.from(document.querySelectorAll('*'))
                for (const el of all) {
                  const text = el.textContent || ''
                  if (!text.includes(anchorText)) continue
                  let parent = el
                  while (parent && parent.parentElement) {
                    const rect = parent.getBoundingClientRect()
                    if (
                      rect.width >= minW &&
                      rect.width <= maxW &&
                      rect.height >= minH &&
                      rect.height <= maxH
                    ) {
                      return {
                        x: rect.left + window.scrollX,
                        y: rect.top + window.scrollY,
                        width: rect.width,
                        height: rect.height,
                      }
                    }
                    parent = parent.parentElement
                  }
                }
                return null
              },
              {
                anchorText: t.elementAnchorText,
                minW: t.elementMinWidth ?? 600,
                maxW: t.elementMaxWidth ?? 1400,
                minH: t.elementMinHeight ?? 300,
                maxH: t.elementMaxHeight ?? 900,
              },
            )

            if (!box) {
              throw new Error(`Element anchor not found: "${t.elementAnchorText}"`)
            }

            const pad = t.elementPadding ?? 24
            await page.screenshot({
              path: outPath,
              type: 'png',
              clip: {
                x: Math.max(0, Math.round(box.x - pad)),
                y: Math.max(0, Math.round(box.y - pad)),
                width: Math.round(box.width + pad * 2),
                height: Math.round(box.height + pad * 2),
              },
            })
            console.log(
              `  ✓ ${t.filename}  (element "${t.elementAnchorText}" — ${Math.round(box.width)}×${Math.round(box.height)} at ${Math.round(box.x)},${Math.round(box.y)})`,
            )
            continue
          }

          // Section capture via absolute clip
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
