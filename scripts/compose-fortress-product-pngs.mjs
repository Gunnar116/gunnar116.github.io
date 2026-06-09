/**
 * Composes the Fortress case study product visuals from approved real
 * source PNGs in public/work/fortress/source/. Landscape source images
 * are copied as-is; tall portrait sources are top-cropped via Puppeteer
 * so the chapter visuals stay banner-friendly rather than full-page scrolls.
 *
 *   node scripts/compose-fortress-product-pngs.mjs
 *
 * Source files (already copied into public/work/fortress/source/):
 *   dashboard-home.png       — AV Network home dashboard (1440 × 3778)
 *   marketplace-grid.png     — Marketplace vendor grid (1928 × 1088)
 *   product-profile.png      — Vendor product profile with risk scoring (1920 × 2407)
 *   cyber-hygiene.png        — Cyber hygiene scan results (1920 × 3897)
 *
 * Per the user's explicit approval, real customer/company branding inside
 * the images (e.g. Accenture, 1000 Bulbs, Microsoft) is kept as-is — no
 * redaction, masking, or blurring.
 */
import puppeteer from 'puppeteer-core'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { existsSync, copyFileSync } from 'node:fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const sourceDir = path.join(repoRoot, 'public/work/fortress/source')
const outDir = path.join(repoRoot, 'public/work/fortress')

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
if (!existsSync(chromePath)) {
  console.error(`Chrome not found at: ${chromePath}`)
  process.exit(1)
}

/**
 * Tall-source crops. For each, we load the source image at its natural pixel
 * size in a viewport tall enough to fit, then screenshot only the top portion.
 * Resulting aspect ratios target ~1.5–1.7 so they feel like banner crops, not
 * full-page captures.
 */
const tallCrops = [
  {
    source: 'dashboard-home.png',
    out: 'fortress-hero-a2v-network.png',
    // Source 1440×3778 → crop top 1440 × 940 (aspect 1.53)
    crop: { width: 1440, height: 940 },
  },
  {
    source: 'product-profile.png',
    out: 'fortress-risk-visualization.png',
    // Source 1920×2407 → crop top 1920 × 1280 (aspect 1.5).
    // Covers the profile header + Overall Score table + Overall Score by Category chart.
    crop: { width: 1920, height: 1280 },
  },
  {
    source: 'cyber-hygiene.png',
    out: 'fortress-dashboard-usability.png',
    // Source 1920×3897 → crop top 1920 × 1280 (aspect 1.5).
    // Covers profile header + Cyber Hygiene Discovery (world map + target location details).
    crop: { width: 1920, height: 1280 },
  },
]

/** Landscape sources used as-is (no crop needed). */
const directCopies = [
  {
    source: 'marketplace-grid.png',
    out: 'fortress-a2v-network-map.png',
  },
]

// Copy landscape sources directly first.
for (const c of directCopies) {
  const src = path.join(sourceDir, c.source)
  const dest = path.join(outDir, c.out)
  if (!existsSync(src)) {
    console.error(`  ✗ ${c.out} — source missing: ${src}`)
    continue
  }
  copyFileSync(src, dest)
  console.log(`  ✓ ${c.out}  (copied from ${c.source})`)
}

// Top-crop tall sources via Puppeteer.
// We write a small wrapper HTML next to the source PNG so Chrome will load
// the local file under the same origin (setContent + file:// img URLs gets
// blocked by Chrome's origin sandbox; loading an actual file:// HTML works).
import { writeFileSync, unlinkSync } from 'node:fs'

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

try {
  for (const c of tallCrops) {
    const src = path.join(sourceDir, c.source)
    const dest = path.join(outDir, c.out)
    if (!existsSync(src)) {
      console.error(`  ✗ ${c.out} — source missing: ${src}`)
      continue
    }

    const page = await browser.newPage()
    await page.setViewport({
      width: c.crop.width,
      height: c.crop.height + 40,
      deviceScaleFactor: 2,
    })

    const tmpHtml = path.join(sourceDir, `__crop-${c.source}.html`)
    const html = `<!DOCTYPE html><html><head><style>
      *,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
      html,body{background:#FFFFFF;}
      img{display:block;width:${c.crop.width}px;height:auto;}
    </style></head><body><img src="${c.source}" /></body></html>`
    writeFileSync(tmpHtml, html, 'utf8')

    try {
      await page.goto(`file://${tmpHtml}`, { waitUntil: 'networkidle0' })
      await page.waitForSelector('img', { visible: true })
      // Ensure the image has finished decoding.
      await page.evaluate(async () => {
        const img = document.querySelector('img')
        if (img && !img.complete) {
          await new Promise((r) => img.addEventListener('load', r, { once: true }))
        }
      })

      await page.screenshot({
        path: dest,
        type: 'png',
        clip: { x: 0, y: 0, width: c.crop.width, height: c.crop.height },
      })
      console.log(`  ✓ ${c.out}  (top-cropped ${c.crop.width}×${c.crop.height} from ${c.source})`)
    } finally {
      try { unlinkSync(tmpHtml) } catch {}
      await page.close()
    }
  }
} finally {
  await browser.close()
}
