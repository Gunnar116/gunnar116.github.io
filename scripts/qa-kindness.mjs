import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 1 })
await page.goto('http://localhost:5173/work/kindness-ai', { waitUntil: 'networkidle0', timeout: 30000 })
await new Promise((r) => setTimeout(r, 1000))

const data = await page.evaluate(() => {
  const imgs = Array.from(document.querySelectorAll('img')).map((i) => ({
    src: i.getAttribute('src'),
  })).filter((i) => i.src?.startsWith('/work/kindness-ai'))
  const eyebrow = document.querySelector('span.eyebrow')?.textContent?.trim()
  const title = document.querySelector('h1')?.textContent?.trim()
  const nextLink = document.querySelector('a[href*="/work/medefy"]')
  return { imgs, eyebrow, title, nextHref: nextLink?.getAttribute('href') }
})
console.log('case-study:', JSON.stringify(data, null, 2))

// Click each chapter image to check lightbox
const targets = ['Product Design Infrastructure', 'Inbox Workflow Redesign', 'Message Threading', 'AI-Assisted Search']
for (const t of targets) {
  await page.evaluate((title) => {
    const li = Array.from(document.querySelectorAll('li')).find((el) => new RegExp(title).test(el.textContent || ''))
    const btn = li?.querySelector('figure button')
    btn?.click()
  }, t)
  await new Promise((r) => setTimeout(r, 400))
  const lb = await page.evaluate(() => {
    const d = document.querySelector('[role="dialog"]')
    if (!d) return null
    return { src: d.querySelector('img')?.getAttribute('src'), hasFigcap: !!d.querySelector('figcaption, .caption') }
  })
  console.log(`ch[${t}]:`, JSON.stringify(lb))
  await page.evaluate(() => document.querySelector('[role="dialog"] button[aria-label="Close image"]')?.click())
  await new Promise((r) => setTimeout(r, 200))
}

// Verify homepage hero cards
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 30000 })
await new Promise((r) => setTimeout(r, 600))
const homeData = await page.evaluate(() => {
  const rows = Array.from(document.querySelectorAll('article'))
  return rows.map((r) => {
    const link = r.querySelector('a[href^="/work/"]')
    const img = r.querySelector('img')
    return {
      href: link?.getAttribute('href'),
      title: r.querySelector('h3')?.textContent?.trim(),
      imgSrc: img?.getAttribute('src'),
    }
  })
})
console.log('homepage:', JSON.stringify(homeData, null, 2))

await browser.close()
