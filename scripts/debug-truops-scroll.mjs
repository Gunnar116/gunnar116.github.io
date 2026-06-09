/**
 * Diagnose why window.scroll isn't working on truops.com pages.
 * Find the actual scrollable container.
 */
import puppeteer from 'puppeteer-core'

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

try {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 1200, deviceScaleFactor: 1 })

  await page.goto('https://truops.com/multi-tenant', {
    waitUntil: 'networkidle2',
    timeout: 45000,
  })
  await new Promise((r) => setTimeout(r, 2000))

  const info = await page.evaluate(() => {
    const htmlStyles = getComputedStyle(document.documentElement)
    const bodyStyles = getComputedStyle(document.body)

    // Find candidates with scrollable overflow
    const candidates = []
    const all = document.querySelectorAll('*')
    for (const el of all) {
      const cs = getComputedStyle(el)
      const oy = cs.overflowY
      const oh = el.scrollHeight - el.clientHeight
      if ((oy === 'auto' || oy === 'scroll') && oh > 100) {
        candidates.push({
          tag: el.tagName,
          id: el.id || null,
          cls: el.className && typeof el.className === 'string' ? el.className.slice(0, 80) : null,
          scrollHeight: el.scrollHeight,
          clientHeight: el.clientHeight,
        })
      }
    }

    // Try scrolling window and see if it works
    window.scrollTo(0, 3000)
    const windowScrollWorked = window.scrollY

    return {
      html: {
        overflow: htmlStyles.overflow,
        overflowY: htmlStyles.overflowY,
        height: htmlStyles.height,
        scrollHeight: document.documentElement.scrollHeight,
        clientHeight: document.documentElement.clientHeight,
      },
      body: {
        overflow: bodyStyles.overflow,
        overflowY: bodyStyles.overflowY,
        height: bodyStyles.height,
        scrollHeight: document.body.scrollHeight,
        clientHeight: document.body.clientHeight,
      },
      windowScrollWorked,
      scrollableContainerCount: candidates.length,
      scrollableCandidates: candidates.slice(0, 10),
    }
  })

  console.log(JSON.stringify(info, null, 2))
} finally {
  await browser.close()
}
