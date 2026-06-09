import puppeteer from 'puppeteer-core'

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 1 })
await page.goto('http://localhost:5173/work/medefy', { waitUntil: 'networkidle0', timeout: 30000 })
await new Promise((r) => setTimeout(r, 600))

const data = await page.evaluate(() => {
  const iframes = Array.from(document.querySelectorAll('iframe')).map((f) => ({
    src: f.getAttribute('src'),
    title: f.getAttribute('title'),
    width: f.clientWidth,
    height: f.clientHeight,
  }))
  const ch3 = Array.from(document.querySelectorAll('li')).find((li) => /MyBenefitsFlorida/.test(li.textContent || ''))
  const ch3Badge = ch3?.querySelector('span.eyebrow, .text-\\[11px\\]')?.textContent
  const ch3HasIframe = !!ch3?.querySelector('iframe')
  const openLink = ch3?.querySelector('a[target="_blank"]')
  const carouselDots = document.querySelectorAll('[role="tab"][aria-label^="Show slide"]').length
  const carouselCounters = Array.from(document.querySelectorAll('[aria-live="polite"]'))
    .map((n) => (n.textContent || '').trim())
    .filter((s) => /\d+\s*\/\s*\d+/.test(s))
  return {
    iframes,
    ch3Badge,
    ch3HasIframe,
    ch3OpenHref: openLink?.getAttribute('href'),
    ch3OpenLabel: (openLink?.textContent || '').trim(),
    carouselDots,
    carouselCounters,
  }
})
console.log(JSON.stringify(data, null, 2))

await browser.close()
