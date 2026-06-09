import puppeteer from 'puppeteer-core'

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox'],
})

async function shootRow(rowSlug, file, w = 1440, h = 900) {
  const page = await browser.newPage()
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 })
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 30000 })
  await new Promise((r) => setTimeout(r, 600))
  await page.evaluate((slug) => {
    const link = document.querySelector(`a[href*="${slug}"]`)
    if (link) {
      const top = link.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: top - 80, behavior: 'instant' })
    }
  }, rowSlug)
  await new Promise((r) => setTimeout(r, 1200))
  await page.screenshot({ path: file, fullPage: false })
  await page.close()
}

await shootRow('truops-platform', '/tmp/home-truops.png')
await shootRow('truops-website', '/tmp/home-website.png')
await shootRow('kindness-ai', '/tmp/home-kindness.png')
await shootRow('fortress-a2v', '/tmp/home-fortress.png')

await browser.close()
