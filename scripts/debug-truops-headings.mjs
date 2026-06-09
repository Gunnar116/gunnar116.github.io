/**
 * Dumps all heading text + their y-positions on each truops.com page we use,
 * so I can pick exact section anchors for the capture script.
 */
import puppeteer from 'puppeteer-core'

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const urls = [
  'https://truops.com/multi-tenant',
  'https://truops.com/pricing',
  'https://truops.com/case-studies',
]

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

try {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 1200, deviceScaleFactor: 1 })
  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
  )

  for (const url of urls) {
    console.log(`\n========== ${url} ==========`)
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 })
    await new Promise((r) => setTimeout(r, 2000))

    const headings = await page.evaluate(() => {
      const rows = []
      const els = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
      els.forEach((el) => {
        const text = (el.textContent || '').replace(/\s+/g, ' ').trim()
        if (!text) return
        const y = Math.round(el.getBoundingClientRect().top + window.scrollY)
        rows.push({ tag: el.tagName, y, text: text.slice(0, 120) })
      })
      return rows
    })

    headings.forEach((h) => {
      console.log(`  ${String(h.y).padStart(5)}px  ${h.tag.padEnd(3)}  ${h.text}`)
    })
  }
} finally {
  await browser.close()
}
